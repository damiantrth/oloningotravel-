import "@fontsource-variable/fraunces";
import "@fontsource-variable/instrument-sans";
import "../globals.css";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { isLocale, routing } from "@/i18n/routing";
import { getSettings } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer, JsonLd } from "@/components/Sections";
import { Sprite } from "@/components/Sprite";
import { WhatsAppFloat, WhatsAppProvider } from "@/components/WhatsApp";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1F2B" },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "t" });
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("meta_home_title"), template: "%s · Oloning’o Travel" },
    description: t("meta_home_desc"),
  };
}

// Applies the saved light/dark choice before the page paints, so there is no flash.
const themeScript = `(function(){try{var t=localStorage.getItem("olo-theme");document.documentElement.setAttribute("data-theme",t==="dark"?"dark":"light")}catch(e){}})();`;

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const [messages, settings] = await Promise.all([getMessages(), getSettings()]);

  const organization = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: settings.business_name,
    url: SITE_URL,
    email: settings.contact_email,
    telephone: settings.phone_kenya,
    areaServed: "Kenya",
    sameAs: [settings.instagram_url, settings.facebook_url].filter(Boolean),
  };

  return (
    <html lang={locale} data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Sprite />
        <NextIntlClientProvider messages={messages}>
          <WhatsAppProvider number={settings.whatsapp_number}>
            <Header email={settings.contact_email} phone={settings.phone_kenya} />
            <main id="main" tabIndex={-1}>{children}</main>
            <Footer settings={settings} />
            <WhatsAppFloat />
          </WhatsAppProvider>
        </NextIntlClientProvider>
        <JsonLd data={organization} />
      </body>
    </html>
  );
}
