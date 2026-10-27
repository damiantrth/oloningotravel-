import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getDestinations, getTrip, getTrips } from "@/lib/data";
import { activeOffer, formatDate, money, offerPrice } from "@/lib/format";
import { localizedUrl, pageMetadata } from "@/lib/seo";
import { pick } from "@/lib/types";
import { styleKey } from "@/lib/views";
import { Photo } from "@/components/Photo";
import { JsonLd } from "@/components/Sections";
import { WhatsAppButton, WhatsAppTrip } from "@/components/WhatsApp";

export const revalidate = 60;
type Props = { params: Promise<{ locale: Locale; slug: string }> };

export async function generateStaticParams() {
  const trips = await getTrips();
  return routing.locales.flatMap((locale) => trips.map((trip) => ({ locale, slug: trip.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const trip = await getTrip(slug);
  if (!trip) return {};
  return pageMetadata({
    locale, href: { pathname: "/trips/[slug]", params: { slug } },
    title: pick(trip.title, locale), description: pick(trip.summary, locale), image: trip.coverImage,
  });
}

export default async function TripPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const [trip, destinations] = await Promise.all([getTrip(slug), getDestinations()]);
  if (!trip) notFound();
  const t = await getTranslations("t");

  const title = pick(trip.title, locale);
  const offer = activeOffer(trip);
  const dests = trip.destinations.map((s) => destinations.find((d) => d.slug === s)).filter((d) => !!d);
  const first = dests[0];
  const last = dests[dests.length - 1];
  const included = trip.inclusions.filter((i) => i.type === "included");
  const excluded = trip.inclusions.filter((i) => i.type === "excluded");
  const gallery = trip.images.length
    ? trip.images.slice(0, 3).map((img) => ({ src: img.url, alt: pick(img.alt, locale) || title, placeholder: trip.placeholder }))
    : [
        { src: trip.coverImage, alt: title, placeholder: trip.placeholder },
        { src: first?.image ?? null, alt: first ? pick(first.name, locale) : title, placeholder: first?.placeholder ?? trip.placeholder },
        { src: last?.image ?? null, alt: last ? pick(last.name, locale) : title, placeholder: last?.placeholder ?? trip.placeholder },
      ];

  const structured = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: title,
    description: pick(trip.summary, locale),
    url: localizedUrl(locale, { pathname: "/trips/[slug]", params: { slug } }),
    touristType: t(styleKey(trip.style)),
    itinerary: {
      "@type": "ItemList",
      itemListElement: dests.map((d, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "TouristDestination", name: pick(d.name, locale) } })),
    },
    offers: { "@type": "Offer", price: offerPrice(trip, offer), priceCurrency: "EUR", availability: "https://schema.org/InStock" },
  };

  return (
    <section className="section">
      <WhatsAppTrip title={title} />
      <JsonLd data={structured} />
      <div className="wrap stack" style={{ gap: 28 }}>
        <Link className="link" href="/trips" style={{ alignSelf: "flex-start" }}>← {t("back")}</Link>
        <div className="detail-hero">
          <div className="stack" style={{ gap: 20, minWidth: 0 }}>
            <div className="stack">
              <span className="eyebrow">{trip.durationDays} {t("days")} · {t(styleKey(trip.style))}</span>
              <h1>{title}</h1>
              <p className="lead">{pick(trip.summary, locale)}</p>
            </div>
            <div className="gallery">
              {gallery.map((g, i) => (
                <Photo key={i} src={g.src} alt={g.alt} placeholder={g.placeholder} caption={t("photo_soon")} priority={i === 0}
                  sizes={i === 0 ? "(max-width: 900px) 66vw, 50vw" : "(max-width: 900px) 33vw, 25vw"} />
              ))}
            </div>
          </div>
          <aside className="aside">
            {offer && (
              <span className="badge badge-offer" style={{ position: "static", alignSelf: "flex-start" }}>
                {pick(offer.label, locale)} · {t("offer_until")} {formatDate(offer.endsOn, locale)}
              </span>
            )}
            <div className="price" style={{ border: 0, padding: 0 }}>
              <span className="from">{t("from")}</span>
              {offer && <s>{money(trip.priceFrom, locale)}</s>}
              <span className="amt" style={{ fontSize: "2rem" }}>{money(offerPrice(trip, offer), locale)}</span>
              <span className="from">{t("pp")}</span>
            </div>
            <dl className="facts">
              <dt>{t("duration")}</dt><dd>{trip.durationDays} {t("days")}</dd>
              <dt>{t("destinations")}</dt>
              <dd>
                {dests.map((d, i) => (
                  <span key={d.slug}>
                    {i > 0 && ", "}
                    <Link className="link" href={{ pathname: "/destinations/[slug]", params: { slug: d.slug } }}>{pick(d.name, locale)}</Link>
                  </span>
                ))}
              </dd>
              {pick(trip.season, locale) && (<><dt>{t("season")}</dt><dd>{pick(trip.season, locale)}</dd></>)}
            </dl>
            <Link className="btn btn-red" href={{ pathname: "/inquiry", query: { trip: trip.slug } }}>{t("ask_trip")}</Link>
            <WhatsAppButton label={t("ask_wa")} tripTitle={title} />
          </aside>
        </div>

        {trip.days.length > 0 && (
          <div className="stack" style={{ gap: 6, maxWidth: 760 }}>
            <h2>{t("itinerary")}</h2>
            {trip.days.map((d, i) => (
              <details className="day" key={`${d.dayNumber}-${i}`} open={i === 0}>
                <summary><span className="n">{t("day")} {d.dayLabel}</span><span className="tt">{pick(d.title, locale)}</span></summary>
                <p>{pick(d.description, locale)}</p>
              </details>
            ))}
          </div>
        )}

        {(included.length > 0 || excluded.length > 0) && (
          <div className="inc" style={{ maxWidth: 860 }}>
            <div><h3>{t("included")}</h3><ul>{included.map((x, i) => <li key={i}>{pick(x.text, locale)}</li>)}</ul></div>
            <div className="no"><h3>{t("excluded")}</h3><ul>{excluded.map((x, i) => <li key={i}>{pick(x.text, locale)}</li>)}</ul></div>
          </div>
        )}
      </div>
    </section>
  );
}
