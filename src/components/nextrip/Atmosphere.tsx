import { cn } from "@/lib/utils";

type Variant = "hero" | "editorial" | "device" | "wide";

/**
 * Cinematic per-section lighting rig.
 * Pure CSS — multi-layer radial gradients + caustic streak + vignette.
 */
export const Atmosphere = ({
  variant = "editorial",
  className,
}: {
  variant?: Variant;
  className?: string;
}) => {
  const spotlight =
    variant === "hero"
      ? "radial-gradient(ellipse 55% 70% at 50% 35%, rgba(220,225,235,0.08), transparent 70%)"
      : variant === "device"
      ? "radial-gradient(ellipse 32% 65% at 50% 45%, rgba(220,225,235,0.07), transparent 72%)"
      : variant === "wide"
      ? "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(210,220,235,0.05), transparent 75%)"
      : "radial-gradient(ellipse 45% 55% at 50% 40%, rgba(210,220,235,0.04), transparent 75%)";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {/* spotlight */}
      <div className="absolute inset-0" style={{ backgroundImage: spotlight }} />
      {/* caustic diagonal streak */}
      {(variant === "hero" || variant === "device") && (
        <div
          className="absolute -inset-x-1/4 top-1/4 h-[70%] -rotate-12 opacity-[0.05]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
            filter: "blur(60px)",
          }}
        />
      )}
      {/* edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow:
            "inset 0 80px 120px -60px rgba(0,0,0,0.9), inset 0 -80px 120px -60px rgba(0,0,0,0.9)",
        }}
      />
    </div>
  );
};

/** Floor reflection / grounding shadow under a sculptural device. */
export const FloorReflection = ({ className }: { className?: string }) => (
  <div
    aria-hidden
    className={cn("pointer-events-none absolute left-1/2 -translate-x-1/2", className)}
    style={{
      width: "70%",
      height: "60px",
      background:
        "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,0,0,0.7), transparent 70%)",
      filter: "blur(20px)",
    }}
  />
);

/** Wraps a device image with rim light + floor halo. */
export const Device = ({
  children,
  halo = true,
  className,
}: {
  children: React.ReactNode;
  halo?: boolean;
  className?: string;
}) => (
  <div className={cn("relative inline-block", className)}>
    {halo && (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-20%]"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(220,225,235,0.08), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    )}
    <div className="relative">{children}</div>
    {halo && (
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-full mt-[-20px] h-[80px] w-[80%] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 0%, rgba(0,0,0,0.85), transparent 70%)",
          filter: "blur(16px)",
        }}
      />
    )}
  </div>
);