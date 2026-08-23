"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, PlayCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { FilmModal } from "@/components/ui/film-modal";
import { slideUp, staggerContainer } from "@/lib/motion";

export function Hero({ worldMap }: { worldMap: ReactNode }) {
  const [filmOpen, setFilmOpen] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Subtle parallax: the map drifts slightly slower than the page as the
  // hero scrolls out of view.
  const mapY = useTransform(scrollYProgress, [0, 1], [0, 48]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-16"
    >
      <AmbientBackground variant="hero" className="-z-20" />

      <motion.div
        style={{ y: mapY }}
        className="text-foreground-secondary/70 pointer-events-none absolute inset-x-0 top-16 -z-10 mx-auto max-w-5xl opacity-70 sm:opacity-90"
        aria-hidden="true"
      >
        {worldMap}
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <motion.div variants={staggerContainer(0.14)} initial="hidden" animate="show">
          <motion.span
            variants={slideUp}
            className="border-border bg-background-secondary/80 text-primary glass inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wider uppercase"
          >
            A calmer way to travel
          </motion.span>

          <motion.h1
            variants={slideUp}
            className="font-display text-foreground mt-6 text-5xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-[3.5rem] xl:text-7xl"
          >
            Journeys, planned like{" "}
            <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
              they matter.
            </span>
          </motion.h1>

          <motion.p
            variants={slideUp}
            className="text-foreground-secondary mt-6 max-w-lg text-lg leading-relaxed text-balance"
          >
            Lumière routes every trip by hand — vetted stays, paced itineraries, and local
            guides who know the place better than any guidebook.
          </motion.p>

          <motion.div
            variants={slideUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link href="/plan" className={buttonVariants({ size: "lg" })}>
              Plan your trip
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Button variant="secondary" size="lg" onClick={() => setFilmOpen(true)}>
              <PlayCircle className="h-4 w-4" />
              Watch the film
            </Button>
          </motion.div>
        </motion.div>

        {/* Staggered, overlapping floating cards — the hero's depth cue,
            sitting above the world map rather than duplicating it. */}
        <div className="relative mx-auto hidden h-[22rem] w-full max-w-sm lg:block">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="animate-float border-border bg-background/90 glass absolute top-0 right-4 w-64 rounded-2xl border p-5 shadow-[0_20px_45px_-20px_rgba(212,165,116,0.35)]"
          >
            <p className="text-foreground-secondary text-xs">Next departure</p>
            <p className="font-display mt-1 text-lg font-semibold">Kyoto · 6 days</p>
            <div className="border-border text-foreground-secondary mt-4 flex items-center gap-1.5 border-t pt-3 text-xs">
              <Star className="fill-primary text-primary h-3.5 w-3.5" />
              4.9 average trip rating
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ animationDelay: "-3s" }}
            className="animate-float border-border bg-background/90 glass absolute top-40 left-0 w-56 rounded-2xl border p-5 shadow-[0_20px_45px_-20px_rgba(15,118,110,0.35)]"
          >
            <div className="flex -space-x-3">
              {["EV", "MC", "AO", "JR"].map((initials) => (
                <span
                  key={initials}
                  className="border-background bg-background-secondary text-foreground flex h-8 w-8 items-center justify-center rounded-full border-2 text-[11px] font-semibold"
                >
                  {initials}
                </span>
              ))}
            </div>
            <p className="text-foreground-secondary mt-3 text-xs leading-relaxed">
              <span className="text-foreground font-semibold">4.9/5</span> from 12,000+
              travelers
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            style={{ animationDelay: "-5s" }}
            className="animate-float border-border bg-background/90 glass absolute right-10 bottom-0 rounded-2xl border px-4 py-3 shadow-lg"
          >
            <p className="text-foreground-secondary text-[11px]">
              Routes planned this week
            </p>
            <p className="font-display text-primary text-2xl font-semibold">42</p>
          </motion.div>
        </div>
      </div>

      <FilmModal open={filmOpen} onClose={() => setFilmOpen(false)} />
    </section>
  );
}
