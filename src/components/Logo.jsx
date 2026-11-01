import Image from "next/image";
import Link from "next/link";
import { brand } from "@/config/site";

export default function Logo({ size = "md", onNavigate }) {
  const h = size === "lg" ? "h-20 sm:h-24" : "h-11 sm:h-14";
  return (
    <Link href="/" scroll={true} onClick={onNavigate} className="group inline-flex items-center gap-3" aria-label={`${brand.fullName}, home`}>
      <Image
        src={brand.logo}
        alt="SK Creative Events logo"
        width={640}
        height={793}
        priority
        sizes="80px"
        className={`${h} w-auto drop-shadow-[0_4px_14px_rgba(240,179,35,0.25)] transition-transform duration-300 group-hover:-rotate-3`}
      />
      <span className="flex flex-col leading-tight">
        <span className={`font-display ${size === "lg" ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl md:text-2xl"} text-ivory`}>
          SK <span className="text-gold">Creative Events</span>
        </span>
        {brand.descriptor ? (
          <span className="mt-1 text-[11px] tracking-[0.18em] text-smoke">{brand.descriptor}</span>
        ) : null}
      </span>
    </Link>
  );
}
