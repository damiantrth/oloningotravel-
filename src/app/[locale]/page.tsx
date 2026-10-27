import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getDestinations, getHeroSlides, getReviews, getTrips } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { pick } from "@/lib/types";
import { toReviewView, toTripCard } from "@/lib/views";
import { HeroCarousel, type HeroSlideView } from "@/components/HeroCarousel";
import { DestTile, Divider, MaaSpotlight, ReviewCard, TripCard } from "@/components/Cards";
import { CtaBand } from "@/components/Sections";

export const revalidate = 60;

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "t" });
  return { ...pageMetadata({ locale, href: "/", title: t("meta_home_title"), description: t("meta_home_desc") }), title: { absolute: t("meta_home_title") } };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("t");
  const [slides, trips, destinations, reviews] = await Promise.all([getHeroSlides(), getTrips(), getDestinations(), getReviews()]);

  const heroSlides: HeroSlideView[] = slides.map((s) => ({
    isWelcome: s.isWelcome, eyebrow: pick(s.eyebrow, locale), title: pick(s.title, locale), text: pick(s.text, locale),
    linkLabel: pick(s.linkLabel, locale), destinationSlug: s.destinationSlug, image: s.image, placeholder: s.placeholder,
  }));
  const featured = (trips.filter((x) => x.featured).length ? trips.filter((x) => x.featured) : trips).slice(0, 3);
  const featuredDest = destinations.filter((d) => d.featured).slice(0, 4);
  const labels = { from: t("from"), pp: t("pp"), photo: t("photo_soon") };
  const reviewViews = reviews.slice(0, 3).map((r) => toReviewView(r, locale, trips));

  return (
    <>
      <HeroCarousel slides={heroSlides} />

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="stack"><span className="eyebrow">{t("trips_eyebrow")}</span><h2>{t("featured")}</h2></div>
            <Link className="link" href="/trips">{t("all_trips")} →</Link>
          </div>
          <div className="grid-3">
            {featured.map((trip) => <TripCard key={trip.slug} trip={toTripCard(trip, locale, destinations, t)} labels={labels} />)}
          </div>
        </div>
      </section>

      <Divider />
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="stack"><span className="eyebrow">{t("steps_eyebrow")}</span><h2>{t("steps_title")}</h2></div>
            <Link className="link" href="/how-it-works">{t("nav_how")} →</Link>
          </div>
          <div className="steps" style={{ ["--n" as string]: 3 }}>
            {[1, 2, 3].map((i) => (
              <div className="step" key={i}><h3>{t(`s${i}t`)}</h3><p className="muted">{t(`s${i}b`)}</p></div>
            ))}
          </div>
        </div>
      </section>

      <MaaSpotlight eyebrow={t("maa_eyebrow")} term="Oloning’o" meaning={t("w1_mean")} body={t("w1_body")} tagline={t("slogan")} storyLink={t("read_story")} />

      {featuredDest.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div className="stack"><span className="eyebrow">{t("dest_eyebrow")}</span><h2>{t("dest_title")}</h2></div>
              <Link className="link" href="/destinations">{t("all_dest")} →</Link>
            </div>
            <div className="grid-4" style={{ ["--n" as string]: featuredDest.length }}>
              {featuredDest.map((d) => (
                <DestTile key={d.slug} slug={d.slug} name={pick(d.name, locale)} region={pick(d.region, locale)} image={d.image} placeholder={d.placeholder} />
              ))}
            </div>
          </div>
        </section>
      )}

      {reviewViews.length > 0 && (
        <>
          <Divider />
          <section className="section">
            <div className="wrap">
              <div className="section-head">
                <div className="stack"><span className="eyebrow">{t("rev_eyebrow")}</span><h2>{t("rev_title")}</h2></div>
                <Link className="link" href="/reviews">{t("all_reviews")} →</Link>
              </div>
              <div className="grid-3">
                {reviewViews.map((r) => <ReviewCard key={r.id} review={r} starsLabel={t("stars", { n: r.rating })} sampleLabel={t("sample")} />)}
              </div>
            </div>
          </section>
        </>
      )}

      <CtaBand />
    </>
  );
}
