import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

type Phrase = [line1: string, line2: string];

const PHRASES: Phrase[] = [
  ["WE DESIGN", "WHAT'S NEXT"],
  ["DIGITAL WORLDS,", "BUILT WITH INTENTION"],
  ["BRANDS ENGINEERED", "FOR THE NEXT ERA"],
  ["INTERFACES", "BECOME EXPERIENCES"],
  ["MOTION · INTERFACE", "· ATMOSPHERE"],
  ["BUILDING BRANDS", "THAT FEEL ALIVE"],
];

const LABELS = ["SYSTEM", "SIGNAL", "LIVE", "ENGINEERED", "INTERFACE", "ARCHIVE", "MOTION"];

interface GridLayer { size: number; opacity: number; speedX: number; speedY: number; parallax: number; }
const GRID_LAYERS: GridLayer[] = [
  { size: 44,  opacity: 0.030, speedX: 4.0, speedY: 2.5, parallax: 0.008 },
  { size: 132, opacity: 0.050, speedX: 7.0, speedY: 4.0, parallax: 0.018 },
];

interface Signal { id: number; axis: "x" | "y"; pos: number; speed: number; maxDist: number; }

function drawGridLayer(ctx: CanvasRenderingContext2D, layer: GridLayer, t: number, cx: number, cy: number, W: number, H: number, alpha: number) {
  const ox = ((t * layer.speedX) / 1000 + (cx - 0.5) * W * layer.parallax) % layer.size;
  const oy = ((t * layer.speedY) / 1000 + (cy - 0.5) * H * layer.parallax) % layer.size;
  const la = layer.opacity * alpha;
  ctx.strokeStyle = `rgba(255,255,255,${la})`; ctx.lineWidth = 0.5; ctx.beginPath();
  for (let x = (ox % layer.size) - layer.size; x <= W + layer.size; x += layer.size) { ctx.moveTo(x,0); ctx.lineTo(x,H); }
  for (let y = (oy % layer.size) - layer.size; y <= H + layer.size; y += layer.size) { ctx.moveTo(0,y); ctx.lineTo(W,y); }
  ctx.stroke();
  if (layer.size >= 132) {
    ctx.fillStyle = `rgba(255,255,255,${la * 2.2})`;
    for (let x = (ox % layer.size) - layer.size; x <= W + layer.size; x += layer.size)
      for (let y = (oy % layer.size) - layer.size; y <= H + layer.size; y += layer.size)
        { ctx.beginPath(); ctx.arc(x,y,1.0,0,Math.PI*2); ctx.fill(); }
  }
}

function drawSignals(ctx: CanvasRenderingContext2D, signals: Signal[], W: number, H: number, alpha: number) {
  for (const sig of signals) {
    const { axis, pos, maxDist } = sig;
    const a = Math.min(pos/220,1) * Math.min((maxDist-pos)/220,1) * 0.13 * alpha;
    if (a < 0.001) continue;
    if (axis === "x") {
      const g = ctx.createLinearGradient(pos-55,0,pos+55,0);
      g.addColorStop(0,"transparent"); g.addColorStop(0.35,`rgba(255,255,255,${a*0.45})`); g.addColorStop(0.5,`rgba(255,255,255,${a})`); g.addColorStop(0.65,`rgba(255,255,255,${a*0.45})`); g.addColorStop(1,"transparent");
      ctx.fillStyle=g; ctx.fillRect(pos-55,0,110,H);
    } else {
      const g = ctx.createLinearGradient(0,pos-55,0,pos+55);
      g.addColorStop(0,"transparent"); g.addColorStop(0.35,`rgba(255,255,255,${a*0.45})`); g.addColorStop(0.5,`rgba(255,255,255,${a})`); g.addColorStop(0.65,`rgba(255,255,255,${a*0.45})`); g.addColorStop(1,"transparent");
      ctx.fillStyle=g; ctx.fillRect(0,pos-55,W,110);
    }
  }
}

export function TheInfiniteGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const signalsRef = useRef<Signal[]>([]);
  const sigIdRef = useRef(0);
  const nextSignalRef = useRef(8000);
  const enteredRef = useRef(false);
  const enteredAtRef = useRef(0);
  const heroRef = useRef<HTMLElement>(null);
  const typRef = useRef<HTMLDivElement>(null);
  const inView = useInView(heroRef as React.RefObject<Element>, { once: true, margin: "-5% 0px" });
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [labelIdx, setLabelIdx] = useState(0);
  const mx = useMotionValue(0.5); const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 28, damping: 25, mass: 1.2 });
  const sy = useSpring(my, { stiffness: 28, damping: 25, mass: 1.2 });

  useEffect(() => {
    const move = (e: MouseEvent) => { mx.set(e.clientX/window.innerWidth); my.set(e.clientY/window.innerHeight); };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  useEffect(() => {
    if (!inView) return;
    enteredRef.current = true;
    if (typRef.current) {
      const els = typRef.current.querySelectorAll("[data-r]");
      gsap.fromTo(els, { y:"100%", opacity:0, rotationX:8 }, { y:"0%", opacity:1, rotationX:0, duration:1.4, ease:"power4.out", stagger:0.09, delay:0.2 });
    }
    let phraseTimer: ReturnType<typeof setInterval>;
    const phraseStart = setTimeout(() => { phraseTimer = setInterval(() => setPhraseIdx(i=>(i+1)%PHRASES.length), 4500); }, 2000);
    const labelTimer = setInterval(() => setLabelIdx(i=>(i+1)%LABELS.length), 3200);
    return () => { clearTimeout(phraseStart); clearInterval(phraseTimer); clearInterval(labelTimer); };
  }, [inView]);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    let W=0, H=0;
    function resize() { if (!canvas) return; W=canvas.offsetWidth; H=canvas.offsetHeight; canvas.width=W*dpr; canvas.height=H*dpr; ctx!.setTransform(dpr,0,0,dpr,0,0); }
    const ro = new ResizeObserver(resize); ro.observe(canvas); resize();
    const t0 = performance.now(); let lastT = 0;
    function tick(now: number) {
      const t = now-t0; const dt = lastT===0?16:t-lastT; lastT=t;
      if (enteredRef.current && enteredAtRef.current===0) enteredAtRef.current=t;
      const elapsed = enteredRef.current ? t-enteredAtRef.current : 0;
      const alpha = Math.min(elapsed/1800,1);
      ctx.clearRect(0,0,W,H);
      const cx=sx.get(), cy=sy.get();
      for (const layer of GRID_LAYERS) drawGridLayer(ctx,layer,t,cx,cy,W,H,alpha);
      if (alpha>0) { const rg=ctx.createRadialGradient(cx*W,cy*H,0,cx*W,cy*H,320); rg.addColorStop(0,`rgba(255,255,255,${0.028*alpha})`); rg.addColorStop(1,"transparent"); ctx.fillStyle=rg; ctx.fillRect(0,0,W,H); }
      if (enteredRef.current && t>nextSignalRef.current) {
        const axis=Math.random()>0.5?"x":"y";
        signalsRef.current.push({ id:sigIdRef.current++, axis, pos:0, speed:0.15+Math.random()*0.09, maxDist:axis==="x"?W:H });
        nextSignalRef.current=t+7000+Math.random()*6000;
      }
      signalsRef.current=signalsRef.current.filter(s=>s.pos<s.maxDist+80);
      for (const sig of signalsRef.current) sig.pos+=sig.speed*dt;
      drawSignals(ctx,signalsRef.current,W,H,alpha);
      const vig=ctx.createRadialGradient(W/2,H/2,H*0.15,W/2,H/2,H*0.85); vig.addColorStop(0,"transparent"); vig.addColorStop(1,"rgba(0,0,2,0.72)"); ctx.fillStyle=vig; ctx.fillRect(0,0,W,H);
      rafRef.current=requestAnimationFrame(tick);
    }
    rafRef.current=requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, [sx, sy]);

  const [line1, line2] = PHRASES[phraseIdx];

  return (
    <section ref={heroRef as React.RefObject<HTMLElement>} className="relative flex h-[92vh] min-h-[620px] w-full flex-col items-center justify-center overflow-hidden" style={{ background:"#050508" }}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ display:"block" }} />
      <div className="pointer-events-none absolute inset-0" style={{ background:"radial-gradient(ellipse 85% 65% at 50% 50%,rgba(12,12,18,0) 25%,rgba(5,5,8,0.82) 100%)" }} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36" style={{ background:"linear-gradient(to bottom,#050508,transparent)" }} />
      {/* No bottom fade — hero seamlessly merges into the portfolio section which shares the same #050508 background */}
      <div className="pointer-events-none absolute inset-0" style={{ background:"radial-gradient(ellipse 50% 28% at 50% 42%,rgba(220,222,240,0.018) 0%,transparent 55%)" }} />
      <motion.div className="pointer-events-none absolute inset-x-0 px-8 md:px-16" style={{ top:"18%" }} initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ duration:1.8, delay:1.2 }}>
        <div className="h-px w-full" style={{ background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.055) 20%,rgba(255,255,255,0.055) 80%,transparent)" }} />
      </motion.div>
      <motion.div className="pointer-events-none absolute inset-x-0 px-8 md:px-16" style={{ bottom:"18%" }} initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ duration:1.8, delay:1.3 }}>
        <div className="h-px w-full" style={{ background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.055) 20%,rgba(255,255,255,0.055) 80%,transparent)" }} />
      </motion.div>
      <motion.div className="pointer-events-none absolute left-6 top-8 md:left-10 md:top-10" initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ duration:1.2, delay:1.4 }}>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2"><div className="h-px w-4" style={{ background:"rgba(255,255,255,0.2)" }} /><span className="text-[8px] uppercase tracking-[0.38em]" style={{ color:"rgba(255,255,255,0.22)" }}>SYS / 2026</span></div>
          <AnimatePresence mode="wait"><motion.span key={labelIdx} className="pl-6 text-[8px] uppercase tracking-[0.38em]" style={{ color:"rgba(255,255,255,0.11)" }} initial={{ opacity:0, y:3 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-3 }} transition={{ duration:0.5 }}>{LABELS[labelIdx]}</motion.span></AnimatePresence>
        </div>
      </motion.div>
      <motion.div className="pointer-events-none absolute right-6 top-8 md:right-10 md:top-10" initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ duration:1.2, delay:1.5 }}>
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-2"><span className="text-[8px] uppercase tracking-[0.38em]" style={{ color:"rgba(255,255,255,0.22)" }}>ELEMENT UX</span><div className="h-px w-4" style={{ background:"rgba(255,255,255,0.2)" }} /></div>
          <span className="pr-6 text-[8px] uppercase tracking-[0.38em]" style={{ color:"rgba(255,255,255,0.11)" }}>STUDIO</span>
        </div>
      </motion.div>
      <motion.div className="pointer-events-none absolute bottom-10 left-6 md:left-10" initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ duration:1.2, delay:1.6 }}>
        <div className="flex flex-col gap-1"><div className="h-px w-7" style={{ background:"rgba(255,255,255,0.12)" }} /><span className="text-[8px] uppercase tracking-[0.38em]" style={{ color:"rgba(255,255,255,0.18)" }}>DIGITAL DESIGN STUDIO</span></div>
      </motion.div>
      <motion.div className="pointer-events-none absolute bottom-10 right-6 md:right-10" initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ duration:1.2, delay:1.7 }}>
        <div className="flex items-center gap-2">
          <motion.div className="h-1.5 w-1.5 rounded-full" style={{ background:"rgba(210,212,230,0.65)" }} animate={{ opacity:[0.65,0.18,0.65] }} transition={{ duration:2.8, repeat:Infinity, ease:"easeInOut" }} />
          <span className="text-[8px] uppercase tracking-[0.38em]" style={{ color:"rgba(255,255,255,0.20)" }}>LIVE</span>
        </div>
      </motion.div>
      <div ref={typRef} className="relative z-10 flex flex-col items-center px-6 text-center" style={{ marginTop:"-4vh" }}>
        <div style={{ overflow:"hidden", marginBottom:24 }}>
          <p data-r className="text-[9px] uppercase tracking-[0.50em]" style={{ color:"rgba(255,255,255,0.20)" }}>Est. 2026 · Digital Design Studio</p>
        </div>
        <div className="relative w-full" style={{ minHeight:"clamp(6rem,12vw,11rem)" }}>
          <AnimatePresence mode="wait">
            <motion.div key={phraseIdx} className="absolute inset-x-0 top-0 text-center" initial={{ opacity:0, y:22, filter:"blur(10px)" }} animate={{ opacity:1, y:0, filter:"blur(0px)" }} exit={{ opacity:0, y:-18, filter:"blur(8px)" }} transition={{ duration:0.9, ease:[0.16,1,0.3,1] }}>
              <span style={{ display:"block", fontSize:"clamp(1.9rem,5.6vw,5.5rem)", fontWeight:700, letterSpacing:"-0.035em", lineHeight:0.96, color:"#fff" }}>{line1}</span>
              <span style={{ display:"block", fontSize:"clamp(1.9rem,5.6vw,5.5rem)", fontWeight:700, letterSpacing:"-0.035em", lineHeight:0.96, color:"rgba(255,255,255,0.5)", marginTop:"0.08em" }}>{line2}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        <motion.div className="h-px" style={{ width:"min(10rem,60vw)", marginTop:24, marginBottom:20, background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.20) 50%,transparent)" }} initial={{ scaleX:0, opacity:0 }} animate={inView?{scaleX:1,opacity:1}:{}} transition={{ duration:1.6, ease:[0.16,1,0.3,1], delay:0.9 }} />
        <div style={{ overflow:"hidden" }}>
          <p data-r className="max-w-sm text-[11.5px] leading-relaxed" style={{ color:"rgba(255,255,255,0.32)", letterSpacing:"0.06em" }}>Brand systems · Digital experiences · Motion identity — for the brands defining what comes next.</p>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-7">
          <div style={{ overflow:"hidden" }}>
            <a data-r href="/#work" className="group flex items-center gap-3" style={{ color:"rgba(255,255,255,0.40)" }}>
              <span className="inline-block h-px transition-all duration-500 ease-out group-hover:w-14" style={{ width:22, background:"currentColor" }} />
              <span className="text-[9px] uppercase tracking-[0.32em] transition-colors duration-300 group-hover:text-white">Selected Work</span>
            </a>
          </div>
          <div style={{ overflow:"hidden" }}>
            <a data-r href="/contact" className="rounded-sm border px-5 py-2.5 text-[9px] uppercase tracking-[0.28em] transition-all duration-300" style={{ borderColor:"rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.42)" }} onMouseEnter={e=>{const el=e.currentTarget;el.style.borderColor="rgba(255,255,255,0.45)";el.style.color="#fff";el.style.background="rgba(255,255,255,0.04)";}} onMouseLeave={e=>{const el=e.currentTarget;el.style.borderColor="rgba(255,255,255,0.12)";el.style.color="rgba(255,255,255,0.42)";el.style.background="transparent";}}>Start a Project</a>
          </div>
        </div>
      </div>
      {/* Hint of portfolio underneath — soft "Selected Work" preview line peeking from the fold */}
      <motion.div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center" initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ duration:1.4, delay:2 }}>
        <div className="flex w-full max-w-7xl items-center gap-4 px-8">
          <span className="text-[8px] uppercase tracking-[0.42em]" style={{ color:"rgba(255,255,255,0.22)" }}>↓ Selected Work</span>
          <div className="h-px flex-1" style={{ background:"linear-gradient(90deg,rgba(255,255,255,0.14),transparent)" }} />
          <span className="text-[8px] uppercase tracking-[0.42em]" style={{ color:"rgba(255,255,255,0.14)" }}>2026 / Archive</span>
        </div>
      </motion.div>
      <motion.div className="pointer-events-none absolute bottom-20 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2" initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ duration:1, delay:2.2 }}>
        <motion.div className="h-10 w-px" style={{ background:"linear-gradient(to bottom,transparent,rgba(255,255,255,0.28),transparent)" }} animate={{ scaleY:[1,0.3,1], opacity:[0.4,0.8,0.4] }} transition={{ duration:2.6, repeat:Infinity, ease:"easeInOut" }} />
        <p className="text-[7px] uppercase tracking-[0.38em]" style={{ color:"rgba(255,255,255,0.14)" }}>Scroll</p>
      </motion.div>
    </section>
  );
}