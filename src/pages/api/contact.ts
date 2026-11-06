export const prerender = false;
import type { APIRoute } from "astro";
import { site } from "../../data/site";

/** POST /api/contact — JSON from forms.js. Sends through Resend when RESEND_API_KEY is set; otherwise logs. */
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
const clean = (v: unknown) => String(v ?? "").trim().slice(0, 1000);

export const POST: APIRoute = async ({ request }) => {
  let data: Record<string, unknown>;
  try { data = await request.json(); } catch { return json({ ok: false, error: "bad json" }, 400); }
  if (clean(data.website)) return json({ ok: true });                       // honeypot
  const kind = data.kind === "investor" ? "investor" : "partner";
  const name = clean(data.name), email = clean(data.email);
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ ok: false, error: "missing" }, 400);
  const to = kind === "investor" ? site.investors : site.mail;
  const subject = (kind === "investor" ? "Investor intro" : "Design partner enquiry") + " · " + (clean(data.company) || clean(data.firm) || name);
  const skip = new Set(["kind", "website"]);
  const text = Object.entries(data).filter(([k, v]) => !skip.has(k) && clean(v)).map(([k, v]) => `${k[0].toUpperCase()}${k.slice(1)}: ${clean(v)}`).join("\n");
  const key = import.meta.env.RESEND_API_KEY;
  if (key) {
    const r = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: import.meta.env.MAIL_FROM || "Dhiya website <website@dhiya.ai>", to: [to], reply_to: email, subject, text }) });
    if (!r.ok) return json({ ok: false, error: "mail" }, 502);
  } else {
    console.log(`[contact] → ${to}\n${subject}\n${text}`);
  }
  return json({ ok: true });
};
