"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { destinations } from "@/data/destinations";
import { LandmarkIcon } from "@/components/ui/landmark-icon";

interface FilmModalProps {
  open: boolean;
  onClose: () => void;
}

const slides = destinations.slice(0, 5);
const SLIDE_MS = 3200;

export function FilmModal({ open, onClose }: FilmModalProps) {
  const [active, setActive] = useState(0);

  // Reset to the first slide whenever the modal transitions from closed to
  // open. Adjusting state during render (rather than in the effect below)
  // avoids an extra effect-driven re-render — React's recommended pattern
  // for "reset state when a prop changes."
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setActive(0);
  }

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const interval = window.setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, SLIDE_MS);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      window.clearInterval(interval);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Lumière showreel"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-2xl shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close showreel"
              className="focus-ring absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
            >
              <X className="h-4 w-4" />
            </button>

            <AnimatePresence mode="wait">
              {slides.map(
                (slide, i) =>
                  i === active && (
                    <motion.div
                      key={slide.slug}
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${slide.gradient[0]}, ${slide.gradient[1]})`,
                      }}
                    >
                      <LandmarkIcon
                        motif={slide.motif}
                        className="h-32 w-32 text-white/70 sm:h-40 sm:w-40"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 sm:p-8">
                        <p className="font-display text-xl font-semibold text-white sm:text-2xl">
                          {slide.city}, {slide.country}
                        </p>
                        <p className="mt-1 max-w-md text-sm text-white/80">
                          {slide.description}
                        </p>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>

            <div className="absolute top-4 left-4 z-10 flex gap-1.5">
              {slides.map((slide, i) => (
                <span
                  key={slide.slug}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-white" : "w-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
