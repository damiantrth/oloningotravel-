import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { fieldErrors, inquirySchema, type InquiryResponse } from "@/lib/inquiry";
import { getServiceClient } from "@/lib/supabase";
import { getDestinations, getSettings, getTrips } from "@/lib/data";
import { sendOwnerNotification, sendVisitorConfirmation } from "@/lib/email";
import { pick } from "@/lib/types";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>(); // per server instance; the database check below covers all instances

function json(body: InquiryResponse, status = 200) {
  return NextResponse.json(body, { status });
}

function hashIp(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  return createHash("sha256").update(ip + (process.env.RATE_LIMIT_SALT ?? "")).digest("hex").slice(0, 32);
}

export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ ok: false, error: "validation", fields: { form: "e_generic" } }, 400);
  }

  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) return json({ ok: false, error: "validation", fields: fieldErrors(parsed.error) }, 400);
  const input = parsed.data;

  // Honeypot filled in: pretend all went well, but keep nothing.
  if (input.website) return json({ ok: true });

  const ipHash = hashIp(req);
  const now = Date.now();
  const hits = (recent.get(ipHash) ?? []).filter((ts) => now - ts < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) return json({ ok: false, error: "rate_limited" }, 429);
  recent.set(ipHash, [...hits, now]);

  const [trips, destinations, settings] = await Promise.all([getTrips(), getDestinations(), getSettings()]);
  const trip = input.trip ? trips.find((t) => t.slug === input.trip) ?? null : null;
  const destination = destinations.find((d) => d.slug === input.destination) ?? null;

  const db = getServiceClient();
  if (db) {
    const since = new Date(now - WINDOW_MS).toISOString();
    const { count } = await db.from("inquiries").select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash).gte("created_at", since);
    if ((count ?? 0) >= MAX_PER_WINDOW) return json({ ok: false, error: "rate_limited" }, 429);

    let tripId: string | null = null;
    if (trip) {
      const { data } = await db.from("trips").select("id").eq("slug", trip.slug).maybeSingle();
      tripId = data?.id ?? null;
    }
    const { error } = await db.from("inquiries").insert({
      name: input.name, email: input.email, travelers: input.travelers,
      destination: destination ? destination.name.en : "", budget: input.budget,
      travel_period: input.travelPeriod, arrival_flight: input.arrivalFlight, message: input.message,
      trip_id: tripId, language: input.language, status: "new", ip_hash: ipHash,
    });
    if (error) {
      console.error("Could not save inquiry", error);
      return json({ ok: false, error: "server" }, 500);
    }
  } else {
    console.info("[inquiry not saved: Supabase is not configured]", { name: input.name, email: input.email });
  }

  const extra = {
    destinationName: destination ? pick(destination.name, "en") : "",
    tripTitle: trip ? pick(trip.title, input.language) : "",
    businessName: settings.business_name,
  };
  // The inquiry is already saved, so an email problem should not show the visitor an error.
  const results = await Promise.allSettled([
    sendOwnerNotification(input, { ...extra, tripTitle: trip ? trip.title.en : "" }),
    sendVisitorConfirmation(input, extra),
  ]);
  for (const r of results) if (r.status === "rejected") console.error("Inquiry email failed", r.reason);

  return json({ ok: true });
}
