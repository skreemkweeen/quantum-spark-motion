import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Bezel = ({ flip = false }: { flip?: boolean }) => (
  <div
    aria-hidden
    className="relative h-12 w-full overflow-hidden md:h-16"
    style={{ transform: flip ? "scaleY(-1)" : undefined }}
  >
    <svg
      className="absolute inset-x-0 bottom-0 h-full w-full"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="bezel-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0a0f" />
          <stop offset="50%" stopColor="#1a1a22" />
          <stop offset="100%" stopColor="#050508" />
        </linearGradient>
        <linearGradient id="bezel-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <path
        d="M0,0 L0,40 C240,80 520,80 720,52 C920,30 1200,80 1440,40 L1440,0 Z"
        fill="url(#bezel-fill)"
      />
      <path
        d="M0,40 C240,80 520,80 720,52 C920,30 1200,80 1440,40"
        stroke="url(#bezel-shine)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  </div>
);

export const SectionHeader = ({
  index,
  rightMeta,
}: {
  index: string;
  rightMeta?: ReactNode;
}) => (
  <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-10 text-[10px] uppercase tracking-[0.3em] text-white/40">
    <div className="flex items-center gap-4">
      <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-[10px] tracking-widest text-white/70">
        {index}
      </span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-60">
        <path d="M2 16l20-7-9 13-2-6-9 0z" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className="hidden h-px w-32 bg-white/10 md:block" />
    </div>
    <div className="flex items-center gap-6">
      {rightMeta}
      <span className="tracking-[0.4em]">• • •</span>
    </div>
  </div>
);

export const Section = ({
  index,
  rightMeta,
  children,
  className,
  bezelTop = true,
  bezelBottom = false,
}: {
  index: string;
  rightMeta?: ReactNode;
  children: ReactNode;
  className?: string;
  bezelTop?: boolean;
  bezelBottom?: boolean;
}) => (
  <section className={cn("relative", className)}>
    {bezelTop && <Bezel />}
    <SectionHeader index={index} rightMeta={rightMeta} />
    <div className="relative">{children}</div>
    {bezelBottom && <Bezel flip />}
  </section>
);