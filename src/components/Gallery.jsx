"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Reveal from "./Reveal";
import { birthdayPhotos } from "@/config/site";

const alt = (i) => `Theme birthday stage decoration by SK Creative Events, setup ${i + 1}`;

function Viewer({ index, onClose, onChange }) {
  const open = index !== null;
  const closeRef = useRef(null);
  const count = birthdayPhotos.length;
  const prev = useCallback(() => onChange((index - 1 + count) % count), [index, count, onChange]);
  const next = useCallback(() => onChange((index + 1) % count), [index, count, onChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, onClose, prev, next]);

  const photo = open ? birthdayPhotos[index] : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[90] flex flex-col bg-pitch/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-8" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm tabular-nums text-smoke">
              {index + 1} / {count}
            </p>
            <button ref={closeRef} type="button" onClick={onClose} className="rounded-full p-2 text-ivory hover:text-gold" aria-label="Close">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="relative flex-1 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={photo.src}
                className="absolute inset-x-2 inset-y-0 touch-pan-y sm:inset-x-20"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.22 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) next();
                  else if (info.offset.x > 70) prev();
                }}
              >
                <Image src={photo.src} alt={alt(index)} fill sizes="100vw" className="pointer-events-none select-none object-contain" />
              </motion.div>
            </AnimatePresence>

            <button type="button" onClick={prev} aria-label="Previous photo" className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-pitch/70 p-3 text-ivory hover:text-gold sm:left-6 sm:block">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button type="button" onClick={next} aria-label="Next photo" className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-pitch/70 p-3 text-ivory hover:text-gold sm:right-6 sm:block">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          <p className="py-5 text-center text-xs text-smoke sm:hidden">Swipe for the next photo</p>
          <div className="hidden h-6 sm:block" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Gallery() {
  const [open, setOpen] = useState(null);

  return (
    <section id="gallery" className="bg-ivory pt-10 pb-20 sm:pt-14 sm:pb-28" aria-labelledby="gallery-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <p className="mb-3 flex items-center gap-3 text-sm font-semibold text-amber">
              <span className="stripe-rule w-8" aria-hidden="true" />
              Gallery
            </p>
            <h2 id="gallery-title" className="text-[clamp(2.4rem,5vw,4.4rem)] leading-none text-ink">
              Setups we&apos;ve built
            </h2>
          </Reveal>
  <p className="max-w-sm text-clay">
  Every celebration tells a beautiful story, brought to life through
  thoughtful themes, creative details, and unforgettable decorations.
</p>
        </div>

        {/* Even grid: every photo in the same 4:3 frame, rows line up top and bottom */}
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3" role="list">
          {birthdayPhotos.map((p, i) => (
            <motion.li
              key={p.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`View ${alt(i).toLowerCase()} larger`}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ivory-2 outline-none ring-1 ring-ink/5 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_26px_50px_-22px_rgba(0,0,0,0.55)] focus-visible:-translate-y-1 focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Image
                  src={p.src}
                  alt={alt(i)}
                  fill
                  sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08] group-focus-visible:scale-[1.08]"
                />

                {/* Premium hover: soft shade, inner gold frame, light sweep, "View" pill bottom-left */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-pitch/65 via-pitch/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2 scale-[0.97] rounded-xl border border-gold/0 transition-all duration-500 group-hover:scale-100 group-hover:border-gold/80 group-focus-visible:scale-100 group-focus-visible:border-gold/80 sm:inset-3"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-linear-to-r from-white/0 via-white/30 to-white/0 opacity-0 transition-all duration-[1100ms] ease-out group-hover:left-[130%] group-hover:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-4 left-4 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-pitch/80 px-3 py-1.5 text-xs font-semibold text-ivory opacity-0 backdrop-blur-sm transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:bottom-5 sm:left-5"
                >
                  <Expand className="h-3.5 w-3.5 text-gold" />
                  View
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <Viewer index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </section>
  );
}