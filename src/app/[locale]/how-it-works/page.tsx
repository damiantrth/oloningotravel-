import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/Sections";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "t" });
  return pageMetadata({ locale, href: "/how-it-works", title: t("how_title"), description: t("meta_how_desc") });
}

export default async function HowItWorksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("t");
  return (
    <>
      <section className="section">
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack">
            <span className="eyebrow">{t("nav_how")}</span>
            <h1>{t("how_title")}</h1>
            <p className="lead">{t("how_intro")}</p>
          </div>
          <div className="steps four" style={{ ["--n" as string]: 4 }}>
            {[1, 2, 3, 4].map((i) => (
              <div className="step" key={i}><h3>{t(`h${i}t`)}</h3><p className="muted">{t(`h${i}b`)}</p></div>
            ))}
          </div>
          <div className="info">
            <div className="ico"><svg aria-hidden="true"><use href="#plane" /></svg></div>
            <div className="stack" style={{ gap: 8, minWidth: 0 }}>
              <span className="tag">{t("pickup_tag")}</span>
              <h2 style={{ fontSize: "1.5rem" }}>{t("pickup_t")}</h2>
              <p className="muted" style={{ maxWidth: "68ch" }}>{t("pickup_b")}</p>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
