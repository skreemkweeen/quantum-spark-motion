import { cn } from "@/lib/utils";

export const NMark = ({ className, size = 36 }: { className?: string; size?: number }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    className={cn("inline-block", className)}
    aria-hidden
  >
    <defs>
      <linearGradient id="n-chrome" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fafafa" />
        <stop offset="20%" stopColor="#d4d4d8" />
        <stop offset="42%" stopColor="#71717a" />
        <stop offset="58%" stopColor="#3f3f46" />
        <stop offset="80%" stopColor="#a1a1aa" />
        <stop offset="100%" stopColor="#f4f4f5" />
      </linearGradient>
      <linearGradient id="n-edge" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
      <linearGradient id="n-bevel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
        <stop offset="50%" stopColor="rgba(0,0,0,0)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
      </linearGradient>
    </defs>
    <path
      d="M22 80 L22 20 L36 20 L66 62 L66 20 L78 20 L78 80 L64 80 L34 38 L34 80 Z"
      fill="url(#n-chrome)"
      stroke="url(#n-edge)"
      strokeWidth="0.6"
    />
    <path
      d="M22 80 L22 20 L36 20 L66 62 L66 20 L78 20 L78 80 L64 80 L34 38 L34 80 Z"
      fill="none"
      stroke="url(#n-bevel)"
      strokeWidth="0.4"
      opacity="0.7"
    />
  </svg>
);

export const NWordmark = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-3", className)}>
    <NMark size={28} />
    <span className="text-[11px] font-semibold uppercase tracking-[0.45em] text-white/80">
      NEXTRIP
    </span>
  </div>
);