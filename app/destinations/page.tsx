import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { destinations } from "@/data/destinations";
import { PageHeader } from "@/components/page-header";
import { DestinationArt } from "@/components/destination-art";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Every destination Lumière routes trips through — vetted stays, paced itineraries, and local guides.",
};

export default function DestinationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="All destinations"
        title="Everywhere Lumière goes"
        description="Hand-picked, not algorithmically ranked — each one shaped by travelers who went back a second time."
      />

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <article
              key={destination.slug}
              className="group border-border bg-background relative overflow-hidden rounded-2xl border shadow-sm transition-shadow duration-300 hover:shadow-[0_20px_45px_-20px_rgba(15,118,110,0.35)]"
            >
              <Link
                href={`/destinations/${destination.slug}`}
                className="focus-ring absolute inset-0 z-20 rounded-2xl"
                aria-label={`View ${destination.city}, ${destination.country} details`}
              />
              <div className="relative h-44">
                <DestinationArt destination={destination} iconClassName="h-24 w-24" />
                <span className="absolute bottom-3 left-3 rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  {destination.category}
                </span>
              </div>
              <div className="p-5">
                <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                  {destination.country}
                </p>
                <h2 className="font-display mt-1 text-xl font-semibold tracking-tight">
                  {destination.city}
                </h2>
                <p className="text-foreground-secondary mt-2 text-sm leading-relaxed">
                  {destination.description}
                </p>
                <div className="border-border text-foreground-secondary mt-4 flex items-center gap-1.5 border-t pt-4 text-xs">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Best {destination.bestSeason}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
