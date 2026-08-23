"use client";

import { motion } from "framer-motion";
import { slideUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}
    >
      <span className="border-border bg-background-secondary text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase">
        {eyebrow}
      </span>
      <h2 className="font-display text-foreground mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-foreground-secondary mt-4 text-base leading-relaxed text-balance">
          {description}
        </p>
      )}
    </motion.div>
  );
}
