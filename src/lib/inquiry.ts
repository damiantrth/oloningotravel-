import { z } from "zod";

/** Shared by the form (instant feedback) and the server (the check that counts). */
export const inquirySchema = z.object({
  name: z.string().trim().min(1, "e_name").max(120, "e_name"),
  email: z.string().trim().max(200, "e_email").pipe(z.email("e_email")),
  travelers: z.coerce.number().int("e_trav").min(1, "e_trav").max(100, "e_trav"),
  destination: z.string().trim().max(80).default(""),
  budget: z.string().trim().max(100).default(""),
  travelPeriod: z.string().trim().max(200).default(""),
  arrivalFlight: z.string().trim().max(100).default(""),
  message: z.string().trim().max(4000).default(""),
  trip: z.string().trim().max(120).default(""),
  language: z.enum(["en", "de"]).default("en"),
  consent: z.literal(true, { error: "e_consent" }),
  website: z.string().max(200).optional(), // honeypot: real visitors never fill this in
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export type InquiryResponse =
  | { ok: true }
  | { ok: false; error: "validation"; fields: Record<string, string> }
  | { ok: false; error: "rate_limited" | "server" };

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}
