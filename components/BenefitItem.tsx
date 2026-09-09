import { IconCheck } from "@/components/icons";

export function BenefitItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-navy/5 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-card">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold">
        <IconCheck className="h-4 w-4" />
      </span>
      <span className="text-sm font-medium text-navy">{label}</span>
    </div>
  );
}
