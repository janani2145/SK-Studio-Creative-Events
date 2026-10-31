"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { WhatsAppIcon } from "./Icons";
import { services, whatsappLink } from "@/config/site";

const eventTypes = ["Birthday", "First birthday", "Wedding", "Reception", "Engagement", "Surprise party", "Baby shower", "Puberty function", "Corporate", "Other"];

// Dark glass fields that sit naturally on the black contact section
const field =
  "mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ivory [color-scheme:dark] placeholder:text-smoke/60 transition-colors focus:border-gold/70 focus:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-gold/25";
const label = "block text-xs font-medium text-smoke";

export default function ContactForm() {
  const [picked, setPicked] = useState(["decoration"]);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const next = {};
    if (!data.name?.trim()) next.name = "Enter your name so we know who to reply to.";
    if (!/^[+\d\s-]{10,15}$/.test(data.phone?.trim() ?? "")) next.phone = "Enter a 10-digit mobile number.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const chosen = services.filter((s) => picked.includes(s.id)).map((s) => s.name).join(", ") || "Not sure yet";
    const lines = [
      "Hi SK Creative Events! I'd like to plan an event.",
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Event: ${data.event}`,
      data.date && `Date: ${data.date}`,
      data.venue && `Venue: ${data.venue}`,
      data.guests && `Guests: ${data.guests}`,
      `Services: ${chosen}`,
      data.message && `Details: ${data.message}`,
    ].filter(Boolean);

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <label className={label}>
          Your name
          <input name="name" autoComplete="name" placeholder="Your name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
          {errors.name && <span id="name-err" className="mt-1 block text-xs text-red-400">{errors.name}</span>}
        </label>
        <label className={label}>
          Mobile number
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit number" className={field} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined} />
          {errors.phone && <span id="phone-err" className="mt-1 block text-xs text-red-400">{errors.phone}</span>}
        </label>
        <label className={label}>
          Event
          <select name="event" className={field} defaultValue="Birthday">
            {eventTypes.map((t) => (
              <option key={t} className="bg-pitch">
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Date
          <input name="date" type="date" className={field} />
        </label>
        <label className={label}>
          Venue or area
          <input name="venue" placeholder="eg. Kodambakkam, hall name" className={field} />
        </label>
        <label className={label}>
          Guests (approx.)
          <input name="guests" inputMode="numeric" placeholder="eg. 150" className={field} />
        </label>
      </div>

      <fieldset>
        <legend className={label}>What do you need?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {services.map((s) => {
            const on = picked.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(s.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${on ? "bg-gold text-pitch" : "border border-white/15 text-ivory/75 hover:border-gold/60 hover:text-gold"
                  }`}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className={label}>
        Theme idea or anything else
        <textarea name="message" rows={3} placeholder="Colours, characters, a photo you liked, budget…" className={field} />
      </label>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-gold to-amber px-7 py-3.5 text-sm font-semibold text-pitch shadow-[0_10px_30px_-10px_rgba(240,179,35,0.6)] transition-transform hover:-translate-y-0.5"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Send on WhatsApp
      </button>

      <AnimatePresence>
        {sent && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="flex items-center gap-2 text-sm text-ivory/80"
          >
            <CheckCircle2 className="h-4 w-4 text-gold" aria-hidden="true" />
            WhatsApp opened with your details. Press send there and we&apos;ll reply soon.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}