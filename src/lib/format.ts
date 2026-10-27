import type { Locale } from "@/i18n/routing";
import type { Offer, Trip } from "./types";

/** "€1,490" in English, "1.490 €" in German. */
export function money(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "de" ? "de-DE" : "en-IE", {
    style: "currency", currency: "EUR", maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(iso: string, locale: Locale): string {
  const date = iso.length === 10 ? new Date(`${iso}T12:00:00Z`) : new Date(iso);
  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Berlin",
  }).format(date);
}

/** Today's date (YYYY-MM-DD) in Kenya, used to decide which offers are running. */
function today(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Nairobi" }).format(new Date());
}

export function activeOffer(trip: Trip, on: string = today()): Offer | null {
  return trip.offers.find((o) => o.startsOn <= on && on <= o.endsOn) ?? null;
}

export function offerPrice(trip: Trip, offer: Offer | null): number {
  if (!offer) return trip.priceFrom;
  if (offer.priceOverride != null) return offer.priceOverride;
  if (offer.percentOff != null) return Math.round((trip.priceFrom * (1 - offer.percentOff / 100)) / 10) * 10;
  return trip.priceFrom;
}

export function whatsappLink(number: string, message: string): string {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
