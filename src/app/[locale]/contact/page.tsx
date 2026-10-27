import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getSettings } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { Photo } from "@/components/Photo";
import { WhatsAppButton } from "@/components/WhatsApp";

export const revalidate = 60;
type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "t" });
  return pageMetadata({ locale, href: "/contact", title: t("contact_title"), description: t("meta_contact_desc") });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("t");
  const s = await getSettings();
  const rows: [string, string, string?][] = [
    [t("c_email"), s.contact_email, `mailto:${s.contact_email}`],
    [t("c_wa"), s.whatsapp_number ? `+${s.whatsapp_number.replace(/\D/g, "")}` : ""],
    [t("c_ke"), s.phone_kenya, `tel:${s.phone_kenya.replace(/[^\d+]/g, "")}`],
    [t("c_de"), s.phone_germany, `tel:${s.phone_germany.replace(/[^\d+]/g, "")}`],
    [t("c_off_ke"), s.office_kenya],
    [t("c_off_de"), s.office_germany],
  ];

  return (
    <section className="section">
      <div className="wrap two" style={{ alignItems: "start" }}>
        <div className="stack" style={{ gap: 20, minWidth: 0 }}>
          <span className="eyebrow">{t("contact_eyebrow")}</span>
          <h1>{t("contact_title")}</h1>
          <p className="lead">{t("contact_intro")}</p>
          <div className="panel contact-list">
            {rows.filter(([, v]) => v).map(([label, value, href]) => (
              <div key={label}>
                <b>{label}</b>
                {href ? <a className="link" href={href}>{value}</a> : <span>{value}</span>}
              </div>
            ))}
          </div>
          <div className="btns">
            <Link className="btn btn-red" href="/inquiry">{t("cta_btn")}</Link>
            <WhatsAppButton label="WhatsApp" />
          </div>
        </div>
        <Photo alt="Oloning’o Mara Camp" placeholder="savannah" caption={t("photo_soon")} sizes="(max-width: 900px) 100vw, 40vw" />
      </div>
    </section>
  );
}
