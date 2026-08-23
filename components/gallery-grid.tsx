"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { LandmarkIcon } from "@/components/ui/landmark-icon";
import { staggerContainer, scaleIn, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types";

const spanClasses: Record<GalleryItem["size"], string> = {
  sm: "sm:row-span-1",
  md: "sm:row-span-2",
  lg: "sm:row-span-2 sm:col-span-2",
};

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const showPrev = () =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length));
  const showNext = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % items.length));

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowLeft") {
        setActiveIndex((i) =>
          i === null ? null : (i - 1 + items.length) % items.length,
        );
      }
      if (e.key === "ArrowRight") {
        setActiveIndex((i) => (i === null ? null : (i + 1) % items.length));
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, items.length]);

  const active = activeIndex === null ? null : items[activeIndex];

  return (
    <>
      <motion.div
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid auto-rows-[9rem] grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            variants={scaleIn}
            onClick={() => setActiveIndex(i)}
            aria-label={`View ${item.title}, ${item.location}`}
            className={cn(
              "focus-ring group relative overflow-hidden rounded-2xl text-left",
              spanClasses[item.size],
            )}
          >
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${item.gradient[0]}, ${item.gradient[1]})`,
              }}
            >
              <LandmarkIcon motif={item.motif} className="h-16 w-16 text-white/80" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="font-display text-sm font-semibold text-white">
                {item.title}
              </p>
              <p className="text-xs text-white/80">{item.location}</p>
            </figcaption>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title}, ${active.location}`}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close preview"
              className="focus-ring absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
              className="focus-ring absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="focus-ring absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-8"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${active.gradient[0]}, ${active.gradient[1]})`,
              }}
            >
              <div className="flex h-full items-center justify-center">
                <LandmarkIcon motif={active.motif} className="h-32 w-32 text-white/80" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="font-display text-xl font-semibold text-white">
                  {active.title}
                </p>
                <p className="mt-1 text-sm text-white/80">{active.location}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
