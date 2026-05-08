import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Bezel = ({ flip = false }: { flip?: boolean }) => (
  <div
    aria-hidden
    className="nx-sweep relative h-14 w-full overflow-hidden md:h-20"
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
          <stop offset="38%" stopColor="#2a2a32" />
          <stop offset="62%" stopColor="#14141a" />
          <stop offset="100%" stopColor="#050508" />
        </linearGradient>
        <linearGradient id="bezel-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="bezel-seam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,0,0,0.6)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
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
      <path
        d="M0,42 C240,82 520,82 720,54 C920,32 1200,82 1440,42"
        stroke="url(#bezel-seam)"
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
  <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-12 text-[9px] uppercase tracking-[0.4em] text-white/35">
    <div className="flex items-center gap-4">
      <span className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.07] bg-white/[0.02] text-[10px] tracking-widest text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        {index}
      </span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="opacity-50">
        <path d="M2 16l20-7-9 13-2-6-9 0z" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className="hidden h-px w-40 bg-gradient-to-r from-white/15 to-transparent md:block" />
    </div>
    <div className="flex items-center gap-6 text-white/45">
      {rightMeta}
      <span className="tracking-[0.4em] text-white/25">• • •</span>
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