import { testimonials } from "@/config/site";

export default function Testimonials() {
  return (
    <section className="bg-ivory py-16 sm:py-24" aria-labelledby="reviews-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="reviews-title" className="text-[clamp(2.4rem,5vw,4.4rem)] leading-none text-ink">
          In their words
        </h2>
        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col">
              <span className="font-display text-7xl leading-none text-gold" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="-mt-4 font-display text-[1.45rem] italic leading-snug text-ink">{t.quote}</blockquote>
              <figcaption className="mt-6 text-sm text-clay">
                <span className="font-semibold text-ink">{t.name}</span>, {t.event}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
