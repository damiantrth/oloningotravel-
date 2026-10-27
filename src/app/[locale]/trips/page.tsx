import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getDestinations, getTrips } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { pick } from "@/lib/types";
import { toTripCard } from "@/lib/views";
import { TripSearch } from "@/components/TripSearch";

export const revalidate = 60;
type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "t" });
  return pageMetadata({ locale, href: "/trips", title: t("trips_title"), description: t("meta_trips_desc") });
}

export default async function TripsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("t");
  const [trips, destinations] = await Promise.all([getTrips(), getDestinations()]);
  const cards = trips.map((trip) => toTripCard(trip, locale, destinations, t));
  const chips = destinations
    .filter((d) => trips.some((trip) => trip.destinations.includes(d.slug)))
    .map((d) => ({ slug: d.slug, name: pick(d.name, locale) }));

  return (
    <section className="section">
      <div className="wrap">
        <div className="stack" style={{ marginBottom: 24 }}>
          <span className="eyebrow">{t("trips_eyebrow")}</span>
          <h1>{t("trips_title")}</h1>
          <p className="lead">{t("trips_intro")}</p>
        </div>
        <TripSearch trips={cards} destinations={chips} labels={{ from: t("from"), pp: t("pp"), photo: t("photo_soon") }} />
      </div>
    </section>
  );
}
