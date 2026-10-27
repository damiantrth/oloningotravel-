import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getLegalPage } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { pick } from "@/lib/types";

export const revalidate = 60;
const DOCS = ["impressum", "privacy", "terms"] as const;
type Props = { params: Promise<{ locale: Locale; doc: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => DOCS.map((doc) => ({ locale, doc })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, doc } = await params;
  const page = await getLegalPage(doc);
  if (!page) return {};
  const title = pick(page.title, locale);
  return pageMetadata({ locale, href: { pathname: "/legal/[doc]", params: { doc } }, title, description: title });
}

export default async function LegalPage({ params }: Props) {
  const { locale, doc } = await params;
  setRequestLocale(locale);
  if (!(DOCS as readonly string[]).includes(doc)) notFound();
  const page = await getLegalPage(doc);
  if (!page) notFound();
  const t = await getTranslations("t");
  const body = pick(page.body, locale);

  return (
    <section className="section">
      <div className="wrap">
        <div className="stack" style={{ gap: 20, maxWidth: 820 }}>
          <span className="eyebrow">{t("foot_legal")}</span>
          <h1>{pick(page.title, locale)}</h1>
          {page.updatedAt && body && <p className="muted small">{t("legal_updated", { date: formatDate(page.updatedAt, locale) })}</p>}
          {body ? (
            <div className="prose" dangerouslySetInnerHTML={{ __html: sanitizeHtml(body) }} />
          ) : (
            <div className="panel"><p className="muted">{t("legal_ph")}</p></div>
          )}
        </div>
      </div>
    </section>
  );
}
