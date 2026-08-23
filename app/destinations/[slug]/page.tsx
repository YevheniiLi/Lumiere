import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, Star } from "lucide-react";
import { destinations } from "@/data/destinations";
import { LandmarkIcon } from "@/components/ui/landmark-icon";
import { DestinationArt } from "@/components/destination-art";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  Highlights,
  ItineraryTimeline,
  MapEmbed,
  MiniGallery,
  WeatherWidget,
} from "@/components/destination-detail";

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinations.find((d) => d.slug === slug);
  if (!destination) return {};

  return {
    title: `${destination.city}, ${destination.country}`,
    description: destination.description,
  };
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = destinations.find((d) => d.slug === slug);
  if (!destination) notFound();

  const more = destinations.filter((d) => d.slug !== slug).slice(0, 3);

  return (
    <>
      <div className="relative flex h-[46vh] min-h-[22rem] items-end overflow-hidden pt-16">
        <div className="absolute inset-0">
          <DestinationArt
            destination={destination}
            showRating={false}
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative mx-auto w-full max-w-5xl px-6 pb-10 lg:px-8">
          <Link
            href="/destinations"
            className="focus-ring mb-4 inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-white/85 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All destinations
          </Link>
          <p className="text-xs font-semibold tracking-wider text-white/80 uppercase">
            {destination.country}
          </p>
          <h1 className="font-display mt-1 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {destination.city}
          </h1>
        </div>
      </div>

      <section className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-foreground text-lg leading-relaxed text-balance">
              {destination.description}
            </p>
            <p className="text-foreground-secondary mt-4 leading-relaxed">
              Lumière paces this trip around what actually makes {destination.city}
              worth the flight — not a checklist of landmarks, but the rhythm locals keep.
              Expect fewer stops per day than a typical itinerary, and more room to stay
              somewhere a little longer than planned.
            </p>
          </div>

          <aside className="border-border bg-background-secondary h-fit rounded-2xl border p-6">
            <dl className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-foreground-secondary flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Rating
                </dt>
                <dd className="font-semibold">{destination.rating} / 5</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-foreground-secondary flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Best season
                </dt>
                <dd className="font-semibold">{destination.bestSeason}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-foreground-secondary flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Region
                </dt>
                <dd className="font-semibold">{destination.region}</dd>
              </div>
            </dl>
            <Link
              href="/plan"
              className={buttonVariants({ className: "mt-6 w-full justify-center" })}
            >
              Plan a trip here
            </Link>
          </aside>
        </div>

        <div className="border-border mt-16 border-t pt-12">
          <h2 className="font-display text-xl font-semibold tracking-tight">Gallery</h2>
          <div className="mt-6">
            <MiniGallery destination={destination} />
          </div>
        </div>

        <div className="border-border mt-16 border-t pt-12">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Highlights
          </h2>
          <div className="mt-6">
            <Highlights destination={destination} />
          </div>
        </div>

        <div className="border-border mt-16 grid grid-cols-1 gap-10 border-t pt-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight">
              A sample 5-day pace
            </h2>
            <div className="mt-6">
              <ItineraryTimeline destination={destination} />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Weather
              </h2>
              <div className="mt-6">
                <WeatherWidget destination={destination} />
              </div>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Location
              </h2>
              <div className="mt-6">
                <MapEmbed destination={destination} />
              </div>
            </div>
          </div>
        </div>

        {more.length > 0 && (
          <div className="border-border mt-16 border-t pt-12">
            <h2 className="font-display text-xl font-semibold tracking-tight">
              Other destinations
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {more.map((d) => (
                <Link
                  key={d.slug}
                  href={`/destinations/${d.slug}`}
                  className="focus-ring group border-border hover:border-primary/30 flex items-center gap-3 rounded-xl border p-3 transition-colors"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      background: `linear-gradient(135deg, ${d.gradient[0]}, ${d.gradient[1]})`,
                    }}
                  >
                    <LandmarkIcon motif={d.motif} className="h-6 w-6 text-white" />
                  </span>
                  <span>
                    <span className="text-foreground block text-sm font-semibold">
                      {d.city}
                    </span>
                    <span className="text-foreground-secondary block text-xs">
                      {d.country}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
