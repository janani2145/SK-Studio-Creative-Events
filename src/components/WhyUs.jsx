"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { brand, reasons } from "@/config/site";

/*
 * The SK crest in the middle with a slowly turning ring, three reasons on each side
 * pointing in towards it. On phones the crest sits on top and the reasons stack.
 */
function Reason({ r, i, side }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: side === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative rounded-[22px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-gold/50 ${
        side === "left" ? "lg:text-right" : ""
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-1/2 hidden h-px w-10 bg-linear-to-r from-gold/0 to-gold/70 lg:block ${
          side === "left" ? "-right-10" : "-left-10 rotate-180"
        }`}
      />
      <span className={`mb-4 flex items-center gap-3 ${side === "left" ? "lg:flex-row-reverse" : ""}`}>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold font-display text-lg text-pitch">
          {i + 1 + (side === "right" ? 3 : 0)}
        </span>
        <span className="stripe-rule w-10" aria-hidden="true" />
      </span>
      <h3 className="font-display text-2xl leading-snug text-ivory">{r.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-smoke">{r.text}</p>
    </motion.li>
  );
}

export default function WhyUs() {
  const left = reasons.slice(0, 3);
  const right = reasons.slice(3, 6);

  return (
    <section id="why-us" className="relative isolate overflow-hidden bg-pitch py-16 text-ivory sm:py-24" aria-labelledby="why-title">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-5 inline-flex items-center gap-3 text-sm font-semibold text-gold">
            <span className="stripe-rule w-8" aria-hidden="true" />
            Why us
            <span className="stripe-rule w-8" aria-hidden="true" />
          </p>
          <h2 id="why-title" className="text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02]">
            Why families book SK again
          </h2>
          <p className="mt-5 text-smoke">Most bookings come from guests who saw our setup at someone else&apos;s party.</p>
        </Reveal>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
          {/* Crest */}
          <div className="relative mx-auto mb-10 flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72 lg:order-2 lg:mb-0 lg:h-80 lg:w-80">
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 rounded-full border-2 border-dashed border-gold/40"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            />
            <div aria-hidden="true" className="jersey-stripes absolute inset-5 rounded-full bg-pitch-2 opacity-90 ring-1 ring-gold/30" />
            <div className="absolute inset-10 rounded-full bg-pitch shadow-[0_0_60px_rgba(240,179,35,0.25)]" />
            <Image src={brand.logo} alt="SK Creative Events crest" width={640} height={793} className="relative h-40 w-auto sm:h-44 lg:h-48" />
            <p className="absolute -bottom-10 left-1/2 w-max -translate-x-1/2 font-display text-lg italic text-gold-soft">
              {brand.tagline}
            </p>
          </div>

          <ul className="grid gap-4 lg:order-1" role="list">
            {left.map((r, i) => (
              <Reason key={r.title} r={r} i={i} side="left" />
            ))}
          </ul>
          <ul className="grid gap-4 lg:order-3" role="list">
            {right.map((r, i) => (
              <Reason key={r.title} r={r} i={i} side="right" />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
