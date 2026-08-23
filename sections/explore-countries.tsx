"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Globe2 } from "lucide-react";
import { countries } from "@/data/countries";
import { destinations } from "@/data/destinations";
import { SectionHeading } from "@/components/section-heading";
import { CountryBrowser } from "@/components/country-browser";
import { staggerContainer, slideUp, viewportOnce } from "@/lib/motion";

// A small, curated cross-section of countries (one per major region) —
// each maps to a real destination page. The full 194-country list lives
// in the Browse Countries modal, not in the normal page flow.
const CURATED_SLUGS = [
  "tokyo-japan",
  "rome-italy",
  "paris-france",
  "santorini-greece",
  "reykjavik-iceland",
  "marrakech-morocco",
  "bangkok-thailand",
  "queenstown-new-zealand",
  "rio-de-janeiro-brazil",
  "cape-town-south-africa",
  "sydney-australia",
  "lisbon-portugal",
];

export function ExploreCountries() {
  const [browserOpen, setBrowserOpen] = useState(false);

  const curated = useMemo(() => {
    return CURATED_SLUGS.map((slug) => {
      const destination = destinations.find((d) => d.slug === slug);
      if (!destination) return null;
      const country = countries.find(
        (c) => c.name.toLowerCase() === destination.country.toLowerCase(),
      );
      return { destination, flag: country?.flag ?? "🌍", region: country?.region ?? "" };
    }).filter((entry): entry is NonNullable<typeof entry> => entry !== null);
  }, []);

  return (
    <section id="explore" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Explore countries"
          title="A world of options, a handful to start"
          description="A quick cross-section of where Lumière travels — search all 194 countries in one place."
        />

        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {curated.map(({ destination, flag, region }) => (
            <motion.div key={destination.slug} variants={slideUp}>
              <Link
                href={`/destinations/${destination.slug}`}
                className="focus-ring border-border bg-background hover:border-accent/40 hover:bg-background-secondary group flex flex-col items-center gap-1.5 rounded-xl border px-3 py-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <span
                  className="text-2xl transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                >
                  {flag}
                </span>
                <span className="text-foreground text-sm font-medium">
                  {destination.country}
                </span>
                <span className="text-foreground-secondary text-[11px]">{region}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="border-border bg-background-secondary mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border p-6 sm:flex-row sm:p-8"
        >
          <div className="flex items-center gap-4">
            <span className="from-primary to-accent flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white">
              <Globe2 className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-base font-semibold">All 194 countries</p>
              <p className="text-foreground-secondary text-sm">
                Search by name or capital, grouped by continent or A–Z.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setBrowserOpen(true)}
            className="focus-ring border-border bg-background text-foreground hover:border-accent/40 hover:bg-background-secondary flex shrink-0 items-center justify-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md"
          >
            <Compass className="h-4 w-4" />
            Browse Countries
          </button>
        </motion.div>
      </div>

      <CountryBrowser open={browserOpen} onClose={() => setBrowserOpen(false)} />
    </section>
  );
}
