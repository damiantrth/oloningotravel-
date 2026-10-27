"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { whatsappLink } from "@/lib/format";

type Ctx = { number: string; trip: string | null; setTrip: (title: string | null) => void };
const WaContext = createContext<Ctx>({ number: "", trip: null, setTrip: () => {} });

export function WhatsAppProvider({ number, children }: { number: string; children: ReactNode }) {
  const [trip, setTrip] = useState<string | null>(null);
  return <WaContext.Provider value={{ number, trip, setTrip }}>{children}</WaContext.Provider>;
}

/** Put on a trip page so the floating button's message names the trip. */
export function WhatsAppTrip({ title }: { title: string }) {
  const { setTrip } = useContext(WaContext);
  useEffect(() => {
    setTrip(title);
    return () => setTrip(null);
  }, [title, setTrip]);
  return null;
}

export function useWhatsAppHref(tripTitle?: string | null) {
  const { number, trip } = useContext(WaContext);
  const t = useTranslations("t");
  const name = tripTitle ?? trip;
  return whatsappLink(number, name ? t("wa_trip", { x: name }) : t("wa_generic"));
}

export function WhatsAppFloat() {
  const href = useWhatsAppHref();
  return (
    <a className="wa-float" href={href} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
      <svg aria-hidden="true"><use href="#whatsapp" /></svg>
      <span>WhatsApp</span>
    </a>
  );
}

/** A full-size WhatsApp button for the inquiry, trip and contact pages. */
export function WhatsAppButton({ label, tripTitle }: { label: string; tripTitle?: string | null }) {
  const href = useWhatsAppHref(tripTitle);
  return (
    <a className="btn btn-wa" href={href} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
}
