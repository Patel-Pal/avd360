import { Container } from "@/components/Container";
import { pillars } from "@/lib/content";
import { pillarIcons } from "@/lib/iconMap";

export function PillarStrip() {
  return (
    <section className="border-b border-navy/5 bg-navy-deep">
      <Container className="py-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {pillars.map((p) => {
            const Icon = pillarIcons[p.id];
            return (
              <li
                key={p.id}
                className="flex items-center gap-2.5 text-sm font-medium text-white/80"
              >
                <Icon className="h-5 w-5 text-gold" />
                {p.title}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
