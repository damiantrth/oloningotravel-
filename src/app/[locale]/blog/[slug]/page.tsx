import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getDestinations, getPost, getPosts, getTrips } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { localizedUrl, pageMetadata } from "@/lib/seo";
import { pick } from "@/lib/types";
import { toTripCard } from "@/lib/views";
import { Photo } from "@/components/Photo";
import { TripCard } from "@/components/Cards";
import { CtaBand, JsonLd } from "@/components/Sections";

export const revalidate = 60;
type Props = { params: Promise<{ locale: Locale; slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return routing.locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return pageMetadata({
    locale, href: { pathname: "/blog/[slug]", params: { slug } }, type: "article", image: post.coverImage,
    title: pick(post.metaTitle, locale) || pick(post.title, locale),
    description: pick(post.metaDescription, locale) || pick(post.excerpt, locale),
  });
}

// Article HTML comes from the admin's rich-text editor; only safe formatting tags are kept.
function clean(html: string) {
  return sanitizeHtml(html, {
    allowedTags: ["p", "h2", "h3", "h4", "ul", "ol", "li", "strong", "em", "b", "i", "a", "blockquote", "img", "figure", "figcaption", "br", "hr"],
    allowedAttributes: { a: ["href", "title", "target", "rel"], img: ["src", "alt", "width", "height", "loading"] },
    allowedSchemes: ["https", "mailto"],
    transformTags: { a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }) },
  });
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const [post, trips, destinations] = await Promise.all([getPost(slug), getTrips(), getDestinations()]);
  if (!post) notFound();
  const t = await getTranslations("t");
  const title = pick(post.title, locale);
  const related = post.relatedTrips.map((s) => trips.find((trip) => trip.slug === s)).filter((x) => !!x);

  const structured = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: pick(post.excerpt, locale),
    datePublished: post.publishedAt,
    inLanguage: locale,
    url: localizedUrl(locale, { pathname: "/blog/[slug]", params: { slug } }),
    publisher: { "@type": "Organization", name: "Oloning’o Travel" },
    ...(post.coverImage ? { image: post.coverImage } : {}),
  };

  return (
    <>
      <JsonLd data={structured} />
      <article className="section">
        <div className="wrap stack" style={{ gap: 28 }}>
          <Link className="link" href="/blog" style={{ alignSelf: "flex-start" }}>← {t("back_blog")}</Link>
          <header className="stack" style={{ maxWidth: 820 }}>
            {pick(post.category, locale) && <span className="cat">{pick(post.category, locale)}</span>}
            <h1>{title}</h1>
            <p className="lead">{pick(post.excerpt, locale)}</p>
            <span className="muted small">{formatDate(post.publishedAt, locale)}</span>
          </header>
          <div className="post-hero">
            <Photo src={post.coverImage} alt={title} placeholder={post.placeholder} priority sizes="(max-width: 1200px) 100vw, 1150px" />
          </div>
          <div className="prose" dangerouslySetInnerHTML={{ __html: clean(pick(post.body, locale)) }} />
          {related.length > 0 && (
            <div className="stack" style={{ gap: 18, marginTop: 20 }}>
              <h2>{t("blog_related")}</h2>
              <div className="grid-3">
                {related.map((trip) => (
                  <TripCard key={trip.slug} trip={toTripCard(trip, locale, destinations, t)} labels={{ from: t("from"), pp: t("pp"), photo: t("photo_soon") }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
      <CtaBand />
    </>
  );
}
