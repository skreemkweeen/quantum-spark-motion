import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const projects = [
  { name: "VANTA", tag: "Brand · Web", grad: "from-[hsl(220_30%_18%)] to-[hsl(220_15%_8%)]" },
  { name: "ELION", tag: "Product · iOS", grad: "from-[hsl(20_40%_30%)] to-[hsl(20_15%_8%)]" },
  { name: "SIP SOCIETY", tag: "Hospitality", grad: "from-[hsl(340_30%_25%)] to-[hsl(340_10%_8%)]" },
  { name: "NEXTRIP", tag: "Travel · App", grad: "from-[hsl(180_30%_22%)] to-[hsl(180_10%_8%)]" },
  { name: "11VEN", tag: "Cultural", grad: "from-[hsl(50_25%_30%)] to-[hsl(50_10%_8%)]" },
];

export const Projects = () => {
  const [active, setActive] = useState(0);
  return (
    <section id="work" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-16 flex items-end justify-between">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))]">Selected Work</h2>
            <div className="h-px w-40 origin-left bg-[hsl(var(--accent-line))]" />
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_1fr]">
          <ul className="flex flex-col">
            {projects.map((p, i) => (
              <li key={p.name} onMouseEnter={() => setActive(i)} className="group cursor-pointer border-b border-[hsl(var(--accent-line))] py-6">
                <div className="flex items-baseline justify-between">
                  <span className={cn("text-[clamp(2.25rem,6vw,5rem)] font-semibold tracking-tight transition-all duration-300", active === i ? "text-foreground translate-x-2" : "text-[hsl(var(--muted-fg))] opacity-50 hover:opacity-80")}>{p.name}</span>
                  <span className={cn("text-[10px] uppercase tracking-[0.3em] transition-opacity duration-300", active === i ? "opacity-100" : "opacity-30")}>{p.tag}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[hsl(0_0%_10%)] md:sticky md:top-28">
            {projects.map((p, i) => (
              <div key={p.name} className={cn("absolute inset-0 bg-gradient-to-br transition-all duration-500 ease-out", p.grad, active === i ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]")} aria-hidden={active !== i}>
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <span className="text-2xl font-semibold tracking-tight">{p.name}</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))]">0{i + 1} / 0{projects.length}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};