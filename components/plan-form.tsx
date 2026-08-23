"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, MapPin, Users } from "lucide-react";
import { destinations } from "@/data/destinations";
import { Button } from "@/components/ui/button";

const paces = [
  { id: "relaxed", label: "Relaxed", hint: "2–3 stops a day, room to wander" },
  { id: "balanced", label: "Balanced", hint: "A full but comfortable itinerary" },
  { id: "immersive", label: "Immersive", hint: "Longer stays, fewer cities" },
] as const;

export function PlanForm() {
  const [destination, setDestination] = useState(destinations[0].slug);
  const [travelers, setTravelers] = useState(2);
  const [pace, setPace] = useState<(typeof paces)[number]["id"]>("balanced");
  const [startDate, setStartDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const chosen = destinations.find((d) => d.slug === destination) ?? destinations[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-border bg-background mx-auto max-w-xl rounded-2xl border p-8 text-center shadow-sm"
      >
        <span className="bg-primary/10 text-primary mx-auto flex h-12 w-12 items-center justify-center rounded-full">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h2 className="font-display mt-5 text-xl font-semibold">
          Your {chosen.city} itinerary is taking shape
        </h2>
        <p className="text-foreground-secondary mt-2 text-sm leading-relaxed">
          {travelers} {travelers === 1 ? "traveler" : "travelers"} ·{" "}
          {paces.find((p) => p.id === pace)?.label} pace
          {startDate && ` · departing ${new Date(startDate).toLocaleDateString()}`}
        </p>
        <p className="text-foreground-secondary mt-4 text-xs">
          This is a portfolio demo — no itinerary was actually booked or sent anywhere.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setSubmitted(false)}>
          Plan another trip
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-border bg-background mx-auto max-w-xl space-y-6 rounded-2xl border p-8 shadow-sm"
    >
      <div>
        <label htmlFor="destination" className="text-foreground text-sm font-semibold">
          Where to
        </label>
        <div className="relative mt-2">
          <MapPin className="text-foreground-secondary pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
          <select
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="focus-ring border-border bg-background-secondary text-foreground w-full appearance-none rounded-xl border py-2.5 pr-4 pl-10 text-sm"
          >
            {destinations.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.city}, {d.country}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="start-date" className="text-foreground text-sm font-semibold">
            Departure
          </label>
          <div className="relative mt-2">
            <CalendarDays className="text-foreground-secondary pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="focus-ring border-border bg-background-secondary text-foreground w-full rounded-xl border py-2.5 pr-3 pl-10 text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="travelers" className="text-foreground text-sm font-semibold">
            Travelers
          </label>
          <div className="relative mt-2">
            <Users className="text-foreground-secondary pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
            <input
              id="travelers"
              type="number"
              min={1}
              max={12}
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value) || 1)}
              className="focus-ring border-border bg-background-secondary text-foreground w-full rounded-xl border py-2.5 pr-3 pl-10 text-sm"
            />
          </div>
        </div>
      </div>

      <fieldset>
        <legend className="text-foreground text-sm font-semibold">Trip pace</legend>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {paces.map((p) => (
            <label
              key={p.id}
              className={`focus-within:ring-primary cursor-pointer rounded-xl border p-3 text-sm transition-colors focus-within:ring-2 ${
                pace === p.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <input
                type="radio"
                name="pace"
                value={p.id}
                checked={pace === p.id}
                onChange={() => setPace(p.id)}
                className="sr-only"
              />
              <span className="text-foreground block font-semibold">{p.label}</span>
              <span className="text-foreground-secondary mt-0.5 block text-xs">
                {p.hint}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <Button type="submit" size="lg" className="w-full justify-center">
        Plan my trip
      </Button>

      <p className="text-foreground-secondary text-center text-xs">
        Portfolio demo — nothing is booked or stored.
      </p>
    </form>
  );
}
