import { cn } from "@/lib/utils";

/**
 * Section heading with the logo-style gold-dot divider:
 * a thin horizontal rule with a centered gold dot.
 */
export function GoldDivider({
  className,
  align = "center",
}: {
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        align === "center" ? "justify-center" : "justify-start",
        className
      )}
      aria-hidden="true"
    >
      <span className="h-px w-10 bg-navy/20" />
      <span className="h-2 w-2 rotate-45 bg-gold" />
      <span className="h-px w-10 bg-navy/20" />
    </div>
  );
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  invert = false,
}: {
  label?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  invert?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      {label && (
        <p
          className={cn(
            "mb-3 text-sm font-semibold uppercase tracking-[0.2em]",
            invert ? "text-gold" : "text-gold"
          )}
        >
          {label}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight sm:text-4xl",
          invert ? "text-white" : "text-navy"
        )}
      >
        {title}
      </h2>
      <GoldDivider
        align={align}
        className={cn("mt-5", align === "center" ? "mx-auto" : "")}
      />
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed",
            invert ? "text-white/70" : "text-muted"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
