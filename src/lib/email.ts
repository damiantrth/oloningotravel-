import "server-only";
import type { InquiryInput } from "./inquiry";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function send(to: string, subject: string, html: string, replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) {
    console.info(`[email skipped: RESEND_API_KEY or EMAIL_FROM not set] to=${to} subject="${subject}"`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) throw new Error(`Resend error ${res.status}: ${await res.text()}`);
}

type Extra = { destinationName: string; tripTitle: string; businessName: string };

/** Notification to the owner. Replying to it goes straight to the visitor. */
export async function sendOwnerNotification(i: InquiryInput, extra: Extra) {
  const to = process.env.INQUIRY_NOTIFY_EMAIL;
  if (!to) return console.info("[email skipped: INQUIRY_NOTIFY_EMAIL not set]");
  const rows: [string, string][] = [
    ["Name", i.name], ["Email", i.email], ["Travellers", String(i.travelers)],
    ["Destination", extra.destinationName || "Not sure yet"], ["Trip", extra.tripTitle || "—"],
    ["Budget per person", i.budget || "—"], ["Travel period", i.travelPeriod || "—"],
    ["Arrival flight", i.arrivalFlight || "—"], ["Language", i.language === "de" ? "German" : "English"],
  ];
  const html = `
    <h2 style="font-family:Georgia,serif">New inquiry from ${esc(i.name)}</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
      ${rows.map(([k, v]) => `<tr><td style="color:#666">${k}</td><td><b>${esc(v)}</b></td></tr>`).join("")}
    </table>
    ${i.message ? `<p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;border-left:3px solid #A9261B;padding-left:12px">${esc(i.message)}</p>` : ""}
    <p style="font-family:Arial,sans-serif;font-size:13px;color:#666">Reply to this email to answer ${esc(i.name)} directly.</p>`;
  await send(to, `New inquiry: ${i.name}, ${i.travelers} traveller(s)${extra.tripTitle ? `, ${extra.tripTitle}` : ""}`, html, i.email);
}

/** Confirmation to the visitor, in the language they used. */
export async function sendVisitorConfirmation(i: InquiryInput, extra: Extra) {
  const de = i.language === "de";
  const subject = de ? `Ihre Anfrage bei ${extra.businessName}` : `Your inquiry with ${extra.businessName}`;
  const body = de
    ? `<p>Hallo ${esc(i.name)},</p>
       <p>Ashe oleng – vielen Dank für Ihre Anfrage${extra.tripTitle ? ` zur Reise „${esc(extra.tripTitle)}“` : ""}. Wir haben sie erhalten und melden uns persönlich, meist innerhalb eines Werktags.</p>
       <p>Wenn Ihnen noch etwas einfällt, antworten Sie einfach auf diese E-Mail.</p>
       <p>Herzliche Grüße<br>${esc(extra.businessName)}</p>`
    : `<p>Hello ${esc(i.name)},</p>
       <p>Ashe oleng, thank you for your inquiry${extra.tripTitle ? ` about “${esc(extra.tripTitle)}”` : ""}. We’ve received it and will get back to you personally, usually within one working day.</p>
       <p>If you think of anything else, just reply to this email.</p>
       <p>Warm regards,<br>${esc(extra.businessName)}</p>`;
  await send(i.email, subject, `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#161B29">${body}</div>`,
    process.env.INQUIRY_NOTIFY_EMAIL || undefined);
}
