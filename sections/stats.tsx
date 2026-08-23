"use client";

import { motion } from "framer-motion";
import { Globe2, MapPinned, Star, Users, type LucideIcon } from "lucide-react";
import { stats } from "@/data/features";
import { useCountUp } from "@/hooks/use-count-up";
import { FlightArc } from "@/components/ui/flight-arc";
import { slideUp, viewportOnce } from "@/lib/motion";

const icons: Record<string, LucideIcon> = { Users, Globe2, MapPinned, Star };
const destinationRefs = ["Kyoto", "Santorini", "Marrakech", "Banff", "Sydney"];

function formatValue(value: number, animated: number) {
  return value % 1 !== 0 ? animated.toFixed(1) : Math.round(animated).toLocaleString();
}

export function Stats() {
  const [hero, ...supporting] = stats;
  const { ref: heroRef, value: heroValue } = useCountUp<HTMLParagraphElement>(
    hero.value,
    1800,
  );
  const HeroIcon = icons[hero.icon];

  return (
    <section className="relative overflow-hidden bg-[#0b1220] py-24 text-white sm:py-32">
      {/* Deliberately fixed-dark (not theme-driven) so this band reads as a
          contrast beat against the light sections on either side, in both
          light and dark mode — the same trick Stripe/Linear use for stat
          bands. Composed as an editorial two-column read (hero stat + a
          stacked list) rather than a KPI-tile dashboard grid. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-accent-gold/20 absolute -top-40 left-1/4 h-[28rem] w-[28rem] rounded-full blur-[100px]" />
        <div className="bg-accent/20 absolute right-0 -bottom-32 h-[24rem] w-[24rem] rounded-full blur-[100px]" />
        <FlightArc
          className="absolute top-1/2 left-0 h-32 w-full -translate-y-1/2 opacity-30"
          animated={false}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wider text-white/80 uppercase">
            By the numbers
          </span>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            A track record, not a pitch
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Hero stat — the section's visual anchor, told as a traveler
              credibility line rather than a boxed KPI card. */}
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-5"
          >
            <span className="bg-accent-gold/15 text-accent-gold flex h-11 w-11 items-center justify-center rounded-xl">
              <HeroIcon className="h-5 w-5" />
            </span>
            <p
              ref={heroRef}
              className="font-display mt-6 text-6xl font-semibold tracking-tight sm:text-7xl"
            >
              <span className="from-accent-gold to-accent bg-gradient-to-r bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(212,165,116,0.35)]">
                {formatValue(hero.value, heroValue)}
              </span>
              {hero.suffix}
            </p>
            <p className="mt-2 text-base text-white/70">{hero.label}</p>
            <p className="mt-5 text-sm text-white/50">
              From first-time visitors to repeat guests, routed through{" "}
              {destinationRefs.map((name, i) => (
                <span key={name}>
                  {name}
                  {i < destinationRefs.length - 1 ? " · " : ""}
                </span>
              ))}
              , and everywhere between.
            </p>
          </motion.div>

          {/* Supporting stats — a stacked, divider-separated list instead of
              equal-height bordered tiles, so nothing reads as a dashboard
              widget grid. */}
          <div className="divide-y divide-white/10 border-t border-white/10 lg:col-span-7 lg:divide-y-0 lg:border-t-0 lg:border-l lg:pl-16">
            {supporting.map((stat, i) => {
              const Icon = icons[stat.icon];
              return <StatRow key={stat.id} stat={stat} Icon={Icon} delay={i * 0.1} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatRow({
  stat,
  Icon,
  delay,
}: {
  stat: (typeof stats)[number];
  Icon: LucideIcon;
  delay: number;
}) {
  const { ref, value } = useCountUp<HTMLParagraphElement>(stat.value, 1600);

  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
      className="flex items-center gap-5 py-6 first:pt-0 lg:border-b lg:border-white/10 lg:last:border-b-0"
    >
      <Icon className="h-5 w-5 shrink-0 text-white/40" />
      <div className="flex flex-1 items-baseline justify-between gap-4">
        <p className="text-sm text-white/60">{stat.label}</p>
        <p ref={ref} className="font-display text-3xl font-semibold tracking-tight">
          {formatValue(stat.value, value)}
          {stat.suffix}
        </p>
      </div>
    </motion.div>
  );
}
