import { defineRouting } from "next-intl/routing";

export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];

// Internal paths (folder names) on the left, public URLs per language on the right.
export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/trips": { en: "/trips", de: "/reisen" },
    "/trips/[slug]": { en: "/trips/[slug]", de: "/reisen/[slug]" },
    "/destinations": { en: "/destinations", de: "/reiseziele" },
    "/destinations/[slug]": { en: "/destinations/[slug]", de: "/reiseziele/[slug]" },
    "/how-it-works": { en: "/how-it-works", de: "/so-funktionierts" },
    "/inquiry": { en: "/inquiry", de: "/anfrage" },
    "/reviews": { en: "/reviews", de: "/bewertungen" },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/about": { en: "/about", de: "/ueber-uns" },
    "/contact": { en: "/contact", de: "/kontakt" },
    "/legal/[doc]": { en: "/legal/[doc]", de: "/rechtliches/[doc]" },
  },
});

export type AppPathname = keyof typeof routing.pathnames;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
