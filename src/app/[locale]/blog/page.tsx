import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getPosts } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { pick } from "@/lib/types";
import { Photo } from "@/components/Photo";

export const revalidate = 60;
type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "t" });
  return pageMetadata({ locale, href: "/blog", title: t("nav_blog"), description: t("meta_blog_desc") });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("t");
  const posts = await getPosts();

  return (
    <section className="section">
      <div className="wrap">
        <div className="stack" style={{ marginBottom: 28 }}>
          <span className="eyebrow">{t("blog_eyebrow")}</span>
          <h1>{t("nav_blog")}</h1>
          <p className="lead">{t("blog_intro")}</p>
        </div>
        {posts.length ? (
          <div className="grid-3">
            {posts.map((p) => (
              <Link key={p.slug} className="card post" href={{ pathname: "/blog/[slug]", params: { slug: p.slug } }}>
                <Photo src={p.coverImage} alt={pick(p.title, locale)} placeholder={p.placeholder} />
                <div className="card-body">
                  {pick(p.category, locale) && <span className="cat">{pick(p.category, locale)}</span>}
                  <h3>{pick(p.title, locale)}</h3>
                  <p className="muted small">{pick(p.excerpt, locale)}</p>
                  <span className="meta" style={{ marginTop: "auto" }}>{formatDate(p.publishedAt, locale)}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty"><p className="muted">{t("blog_empty")}</p></div>
        )}
      </div>
    </section>
  );
}
