import type { Locale } from "@/i18n/routing";
import { activeOffer, money, offerPrice } from "./format";
import { pick, type Destination, type Review, type Trip, type TripStyle } from "./types";

/** Plain, already-translated data for a trip card. Safe to pass to client components. */
export type TripCardData = {
  slug: string;
  title: string;
  meta: string; // "4 days · Safari"
  destNames: string[];
  destSlugs: string[];
  style: TripStyle;
  days: number;
  price: string;
  oldPrice: string | null;
  offerLabel: string | null;
  image: string | null;
  placeholder: Trip["placeholder"];
  haystack: string; // lower-case search text in both languages
};

export function styleKey(style: TripStyle) {
  return style === "safari" ? "st_safari" : style === "beach" ? "st_beach" : "st_combo";
}

export function toTripCard(
  trip: Trip, locale: Locale, destinations: Destination[], t: (key: string) => string,
): TripCardData {
  const dests = trip.destinations.map((slug) => destinations.find((d) => d.slug === slug)).filter(Boolean) as Destination[];
  const offer = activeOffer(trip);
  const haystack = [
    trip.title.en, trip.title.de, trip.summary.en, trip.summary.de, trip.style,
    trip.style === "combo" ? "safari beach strand" : trip.style === "beach" ? "strand" : "",
    ...dests.flatMap((d) => [d.name.en, d.name.de, d.region.en, d.region.de, d.keywords]),
  ].join(" ").toLowerCase();
  return {
    slug: trip.slug,
    title: pick(trip.title, locale),
    meta: `${trip.durationDays} ${t("days")} · ${t(styleKey(trip.style))}`,
    destNames: dests.map((d) => pick(d.name, locale)),
    destSlugs: dests.map((d) => d.slug),
    style: trip.style,
    days: trip.durationDays,
    price: money(offerPrice(trip, offer), locale),
    oldPrice: offer ? money(trip.priceFrom, locale) : null,
    offerLabel: offer ? pick(offer.label, locale) : null,
    image: trip.coverImage,
    placeholder: trip.placeholder,
    haystack,
  };
}

export type ReviewView = {
  id: string; author: string; origin: string; tripTitle: string | null; text: string; rating: number; sample: boolean;
};

export function toReviewView(r: Review, locale: Locale, trips: Trip[]): ReviewView {
  const trip = r.tripSlug ? trips.find((t) => t.slug === r.tripSlug) : null;
  return {
    id: r.id, author: r.authorName, origin: pick(r.origin, locale), tripTitle: trip ? pick(trip.title, locale) : null,
    text: pick(r.text, locale), rating: r.rating, sample: r.status === "sample",
  };
}
