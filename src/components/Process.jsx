"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { steps } from "@/config/site";

/*
 * Desktop (lg+): unchanged — 4 columns with the gold line drawing between the circles.
 * Mobile + tablet: vertical timeline — black/gold numbered circles on a gold line
 * that draws down as you scroll, each step in its own soft card.
 */
export default function Process() {
  return (
    <section className="bg-ivory-2 py-16 sm:py-24" aria-labelledby="process-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 id="process-title" className="max-w-2xl text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] text-ink">
            How a booking works
          </h2>
        </Reveal>

        <div className="relative mt-12 lg:mt-16">
          <ol className="grid gap-6 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, i) => {
              const last = i === steps.length - 1;
              return (
                <motion.li
                  key={s.title}
                  className="relative grid grid-cols-[56px_1fr] gap-4 sm:grid-cols-[64px_1fr] sm:gap-6 lg:block"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  {/* Desktop: horizontal connector (1->2, 2->3, 3->4) */}
                  {!last && (
                    <motion.div
                      aria-hidden="true"
                      className="absolute left-[37px] top-[35px] hidden h-[4px] w-[calc(100%+2rem)] origin-left bg-linear-to-r from-gold to-amber lg:block"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ duration: 0.8, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}

                  {/* Mobile/tablet: vertical connector down to the next step */}
                  {!last && (
                    <motion.div
                      aria-hidden="true"
                      className="absolute left-[26px] top-[56px] -bottom-6 w-[4px] origin-top rounded-full bg-linear-to-b from-gold to-amber sm:left-[30px] sm:top-[64px] lg:hidden"
                      variants={{
                        hidden: { scaleY: 0 },
                        show: { scaleY: 1, transition: { duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] } },
                      }}
                    />
                  )}

                  {/* Number */}
                  <span
                    aria-hidden="true"
                    className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full bg-ink font-display text-2xl text-gold shadow-[0_10px_24px_-10px_rgba(0,0,0,0.6)] ring-4 ring-ivory-2 sm:h-16 sm:w-16 sm:text-3xl lg:h-[74px] lg:w-[74px] lg:border-2 lg:border-ink lg:bg-ivory-2 lg:text-ink lg:shadow-xs lg:ring-0"
                  >
                    {i + 1}
                  </span>

                  {/* Content: card on mobile/tablet, plain on desktop */}
                  <div className="relative overflow-hidden rounded-2xl bg-ivory p-5 shadow-[0_14px_34px_-22px_rgba(0,0,0,0.45)] ring-1 ring-ink/5 sm:p-6 lg:overflow-visible lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none lg:ring-0">
                    <span aria-hidden="true" className="stripe-rule absolute right-5 top-5 w-8 lg:hidden" />
                    <h3 className="font-display text-2xl text-ink lg:mt-6">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-clay lg:mt-3 lg:max-w-xs">{s.text}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}