const partners = [
  "Meridian Studio",
  "Northbound",
  "Fieldwork Co.",
  "Almanac Press",
  "Waypoint Group",
  "Solstice Media",
];

export function TrustedBy() {
  const track = [...partners, ...partners];

  return (
    <section
      aria-label="Trusted by"
      className="border-border bg-background-secondary border-y py-8"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-foreground-secondary mb-6 text-center text-xs font-semibold tracking-wider uppercase">
          Trusted by teams who travel often
        </p>
        <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee flex w-max items-center gap-16 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {track.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-display text-foreground-secondary/70 text-lg font-semibold whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
