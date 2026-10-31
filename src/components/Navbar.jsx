"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import useActiveSection from "./useActiveSection";
import { scrollToSection } from "./scrollToSection";
import { navLinks } from "@/config/site";

const ids = navLinks.map((l) => l.id);

export default function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (e, id) => {
    setOpen(false);
    if (onHome && scrollToSection(id)) e.preventDefault();
  };

  const href = (id) => (id === "home" ? "/" : onHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-pitch"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-[60] bg-pitch backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? "border-b border-gold/25 py-2.5 shadow-[0_14px_40px_rgba(0,0,0,0.55)]"
            : "border-b border-white/[0.06] py-3.5 sm:py-4 "
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo onNavigate={(e) => go(e, "home")} />

          {/* Desktop Navigation Links */}
          <nav aria-label="Main" className="hidden items-center gap-1 sm:gap-2 lg:flex">
            {navLinks.map((item) => {
              const isActive = onHome && active === item.id;
              return (
                <Link
                  key={item.id}
                  href={href(item.id)}
                  onClick={(e) => go(e, item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 ${
                    isActive ? "text-gold font-semibold" : "text-ivory/80 hover:text-gold"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-gold/30 bg-gold/10 shadow-[0_0_16px_rgba(240,179,35,0.12)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="rounded-full p-2.5 text-gold transition-colors hover:bg-white/5 focus-visible:outline-gold"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-x-0 top-full h-[calc(100svh-100%)] overflow-y-auto border-t border-gold/20 bg-pitch px-6 pb-10 pt-4 lg:hidden"
            >
              <ul className="flex flex-col">
                {navLinks.map((item, i) => {
                  const isActive = onHome && active === item.id;
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i }}
                    >
                      <Link
                        href={href(item.id)}
                        onClick={(e) => go(e, item.id)}
                        className={`flex items-center justify-between border-b border-white/10 py-5 font-display text-2xl transition-colors ${
                          isActive ? "text-gold font-medium" : "text-ivory/85 hover:text-gold"
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest text-gold">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                          </span>
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
