import "server-only";
import { cache } from "react";
import { getPublicClient } from "./supabase";
import { sample } from "./sample-data";
import type {
  Destination, HeroSlide, L10n, LegalPage, Offer, Placeholder, Post, Review, Settings, Trip,
} from "./types";

/* Every function reads from Supabase when it is connected, otherwise from the built-in sample content. */

type Row = Record<string, any>;
const l = (row: Row, field: string): L10n => ({ en: row[`${field}_en`] ?? "", de: row[`${field}_de`] ?? "" });
const byPosition = <T extends { position: number }>(a: T, b: T) => a.position - b.position;

function mapDestination(r: Row): Destination {
  return {
    slug: r.slug, name: l(r, "name"), region: l(r, "region"), description: l(r, "description"),
    bestTime: l(r, "best_time"), keywords: r.keywords ?? "", group: r.group_key,
    latitude: r.latitude, longitude: r.longitude, image: r.image ?? null,
    placeholder: (r.placeholder ?? "savannah") as Placeholder, featured: !!r.featured, position: r.position ?? 0,
  };
}

function mapOffer(r: Row): Offer {
  return {
    label: l(r, "label"), startsOn: r.starts_on, endsOn: r.ends_on,
    priceOverride: r.price_override == null ? null : Number(r.price_override),
    percentOff: r.percent_off == null ? null : Number(r.percent_off),
  };
}

function mapTrip(r: Row): Trip {
  return {
    slug: r.slug, title: l(r, "title"), summary: l(r, "summary"), season: l(r, "season"),
    durationDays: r.duration_days, priceFrom: Number(r.price_from), style: r.style, status: r.status,
    coverImage: r.cover_image ?? null, placeholder: (r.placeholder ?? "savannah") as Placeholder,
    featured: !!r.featured, position: r.position ?? 0,
    destinations: [...(r.trip_destinations ?? [])]
      .sort((a: Row, b: Row) => a.position - b.position)
      .map((td: Row) => td.destinations?.slug)
      .filter(Boolean),
    days: [...(r.trip_days ?? [])]
      .sort((a: Row, b: Row) => a.day_number - b.day_number)
      .map((d: Row) => ({ dayNumber: d.day_number, dayLabel: d.day_label || String(d.day_number), title: l(d, "title"), description: l(d, "description") })),
    inclusions: [...(r.trip_inclusions ?? [])]
      .sort((a: Row, b: Row) => a.position - b.position)
      .map((i: Row) => ({ type: i.type, text: l(i, "text") })),
    images: [...(r.trip_images ?? [])]
      .sort((a: Row, b: Row) => a.position - b.position)
      .map((i: Row) => ({ url: i.url, alt: l(i, "alt") })),
    offers: (r.offers ?? []).map(mapOffer),
  };
}

const TRIP_SELECT =
  "*, trip_destinations(position, destinations(slug)), trip_days(*), trip_inclusions(*), trip_images(*), offers(*)";

export const getDestinations = cache(async (): Promise<Destination[]> => {
  const sb = getPublicClient();
  if (!sb) return [...sample.destinations].sort(byPosition);
  const { data, error } = await sb.from("destinations").select("*").order("position");
  if (error) throw error;
  return (data ?? []).map(mapDestination);
});

export const getDestination = cache(async (slug: string) =>
  (await getDestinations()).find((d) => d.slug === slug) ?? null);

export const getTrips = cache(async (): Promise<Trip[]> => {
  const sb = getPublicClient();
  if (!sb) return sample.trips.filter((t) => t.status === "published").sort(byPosition);
  const { data, error } = await sb.from("trips").select(TRIP_SELECT).eq("status", "published").order("position");
  if (error) throw error;
  return (data ?? []).map(mapTrip);
});

export const getTrip = cache(async (slug: string) => (await getTrips()).find((t) => t.slug === slug) ?? null);

export const getReviews = cache(async (): Promise<Review[]> => {
  const sb = getPublicClient();
  // Sample reviews only show while no database is connected, and are labelled as samples.
  if (!sb) return sample.reviews;
  const { data, error } = await sb
    .from("reviews").select("*, trips(slug)").eq("status", "approved").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((r: Row) => ({
    id: r.id, authorName: r.author_name, origin: l(r, "origin"), tripSlug: r.trips?.slug ?? null,
    text: l(r, "text"), rating: r.rating ?? 5, photo: r.photo ?? null, status: r.status,
  }));
});

function mapPost(r: Row): Post {
  return {
    slug: r.slug, title: l(r, "title"), excerpt: l(r, "excerpt"), body: l(r, "body"), category: l(r, "category"),
    coverImage: r.cover_image ?? null, placeholder: (r.placeholder ?? "savannah") as Placeholder,
    status: r.status, publishedAt: r.published_at, metaTitle: l(r, "meta_title"),
    metaDescription: l(r, "meta_description"),
    relatedTrips: (r.post_trips ?? []).map((pt: Row) => pt.trips?.slug).filter(Boolean),
  };
}

export const getPosts = cache(async (): Promise<Post[]> => {
  const sb = getPublicClient();
  if (!sb) {
    const now = Date.now();
    return sample.posts
      .filter((p) => p.status === "published" && new Date(p.publishedAt).getTime() <= now)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }
  const { data, error } = await sb
    .from("posts").select("*, post_trips(trips(slug))").eq("status", "published")
    .lte("published_at", new Date().toISOString()).order("published_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapPost);
});

export const getPost = cache(async (slug: string) => (await getPosts()).find((p) => p.slug === slug) ?? null);

export const getHeroSlides = cache(async (): Promise<HeroSlide[]> => {
  const sb = getPublicClient();
  let slides: HeroSlide[];
  if (!sb) slides = [...sample.heroSlides];
  else {
    const { data, error } = await sb.from("hero_slides").select("*, destinations(slug)").eq("active", true).order("position");
    if (error) throw error;
    slides = (data ?? []).map((r: Row) => ({
      position: r.position, isWelcome: !!r.is_welcome, eyebrow: l(r, "eyebrow"), title: l(r, "title"), text: l(r, "text"),
      linkLabel: l(r, "link_label"), destinationSlug: r.destinations?.slug ?? null, image: r.image ?? null,
      placeholder: (r.placeholder ?? "dawn") as Placeholder,
    }));
  }
  // The welcome slide always comes first, so the autoplay loop starts and ends on it.
  return slides.sort((a, b) => Number(b.isWelcome) - Number(a.isWelcome) || a.position - b.position);
});

export const getLegalPage = cache(async (slug: string): Promise<LegalPage | null> => {
  const sb = getPublicClient();
  if (!sb) return sample.legalPages.find((p) => p.slug === slug) ?? null;
  const { data, error } = await sb.from("legal_pages").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data ? { slug: data.slug, title: l(data, "title"), body: l(data, "body"), updatedAt: data.updated_at } : null;
});

export const getSettings = cache(async (): Promise<Settings> => {
  const sb = getPublicClient();
  if (!sb) return sample.settings;
  const { data, error } = await sb.from("settings").select("key, value");
  if (error) throw error;
  const fromDb = Object.fromEntries((data ?? []).map((r: Row) => [r.key, r.value ?? ""]));
  return { ...sample.settings, ...fromDb } as Settings;
});
