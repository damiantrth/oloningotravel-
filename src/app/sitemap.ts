import type { MetadataRoute } from "next";
import { locales, type AppPathname } from "@/i18n/routing";
import { getDestinations, getPosts, getTrips } from "@/lib/data";
import { localizedUrl } from "@/lib/seo";

export const revalidate = 3600;

type Href = Parameters<typeof localizedUrl>[1];

function entry(href: Href, lastModified?: string): MetadataRoute.Sitemap[number] {
  const languages = Object.fromEntries(locales.map((l) => [l, localizedUrl(l, href)]));
  return { url: localizedUrl("de", href), lastModified, alternates: { languages } };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [trips, destinations, posts] = await Promise.all([getTrips(), getDestinations(), getPosts()]);
  const staticPages: AppPathname[] = ["/", "/trips", "/destinations", "/how-it-works", "/inquiry", "/reviews", "/blog", "/about", "/contact"];
  return [
    ...staticPages.map((p) => entry(p as Href)),
    ...trips.map((trip) => entry({ pathname: "/trips/[slug]", params: { slug: trip.slug } })),
    ...destinations.map((d) => entry({ pathname: "/destinations/[slug]", params: { slug: d.slug } })),
    ...posts.map((p) => entry({ pathname: "/blog/[slug]", params: { slug: p.slug } }, p.publishedAt)),
    ...(["impressum", "privacy", "terms"] as const).map((doc) => entry({ pathname: "/legal/[doc]", params: { doc } })),
  ];
}
