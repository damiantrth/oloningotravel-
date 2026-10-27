import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { locales, routing, type Locale } from "@/i18n/routing";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

type Href = Parameters<typeof getPathname>[0]["href"];

export function localizedUrl(locale: Locale, href: Href): string {
  return SITE_URL + getPathname({ locale, href });
}

/** Title, description, canonical URL and hreflang links for one page in one language. */
export function pageMetadata(opts: {
  locale: Locale;
  href: Href;
  title: string;
  description: string;
  image?: string | null;
  type?: "website" | "article";
}): Metadata {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = localizedUrl(l, opts.href);
  languages["x-default"] = localizedUrl(routing.defaultLocale, opts.href);
  const url = localizedUrl(opts.locale, opts.href);
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url, languages },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      type: opts.type ?? "website",
      locale: opts.locale === "de" ? "de_DE" : "en_GB",
      siteName: "Oloning’o Travel",
      ...(opts.image ? { images: [{ url: opts.image }] } : {}),
    },
  };
}
