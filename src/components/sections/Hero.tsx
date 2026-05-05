import { Parallax } from "@/components/Parallax";
import { Reveal } from "@/components/Reveal";

const stats = [
  { v: "12+", l: "Years" },
  { v: "84", l: "Shipped" },
  { v: "5", l: "Continents" },
];

export const Hero = () => (
  <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24">
    <Parallax speed={0.4} className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
      <div className="absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-[hsl(0_0%_18%)] opacity-40 blur-3xl" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-[hsl(var(--accent-line))]" />
    </Parallax>
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr]">
      <Parallax speed={0.85}>
        <Reveal><p className="mb-6 text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))]">Studio · Interaction · Motion</p></Reveal>
        <Reveal delay={80}>
          <h1 className="text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.95] tracking-tight">Precision<br />digital<br />interfaces.</h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-[hsl(var(--muted-fg))]">We design and engineer interactive systems for brands that treat detail as a discipline.</p>
        </Reveal>
      </Parallax>
      <Parallax speed={1.1} className="flex flex-col justify-end gap-8 md:items-end">
        {stats.map((s, i) => (
          <Reveal key={s.l} delay={300 + i * 100}>
            <div className="text-right">
              <div className="text-4xl font-semibold tracking-tight">{s.v}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--muted-fg))]">{s.l}</div>
            </div>
          </Reveal>
        ))}
      </Parallax>
    </div>
  </section>
);