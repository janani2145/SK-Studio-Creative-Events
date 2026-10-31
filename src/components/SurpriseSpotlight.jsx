"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { DoorOpen, EyeOff, MessageCircle, Volume2, VolumeX } from "lucide-react";
import Reveal from "./Reveal";
import { WhatsAppIcon } from "./Icons";
import { surprise, whatsappLink } from "@/config/site";

const steps = [
  { Icon: MessageCircle, title: "Tell us quietly", text: "Share the plan, date and venue on WhatsApp. We keep it between us." },
  { Icon: EyeOff, title: "We set up in secret", text: "Balloons, lights and the cake table go up while they're kept away." },
  { Icon: DoorOpen, title: "The door opens", text: "Blindfold off. Watch their face, we'll be recording it for you." },
];

/*
 * Surprise-party spotlight: the anniversary surprise video in a phone frame.
 * Plays muted while on screen; a button lets visitors turn the sound on.
 */
export default function SurpriseSpotlight() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), {
      threshold: 0.3,
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  return (
    <section id="surprise" className="relative isolate overflow-hidden bg-ivory-2 py-24 sm:py-32" aria-labelledby="surprise-title">
      {/*
        Mobile order: heading -> video -> step cards + button.
        Desktop: heading and cards on the left, video on the right spanning both rows.
      */}
      <div className="mx-auto grid max-w-7xl gap-y-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-0 lg:px-8">
        {/* Heading + intro */}
        <div className="lg:col-span-7 lg:row-start-1 lg:self-end">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 text-sm font-semibold text-amber">
              <span className="stripe-rule w-8" aria-hidden="true" />
              Surprise planning
            </p>
            <h2 id="surprise-title" className="text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] text-ink">
              Planning a surprise? <span className="italic text-amber">We keep the secret.</span>
            </h2>
          </Reveal>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-clay">{surprise.text}</p>
        </div>

        {/* Video in a phone frame */}
        <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[320px] lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:max-w-[360px] lg:self-center">
          <div aria-hidden="true" className="jersey-stripes absolute -inset-5 -z-10 rotate-6 rounded-[44px] bg-pitch opacity-95 sm:-inset-8" />
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[9/16] overflow-hidden rounded-[36px] bg-pitch shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] ring-[6px] ring-pitch"
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={surprise.video}
              poster={surprise.poster}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={surprise.label}
            />
            <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-pitch">
              {surprise.label}
            </span>
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={!muted}
              aria-label={muted ? "Turn sound on" : "Turn sound off"}
              className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-pitch/80 px-3.5 py-2 text-xs font-semibold text-ivory backdrop-blur-md transition-colors hover:bg-gold hover:text-pitch"
            >
              {muted ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
              {muted ? "Tap for sound" : "Sound on"}
            </button>
          </motion.div>
        </div>

        {/* Step cards + button */}
        <div className="lg:col-span-7 lg:row-start-2 lg:mt-10 lg:self-start">
          <ol className="grid gap-4 sm:grid-cols-3" role="list">
            {steps.map(({ Icon, title, text }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl bg-ivory p-5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)] ring-1 ring-ink/5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-gold">
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-xl text-ink">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-clay">{text}</p>
              </motion.li>
            ))}
          </ol>

          <a
            href={whatsappLink("Hi SK Creative Events! I'm planning a surprise and need your help setting it up.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-ivory transition-colors hover:bg-gold hover:text-pitch"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Plan a surprise
          </a>
        </div>
      </div>
    </section>
  );
}