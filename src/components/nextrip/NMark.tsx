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
        <stop offset="0%" stopColor="#f4f4f5" />
        <stop offset="40%" stopColor="#a1a1aa" />
        <stop offset="60%" stopColor="#52525b" />
        <stop offset="100%" stopColor="#e4e4e7" />
      </linearGradient>
      <linearGradient id="n-edge" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    <path
      d="M22 80 L22 20 L36 20 L66 62 L66 20 L78 20 L78 80 L64 80 L34 38 L34 80 Z"
      fill="url(#n-chrome)"
      stroke="url(#n-edge)"
      strokeWidth="0.6"
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