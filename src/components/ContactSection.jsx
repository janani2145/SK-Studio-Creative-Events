import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import { InstagramIcon, WhatsAppIcon } from "./Icons";
import { contact, mapEmbedUrl, mapLinkUrl, whatsappLink } from "@/config/site";

/*
 * Compact two-column contact:
 *  left  = heading, quick-action tiles and the map with the address on it
 *  right = the enquiry form in a dark card
 * Light background so it doesn't merge with the black footer below.
 */
export default function ContactSection() {
  const tiles = [
    { Icon: WhatsAppIcon, label: "WhatsApp", value: contact.phone, href: whatsappLink(), external: true },
    { Icon: Phone, label: "Call", value: contact.phone, href: contact.phoneHref },
    contact.phone2 && { Icon: Phone, label: "Also call", value: contact.phone2, href: contact.phone2Href },
    contact.socials.instagram
      ? { Icon: InstagramIcon, label: "Instagram", value: "@sk.creative.events", href: contact.socials.instagram, external: true }
      : { Icon: Clock, label: "Hours", value: contact.hours },
  ].filter(Boolean);

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-ivory-2 pt-10 pb-16 text-ink sm:pt-14 sm:pb-24" aria-labelledby="contact-title">

      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        {/* Left: heading, quick actions, map */}
        <div className="flex flex-col lg:col-span-5">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold text-amber">
              <span className="stripe-rule w-8" aria-hidden="true" />
              Contact
            </p>
            <h2 id="contact-title" className="text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[1.02]">
              Tell us the date.{" "}
              <span className="italic text-amber">
                We&apos;ll bring the celebration.
              </span>
            </h2>
          </Reveal>

          <ul className="mt-8 grid grid-cols-2 gap-3" role="list">
            {tiles.map(({ Icon, label, value, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full flex-col items-start gap-3 rounded-2xl bg-ivory p-4 sm:flex-row sm:items-center shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)] ring-1 ring-ink/5 transition-all hover:-translate-y-0.5 hover:ring-gold/60"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-gold transition-colors group-hover:bg-gold group-hover:text-pitch">
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-clay">{label}</span>
                    <span className="block break-words text-sm font-semibold">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Map card */}
          <div className="relative mt-3 min-h-[260px] flex-1 overflow-hidden rounded-2xl bg-pitch-2 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.4)] ring-1 ring-ink/10">
            <div
              aria-hidden="true"
              className="absolute inset-0 grid place-items-center [background-image:linear-gradient(var(--color-pitch-3)_1px,transparent_1px),linear-gradient(90deg,var(--color-pitch-3)_1px,transparent_1px)] [background-size:32px_32px]"
            >
              <MapPin className="h-8 w-8 text-gold" />
            </div>
            <iframe
              title={`Map showing ${contact.address}`}
              src={mapEmbedUrl()}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-xl bg-pitch/90 p-3 ring-1 ring-gold/30 backdrop-blur-md">
              <MapPin className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <p className="min-w-0 flex-1 text-xs leading-snug text-ivory/85">
                {contact.address}
                <span className="mt-0.5 block text-smoke">{contact.hours}</span>
              </p>
              <a
                href={mapLinkUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions in Google Maps"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-pitch transition-colors hover:bg-gold-soft"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="lg:col-span-7">
          <div className="relative isolate h-full overflow-hidden rounded-[28px] bg-pitch p-5 text-ivory shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)] sm:p-8">
            <span aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-gold/15 blur-[90px]" />
            <span aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-gold/70 to-transparent" />
            <h3 className="font-display text-2xl sm:text-3xl">Plan your event</h3>
            <p className="mt-1.5 text-sm text-smoke">Fill in what you know. It opens WhatsApp with your details ready to send.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}