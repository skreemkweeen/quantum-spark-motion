import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function VantaSectionDivider() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const lastRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
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
        d[i + 3] = (Math.random() * 55) | 0;
      }
      ctx.putImageData(img, 0, 0);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  return (
    <div className="relative w-full overflow-hidden select-none" style={{ height: 110, background: '#000' }}>
      <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)' }} />
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
        <span style={{
          fontSize: 'clamp(4rem, 14vw, 11rem)',
          fontWeight: 900,
          letterSpacing: '0.18em',
          color: 'rgba(255,255,255,0.038)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}>
          VANTA — SUPPLY
        </span>
      </div>
      <div className="absolute inset-x-0 z-20" style={{
        height: 1,
        top: '50%',
        background: 'linear-gradient(90deg, transparent 0%, rgba(200,30,30,0.9) 18%, rgba(255,255,255,0.95) 50%, rgba(200,30,30,0.9) 82%, transparent 100%)',
        boxShadow: '0 0 10px 1px rgba(220,40,40,0.55), 0 0 22px 2px rgba(255,255,255,0.12)',
      }} />
      <div className="absolute z-20" style={{
        height: 1, width: '14%', top: '50%', left: '6%',
        background: 'rgba(220,40,40,0.85)',
        boxShadow: '0 0 8px rgba(220,40,40,0.6)',
      }} />
      <div className="absolute z-20" style={{
        height: 1, width: '14%', top: '50%', right: '6%',
        background: 'rgba(220,40,40,0.85)',
        boxShadow: '0 0 8px rgba(220,40,40,0.6)',
      }} />
      <div className="absolute z-20 rounded-full" style={{
        width: 4, height: 4,
        top: 'calc(50% - 2px)',
        left: 'calc(6% + 14% + 6px)',
        background: 'rgba(220,40,40,1)',
        boxShadow: '0 0 6px rgba(220,40,40,0.8)',
      }} />
      <div className="absolute z-20 rounded-full" style={{
        width: 4, height: 4,
        top: 'calc(50% - 2px)',
        right: 'calc(6% + 14% + 6px)',
        background: 'rgba(220,40,40,1)',
        boxShadow: '0 0 6px rgba(220,40,40,0.8)',
      }} />
      <div className="absolute z-20 flex items-center gap-2" style={{
        top: '22%', left: '2.5%',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '9px',
        letterSpacing: '0.14em',
        color: 'rgba(255,255,255,0.38)',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', lineHeight: 1 }}>[</span>
        <span>VANTA SUPPLY</span>
      </div>
      <div className="absolute z-20" style={{
        top: '20%', left: '50%', transform: 'translateX(-50%)',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '8px', letterSpacing: '0.22em',
        color: 'rgba(255,255,255,0.25)',
      }}>
        SYS-0x821A
      </div>
      <div className="absolute z-20" style={{
        top: '22%', right: '2.5%',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '9px', letterSpacing: '0.14em',
        color: 'rgba(255,255,255,0.32)',
      }}>
        BUILT IN THE DARK
      </div>
      <div className="absolute z-20 flex items-center gap-4" style={{
        bottom: '20%', left: '50%', transform: 'translateX(-50%)',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '8px', letterSpacing: '0.28em',
        color: 'rgba(255,255,255,0.22)',
        border: '1px solid rgba(255,255,255,0.14)',
        padding: '2px 10px',
      }}>
        <span>VOID</span>
        <span>01</span>
      </div>
      <div className="absolute z-20" style={{ left: '33%', top: '50%', transform: 'translate(-50%, -50%)', width: 10, height: 10 }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, width: 1, height: '100%', background: 'rgba(255,255,255,0.2)' }} />
        <div style={{ position: 'absolute', top: '50%', left: 0, height: 1, width: '100%', background: 'rgba(255,255,255,0.2)' }} />
      </div>
      <div className="absolute z-20" style={{ right: '33%', top: '50%', transform: 'translate(50%, -50%)', width: 10, height: 10 }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, width: 1, height: '100%', background: 'rgba(255,255,255,0.2)' }} />
        <div style={{ position: 'absolute', top: '50%', left: 0, height: 1, width: '100%', background: 'rgba(255,255,255,0.2)' }} />
      </div>
      <motion.div
        className="pointer-events-none absolute inset-0 z-30"
        aria-hidden="true"
        animate={{ x: ['-80%', '180%'] }}
        transition={{ duration: 4, ease: 'linear', repeat: Infinity, repeatDelay: 6 }}
        style={{
          width: '30%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04) 50%, transparent)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true"
        style={{ background: 'linear-gradient(90deg, #000 0%, transparent 8%, transparent 92%, #000 100%)' }} />
      <canvas ref={canvasRef} aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: 0.06, mixBlendMode: 'overlay', zIndex: 40 }} />
    </div>
  );
}