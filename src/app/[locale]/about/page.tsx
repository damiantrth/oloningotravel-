import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getSettings } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { Photo } from "@/components/Photo";
import { Divider, MaaSpotlight } from "@/components/Cards";
import { CtaBand } from "@/components/Sections";

export const revalidate = 60;
type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "t" });
  return pageMetadata({ locale, href: "/about", title: t("nav_about"), description: t("meta_about_desc") });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("t");
  const settings = await getSettings();

  return (
    <>
      {/* Opening */}
      <section className="section">
        <div className="wrap">
          <div className="stack" style={{ gap: 18, maxWidth: 860 }}>
            <span className="eyebrow">{t("about_eyebrow")}</span>
            <h1>{t("story_title")}</h1>
            <p className="lead" style={{ color: "var(--ink)" }}>{t("story_1")}</p>
          </div>
        </div>
      </section>

      <Divider />

      {/* Siimoi */}
      <section className="section">
        <div className="wrap founder">
          <Photo src={settings.founder_photo || null} alt="Siimoi" placeholder="dawn" caption={t("photo_soon")} sizes="(max-width: 860px) 100vw, 40vw" />
          <div className="stack" style={{ gap: 16, minWidth: 0 }}>
            <div>
              <h2>Siimoi</h2>
              <span className="muted small">{t("siimoi_role")}</span>
            </div>
            <p className="lead" style={{ color: "var(--ink)" }}>{t("story_2")}</p>
            <p className="pull">{t("story_3")}</p>
          </div>
        </div>
      </section>

      {/* Cecilia */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap founder rev">
          <Photo src={settings.cecilia_photo || null} alt="Cecilia" placeholder="savannah" caption={t("photo_soon")} sizes="(max-width: 860px) 100vw, 40vw" />
          <div className="stack" style={{ gap: 16, minWidth: 0 }}>
            <div>
              <h2>Cecilia</h2>
              <span className="muted small">{t("cecilia_role")}</span>
            </div>
            <p className="lead" style={{ color: "var(--ink)" }}>{t("story_4")}</p>
            <p className="lead">{t("story_5")}</p>
          </div>
        </div>
      </section>

      {/* Where their journeys meet */}
      <section className="sisters">
        <div className="wrap">
          <div className="sisters-inner">
            <span className="eyebrow">{t("meet_eyebrow")}</span>
            <p className="lead">{t("story_6")}</p>
            <p className="slogan">{t("story_meet")}</p>
            <p className="lead" style={{ color: "var(--ink)" }}>{t("story_7")}</p>
            <div className="duo">
              <div className="review"><h3>{t("brings_s_t")}</h3><p className="muted">{t("brings_s")}</p></div>
              <div className="review"><h3>{t("brings_c_t")}</h3><p className="muted">{t("brings_c")}</p></div>
            </div>
            <p className="lead">{t("story_8")}</p>
          </div>
        </div>
      </section>

      <MaaSpotlight eyebrow={t("maa_eyebrow")} term="Mara" meaning={t("w2_mean")} body={t("w2_body")} />

      {/* More than a name */}
      <section className="section">
        <div className="wrap">
          <div className="stack" style={{ gap: 18, maxWidth: 860 }}>
            <span className="eyebrow">{t("name_eyebrow")}</span>
            <p className="lead" style={{ color: "var(--ink)" }}>{t("story_9")}</p>
            <p className="closing">{t("story_closing")}</p>
          </div>
        </div>
      </section>

      <Divider />
      <section className="section">
        <div className="wrap">
          <h2 style={{ marginBottom: 24 }}>{t("values_t")}</h2>
          <div className="grid-3">
            {[1, 2, 3].map((i) => (
              <div className="review" key={i}>
                <h3>{t(`v${i}t`)}</h3>
                <p className="muted">{t(`v${i}b`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
