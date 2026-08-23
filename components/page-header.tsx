import { AmbientBackground } from "@/components/ui/ambient-background";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
      <AmbientBackground className="-z-10" />
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <span className="border-border bg-background-secondary/80 text-primary glass inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase">
          {eyebrow}
        </span>
        <h1 className="font-display text-foreground mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="text-foreground-secondary mt-4 text-balance">{description}</p>
        )}
      </div>
    </div>
  );
}
