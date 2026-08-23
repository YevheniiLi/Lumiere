import { cn } from "@/lib/utils";

interface AmbientBackgroundProps {
  className?: string;
  variant?: "hero" | "section" | "cta";
}

/**
 * A layered, static-cost background: two soft drifting gradient blobs, a
 * faint dot grid masked to a radial vignette, and a hair-thin grain overlay.
 * Everything here is CSS-driven (no JS, no images) so it's essentially free
 * from a performance and bundle-size standpoint.
 */
export function AmbientBackground({
  className,
  variant = "section",
}: AmbientBackgroundProps) {
  return (
    <div aria-hidden="true" className={cn("ambient-mesh noise-overlay", className)}>
      <div
        className="ambient-mesh__blob bg-primary/15 -top-1/4 -left-1/4 h-[36rem] w-[36rem]"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="ambient-mesh__blob bg-accent/15 top-0 -right-1/4 h-[30rem] w-[30rem]"
        style={{ animationDelay: "-8s" }}
      />
      {variant === "hero" && (
        <div
          className="ambient-mesh__blob bg-primary/10 bottom-[-20%] left-1/3 h-[26rem] w-[26rem]"
          style={{ animationDelay: "-16s" }}
        />
      )}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--color-border) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 60% 55% at 50% 35%, black, transparent)",
        }}
      />
    </div>
  );
}
