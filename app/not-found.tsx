import Link from "next/link";
import { Compass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { FlightArc } from "@/components/ui/flight-arc";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-primary/10 absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl" />
      </div>

      <span className="border-border bg-background-secondary text-primary flex h-16 w-16 items-center justify-center rounded-2xl border">
        <Compass className="h-7 w-7" />
      </span>

      <h1 className="font-display mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">
        Off the map.
      </h1>
      <p className="text-foreground-secondary mt-4 max-w-sm text-balance">
        The page you&apos;re looking for isn&apos;t part of the itinerary. Let&apos;s get
        you back on route.
      </p>

      <FlightArc className="mt-10 h-16 w-64" />

      <Link href="/" className={buttonVariants({ size: "lg", className: "mt-6" })}>
        Back to home
      </Link>
    </section>
  );
}
