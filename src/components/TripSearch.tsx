"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { TripCardData } from "@/lib/views";
import { TripCard, type CardLabels } from "./Cards";

type Filters = { q: string; dest: string; style: string; dur: string };

const STYLES = [["", "all"], ["safari", "st_safari"], ["beach", "st_beach"], ["combo", "st_combo"]] as const;
const DURATIONS = [["", "dur_any"], ["short", "dur_short"], ["mid", "dur_mid"], ["long", "dur_long"]] as const;

function matches(trip: TripCardData, f: Filters) {
  if (f.style && trip.style !== f.style) return false;
  if (f.dest && !trip.destSlugs.includes(f.dest)) return false;
  if (f.dur === "short" && trip.days > 5) return false;
  if (f.dur === "mid" && (trip.days < 6 || trip.days > 9)) return false;
  if (f.dur === "long" && trip.days < 10) return false;
  const q = f.q.trim().toLowerCase();
  return !q || q.split(/\s+/).every((word) => trip.haystack.includes(word));
}

/** Search box and filters over the owner's own trips. Results update as you type. */
export function TripSearch({
  trips, destinations, labels,
}: { trips: TripCardData[]; destinations: { slug: string; name: string }[]; labels: CardLabels }) {
  const t = useTranslations("t");
  const [f, setF] = useState<Filters>({ q: "", dest: "", style: "", dur: "" });

  // Allow links such as /trips?dest=masai-mara or ?q=beach
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setF((prev) => ({ ...prev, q: p.get("q") ?? "", dest: p.get("dest") ?? "", style: p.get("style") ?? "" }));
  }, []);

  const results = useMemo(() => trips.filter((trip) => matches(trip, f)), [trips, f]);

  return (
    <>
      <div className="filters">
        <div className="row">
          <label htmlFor="f-q" className="sr">{t("f_search")}</label>
          <input
            className="input search" id="f-q" type="search" placeholder={t("search_ph")} autoComplete="off"
            value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })}
          />
          <label htmlFor="f-dur" className="sr">{t("duration")}</label>
          <select className="input" id="f-dur" value={f.dur} onChange={(e) => setF({ ...f, dur: e.target.value })}>
            {DURATIONS.map(([v, k]) => <option key={v} value={v}>{t(k)}</option>)}
          </select>
        </div>
        <div className="chips" role="group" aria-label={t("style")}>
          {STYLES.map(([v, k]) => (
            <button key={v} type="button" className="chip" aria-pressed={f.style === v} onClick={() => setF({ ...f, style: v })}>
              {t(k)}
            </button>
          ))}
        </div>
        <div className="chips" role="group" aria-label={t("destinations")}>
          <button type="button" className="chip" aria-pressed={f.dest === ""} onClick={() => setF({ ...f, dest: "" })}>{t("all")}</button>
          {destinations.map((d) => (
            <button key={d.slug} type="button" className="chip" aria-pressed={f.dest === d.slug} onClick={() => setF({ ...f, dest: d.slug })}>
              {d.name}
            </button>
          ))}
        </div>
      </div>
      <p className="muted small" aria-live="polite" style={{ marginBottom: 12 }}>
        {results.length === 1 ? t("results_one") : t("results", { n: results.length })}
      </p>
      {results.length > 0 ? (
        <div className="grid-3">
          {results.map((trip) => <TripCard key={trip.slug} trip={trip} labels={labels} />)}
        </div>
      ) : (
        <div className="empty">
          <h3>{t("empty_title")}</h3>
          <p className="muted">{t("empty_body")}</p>
          <Link className="btn btn-red" href="/inquiry">{t("empty_btn")}</Link>
        </div>
      )}
    </>
  );
}
