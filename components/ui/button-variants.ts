import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "focus-ring relative inline-flex cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 ease-out disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98] active:translate-y-0",
  {
    variants: {
      variant: {
        primary:
          "from-primary to-accent text-primary-foreground bg-gradient-to-r shadow-[0_1px_0_0_rgba(255,255,255,0.12)_inset,0_10px_24px_-8px_rgba(15,118,110,0.45)] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_18px_32px_-10px_rgba(15,118,110,0.6)]",
        secondary:
          "border-border bg-background text-foreground hover:border-accent/40 hover:bg-background-secondary cursor-pointer border hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md",
        ghost:
          "text-foreground-secondary hover:bg-background-secondary hover:text-foreground cursor-pointer",
        link: "text-accent cursor-pointer underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 shrink-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
