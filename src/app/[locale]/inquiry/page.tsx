import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getDestinations, getSettings, getTrip } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { pick } from "@/lib/types";
import { InquiryForm } from "@/components/InquiryForm";
import { WhatsAppButton } from "@/components/WhatsApp";

type Props = { params: Promise<{ locale: Locale }>; searchParams: Promise<{ trip?: string }> };

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "t" });
  return pageMetadata({ locale, href: "/inquiry", title: t("inq_title"), description: t("meta_inq_desc") });
}

export default async function InquiryPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { trip: tripSlug } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("t");
  const [destinations, settings, trip] = await Promise.all([
    getDestinations(), getSettings(), tripSlug ? getTrip(tripSlug) : Promise.resolve(null),
  ]);
  const tripTitle = trip ? pick(trip.title, locale) : null;

  return (
    <section className="section">
      <div className="wrap two">
        <div className="stack" style={{ gap: 20, minWidth: 0 }}>
          <div className="stack">
            <span className="eyebrow">{t("inq_eyebrow")}</span>
            <h1>{t("inq_title")}</h1>
            <p className="lead">{t("inq_intro")}</p>
          </div>
          <InquiryForm
            destinations={destinations.map((d) => ({ slug: d.slug, name: pick(d.name, locale) }))}
            trip={trip && tripTitle ? { slug: trip.slug, title: tripTitle } : null}
            preselectDestination={trip?.destinations[0] ?? ""}
          />
        </div>
        <aside className="stack" style={{ gap: 16, minWidth: 0 }}>
          <div className="panel stack">
            <h2 style={{ fontSize: "1.2rem" }}>{t("talk")}</h2>
            <p className="muted">{t("talk_b")}</p>
            <WhatsAppButton label="WhatsApp" tripTitle={tripTitle} />
            <div className="contact-list" style={{ marginTop: 6 }}>
              <div><b>{t("c_email")}</b><a className="link" href={`mailto:${settings.contact_email}`}>{settings.contact_email}</a></div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
