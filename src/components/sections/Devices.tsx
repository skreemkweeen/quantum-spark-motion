import { Parallax } from "@/components/Parallax";
import { Reveal } from "@/components/Reveal";

const Phone = ({ tone }: { tone: string }) => (
  <div className="relative h-[420px] w-[210px] rounded-[2rem] border border-[hsl(var(--accent-line))] p-2 shadow-2xl" style={{ background: tone }}>
    <div className="h-full w-full rounded-[1.6rem] bg-background/40" />
    <div className="absolute left-1/2 top-2 h-1 w-16 -translate-x-1/2 rounded-full bg-[hsl(var(--accent-line))]" />
  </div>
);

export const Devices = () => (
  <section id="process" className="relative overflow-hidden px-6 py-32">
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <h2 className="mb-16 max-w-xl text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight tracking-tight">Engineered motion across every surface.</h2>
      </Reveal>
      <div className="relative flex h-[520px] items-center justify-center">
        <Parallax speed={0.7} className="absolute -translate-x-32"><div className="animate-float-y"><Phone tone="hsl(220 20% 14%)" /></div></Parallax>
        <Parallax speed={1.0} className="relative z-10"><div className="animate-float-y" style={{ animationDelay: "-2s" }}><Phone tone="hsl(0 0% 10%)" /></div></Parallax>
        <Parallax speed={1.25} className="absolute translate-x-32"><div className="animate-float-y" style={{ animationDelay: "-4s" }}><Phone tone="hsl(20 25% 16%)" /></div></Parallax>
      </div>
    </div>
  </section>
);