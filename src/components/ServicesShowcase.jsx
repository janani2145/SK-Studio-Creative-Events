"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SmartImage from "./SmartImage";
import Reveal from "./Reveal";
import { WhatsAppIcon } from "./Icons";
import { services, whatsappLink } from "@/config/site";

const ask = (s) => whatsappLink(`Hi SK Creative Events! I'd like to know more about ${s.name.toLowerCase()} for my event.`);

/*
 * Bento grid: everything is visible at once, no tapping needed.
 * 4 columns on desktop: primary card 2x2, wide card 2x1, six single cards = 12 cells (3 full rows).
 * 2 columns on tablet: same 12 cells (6 rows). 1 column on phones.
 */
const cell = {
  primary: "sm:col-span-2 sm:row-span-2",
  wide: "sm:col-span-2",
};

function Card({ s, i }) {
  const primary = s.feature === "primary";
  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`${cell[s.feature] ?? ""} min-h-[300px] ${primary ? "min-h-[580px] sm:min-h-[620px]" : ""}`}
    >
    <div
  className="group relative flex h-full flex-col justify-end overflow-hidden rounded-[26px] bg-pitch text-ivory shadow-[0_20px_50px_-24px_rgba(0,0,0,0.5)]"
>
        <SmartImage
          src={s.image}
          alt={s.name}
          label={`${s.name} photo`}
          sizes={primary ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
          className="transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-linear-to-t from-pitch via-pitch/55 to-pitch/0" aria-hidden="true" />

        {primary && (
          <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-pitch">
            Most booked: birthday packages
          </span>
        )}

        <span className={`relative block ${primary ? "p-6 sm:p-8" : "p-5"}`}>
          <span className={`block font-display leading-tight ${primary ? "text-4xl sm:text-5xl" : "text-2xl"}`}>{s.name}</span>
          <span className={`mt-2 block text-ivory/85 ${primary ? "max-w-md text-base" : "text-sm"}`}>{s.line}</span>

          {s.includes && (
            <span className={`mt-4 grid gap-x-4 gap-y-1.5 ${primary ? "sm:grid-cols-2" : "grid-cols-2"}`}>
              {s.includes.map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-[13px] text-ivory/90">
                  <Check className="h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </span>
          )}

      {primary && (
  <a
    href={ask(s)}
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => e.stopPropagation()}
    className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-pitch"
  >
    <WhatsAppIcon className="h-4 w-4" />
    Ask for package prices
  </a>
)}
        </span>
      </div>
    </motion.li>
  );
}

export default function ServicesShowcase() {
  return (
    <section id="services" className="bg-ivory-2 pt-10 pb-20 sm:pt-14 sm:pb-28" aria-labelledby="services-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <p className="mb-3 flex items-center gap-3 text-sm font-semibold text-amber">
              <span className="stripe-rule w-8" aria-hidden="true" />
              Services
            </p>
            <h2 id="services-title" className="text-[clamp(2.4rem,5vw,4.4rem)] leading-none text-ink">
              Everything for the big day
            </h2>
          </Reveal>
          <p className="max-w-sm text-clay">
            Birthday decoration is what we do most. Add entries, DJ, food stalls and more to the same package.
          </p>
        </div>

        <ul className="mt-12 grid grid-flow-dense auto-rows-[minmax(300px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {services.map((s, i) => (
            <Card key={s.id} s={s} i={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
