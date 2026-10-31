"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { WhatsAppIcon } from "./Icons";
import { whatsappLink } from "@/config/site";

// Appears after the visitor scrolls past the hero, so it never covers the hero content.
export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // On the home page, wait until the pinned hero has finished or scrolled past 400px
      const hero = document.querySelector("[data-hero]");
      const threshold = hero ? hero.offsetHeight - window.innerHeight * 0.6 : 400;
      setShow(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-none fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-[70] flex flex-col items-center gap-3">
          {/* Scroll to Top Button */}
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            title="Back to top"
            initial={{ opacity: 0, scale: 0.6, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 16 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="group pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-pitch text-gold shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-2 ring-gold/60 transition-colors duration-200 hover:bg-gold hover:text-pitch focus-visible:outline-gold"
          >
            <ArrowUp className="h-7 w-7 stroke-[2.2] transition-transform duration-200 group-hover:-translate-y-0.5" />
          </motion.button>

          {/* Floating WhatsApp CTA */}
          <motion.a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with SK Creative Events on WhatsApp"
            title="Chat with us on WhatsApp"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ duration: 0.25 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="group pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-2 ring-gold/60"
          >
            <WhatsAppIcon className="h-7 w-7" />
          </motion.a>
        </div>
      )}
    </AnimatePresence>
  );
}
