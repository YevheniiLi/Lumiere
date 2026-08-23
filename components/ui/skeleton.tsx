import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("bg-background-secondary animate-pulse rounded-xl", className)} />
  );
}
