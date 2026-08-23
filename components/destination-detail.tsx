import {
  CloudSun,
  CloudRain,
  Sun,
  Compass,
  MapPinned,
  Sunrise,
  UtensilsCrossed,
} from "lucide-react";
import { LandmarkIcon } from "@/components/ui/landmark-icon";
import type { Destination } from "@/types";

// Deterministic pseudo-random in [0, 1), seeded by a string. Used only to
// vary the mock weather forecast per destination without a random mismatch
// between server and client renders.
function seededRandom(seed: string, salt: number): number {
  let hash = 0;
  const input = `${seed}-${salt}`;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 1000) / 1000;
}

const weatherIcons = [Sun, CloudSun, CloudSun, CloudRain, Sun];
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export function WeatherWidget({ destination }: { destination: Destination }) {
  const baseTemp =
    destination.region === "Europe" || destination.region === "Asia" ? 18 : 24;

  return (
    <div className="border-border bg-background rounded-2xl border p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold">5-day outlook</h3>
        <span className="text-foreground-secondary text-xs">Example forecast</span>
      </div>
      <div className="mt-5 grid grid-cols-5 gap-2 text-center">
        {dayLabels.map((day, i) => {
          const Icon = weatherIcons[i];
          const temp = Math.round(baseTemp + seededRandom(destination.slug, i) * 8 - 2);
          return (
            <div key={day} className="flex flex-col items-center gap-1.5">
              <span className="text-foreground-secondary text-xs font-medium">{day}</span>
              <Icon className="text-accent h-5 w-5" />
              <span className="text-foreground text-sm font-semibold">{temp}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const highlightTemplates = [
  {
    icon: Compass,
    title: "Signature landmark",
    copy: "The one sight worth building the whole day around.",
  },
  {
    icon: UtensilsCrossed,
    title: "Local flavor",
    copy: "Dishes that don't travel well — best eaten right there.",
  },
  {
    icon: Sunrise,
    title: "Golden hour",
    copy: "Where locals go for the light, not the crowds.",
  },
  {
    icon: MapPinned,
    title: "Getting around",
    copy: "How the city actually moves, once you're off the main routes.",
  },
];

export function Highlights({ destination }: { destination: Destination }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {highlightTemplates.map((h) => (
        <div key={h.title} className="border-border bg-background rounded-2xl border p-5">
          <span className="bg-accent/10 text-accent flex h-9 w-9 items-center justify-center rounded-lg">
            <h.icon className="h-4 w-4" />
          </span>
          <h3 className="font-display mt-3 text-sm font-semibold">{h.title}</h3>
          <p className="text-foreground-secondary mt-1 text-sm leading-relaxed">
            {h.copy}
          </p>
        </div>
      ))}
      <p className="text-foreground-secondary col-span-full text-xs">
        Generic highlight categories — {destination.city} specifics would replace these in
        a production build.
      </p>
    </div>
  );
}

const itineraryDays = [
  {
    title: "Arrival & orientation",
    copy: "Settle in, walk the neighborhood, an early dinner nearby.",
  },
  {
    title: "The signature day",
    copy: "The landmark everyone comes for, paced with real breaks.",
  },
  {
    title: "Local life",
    copy: "Markets, side streets, and the meal a local would actually recommend.",
  },
  {
    title: "Slower ground",
    copy: "A day trip or a quieter district, away from the main route.",
  },
  {
    title: "Last morning",
    copy: "One more coffee somewhere good, then an easy route to departure.",
  },
];

export function ItineraryTimeline({ destination }: { destination: Destination }) {
  return (
    <ol className="border-border relative space-y-8 border-l pl-6">
      {itineraryDays.map((day, i) => (
        <li key={day.title} className="relative">
          <span className="bg-primary text-primary-foreground absolute top-0.5 -left-[1.9rem] flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold">
            {i + 1}
          </span>
          <p className="font-display text-sm font-semibold">
            Day {i + 1} · {day.title}
          </p>
          <p className="text-foreground-secondary mt-1 text-sm leading-relaxed">
            {day.copy}
          </p>
        </li>
      ))}
      <p className="text-foreground-secondary text-xs">
        A sample pace for {destination.city} — every Lumière itinerary is adjusted to the
        traveler.
      </p>
    </ol>
  );
}

export function MapEmbed({ destination }: { destination: Destination }) {
  const query = encodeURIComponent(`${destination.city}, ${destination.country}`);
  return (
    <div className="border-border overflow-hidden rounded-2xl border">
      <iframe
        title={`Map of ${destination.city}, ${destination.country}`}
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        className="h-72 w-full grayscale-[0.15]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

const galleryCaptions = ["Arrival", "Golden hour", "Street level", "After dark"];

export function MiniGallery({ destination }: { destination: Destination }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {galleryCaptions.map((caption, i) => (
        <div
          key={caption}
          className="group relative flex h-28 items-center justify-center overflow-hidden rounded-xl"
          style={{
            background: `linear-gradient(${135 + i * 20}deg, ${destination.gradient[0]}, ${destination.gradient[1]})`,
          }}
        >
          <LandmarkIcon
            motif={destination.motif}
            className="h-10 w-10 text-white/80 transition-transform duration-500 group-hover:scale-110"
          />
          <span className="absolute inset-x-0 bottom-0 bg-black/30 py-1 text-center text-[11px] font-medium text-white">
            {caption}
          </span>
        </div>
      ))}
    </div>
  );
}
