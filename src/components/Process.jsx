"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { steps } from "@/config/site";

export default function Process() {
  return (
    <section className="bg-ivory-2 py-16 sm:py-24" aria-labelledby="process-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 id="process-title" className="max-w-2xl text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] text-ink">
            How a booking works
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, i) => (
              <li key={s.title} className="relative">
                {/* Connecting stripe between steps (1->2, 2->3, 3->4) without extending past step 4 */}
                {i < steps.length - 1 && (
                  <motion.div
                    aria-hidden="true"
                    className="absolute left-[37px] top-[35px] hidden h-[4px] w-[calc(100%+2rem)] origin-left bg-gradient-to-r from-gold to-amber lg:block"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.8, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span
                  className="relative z-10 inline-flex h-[74px] w-[74px] items-center justify-center rounded-full border-2 border-ink bg-ivory-2 font-display text-3xl text-ink shadow-xs"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3 className="mt-6 font-display text-2xl text-ink">{s.title}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-clay">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
