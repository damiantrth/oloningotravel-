import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getReviews, getTrips } from "@/lib/data";
import { localizedUrl, pageMetadata } from "@/lib/seo";
import { toReviewView } from "@/lib/views";
import { ReviewCard } from "@/components/Cards";
import { CtaBand, JsonLd } from "@/components/Sections";

export const revalidate = 60;
type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "t" });
  return pageMetadata({ locale, href: "/reviews", title: t("reviews_title"), description: t("meta_rev_desc") });
}

export default async function ReviewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("t");
  const [reviews, trips] = await Promise.all([getReviews(), getTrips()]);
  const views = reviews.map((r) => toReviewView(r, locale, trips));
  const real = views.filter((r) => !r.sample);

  // Review markup only for genuine, approved reviews, never for samples.
  const structured = real.length
    ? {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        name: "Oloning’o Travel",
        url: localizedUrl(locale, "/"),
        review: real.map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.author },
          reviewBody: r.text,
          reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
        })),
      }
    : null;

  return (
    <>
      {structured && <JsonLd data={structured} />}
      <section className="section">
        <div className="wrap">
          <div className="stack" style={{ marginBottom: 28 }}>
            <span className="eyebrow">{t("rev_eyebrow")}</span>
            <h1>{t("reviews_title")}</h1>
            <p className="lead">{t("reviews_intro")}</p>
          </div>
          {views.length ? (
            <div className="masonry">
              {views.map((r) => <ReviewCard key={r.id} review={r} starsLabel={t("stars", { n: r.rating })} sampleLabel={t("sample")} />)}
            </div>
          ) : (
            <div className="empty"><p className="muted">{t("reviews_empty")}</p></div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
