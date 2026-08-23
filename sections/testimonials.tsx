"use client";

import { motion } from "framer-motion";
import { MapPin, Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/section-heading";
import { staggerContainer, slideUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-background-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Traveler stories"
          title="What it feels like to travel this way"
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.id}
              variants={slideUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "border-border bg-background relative rounded-2xl border p-7 shadow-sm transition-shadow duration-300 hover:shadow-[0_20px_45px_-24px_rgba(15,118,110,0.35)]",
                // Alternate vertical rhythm so the grid reads as editorial
                // rather than a uniform block of identical tiles.
                i % 2 === 1 && "md:mt-10",
              )}
            >
              <div className="flex items-center justify-between">
                <Quote className="text-primary/25 h-6 w-6" />
                <span className="text-foreground-secondary bg-background-secondary flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium">
                  <MapPin className="h-3 w-3" />
                  {t.flag} {t.destination} · {t.duration}
                </span>
              </div>
              <blockquote className="text-foreground mt-5 text-[1.05rem] leading-relaxed text-balance">
                “{t.quote}”
              </blockquote>
              <figcaption className="border-border mt-6 flex items-center justify-between border-t pt-5">
                <div className="flex items-center gap-3">
                  <span className="from-primary to-accent flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white">
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-foreground text-sm font-semibold">{t.name}</p>
                    <p className="text-foreground-secondary text-xs">{t.role}</p>
                  </div>
                </div>
                <div className="text-foreground flex items-center gap-1 text-xs font-semibold">
                  <Star className="fill-primary text-primary h-3.5 w-3.5" />
                  {t.rating}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
