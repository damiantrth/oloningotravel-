"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { AppPathname, Locale } from "@/i18n/routing";

const NAV: { href: AppPathname; key: string }[] = [
  { href: "/", key: "nav_home" },
  { href: "/trips", key: "nav_trips" },
  { href: "/destinations", key: "nav_dest" },
  { href: "/how-it-works", key: "nav_how" },
  { href: "/about", key: "nav_about" },
];

type Theme = "light" | "dark";

function Toggles() {
  const t = useTranslations("t");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
  }, []);

  function switchLocale(next: Locale) {
    if (next === locale) return;
    const { locale: _ignored, ...rest } = params as Record<string, string>;
    // usePathname gives the internal path (e.g. "/trips/[slug]"); the router fills in the localized URL.
    router.replace({ pathname, params: rest } as never, { locale: next, scroll: false });
  }

  function switchTheme(next: Theme) {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      root.classList.add("theme-anim");
      window.setTimeout(() => root.classList.remove("theme-anim"), 450);
    }
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("olo-theme", next); } catch {}
    setTheme(next);
  }

  return (
    <div className="toggles">
      <div className="seg" role="group" aria-label={t("lang_group")}>
        {(["en", "de"] as const).map((l) => (
          <button key={l} type="button" lang={l} aria-pressed={locale === l} onClick={() => switchLocale(l)}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="seg" role="group" aria-label={t("theme_group")}>
        <button type="button" aria-pressed={theme === "light"} aria-label={t("light")} onClick={() => switchTheme("light")}>
          <svg aria-hidden="true"><use href="#sun" /></svg><span className="lbl">{t("light")}</span>
        </button>
        <button type="button" aria-pressed={theme === "dark"} aria-label={t("dark")} onClick={() => switchTheme("dark")}>
          <svg aria-hidden="true"><use href="#moon" /></svg><span className="lbl">{t("dark")}</span>
        </button>
      </div>
    </div>
  );
}

export function Header({ email, phone }: { email: string; phone: string }) {
  const t = useTranslations("t");
  const pathname = usePathname() as string;
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

  return (
    <header className="site">
      <a className="skip" href="#main">{t("skip")}</a>
      <div className="util">
        <div className="wrap">
          <span className="contact">{[email, phone].filter(Boolean).join(" · ")}</span>
          <Toggles />
        </div>
      </div>
      <div className="wrap bar">
        <Link className="brand" href="/" aria-label="Oloning’o Travel">
          <b>Oloning’o</b>
          <span>Travel · Kenya</span>
        </Link>
        <nav className={`main${open ? " open" : ""}`} id="nav" aria-label="Main">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href as never} aria-current={isActive(item.href) ? "page" : undefined}>
              {t(item.key)}
            </Link>
          ))}
          <Link className="nav-cta" href="/inquiry" aria-current={isActive("/inquiry") ? "page" : undefined}>
            {t("nav_inquiry")}
          </Link>
        </nav>
        <button
          type="button" className="menu-btn" aria-expanded={open} aria-controls="nav"
          aria-label={open ? t("close") : t("menu")} onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      <div className="beads" />
    </header>
  );
}
