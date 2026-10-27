import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getDestination, getDestinations, getTrips } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { pick } from "@/lib/types";
import { toTripCard } from "@/lib/views";
import { Photo } from "@/components/Photo";
import { TripCard } from "@/components/Cards";

export const revalidate = 60;
type Props = { params: Promise<{ locale: Locale; slug: string }> };

export async function generateStaticParams() {
  const destinations = await getDestinations();
  return routing.locales.flatMap((locale) => destinations.map((d) => ({ locale, slug: d.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const d = await getDestination(slug);
  if (!d) return {};
  return pageMetadata({
    locale, href: { pathname: "/destinations/[slug]", params: { slug } },
    title: pick(d.name, locale), description: pick(d.description, locale).slice(0, 160), image: d.image,
  });
}

export default async function DestinationPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const [d, trips, destinations] = await Promise.all([getDestination(slug), getTrips(), getDestinations()]);
  if (!d) notFound();
  const t = await getTranslations("t");
  const name = pick(d.name, locale);
  const related = trips.filter((trip) => trip.destinations.includes(slug));

  return (
    <section className="section">
      <div className="wrap stack" style={{ gap: 28 }}>
        <Link className="link" href="/destinations" style={{ alignSelf: "flex-start" }}>← {t("back_dest")}</Link>
        <div className="detail-hero">
          <div className="stack" style={{ minWidth: 0 }}>
            <span className="eyebrow">{pick(d.region, locale)}</span>
            <h1>{name}</h1>
            <p className="lead" style={{ color: "var(--ink)" }}>{pick(d.description, locale)}</p>
            {pick(d.bestTime, locale) && (
              <dl className="facts" style={{ marginTop: 8 }}>
                <dt>{t("best_time")}</dt><dd>{pick(d.bestTime, locale)}</dd>
              </dl>
            )}
          </div>
          <Photo src={d.image} alt={name} placeholder={d.placeholder} caption={t("photo_soon")} priority sizes="(max-width: 900px) 100vw, 40vw" />
        </div>
        <div>
          <h2 style={{ marginBottom: 18 }}>{t("trips_with", { x: name })}</h2>
          {related.length ? (
            <div className="grid-3">
              {related.map((trip) => (
                <TripCard key={trip.slug} trip={toTripCard(trip, locale, destinations, t)} labels={{ from: t("from"), pp: t("pp"), photo: t("photo_soon") }} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <p>{t("no_trips_with", { x: name })}</p>
              <Link className="btn btn-red" href="/inquiry">{t("cta_btn")}</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
