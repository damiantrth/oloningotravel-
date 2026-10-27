"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Placeholder } from "@/lib/types";

export type HeroSlideView = {
  isWelcome: boolean;
  eyebrow: string;
  title: string;
  text: string;
  linkLabel: string; // welcome slide: trust line; other slides: "Explore …"
  destinationSlug: string | null;
  image: string | null;
  placeholder: Placeholder;
};

const INTERVAL = 5500;

function SlideBackground({ slide, priority }: { slide: HeroSlideView; priority: boolean }) {
  if (slide.image) {
    return (
      <div className="slide-bg">
        <Image src={slide.image} alt="" fill sizes="100vw" priority={priority} />
      </div>
    );
  }
  return (
    <div className={`slide-bg ph-${slide.placeholder}`}>
      {slide.placeholder === "dawn" && <div className="sun" />}
      {(slide.placeholder === "dawn" || slide.placeholder === "savannah") && (
        <div className="land" style={slide.placeholder === "savannah" ? { color: "#4A3216" } : undefined}>
          <svg viewBox="0 0 400 140" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><use href="#acacia" /></svg>
        </div>
      )}
    </div>
  );
}

/**
 * Plays once through every slide and stops back on the welcome slide.
 * Arrows, dots, swiping and the arrow keys let visitors browse again.
 */
export function HeroCarousel({ slides }: { slides: HeroSlideView[] }) {
  const t = useTranslations("t");
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const paused = useRef(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const count = slides.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setDone(true);
  }, []);

  useEffect(() => {
    if (done || count < 2) return;
    const id = window.setInterval(() => {
      if (paused.current || document.hidden) return;
      setIndex((i) => {
        const next = i + 1;
        if (next >= count) {
          setDone(true);
          return 0;
        }
        return next;
      });
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [done, count]);

  const go = useCallback((i: number) => {
    setDone(true);
    setIndex(((i % count) + count) % count);
  }, [count]);

  if (count === 0) return null;

  return (
    <section
      className="hero" aria-roledescription="carousel" aria-label={t("hero_label")}
      onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)} onBlur={() => (paused.current = false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
      onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
      onTouchEnd={(e) => {
        if (!touch.current) return;
        const dx = e.changedTouches[0].clientX - touch.current.x;
        const dy = e.changedTouches[0].clientY - touch.current.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1));
        touch.current = null;
      }}
    >
      <div className="hero-track">
        {slides.map((s, i) => {
          const on = i === index;
          return (
            <div
              key={i} className={`slide${on ? " on" : ""}`} role="group" aria-roledescription="slide"
              aria-label={t("slide_of", { n: i + 1, m: count })} aria-hidden={!on} inert={!on}
            >
              <SlideBackground slide={s} priority={i === 0} />
              <div className="slide-scrim" />
              {!s.isWelcome && s.destinationSlug && (
                <Link
                  className="slide-link" aria-label={s.linkLabel}
                  href={{ pathname: "/destinations/[slug]", params: { slug: s.destinationSlug } }}
                />
              )}
              <div className="wrap slide-content">
                {s.eyebrow && <span className="eyebrow">{s.eyebrow}</span>}
                {i === 0 ? <h1>{s.title}</h1> : <h2>{s.title}</h2>}
                {s.text && <p className="sub">{s.text}</p>}
                {s.isWelcome ? (
                  <>
                    <div className="btns">
                      <Link className="btn btn-red" href="/trips">{t("w_btn1")}</Link>
                      <Link className="btn btn-ghost" href="/inquiry">{t("w_btn2")}</Link>
                    </div>
                    {s.linkLabel && <span className="trust">{s.linkLabel}</span>}
                  </>
                ) : (
                  s.linkLabel && (
                    <span className="slide-go">
                      {s.linkLabel}
                      <svg width="18" height="18" aria-hidden="true"><use href="#chev-r" /></svg>
                    </span>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
      {count > 1 && (
        <div className="hero-ctrl">
          <div className="wrap">
            <div className="dots">
              {slides.map((_, i) => (
                <button
                  key={i} type="button" className="dot" aria-label={t("goto", { n: i + 1 })}
                  aria-current={i === index} onClick={() => go(i)}
                />
              ))}
            </div>
            <div className="arrows">
              <button type="button" className="arrow" aria-label={t("prev")} onClick={() => go(index - 1)}>
                <svg aria-hidden="true"><use href="#chev-l" /></svg>
              </button>
              <button type="button" className="arrow" aria-label={t("next")} onClick={() => go(index + 1)}>
                <svg aria-hidden="true"><use href="#chev-r" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
