"use client";

import { useEffect, useRef } from "react";
import Reveal from "./Reveal";
import { InstagramIcon } from "./Icons";
import { contact, reels } from "@/config/site";

/*
 * Muted reels that glide past on their own, like moving GIFs.
 * No-gap loop: one "group" repeats the reels until it's wider than any screen,
 * then the group is rendered twice and the track slides exactly one group (-50%).
 * Each group carries its own trailing gap (pr-5), so the seam is invisible.
 * Videos only play while the section is on screen, to save battery and data.
 */
export default function Reels() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const videos = [...root.querySelectorAll("video")];
    const io = new IntersectionObserver(
      ([entry]) => {
        videos.forEach((v) => {
          if (entry.isIntersecting) v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.15 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  // 3 rounds of 4 reels = 12 cards (~3300px), wider than even ultra-wide screens
  const group = Array.from({ length: 3 }, () => reels).flat();

  const Card = ({ r, i, hidden }) => (
    <li
      aria-hidden={hidden ? "true" : undefined}
      className={`relative w-[190px] shrink-0 sm:w-[240px] lg:w-[260px] ${i % 2 ? "sm:mt-10" : ""}`}
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-[30px] bg-pitch-2 ring-2 ring-gold/40 shadow-[0_24px_60px_-20px_rgba(240,179,35,0.35)]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={r.src}
          poster={r.poster}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-label={hidden ? undefined : r.label}
        />
        <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-pitch/90 to-transparent p-4 pt-10 text-sm font-medium">
          {r.label}
        </span>
      </div>
    </li>
  );

  return (
    <section ref={ref} id="reels" className="overflow-hidden bg-pitch py-16 text-ivory sm:py-20" aria-labelledby="reels-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 text-sm font-semibold text-gold">
              <span className="stripe-rule w-8" aria-hidden="true" />
              In motion
            </p>
            <h2 id="reels-title" className="text-[clamp(2.4rem,5vw,4.4rem)] leading-none">
              See it come alive
            </h2>
          </Reveal>
          {contact.socials.instagram && (
            <a
              href={contact.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-full border border-ivory/25 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-gold hover:text-gold sm:self-auto"
            >
              <InstagramIcon className="h-4 w-4" />
              More on Instagram
            </a>
          )}
        </div>
      </div>

      <div className="relative mt-12 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="reel-track flex w-max will-change-transform">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 gap-5 pr-5" role="list" aria-hidden={copy === 1 ? "true" : undefined}>
              {group.map((r, i) => (
                <Card key={`${copy}-${i}`} r={r} i={i} hidden={copy === 1 || i >= reels.length} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}