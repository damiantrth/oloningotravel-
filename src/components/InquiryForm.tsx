"use client";

import { useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { fieldErrors, inquirySchema, type InquiryResponse } from "@/lib/inquiry";

type Option = { slug: string; name: string };

const FIELD_ORDER = ["name", "email", "travelers", "consent"] as const;

export function InquiryForm({
  destinations, trip, preselectDestination,
}: { destinations: Option[]; trip: { slug: string; title: string } | null; preselectDestination: string }) {
  const t = useTranslations("t");
  const locale = useLocale();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"), email: fd.get("email"), travelers: fd.get("travelers"),
      destination: fd.get("destination"), budget: fd.get("budget"), travelPeriod: fd.get("travelPeriod"),
      arrivalFlight: fd.get("arrivalFlight"), message: fd.get("message"), trip: trip?.slug ?? "",
      language: locale, consent: fd.get("consent") === "on", website: fd.get("website"),
    };

    const check = inquirySchema.safeParse(payload);
    if (!check.success) {
      const errs = fieldErrors(check.error);
      setErrors(errs);
      const first = FIELD_ORDER.find((k) => errs[k]);
      if (first) (formRef.current?.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      const data = (await res.json()) as InquiryResponse;
      if (data.ok) {
        setSentTo(String(payload.email));
        setStatus("sent");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setStatus("idle");
      if (data.error === "validation") setErrors(data.fields);
      else setFormError(t(data.error === "rate_limited" ? "e_rate" : "e_generic"));
    } catch {
      setStatus("idle");
      setFormError(t("e_generic"));
    }
  }

  if (status === "sent") {
    return (
      <div className="panel success" role="status">
        <span className="eyebrow">{t("inq_eyebrow")}</span>
        <h2>{t("ok_title")}</h2>
        <p className="lead" style={{ color: "var(--ink)" }}>{t("ok_body", { email: sentTo })}</p>
        <button type="button" className="btn btn-line" onClick={() => { setStatus("idle"); setSentTo(""); }}>
          {t("ok_again")}
        </button>
      </div>
    );
  }

  const err = (key: string) => (errors[key] ? t(errors[key]) : "");

  return (
    <form ref={formRef} className="inq panel" noValidate onSubmit={onSubmit}>
      {trip && (
        <div className="full note">
          {t("i_trip")}: <b>{trip.title}</b>
        </div>
      )}
      <div className={`field${errors.name ? " bad" : ""}`}>
        <label htmlFor="i-name">{t("i_name")} *</label>
        <input className="input" id="i-name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby="e-name" />
        <span className="err" id="e-name">{err("name")}</span>
      </div>
      <div className={`field${errors.email ? " bad" : ""}`}>
        <label htmlFor="i-email">{t("i_email")} *</label>
        <input className="input" id="i-email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby="e-email" />
        <span className="err" id="e-email">{err("email")}</span>
      </div>
      <div className={`field${errors.travelers ? " bad" : ""}`}>
        <label htmlFor="i-trav">{t("i_trav")} *</label>
        <input className="input" id="i-trav" name="travelers" type="number" min={1} defaultValue={2} inputMode="numeric" aria-invalid={!!errors.travelers} aria-describedby="e-trav" />
        <span className="err" id="e-trav">{err("travelers")}</span>
      </div>
      <div className="field">
        <label htmlFor="i-dest">{t("i_dest")}</label>
        <select className="input" id="i-dest" name="destination" defaultValue={preselectDestination}>
          <option value="">{t("i_unsure")}</option>
          {destinations.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="i-budget">{t("i_budget")}</label>
        <input className="input" id="i-budget" name="budget" placeholder={t("i_budget_ph")} />
      </div>
      <div className="field">
        <label htmlFor="i-period">{t("i_period")}</label>
        <input className="input" id="i-period" name="travelPeriod" placeholder={t("i_period_ph")} />
      </div>
      <div className="field full">
        <label htmlFor="i-flight">{t("i_flight")}</label>
        <input className="input" id="i-flight" name="arrivalFlight" placeholder={t("i_flight_ph")} />
      </div>
      <div className="field full">
        <label htmlFor="i-msg">{t("i_msg")}</label>
        <textarea className="input" id="i-msg" name="message" rows={4} placeholder={t("i_msg_ph")} />
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="i-web">Website</label>
        <input id="i-web" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className={`field full${errors.consent ? " bad" : ""}`}>
        <label className="check" style={{ fontWeight: 400 }}>
          <input type="checkbox" id="i-consent" name="consent" aria-invalid={!!errors.consent} aria-describedby="e-consent" />
          <span>
            {t("i_consent")}{" "}
            <Link className="link" href={{ pathname: "/legal/[doc]", params: { doc: "privacy" } }} target="_blank">
              {t("i_privacy")}
            </Link>
            . *
          </span>
        </label>
        <span className="err" id="e-consent">{err("consent")}</span>
      </div>
      {formError && <p className="full note" role="alert">{formError}</p>}
      <div className="full">
        <button className="btn btn-red" type="submit" disabled={status === "sending"}>
          {status === "sending" ? t("sending") : t("i_submit")}
        </button>
      </div>
    </form>
  );
}
