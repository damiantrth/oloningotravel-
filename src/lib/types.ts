import type { Locale } from "@/i18n/routing";

/** A text stored in both languages. A missing German text is "" and falls back to English. */
export type L10n = { en: string; de: string };

/** Names of the built-in placeholder artworks shown until real photos are uploaded. */
export type Placeholder =
  | "dawn" | "savannah" | "coast" | "mountain" | "lake" | "flamingo" | "north" | "city";

export type DestinationGroup = "safari" | "lakes" | "coast";
export type TripStyle = "safari" | "beach" | "combo";
export type ContentStatus = "draft" | "published";
export type ReviewStatus = "pending" | "approved" | "hidden" | "sample";
export type InquiryStatus = "new" | "in_progress" | "quoted" | "closed";

export type Destination = {
  slug: string;
  name: L10n;
  region: L10n;
  description: L10n;
  bestTime: L10n;
  keywords: string;
  group: DestinationGroup;
  latitude: number | null;
  longitude: number | null;
  image: string | null;
  placeholder: Placeholder;
  featured: boolean;
  position: number;
};

export type TripDay = { dayNumber: number; dayLabel: string; title: L10n; description: L10n };
export type TripInclusion = { type: "included" | "excluded"; text: L10n };
export type TripImage = { url: string; alt: L10n };
export type Offer = {
  label: L10n;
  startsOn: string; // YYYY-MM-DD
  endsOn: string; // YYYY-MM-DD
  priceOverride: number | null;
  percentOff: number | null;
};

export type Trip = {
  slug: string;
  title: L10n;
  summary: L10n;
  season: L10n;
  durationDays: number;
  priceFrom: number;
  style: TripStyle;
  status: ContentStatus;
  coverImage: string | null;
  placeholder: Placeholder;
  featured: boolean;
  position: number;
  destinations: string[]; // destination slugs, in route order
  days: TripDay[];
  inclusions: TripInclusion[];
  images: TripImage[];
  offers: Offer[];
};

export type Review = {
  id: string;
  authorName: string;
  origin: L10n;
  tripSlug: string | null;
  text: L10n;
  rating: number;
  photo: string | null;
  status: ReviewStatus;
};

export type Post = {
  slug: string;
  title: L10n;
  excerpt: L10n;
  body: L10n; // HTML from the rich-text editor
  category: L10n;
  coverImage: string | null;
  placeholder: Placeholder;
  status: ContentStatus;
  publishedAt: string; // ISO date
  metaTitle: L10n;
  metaDescription: L10n;
  relatedTrips: string[];
};

export type HeroSlide = {
  position: number;
  isWelcome: boolean;
  eyebrow: L10n;
  title: L10n;
  text: L10n;
  linkLabel: L10n;
  destinationSlug: string | null;
  image: string | null;
  placeholder: Placeholder;
};

export type LegalPage = { slug: string; title: L10n; body: L10n; updatedAt: string | null };

export type Settings = {
  business_name: string;
  contact_email: string;
  whatsapp_number: string; // digits only, with country code
  phone_kenya: string;
  phone_germany: string;
  office_kenya: string;
  office_germany: string;
  founder_name: string;
  founder_photo: string;
  cecilia_photo: string;
  instagram_url: string;
  facebook_url: string;
};

export type SampleData = {
  destinations: Destination[];
  trips: Trip[];
  reviews: Review[];
  posts: Post[];
  heroSlides: HeroSlide[];
  legalPages: LegalPage[];
  settings: Settings;
};

export function pick(text: L10n | null | undefined, locale: Locale): string {
  if (!text) return "";
  return (locale === "de" ? text.de : text.en) || text.en || text.de || "";
}
