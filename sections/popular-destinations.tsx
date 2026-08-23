"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, ArrowUpRight, ChevronDown } from "lucide-react";
import { destinations } from "@/data/destinations";
import { SectionHeading } from "@/components/section-heading";
import { DestinationArt } from "@/components/destination-art";
import { staggerContainer, slideUp, viewportOnce } from "@/lib/motion";
import type { Destination } from "@/types";

function HoverArrow() {
  return (
    <span className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/25 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
      <ArrowUpRight className="h-4 w-4" />
    </span>
  );
}

function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <motion.article
      variants={slideUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group border-border bg-background relative overflow-hidden rounded-2xl border shadow-sm transition-shadow duration-300 hover:shadow-[0_20px_45px_-20px_rgba(15,118,110,0.35)]"
    >
      <Link
        href={`/destinations/${destination.slug}`}
        className="focus-ring absolute inset-0 z-20 rounded-2xl"
        aria-label={`View ${destination.city}, ${destination.country} details`}
      />
      <div className="relative h-40">
        <DestinationArt destination={destination} iconClassName="h-20 w-20">
          <HoverArrow />
        </DestinationArt>
        <span className="absolute bottom-3 left-3 rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
          {destination.category}
        </span>
      </div>
      <div className="p-5">
        <p className="text-primary text-xs font-semibold tracking-wider uppercase">
          {destination.country}
        </p>
        <h3 className="font-display mt-1 text-xl font-semibold tracking-tight">
          {destination.city}
        </h3>
        <p className="text-foreground-secondary mt-2 line-clamp-2 text-sm leading-relaxed">
          {destination.description}
        </p>
        <div className="border-border text-foreground-secondary mt-4 flex items-center gap-1.5 border-t pt-4 text-xs">
          <CalendarDays className="h-3.5 w-3.5" />
          Best {destination.bestSeason}
        </div>
      </div>
    </motion.article>
  );
}

export function PopularDestinations() {
  const [featured, ...rest] = destinations;
  const stacked = rest.slice(0, 1);
  const remainder = rest.slice(1);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const MOBILE_VISIBLE_COUNT = 4;

  return (
    <section id="destinations" className="bg-background-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Popular destinations"
          title="Places people keep going back to"
          description="A shortlist shaped by repeat travelers, not search trends."
          align="left"
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {/* Featured destination: large horizontal card, the visual anchor
              of the section rather than one tile among equals. */}
          <motion.article
            variants={slideUp}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="group border-border bg-background relative h-fit overflow-hidden rounded-2xl border shadow-sm transition-shadow duration-300 hover:shadow-[0_24px_55px_-24px_rgba(15,118,110,0.4)] lg:col-span-2 lg:self-start"
          >
            <Link
              href={`/destinations/${featured.slug}`}
              className="focus-ring absolute inset-0 z-20 rounded-2xl"
              aria-label={`View ${featured.city}, ${featured.country} details`}
            />
            <div className="grid grid-cols-1 sm:grid-cols-5">
              <div className="relative h-64 sm:col-span-3 sm:h-auto">
                <DestinationArt
                  destination={featured}
                  iconClassName="h-32 w-32 sm:h-40 sm:w-40"
                  priority
                >
                  <HoverArrow />
                </DestinationArt>
                <span className="absolute bottom-4 left-4 rounded-full bg-black/30 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                  {featured.category}
                </span>
              </div>
              <div className="flex flex-col justify-center p-8 sm:col-span-2 sm:p-10">
                <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                  {featured.country} · Featured
                </p>
                <h3 className="font-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                  {featured.city}
                </h3>
                <p className="text-foreground-secondary mt-4 text-base leading-relaxed">
                  {featured.description}
                </p>
                <div className="border-border text-foreground-secondary mt-6 flex items-center gap-1.5 border-t pt-4 text-xs">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Best {featured.bestSeason}
                </div>
                <p className="text-accent group-hover:text-primary mt-6 flex items-center gap-1.5 text-sm font-semibold transition-colors">
                  Explore {featured.city}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </p>
              </div>
            </div>
          </motion.article>

          {stacked.map((destination) => (
            <DestinationCard key={destination.slug} destination={destination} />
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
        >
          {remainder.map((destination, i) => (
            <div
              key={destination.slug}
              className={
                !mobileExpanded && i >= MOBILE_VISIBLE_COUNT ? "hidden sm:block" : ""
              }
            >
              <DestinationCard destination={destination} />
            </div>
          ))}
        </motion.div>

        {remainder.length > MOBILE_VISIBLE_COUNT && (
          <div className="mt-6 flex justify-center sm:hidden">
            <button
              type="button"
              onClick={() => setMobileExpanded((prev) => !prev)}
              className="focus-ring border-border bg-background text-foreground hover:border-accent/40 hover:bg-background-secondary inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-300"
            >
              {mobileExpanded ? "Show fewer" : "Show more destinations"}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${mobileExpanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            href="/destinations"
            className="focus-ring border-border text-foreground hover:border-primary/30 hover:bg-background bg-background-secondary inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
          >
            View all destinations
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
