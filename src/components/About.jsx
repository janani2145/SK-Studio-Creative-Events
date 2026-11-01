import Image from "next/image";
import Reveal from "./Reveal";
import { CheckCircle2, Clock, Palette, ShieldCheck, Sparkles } from "lucide-react";
import { brand, founder, team } from "@/config/site";

export default function About() {
  return (
    <section id="about" className="bg-ivory pt-10 pb-20 sm:pt-14 sm:pb-28" aria-labelledby="about-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ====================================================================
            1. INTRO: Balanced Centered Editorial Layout (Eliminates Lopsided Columns)
            ==================================================================== */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-amber sm:text-sm">
              <span className="stripe-rule w-7" aria-hidden="true" />
              ✦ About SK Creative Events
            </p>
            <h2 id="about-title" className="mt-6 text-[clamp(2.2rem,4.5vw,3.8rem)] font-display leading-[1.12] text-ink">
              From the stage backdrop to the return gifts, one dedicated crew handles it all.
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-clay max-w-3xl mx-auto">
              {brand.fullName} designs, crafts, and executes bespoke celebrations in {brand.serviceArea}. From an intimate living-room first birthday to a grand banquet wedding reception, we take away the event stress with our custom in-house production and punctual execution.
            </p>
          </Reveal>
        </div>

        {/* ====================================================================
            2. FOUNDER STORY & QUOTE
            ==================================================================== */}
        <div className="mt-16 sm:mt-24 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <figure className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
            <div aria-hidden="true" className="jersey-stripes absolute -right-4 -top-4 bottom-8 left-8 rounded-[32px] bg-pitch sm:-right-6 sm:-top-6" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] bg-pitch-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]">
              <Image
                src={founder.photo}
                alt={founder.name ? `${founder.name}, ${founder.role}` : founder.role}
                fill
                sizes="(min-width: 1024px) 40vw, 384px"
                className="object-cover object-[50%_25%]"
              />
            </div>
          </figure>

          <div className="lg:col-span-7">
            <span className="font-display text-7xl leading-none text-gold" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote className="-mt-3 font-display text-[clamp(1.6rem,3vw,2.4rem)] italic leading-snug text-ink">
              {founder.quote}
            </blockquote>
            <p className="mt-6 text-clay">
              {founder.name && <span className="font-display text-xl text-ink">{founder.name}</span>}
              <span className="block text-sm">{founder.role}</span>
            </p>

            <p className="mt-8 max-w-xl leading-relaxed text-clay">
              {founder.name} started SK Creative Events with balloon arches and theme backdrops for first birthdays. Today the crew handles
              full birthday packages, wedding stages, grand entries, DJ, catering and more, all from our base in Kodambakkam, Chennai.
            </p>
          </div>
        </div>

        {/* ====================================================================
            3. MEET THE CREW: Rich, Creative, Full-Width Showcase
            (No empty space, structured capabilities, trust badges, and CTA)
            ==================================================================== */}
        <div className="mt-24 sm:mt-32 rounded-[32px] border border-ink/10 bg-ivory-2/60 p-6 sm:p-10 lg:p-12 shadow-xs">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">

            {/* Left: Crew Photo with Custom Badge & Callout */}
            <div className="lg:col-span-6 flex flex-col gap-5">
              <div className="relative overflow-hidden rounded-[24px] bg-pitch shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)]">
                <Image
                  src={team.photo}
                  alt="The SK Creative Events crew in their black and gold team jerseys with the founder"
                  width={team.width}
                  height={team.height}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-auto w-full object-cover"
                />
                <div className="bg-pitch p-4 text-ivory sm:absolute sm:inset-x-0 sm:bottom-0 sm:bg-transparent sm:bg-linear-to-t sm:from-pitch/95 sm:via-pitch/60 sm:to-transparent sm:p-6">
                  <div className="flex items-center gap-2 text-gold text-xs font-semibold tracking-wider uppercase">
                    <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                    Official SK Creative Events Squad
                  </div>
                  <p className="mt-1 font-display text-lg sm:text-xl text-ivory">
                    Trained · Disciplined · Uniformed
                  </p>
                  <p className="text-xs text-smoke mt-0.5">
                    Kodambakkam, Chennai · Operating across Tamil Nadu
                  </p>
                </div>
              </div>

              {/* Trust Callout beneath photo */}
              <div className="rounded-2xl border border-ink/10 bg-ivory p-5 shadow-xs">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/20 text-ink">
                    <CheckCircle2 className="h-5 w-5 text-amber" />
                  </span>
                  <div>
                    <h4 className="font-semibold text-ink text-sm sm:text-base">The Black &amp; Gold Jersey Guarantee</h4>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-clay">
                      If you see these black and gold jerseys at your hall, your event is managed by our verified permanent crew — never outsourced daily labor.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Rich Crew Capabilities & Details (Fills previous empty space) */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber">
                  <span className="stripe-rule w-6" aria-hidden="true" />
                  Behind Every Setup
                </p>
                <h3 className="mt-3 text-[clamp(1.8rem,3vw,2.6rem)] font-display leading-tight text-ink">
                  Meet the Crew That Makes Magic Happen
                </h3>
                <p className="mt-3 leading-relaxed text-clay">
                  Behind every viral theme backdrop and picture-perfect stage is our tight-knit crew of fabricators, balloon sculptors, and electrical riggers. We work in sync from dawn to midnight so your celebration unfolds effortlessly.
                </p>

                {/* 4 Crew Specialties Cards */}
                <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
                  <div className="rounded-xl border border-ink/10 bg-ivory p-4 shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <Palette className="h-4 w-4 text-gold" />
                      <h4 className="font-semibold text-sm text-ink">Theme Fabrication</h4>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-clay">
                      In-house 3D thermocol sculpting, laser woodframes, and custom character cutouts.
                    </p>
                  </div>

                  <div className="rounded-xl border border-ink/10 bg-ivory p-4 shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="h-4 w-4 text-gold" />
                      <h4 className="font-semibold text-sm text-ink">Balloon Artistry</h4>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-clay">
                      Organic garland arches, helium clusters, and color-matched palette gradients.
                    </p>
                  </div>

                  <div className="rounded-xl border border-ink/10 bg-ivory p-4 shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <Clock className="h-4 w-4 text-gold" />
                      <h4 className="font-semibold text-sm text-ink">Light &amp; Pyro Rigging</h4>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-clay">
                      Focus warm spotlights, cold pyro stage sparks, and dramatic entry fog machines.
                    </p>
                  </div>

                  <div className="rounded-xl border border-ink/10 bg-ivory p-4 shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="h-4 w-4 text-gold" />
                      <h4 className="font-semibold text-sm text-ink">Clean Hall Teardown</h4>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-clay">
                      Prompt pack-up after event end without damaging hall paint or venue fixtures.
                    </p>
                  </div>
                </div>

                {/* Event Day Protocol & Direct CTA */}
                <div className="mt-6 rounded-2xl bg-pitch p-5 text-ivory">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gold">Ready to plan?</p>
                      <p className="text-sm text-smoke mt-0.5">Let our crew transform your celebration hall.</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <a
                        href="#contact"
                        className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-gold to-amber px-5 py-2.5 text-xs font-semibold text-pitch shadow-sm transition-transform hover:-translate-y-0.5"
                      >
                        Plan With Our Crew
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
