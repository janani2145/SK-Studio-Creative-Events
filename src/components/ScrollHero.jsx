"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import SmartImage from "./SmartImage";
import { scrollToSection } from "./scrollToSection";
import { heroSlides } from "@/config/site";

/**
 * Scroll-driven hero.
 * The section is tall (one screen per photo); the visible part stays pinned while you scroll.
 * Each new photo slices in along a diagonal edge, led by a gold + amber stripe —
 * the same angle and colours as the SK Creative Events team jersey.
 */

const SLOPE = 34; // how far (in % of width) the wipe edge leans from top to bottom

// On portrait screens (phones) the photo is as tall as the screen, so with object-cover
// its rendered width is about 180vh for a 16:9 photo — far wider than 100vw.
// Telling Next.js this makes it send a large enough file, so phones stay sharp.
const HERO_SIZES = "(max-aspect-ratio: 1/1) 180vh, 100vw";
const HERO_QUALITY = 90; // add `images: { qualities: [75, 90] }` in next.config.js (Next 15+)

/**
 * Renders the slide photo.
 * If a slide has `mobileImage` (a portrait crop), phones get that file and
 * larger screens get the normal landscape `image`.
 */
function SlideImage({ slide, priority = false }) {
  const alt = `${slide.title}, ${slide.theme}`;
  const style = slide.objectPosition ? { objectPosition: slide.objectPosition } : undefined;

  if (slide.mobileImage) {
    return (
      <>
        <div className="absolute inset-0 sm:hidden">
          <SmartImage
            src={slide.mobileImage}
            alt={alt}
            label={slide.title}
            sizes="100vw"
            quality={HERO_QUALITY}
            priority={priority}
            className={slide.mobileClassName || ""}
          />
        </div>
        <div className="absolute inset-0 hidden sm:block">
          <SmartImage
            src={slide.image}
            alt={alt}
            label={slide.title}
            sizes="100vw"
            quality={HERO_QUALITY}
            priority={priority}
            className={slide.className || ""}
            style={style}
          />
        </div>
      </>
    );
  }

  return (
    <SmartImage
      src={slide.image}
      alt={alt}
      label={slide.title}
      sizes={HERO_SIZES}
      quality={HERO_QUALITY}
      priority={priority}
      className={slide.className || ""}
      style={style}
    />
  );
}

// When does slide i finish wiping in? Each slide gets one "segment" of the scroll.
function segmentFor(i, count) {
  const seg = 1 / count;
  return [(i - 0.62) * seg, i * seg];
}

function WipeSlide({ slide, index, count, progress }) {
  const range = segmentFor(index, count);
  const wipe = useTransform(progress, range, [0, 1], { clamp: true });

  // Edge positions at the top (x1) and bottom (x2) of the frame, in %
  const x1 = useTransform(wipe, (v) => v * (100 + SLOPE));
  const x2 = useTransform(wipe, (v) => v * (100 + SLOPE) - SLOPE);

  const clip = useMotionTemplate`polygon(0% 0%, ${x1}% 0%, ${x2}% 100%, 0% 100%)`;
  const gold = useMotionTemplate`polygon(${x1}% 0%, calc(${x1}% + 2.6vw) 0%, calc(${x2}% + 2.6vw) 100%, ${x2}% 100%)`;
  const amber = useMotionTemplate`polygon(calc(${x1}% + 3.5vw) 0%, calc(${x1}% + 4.2vw) 0%, calc(${x2}% + 4.2vw) 100%, calc(${x2}% + 3.5vw) 100%)`;
  const stripeOpacity = useTransform(wipe, [0, 0.02, 0.96, 1], [0, 1, 1, 0]);

  // Gentle zoom-out as the slide wipes in (kept small so the photo isn't upscaled much)
  const scale = useTransform(wipe, [0, 1], [1.08, 1]);

  return (
    <>
      <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath: clip, zIndex: index * 3 }}>
        <motion.div
          className="absolute inset-0"
          style={{ scale, transformOrigin: slide.transformOrigin || "center top" }}
        >
          <SlideImage slide={slide} />
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-gold"
        style={{ clipPath: gold, opacity: stripeOpacity, zIndex: index * 3 + 1 }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-amber"
        style={{ clipPath: amber, opacity: stripeOpacity, zIndex: index * 3 + 2 }}
      />
    </>
  );
}

function FirstSlide({ slide, progress, count }) {
  // Slow, subtle push-in while the first photo is on screen
  const scale = useTransform(progress, [0, 1 / count], [1, 1.06]);
  return (
    <motion.div
      className="absolute inset-0"
      style={{ scale, transformOrigin: slide.transformOrigin || "center top", zIndex: 0 }}
    >
      <SlideImage slide={slide} priority />
    </motion.div>
  );
}

const heroHighlights = [
  "Birthdays",
  "Weddings",
  "Stage Decorations",
  "Grand Celebrations",
];

function HeroCopy() {
  const ease = [0.22, 1, 0.36, 1];
  return (
    <div className="max-w-3xl">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-pitch/60 px-4 py-1.5 text-xs font-semibold tracking-wider text-gold-soft backdrop-blur-md sm:text-sm"
      >
        ✦ SK CREATIVE EVENTS
      </motion.p>

      <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,5.4rem)] leading-[1.04] text-ivory">
        <motion.span
          className="block"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
        >
          Every Celebration
        </motion.span>
        <motion.span
          className="block"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
          Deserves to Be
        </motion.span>
        <motion.span
          className="block sm:whitespace-nowrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
        >
          <span className="bg-linear-to-r from-gold-soft via-gold to-amber bg-clip-text pr-2 italic text-transparent">
            Extraordinary.
          </span>
        </motion.span>
      </h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
        className="stripe-rule mt-5 w-36 origin-left"
        aria-hidden="true"
      />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-5 max-w-xl text-base leading-relaxed text-ivory/90 sm:text-lg"
      >
        From elegant wedding stages to magical birthday celebrations, we bring your dream events to life with beautiful decorations, creative themes, and unforgettable details.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.62 }}
        className="mt-5 hidden flex-wrap items-center gap-x-2.5 gap-y-1.5 rounded-full border border-white/10 bg-pitch/40 px-4 py-2 text-xs font-medium text-ivory/85 backdrop-blur-md sm:inline-flex sm:text-sm"
      >
        {heroHighlights.map((highlight, idx) => (
          <span key={highlight} className="inline-flex items-center">
            <span>{highlight}</span>
            {idx < heroHighlights.length - 1 && (
              <span className="mx-2 text-gold" aria-hidden="true">
                ·
              </span>
            )}
          </span>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.72 }}
        className="mt-7 flex flex-wrap gap-3"
      >
        <a
          href="#contact"
          onClick={(e) => scrollToSection("contact") && e.preventDefault()}
          className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-gold to-amber px-6 py-3.5 text-sm font-semibold text-pitch shadow-[0_10px_30px_-8px_rgba(240,179,35,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-6px_rgba(240,179,35,0.75)]"
        >
          ✦ Plan Your Celebration
        </a>
        <a
          href="#gallery"
          onClick={(e) => scrollToSection("gallery") && e.preventDefault()}
          className="inline-flex items-center rounded-full border border-ivory/40 bg-pitch/30 px-6 py-3.5 text-sm font-semibold text-ivory backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
        >
          Explore Our Decorations
        </a>
      </motion.div>
    </div>
  );
}

export default function ScrollHero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const count = heroSlides.length;
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (t) => {
    const seg = 1 / count;
    const i = Math.min(count - 1, Math.max(0, Math.floor((t + 0.31 * seg) / seg)));
    setActive(i);
  });

  const hintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  // Mobile: show a "scroll down" hint once the last slide has fully wiped in
  // (segmentFor(count - 1) ends at (count - 1) / count)
  const lastSlideDone = (count - 1) / count;
  const endHintOpacity = useTransform(
    scrollYProgress,
    [lastSlideDone, lastSlideDone + 0.03],
    [0, 1]
  );
  // While the hint is invisible it must not catch taps or keyboard focus
  const endHintVisibility = useTransform(endHintOpacity, (v) => (v > 0.01 ? "visible" : "hidden"));

  const current = heroSlides[active];

  // Reduced motion: a single still hero, no pinned scroll
  if (reduce) {
    const first = heroSlides[0];
    return (
      <section
        id="home"
        ref={ref}
        aria-label="Introduction"
        className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-pitch"
      >
        <SlideImage slide={first} priority />
        <div className="absolute inset-0 bg-linear-to-r from-pitch via-pitch/70 to-pitch/10" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <HeroCopy />
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      ref={ref}
      data-hero
      aria-label="Introduction"
      className="relative bg-pitch"
      style={{ height: `${count * 100}svh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Photo stack */}
        <div className="absolute inset-0">
          <FirstSlide slide={heroSlides[0]} progress={scrollYProgress} count={count} />
          {heroSlides.slice(1).map((s, i) => (
            <WipeSlide key={s.id} slide={s} index={i + 1} count={count} progress={scrollYProgress} />
          ))}
        </div>

        {/* Legibility shades */}
        <div className="pointer-events-none absolute inset-0 z-[40] bg-linear-to-r from-pitch/95 via-pitch/60 to-pitch/5" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[40] h-1/2 bg-linear-to-t from-pitch/90 to-transparent" />
        <div className="pointer-events-none absolute -left-40 top-1/3 z-[40] h-[520px] w-[520px] rounded-full bg-gold/15 blur-[120px]" />

        {/* Copy */}
        <div className="relative z-[50] mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-28 sm:px-6 sm:pb-20 lg:justify-center lg:px-8 lg:pb-0 lg:pt-20">
          <HeroCopy />
        </div>

        {/* Current setup caption */}
        <div className="absolute bottom-10 right-8 z-[50] hidden max-w-[60%] text-right sm:block" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <p className="font-display text-xl italic text-ivory sm:text-2xl">{current.title}</p>
              <p className="mt-1 text-xs text-ivory/70 sm:text-sm">{current.theme}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll hint (desktop/tablet) */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-6 left-1/2 z-[50] hidden -translate-x-1/2 items-center gap-2 text-xs text-ivory/70 sm:flex"
          aria-hidden="true"
        >
          <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <ArrowDown className="h-4 w-4 text-gold" />
          </motion.span>
          Scroll to see more setups
        </motion.div>

        {/* Mobile only: tap to jump to Services once the last slide finishes */}
        <motion.div
          style={{ opacity: endHintOpacity, visibility: endHintVisibility }}
          className="absolute inset-x-0 bottom-1 z-[50] flex justify-center sm:hidden"
        >
          <a
            href="#services"
            onClick={(e) => scrollToSection("services") && e.preventDefault()}
            aria-label="Scroll to services"
            className="flex flex-col items-center px-4 py-2 text-xs font-medium tracking-wider text-gold"
          >
            Scroll
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            >
              <ArrowDown className="h-4 w-4 text-gold" />
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}