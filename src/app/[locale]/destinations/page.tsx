import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getDestinations } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { pick, type DestinationGroup } from "@/lib/types";
import { DestTile } from "@/components/Cards";
import { CtaBand } from "@/components/Sections";

export const revalidate = 60;
type Props = { params: Promise<{ locale: Locale }> };

const GROUPS: [DestinationGroup, string][] = [["safari", "g_safari"], ["lakes", "g_lakes"], ["coast", "g_coast"]];

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "t" });
  return pageMetadata({ locale, href: "/destinations", title: t("nav_dest"), description: t("meta_dest_desc") });
}

export default async function DestinationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("t");
  const destinations = await getDestinations();

  return (
    <>
      <section className="section">
        <div className="wrap">
          <div className="stack" style={{ marginBottom: 32 }}>
            <span className="eyebrow">{t("dest_eyebrow")}</span>
            <h1>{t("nav_dest")}</h1>
            <p className="lead">{t("dest_intro")}</p>
          </div>
          {GROUPS.map(([group, key]) => {
            const list = destinations.filter((d) => d.group === group);
            if (!list.length) return null;
            return (
              <div className="group" key={group}>
                <h2 style={{ fontSize: "1.4rem" }}>{t(key)}</h2>
                <div className="grid-4" style={{ ["--n" as string]: Math.min(list.length, 4) }}>
                  {list.map((d) => (
                    <DestTile key={d.slug} slug={d.slug} name={pick(d.name, locale)} region={pick(d.region, locale)} image={d.image} placeholder={d.placeholder} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
