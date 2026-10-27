import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Settings } from "@/lib/types";
import { Divider } from "./Cards";
import { WhatsAppButton } from "./WhatsApp";

export async function CtaBand() {
  const t = await getTranslations("t");
  return (
    <>
      <Divider />
      <section className="section">
        <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
          <div className="stack" style={{ maxWidth: 600 }}>
            <h2>{t("cta_title")}</h2>
            <p className="lead">{t("cta_body")}</p>
          </div>
          <div className="btns">
            <Link className="btn btn-red" href="/inquiry">{t("cta_btn")}</Link>
            <WhatsAppButton label={t("cta_wa")} />
          </div>
        </div>
      </section>
    </>
  );
}

export async function Footer({ settings }: { settings: Settings }) {
  const t = await getTranslations("t");
  const year = new Date().getFullYear();
  return (
    <footer className="site">
      <div className="top">
        <div className="wrap">
          <div className="stack">
            <b style={{ fontFamily: "var(--f-display)", fontSize: "1.3rem" }}>{settings.business_name}</b>
            <p className="foot-slogan">{t("slogan")}</p>
            <p className="muted small" style={{ maxWidth: "40ch" }}>{t("foot_about")} {t("foot_sister")}</p>
          </div>
          <div>
            <h4>{t("foot_explore")}</h4>
            <ul>
              <li><Link className="link" href="/trips">{t("nav_trips")}</Link></li>
              <li><Link className="link" href="/destinations">{t("nav_dest")}</Link></li>
              <li><Link className="link" href="/reviews">{t("nav_reviews")}</Link></li>
              <li><Link className="link" href="/blog">{t("nav_blog")}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t("foot_help")}</h4>
            <ul>
              <li><Link className="link" href="/how-it-works">{t("nav_how")}</Link></li>
              <li><Link className="link" href="/inquiry">{t("nav_inquiry")}</Link></li>
              <li><Link className="link" href="/about">{t("nav_about")}</Link></li>
              <li><Link className="link" href="/contact">{t("nav_contact")}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t("foot_legal")}</h4>
            <ul>
              <li><Link className="link" href={{ pathname: "/legal/[doc]", params: { doc: "impressum" } }}>{t("impressum")}</Link></li>
              <li><Link className="link" href={{ pathname: "/legal/[doc]", params: { doc: "privacy" } }}>{t("privacy")}</Link></li>
              <li><Link className="link" href={{ pathname: "/legal/[doc]", params: { doc: "terms" } }}>{t("terms")}</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <Divider />
      <div className="base">
        <div className="wrap">
          <span>© {year} {settings.business_name}</span>
          <span>{settings.contact_email}</span>
        </div>
      </div>
    </footer>
  );
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
