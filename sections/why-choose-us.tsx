"use client";

import { motion } from "framer-motion";
import { BedDouble, Compass, MapPinned, Zap, type LucideIcon } from "lucide-react";
import { features } from "@/data/features";
import { destinations } from "@/data/destinations";
import { slideUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  BedDouble,
  Compass,
  MapPinned,
  Zap,
};

// Layout choreography per card — asymmetric on purpose: a wide banner, two
// overlapping mid-size cards, and a slim closing strip, instead of a
// uniform grid of equal tiles.
const layouts = ["sm:col-span-2", "sm:col-span-1", "sm:col-span-1", "sm:col-span-2"];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-2xl"
        >
          <span className="border-border bg-background-secondary text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase">
            Why Lumière
          </span>
          <h2 className="font-display text-foreground mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Careful planning, told through real trips.
          </h2>
          <p className="text-foreground-secondary mt-4 leading-relaxed text-balance">
            Vetted hotels, guides who actually live there, and a pace that leaves room for
            the parts you can&apos;t plan — here&apos;s what that looks like on the
            ground.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {features.map((feature, i) => {
            const Icon = icons[feature.icon];
            const destination = feature.destinationSlug
              ? destinations.find((d) => d.slug === feature.destinationSlug)
              : undefined;

            return (
              <motion.article
                key={feature.id}
                variants={slideUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className={cn(
                  "group border-border bg-background relative overflow-hidden rounded-2xl border shadow-sm transition-shadow duration-300 hover:shadow-[0_20px_45px_-24px_rgba(15,118,110,0.35)]",
                  layouts[i],
                )}
              >
                <div className="flex h-full">
                  {/* A slim destination-coded accent bar — color-coded to the
                      place referenced, without illustrating it — keeps the
                      card text-led rather than icon-led. */}
                  {destination && (
                    <div
                      aria-hidden="true"
                      className="w-1.5 shrink-0 transition-[width] duration-300 group-hover:w-2.5"
                      style={{
                        background: `linear-gradient(180deg, ${destination.gradient[0]}, ${destination.gradient[1]})`,
                      }}
                    />
                  )}

                  <div className="flex flex-1 flex-col justify-center p-6 sm:p-7">
                    <span className="from-primary to-accent mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {feature.title}
                    </h3>
                    {feature.story && (
                      <p className="text-foreground mt-2 text-sm leading-relaxed italic">
                        “{feature.story}”
                      </p>
                    )}
                    <p className="text-foreground-secondary mt-2 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    {destination && (
                      <p className="text-accent mt-3 text-xs font-semibold tracking-wide uppercase">
                        {destination.city}, {destination.country}
                      </p>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
