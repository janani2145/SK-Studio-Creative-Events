import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YouTubeIcon } from "./Icons";
import { brand, contact, navLinks, services, whatsappLink } from "@/config/site";

export default function Footer() {
  const socials = [
    { label: "Instagram", href: contact.socials.instagram, Icon: InstagramIcon },
    { label: "Facebook", href: contact.socials.facebook, Icon: FacebookIcon },
    { label: "YouTube", href: contact.socials.youtube, Icon: YouTubeIcon },
    { label: "WhatsApp", href: whatsappLink(), Icon: WhatsAppIcon },
  ].filter((s) => s.href);

  return (
    <footer className="relative isolate overflow-hidden border-t-4 border-gold bg-pitch text-ivory">
      {/* Team-jersey stripes */}
      <div
        aria-hidden="true"
        className="jersey-stripes absolute inset-y-0 right-0 -z-10 w-full opacity-60 [mask-image:linear-gradient(100deg,transparent_35%,black_85%)] lg:w-[75%]"
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <Logo size="lg" />
          <p className="mt-6 max-w-xs leading-relaxed text-smoke">
            Theme decoration and full event planning in {brand.serviceArea}. {brand.tagline}.
          </p>
          <ul className="mt-6 flex gap-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-ivory/80 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className="font-sans text-sm font-semibold text-gold">Pages</h2>
          <ul className="mt-4 space-y-3">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={l.id === "home" ? "#home" : `#${l.id}`} className="text-ivory/75 hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-sm font-semibold text-gold">Services</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1">
            {services.slice(0, 6).map((s) => (
              <li key={s.id}>
                <a href="#services" className="text-ivory/75 hover:text-gold">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <address className="not-italic lg:col-span-3">
          <h2 className="font-sans text-sm font-semibold text-gold">Contact</h2>
          <ul className="mt-4 space-y-3 text-ivory/75">
            <li>
              <a href={contact.phoneHref} className="inline-flex items-center gap-3 hover:text-gold">
                <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
                {contact.phone}
              </a>
            </li>
            {contact.phone2 && (
              <li>
                <a href={contact.phone2Href} className="inline-flex items-center gap-3 hover:text-gold">
                  <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
                  {contact.phone2}
                </a>
              </li>
            )}
            {contact.email && <li>
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-3 break-all hover:text-gold">
                <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                {contact.email}
              </a>
            </li>}
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              {contact.address}
            </li>
            <li className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-gold" aria-hidden="true" />
              {contact.hours}
            </li>
          </ul>
        </address>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-smoke sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {brand.fullName}. All rights reserved.
          </p>
          <p>Made with care in {brand.city}.</p>
        </div>
      </div>
    </footer>
  );
}