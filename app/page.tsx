import dynamic from "next/dynamic";
import { Hero } from "@/sections/hero";
import { WorldMap } from "@/components/ui/world-map";
import { TrustedBy } from "@/sections/trusted-by";
import { PopularDestinations } from "@/sections/popular-destinations";
import { WhyChooseUs } from "@/sections/why-choose-us";
import { Testimonials } from "@/sections/testimonials";
import { Stats } from "@/sections/stats";
import { Gallery } from "@/sections/gallery";
import { Cta } from "@/sections/cta";
import { Skeleton } from "@/components/ui/skeleton";

// The country explorer ships its own ~200-entry dataset and search/filter
// logic. Splitting it into its own chunk keeps that weight out of the
// initial bundle while still rendering on the server for SEO.
const ExploreCountries = dynamic(
  () => import("@/sections/explore-countries").then((m) => m.ExploreCountries),
  {
    loading: () => (
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <Skeleton className="mx-auto h-10 w-72" />
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      </div>
    ),
  },
);

export default function Home() {
  return (
    <>
      <Hero worldMap={<WorldMap className="h-auto w-full" />} />
      <TrustedBy />
      <PopularDestinations />
      <ExploreCountries />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <Gallery />
      <Cta />
    </>
  );
}
