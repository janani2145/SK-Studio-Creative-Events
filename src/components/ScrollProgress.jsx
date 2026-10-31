"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Thin gold reading-progress bar along the very top of the page
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-linear-to-r from-gold via-gold-soft to-amber"
    />
  );
}
