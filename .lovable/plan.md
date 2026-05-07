# Cinematic Project Footer System

Replace the current `ProjectFooterRibbon` + global `Footer` on three project pages with a richer, layered footer composition. All deps already installed (`framer-motion`, `lucide-react`, `react-router-dom`).

## New folder: `src/components/footer/`

### 1. `GrainOverlay.tsx`
Fixed-size canvas that fills its parent (via `ResizeObserver`). Throttled `requestAnimationFrame` loop (default 20fps) writes per-pixel random RGBA noise via `createImageData`/`putImageData`. Renders `<canvas>` absolutely positioned `inset-0`, `pointer-events-none`, `mix-blend-overlay`, with `style={{ opacity }}`. Props: `opacity=0.04`, `fps=20`. Typed `useRef<HTMLCanvasElement>(null)`.

### 2. `CursorGlow.tsx`
Two layered radial-gradient blobs that follow the cursor with spring smoothing inside `containerRef`. Uses `useMotionValue` + `useSpring` (stiffness 45, damping 22, mass 0.7). Outer halo (size ~820px, soft purple `radial-gradient(circle, rgba(accent, opacity) 0%, transparent 60%)`), inner core (~22% size, brighter). Both `pointer-events-none`, `absolute`, `mix-blend-screen`. Mouse listeners on the container; reset off-screen on `mouseleave`.

### 3. `FooterTransitionVeil.tsx`
Top-of-footer transition: ~30vh tall section above the main footer body. Uses `useScroll({ target: ref, offset: ['start end', 'end center'] })` to drive opacity of:
- A black gradient (`linear-gradient(to bottom, transparent, #000)`) — main veil
- A vertical light beam (`linear-gradient(180deg, rgba(accent,0.6), transparent)`) translating downward
- A radial haze at top center
Plus a thin 1px horizontal accent line near the bottom edge fading in last.

### 4. `HolographicRibbon.tsx`
Marquee text track. Builds `segment = [title, ...phrases].join(' — ') + ' — '`, renders `doubled = segment + segment` inside a flex track animated with framer-motion `animate={{ x: [animFrom, animTo] }}` (linear, infinite). Hovering slows it ~2.8x by lengthening the duration via `transition={{ duration }}`. Two sizes:
- `large`: huge bold display (`clamp(2.6rem, 6.5vw, 5.2rem)`, weight 900, tight tracking, glow `text-shadow`)
- `small`: small caps (`clamp(0.75rem, 1.8vw, 1.4rem)`, weight 700, wide tracking, no glow)
Wrapper: `relative w-full overflow-hidden whitespace-nowrap`, edge mask `linear-gradient(to right, transparent, black 8%, black 92%, transparent)`. Reverse direction supported.

### 5. `DepthField.tsx`
Canvas particle field. ~58 particles each with depth, size, drift, fade-in/out lifecycle. Two faint vertical light shafts as background gradients drawn each frame. Mouse parallax via container-relative `mouseRef` (offset scaled by `depth`). Particles >0.65 depth get a small radial halo. Respawns at bottom when out-of-bounds. Returns `<canvas absolute inset-0 pointer-events-none>`.

### 6. `FooterTypography.tsx`
Centered editorial CTA block, triggered by `useInView(ref, { once: true, margin: '-8% 0px' })`.
- Massive ghost word behind (huge, ultra-low-opacity, `clamp(8rem, 22vw, 22rem)`)
- Eyebrow line: small caps "Ready to create" + thin animated line + arrow
- Headline (`ctaText`) with **per-word stagger reveal** (split on spaces; each word in `overflow-hidden` span with `motion.span` animating `y: 105% → 0%`, `rotateX 12 → 0`, opacity)
- Sub-copy paragraph fading up
- Stagger via `containerVariants` (staggerChildren 0.11, delay 0.18)

### 7. `FooterNavigation.tsx`
Three-column grid (Navigation / Next Project / Contact), animated in via `useInView`:
- Navigation: "Back to Work" link to `/#work` with `ArrowRight`
- Next Project: optional `{ title, slug }` linking to `/projects/{slug}` with `ArrowUpRight`
- Contact: `mailto:` link with `ArrowUpRight`
Bottom row: `MapPin` + location on left, `© {year} {copyrightName}. All rights reserved.` on right. Thin top divider line. Hover: subtle accent color shift on links.

### 8. `CinematicProjectFooter.tsx`
Composes everything. Single `containerRef` shared with `CursorGlow` + `DepthField`. Structure:

```text
<>
  <FooterTransitionVeil accentColor={accent} />
  <section ref={containerRef} className="relative overflow-hidden bg-black text-white">
    <DepthField containerRef={containerRef} count={58} />
    <CursorGlow containerRef={containerRef} color={accent} size={820} opacity={0.12} />
    <div className="relative z-10">
      <HolographicRibbon size="large" title={projectTitle} phrases={ribbonPhrases} accentColor={accent} />
      <FooterTypography ctaText={ctaText} accentColor={accent} />
      <HolographicRibbon size="small" title={projectTitle} phrases={ribbonPhrases} reverse accentColor={accent} />
      <FooterNavigation nextProject={nextProject} email={email} location={location} copyrightName={copyrightName} accentColor={accent} />
    </div>
    <GrainOverlay opacity={0.04} fps={20} />
  </section>
</>
```

Accent map: `default '140, 80, 255'`, `warm '255, 130, 55'`, `cool '55, 140, 255'`.

## Page integrations

In each project page:
- Remove `ProjectFooterRibbon` import + usage
- Remove the global `Footer` import + usage (the cinematic footer fully replaces it on these pages)
- Remove the existing in-page bottom "Back to Work / Next" `<section>` since `FooterNavigation` now handles that
- Add `import { CinematicProjectFooter } from "@/components/footer/CinematicProjectFooter"` and render at the bottom of `<main>`'s sibling area

**Vanta.tsx**:
```tsx
<CinematicProjectFooter
  projectTitle="VANTA"
  ribbonPhrases={["DIGITAL FASHION", "DROP SYSTEM", "CYBER STREETWEAR", "UI/UX"]}
  nextProject={{ title: "Elion", slug: "elion" }}
/>
```

**Elion.tsx**:
```tsx
<CinematicProjectFooter
  projectTitle="ELION"
  ribbonPhrases={["LUXURY AUDIO", "INDUSTRIAL DESIGN", "IMMERSIVE SOUND"]}
  nextProject={{ title: "Sip Society", slug: "sip-society" }}
/>
```

**SipSociety.tsx**:
```tsx
<CinematicProjectFooter
  projectTitle="SIP SOCIETY"
  ribbonColor="warm"
  ribbonPhrases={["FUNCTIONAL SODA", "BRAND SYSTEM", "PACKAGING", "UI/UX"]}
  nextProject={{ title: "Nextrip", slug: "nextrip" }}
/>
```

`ProjectDetail.tsx` (catch-all) keeps the existing `ProjectFooterRibbon` for now — out of scope.

## Notes
- All canvases respect `prefers-reduced-motion` is not in original spec; skipping unless requested.
- Type all `useRef`s with proper element generics (`HTMLCanvasElement`, `HTMLDivElement`, `HTMLElement`).
- No new CSS keyframes needed — framer-motion handles all animation; grain/particles are canvas.
- No new dependencies.