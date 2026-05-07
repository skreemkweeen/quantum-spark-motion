import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function VantaSectionDivider() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const lastRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const sync = () => {
      const p = canvas.parentElement;
      if (!p) return;
      canvas.width = p.offsetWidth;
      canvas.height = p.offsetHeight;
    };
    sync();
    const ro = new ResizeObserver(sync);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    const tick = (t: number) => {
      rafRef.current = requestAnimationFrame(tick);
      if (t - lastRef.current < 50) return;
      lastRef.current = t;
      const { width: w, height: h } = canvas;
      if (!w || !h) return;
      const img = ctx.createImageData(w, h);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const n = (Math.random() * 255) | 0;
        d[i] = d[i + 1] = d[i + 2] = n;
        d[i + 3] = (Math.random() * 45) | 0;
      }
      ctx.putImageData(img, 0, 0);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      className="relative w-full select-none"
      style={{
        height: 160,
        background: "transparent",
        // Pull up and down to overlap adjacent images
        marginTop: -55,
        marginBottom: -55,
        zIndex: 10,
        position: "relative",
      }}
    >
      {/* TOP fade — blends seamlessly with image above */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-30"
        aria-hidden="true"
        style={{
          height: "45%",
          background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.92) 100%)",
        }}
      />

      {/* BOTTOM fade — blends seamlessly with image below */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30"
        aria-hidden="true"
        style={{
          height: "45%",
          background: "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.92) 100%)",
        }}
      />

      {/* Solid black core strip in the centre */}
      <div
        className="pointer-events-none absolute inset-x-0 z-20"
        aria-hidden="true"
        style={{
          top: "38%",
          bottom: "38%",
          background: "#000",
        }}
      />

      {/* Scanlines */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.14) 2px, rgba(0,0,0,0.14) 4px)",
        }}
      />

      {/* Ghost text — centred, very subtle */}
      <div
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <span
          style={{
            fontSize: "clamp(3.5rem, 12vw, 9rem)",
            fontWeight: 900,
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.032)",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          VANTA — SUPPLY
        </span>
      </div>

      {/* Centre glow line */}
      <div
        className="absolute inset-x-0 z-25"
        style={{
          height: 1,
          top: "50%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(200,30,30,0.95) 18%, rgba(255,255,255,0.95) 50%, rgba(200,30,30,0.95) 82%, transparent 100%)",
          boxShadow: "0 0 10px 1px rgba(220,40,40,0.55), 0 0 22px 2px rgba(255,255,255,0.1)",
        }}
      />

      {/* Left red bar */}
      <div
        className="absolute z-25"
        style={{
          height: 1,
          width: "13%",
          top: "50%",
          left: "6%",
          background: "rgba(210,35,35,0.9)",
          boxShadow: "0 0 8px rgba(220,40,40,0.55)",
        }}
      />
      {/* Right red bar */}
      <div
        className="absolute z-25"
        style={{
          height: 1,
          width: "13%",
          top: "50%",
          right: "6%",
          background: "rgba(210,35,35,0.9)",
          boxShadow: "0 0 8px rgba(220,40,40,0.55)",
        }}
      />

      {/* Left red dot */}
      <div
        className="absolute z-25 rounded-full"
        style={{
          width: 5,
          height: 5,
          top: "calc(50% - 2.5px)",
          left: "calc(6% + 13% + 8px)",
          background: "rgba(220,40,40,1)",
          boxShadow: "0 0 7px rgba(220,40,40,0.85)",
        }}
      />
      {/* Right red dot */}
      <div
        className="absolute z-25 rounded-full"
        style={{
          width: 5,
          height: 5,
          top: "calc(50% - 2.5px)",
          right: "calc(6% + 13% + 8px)",
          background: "rgba(220,40,40,1)",
          boxShadow: "0 0 7px rgba(220,40,40,0.85)",
        }}
      />

      {/* Top-left bracket label */}
      <div
        className="absolute z-25 flex items-center gap-2"
        style={{
          top: "30%",
          left: "2.5%",
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: "9px",
          letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.38)",
        }}
      >
        <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px" }}>[</span>
        <span>VANTA SUPPLY</span>
      </div>

      {/* Top-centre system code */}
      <div
        className="absolute z-25"
        style={{
          top: "28%",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: "8px",
          letterSpacing: "0.22em",
          color: "rgba(255,255,255,0.24)",
        }}
      >
        SYS-0x821A
      </div>

      {/* Top-right tagline */}
      <div
        className="absolute z-25"
        style={{
          top: "30%",
          right: "2.5%",
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: "9px",
          letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.3)",
        }}
      >
        BUILT IN THE DARK
      </div>

      {/* VOID box */}
      <div
        className="absolute z-25 flex items-center gap-4"
        style={{
          bottom: "28%",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: "8px",
          letterSpacing: "0.28em",
          color: "rgba(255,255,255,0.2)",
          border: "1px solid rgba(255,255,255,0.13)",
          padding: "2px 10px",
        }}
      >
        <span>VOID</span>
        <span>01</span>
      </div>

      {/* Crosshair left */}
      <div
        className="absolute z-25"
        style={{ left: "33%", top: "50%", transform: "translate(-50%,-50%)", width: 10, height: 10 }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: 1,
            height: "100%",
            background: "rgba(255,255,255,0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            height: 1,
            width: "100%",
            background: "rgba(255,255,255,0.18)",
          }}
        />
      </div>

      {/* Crosshair right */}
      <div
        className="absolute z-25"
        style={{ right: "33%", top: "50%", transform: "translate(50%,-50%)", width: 10, height: 10 }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: 1,
            height: "100%",
            background: "rgba(255,255,255,0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            height: 1,
            width: "100%",
            background: "rgba(255,255,255,0.18)",
          }}
        />
      </div>

      {/* Sweep animation */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-25"
        aria-hidden="true"
        animate={{ x: ["-80%", "180%"] }}
        transition={{ duration: 4, ease: "linear", repeat: Infinity, repeatDelay: 7 }}
        style={{
          width: "28%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.035) 50%, transparent)",
        }}
      />

      {/* Edge vignettes */}
      <div
        className="pointer-events-none absolute inset-0 z-25"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, transparent 10%, transparent 90%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Grain */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: 0.05, mixBlendMode: "overlay", zIndex: 35 }}
      />
    </div>
  );
}
