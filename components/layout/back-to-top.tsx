"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function BackToTop() {
  const { scrolled } = useScrollProgress();

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          aria-label="Back to top"
          className="focus-ring border-border bg-background/90 text-foreground hover:border-primary/30 hover:text-primary fixed right-6 bottom-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border shadow-lg backdrop-blur-md md:right-8 md:bottom-8"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
