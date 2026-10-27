import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("t");
  return (
    <section className="section">
      <div className="wrap stack nf" style={{ gap: 16 }}>
        <span className="eyebrow">404</span>
        <h1>{t("nf_title")}</h1>
        <p className="lead">{t("nf_body")}</p>
        <div className="btns" style={{ justifyContent: "center" }}>
          <Link className="btn btn-red" href="/trips">{t("all_trips")}</Link>
          <Link className="btn btn-line" href="/inquiry">{t("empty_btn")}</Link>
        </div>
      </div>
    </section>
  );
}
