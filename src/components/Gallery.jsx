"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Reveal from "./Reveal";
import { birthdayPhotos } from "@/config/site";

const alt = (i) => `Theme birthday stage decoration by SK Creative Events, setup ${i + 1}`;

/* ------------------------------------------------------------------ */
/* Diamond collage layout — traced from the reference design.         */
/* Each slot is a square on a 45°-rotated lattice:                     */
/*   p = x + y, q = x − y, s = size (2 small, 3 medium, 4 large, 8 hero) */
/* Order = which photo fills it first: photo 0 → hero, photo 1 → next… */
/* ------------------------------------------------------------------ */
const SLOTS = [
  { p: 4, q: 8, s: 8 }, //  hero, centre
  { p: 0, q: 9, s: 4 }, //  top-left large
  { p: 5, q: 4, s: 4 }, //  left-middle large
  { p: 9, q: 2, s: 4 }, //  bottom large
  { p: 12, q: 10, s: 3 }, // right of hero
  { p: 12, q: 7, s: 3 }, //  below hero
  { p: 7, q: 16, s: 3 }, //  top-right
  { p: 15, q: 7, s: 3 }, //  bottom-right
  { p: 9, q: -1, s: 3 }, //  bottom-left
  { p: 2, q: 13, s: 2 }, //  top small
  { p: 5, q: 16, s: 2 }, //  top-right small
  { p: 3, q: 6, s: 2 }, //   left small
  { p: 9, q: 6, s: 2 }, //   tucked under hero
  { p: 7, q: 2, s: 2 }, //   left-lower small
  { p: 13, q: 5, s: 2 }, //  bottom small
];
const GAP = 0.12; // white gap, in lattice units (scales with the collage)
const PER_COLLAGE = SLOTS.length;

/** Turn lattice slots into %-based boxes inside a canvas that hugs them. */
function buildCollage(count) {
  const tiles = SLOTS.slice(0, count).map(({ p, q, s }) => {
    const side = s - GAP * 2;
    const cx = (p + q + s) / 2;
    const cy = (p - q) / 2;
    return { s, side, x: cx - side / 2, y: cy - side / 2 };
  });
  const minX = Math.min(...tiles.map((t) => t.x));
  const minY = Math.min(...tiles.map((t) => t.y));
  const W = Math.max(...tiles.map((t) => t.x + t.side)) - minX;
  const H = Math.max(...tiles.map((t) => t.y + t.side)) - minY;

  return {
    ratio: `${W} / ${H}`,
    aspect: H / W,
    tiles: tiles.map((t) => {
      const share = t.side / W; // fraction of collage width
      return {
        s: t.s,
        cx: (t.x - minX + t.side / 2) / W, // centre, as fraction of canvas
        cy: (t.y - minY + t.side / 2) / H,
        r: t.side / 2 / W, // radius, as fraction of canvas width
        big: t.s >= 3,
        hero: t.s >= 8,
        style: {
          left: `${((t.x - minX) / W) * 100}%`,
          top: `${((t.y - minY) / H) * 100}%`,
          width: `${share * 100}%`,
          height: `${(t.side / H) * 100}%`,
        },
        sizes: `(min-width: 1024px) ${Math.ceil(share * 900)}px, ${Math.ceil(share * 100)}vw`,
      };
    }),
  };
}

// 15 photos per collage; extra photos start a new collage below.
const collages = [];
for (let start = 0; start < birthdayPhotos.length; start += PER_COLLAGE) {
  const count = Math.min(PER_COLLAGE, birthdayPhotos.length - start);
  collages.push({ start, ...buildCollage(count) });
}

const DIAMOND = "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)";

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

/* ------------------------------------------------------------------ */
/* Mouse field: tiles react to where the cursor is, no hover needed.   */
/*  - tile under the cursor is pulled gently towards it (magnet)       */
/*  - neighbours get nudged away, then spring back (the "push" feel)   */
/*  - whole collage drifts against the cursor, small tiles more (depth)*/
/* ------------------------------------------------------------------ */
const REACH = 0.3; // how far the push ripples out (fraction of canvas width)
const MAGNET = 7; // px pull on the tile under the cursor
const PUSH = 26; // px push on neighbours (scaled by depth)
const PARALLAX = 14; // px drift against the cursor (scaled by depth)
const SPRING = { stiffness: 150, damping: 13, mass: 0.7 }; // a little bouncy

function fieldOffset(tile, aspect, x, y, on) {
  if (!on) return [0, 0];
  const depth = 2 / tile.s; // small = 1, medium .67, large .5, hero .25
  const dx = tile.cx - x;
  const dy = (tile.cy - y) * aspect;
  const d = Math.hypot(dx, dy) || 1e-4;

  let m = 0;
  if (d < tile.r) m = -MAGNET * Math.sin((Math.PI * d) / tile.r); // inside → pull in
  else if (d < tile.r + REACH) m = PUSH * depth * Math.sin((Math.PI * (d - tile.r)) / REACH); // nearby → push out

  return [(dx / d) * m + (0.5 - x) * PARALLAX * depth, (dy / d) * m + (0.5 - y) * PARALLAX * depth];
}

function DiamondTile({ photo, index, tile, order, onOpen, field, aspect }) {
  const reduce = useReducedMotion();
  const { mx, my, on } = field;

  const tx = useTransform([mx, my, on], ([x, y, a]) => fieldOffset(tile, aspect, x, y, a)[0]);
  const ty = useTransform([mx, my, on], ([x, y, a]) => fieldOffset(tile, aspect, x, y, a)[1]);
  const x = useSpring(tx, SPRING);
  const y = useSpring(ty, SPRING);
  const rotate = useTransform(x, (v) => v * 0.18); // slight tilt while moving

  // idle float: smaller tiles bob more, each on its own rhythm
  const amp = 6 / tile.s; // % of tile size
  const dur = 5.5 + (order % 5) * 0.8;

  return (
    <motion.li
      className="absolute transition-[filter] duration-500 ease-out hover:z-10 hover:drop-shadow-[0_22px_30px_rgba(0,0,0,0.35)] focus-within:z-10"
      style={tile.style}
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: tile.hero ? 0 : 0.12 + order * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="h-full w-full" style={reduce ? undefined : { x, y, rotate }}>
        <motion.div
          className="h-full w-full"
          animate={
            reduce
              ? undefined
              : {
                  y: ["0%", `-${amp}%`, "0%", `${amp * 0.5}%`, "0%"],
                  x: ["0%", `${amp * 0.35}%`, "0%", `-${amp * 0.35}%`, "0%"],
                  rotate: [0, 0.6, 0, -0.6, 0],
                }
          }
          transition={{ duration: dur, delay: order * 0.25, repeat: Infinity, ease: "easeInOut" }}
          whileHover={reduce ? undefined : { scale: 1.04 }}
        >
          <button
            type="button"
            onClick={() => onOpen(index)}
            aria-label={`View ${alt(index).toLowerCase()} larger`}
            className="group relative block h-full w-full overflow-hidden bg-ivory-2 outline-none"
            style={{ clipPath: DIAMOND }}
          >
            <Image
              src={photo.src}
              alt={alt(index)}
              fill
              sizes={tile.sizes}
              priority={tile.hero}
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08] group-focus-visible:scale-[1.08] motion-reduce:transition-none"
            />

            {/* soft shade */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-pitch/60 via-pitch/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
            />
            {/* light sweep */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-linear-to-r from-white/0 via-white/30 to-white/0 opacity-0 transition-all duration-[1100ms] ease-out group-hover:left-[130%] group-hover:opacity-100 motion-reduce:hidden"
            />
            {/* inner gold diamond frame (also the keyboard focus indicator) */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full scale-[0.94] text-gold opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
            >
              <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </svg>
            {/* "View" pill — medium/large tiles, tablet and up */}
            {tile.big && (
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-[68%] hidden -translate-x-1/2 translate-y-2 items-center gap-1.5 rounded-full bg-pitch/80 px-3 py-1.5 text-xs font-semibold text-ivory opacity-0 backdrop-blur-sm transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:inline-flex"
              >
                <Expand className="h-3.5 w-3.5 text-gold" />
                View
              </span>
            )}
          </button>
        </motion.div>
      </motion.div>
    </motion.li>
  );
}

function Collage({ collage, onOpen }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const on = useMotionValue(0);
  const field = { mx, my, on };

  // mouse / pen only — on touch screens the tiles just float
  const onMove = (e) => {
    if (e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
    on.set(1);
  };
  const onLeave = () => on.set(0);

  return (
    /* Canvas keeps the collage's own aspect ratio, so it scales 1:1 at every width.
       Phones: bleeds edge to edge (-mx-2) for bigger tiles. */
    <ul
      role="list"
      className="relative -mx-2 sm:mx-auto sm:max-w-2xl lg:max-w-[56rem]"
      style={{ aspectRatio: collage.ratio }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {collage.tiles.map((tile, k) => {
        const i = collage.start + k;
        return (
          <DiamondTile
            key={birthdayPhotos[i].src}
            photo={birthdayPhotos[i]}
            index={i}
            tile={tile}
            order={k}
            onOpen={onOpen}
            field={field}
            aspect={collage.aspect}
          />
        );
      })}
    </ul>
  );
}

export default function Gallery() {
  const [open, setOpen] = useState(null);

  return (
    <section id="gallery" className="overflow-hidden bg-ivory pt-10 pb-20 sm:pt-14 sm:pb-28" aria-labelledby="gallery-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-6 sm:mb-10 sm:flex-row sm:items-end">
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
            Every celebration tells a beautiful story, brought to life through thoughtful themes, creative details, and
            unforgettable decorations.
          </p>
        </div>

        <div className="space-y-6 sm:space-y-10">
          {collages.map((c) => (
            <Collage key={c.start} collage={c} onOpen={setOpen} />
          ))}
        </div>
      </div>

      <Viewer index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </section>
  );
}