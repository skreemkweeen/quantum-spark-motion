## ProjectFooterRibbon — Global Cinematic Marquee

A reusable React + Tailwind component injected at the bottom of every project page (above the existing site `Footer`). It renders two layered infinite marquees with cinematic ambience (grain, scanlines, vignette, light streaks) on pure black.

### New file: `src/components/ProjectFooterRibbon.tsx`

Props:
```ts
type Props = {
  title: string;
  phrases?: string[];      // joined with " — "
  speed?: number;          // px/sec for front ribbon (default 60)
  theme?: "default" | "warm" | "cool";
  className?: string;
};
```

Structure (single section, full-bleed black, no border):
```text
<section> (relative, h-[90px] md:h-[130px], bg-black, overflow-hidden)
  ├─ vignette layer        (radial-gradient, pointer-events-none)
  ├─ scanlines layer       (repeating-linear-gradient, slow translateY anim)
  ├─ light streaks layer   (2–3 thin horizontal gradients drifting x, very low opacity)
  ├─ back ribbon           (larger ~10vw text, blur-[6px], opacity-10, slower, slight Y offset)
  ├─ front ribbon          (uppercase ~3vw text, white, font-semibold tracking-wide)
  └─ grain overlay         (SVG fractalNoise, mix-blend-overlay, opacity ~0.08)
```

Marquee technique:
- Each ribbon = flex row with the phrase string duplicated 2× back-to-back.
- Animate via `requestAnimationFrame`, mutating `transform: translate3d(x,0,0)` where `x = -(progress % halfWidth)`. This guarantees seamless loop regardless of text length.
- Speed driven by prop; back ribbon runs at `speed * 0.45` in opposite direction for parallax feel.
- Pause/slow on hover: ref-tracked `hoverRef` multiplies speed by 0.35; CSS class adds subtle `text-shadow` glow and bumps streak opacity.
- Respects `prefers-reduced-motion` (static, no rAF loop).

Edge masking on the marquee container:
```css
mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
-webkit-mask-image: same;
```

Phrase composition:
- If `phrases` provided → `[title, ...phrases].join(" — ") + " — "`.
- Repeated enough times within one track to overflow viewport (compute on mount via `scrollWidth`, append clones until ≥ 2× viewport width).

### CSS additions: `src/index.css`
- `@keyframes scan-drift` (translateY 0 → 4px, 8s linear infinite) for scanlines.
- `@keyframes streak-drift` (translateX -20% → 120%, 14s/22s linear infinite) for light streaks.
- No new keyframes for the marquees themselves (handled by rAF).

### Integration

Add `<ProjectFooterRibbon … />` directly above `<Footer />` in:
- `src/pages/projects/Vanta.tsx` — title `"VANTA"`, phrases `["DIGITAL FASHION","DROP SYSTEM","CYBER STREETWEAR","UI/UX"]`
- `src/pages/projects/SipSociety.tsx` — `"SIP SOCIETY"`, `["FUNCTIONAL SODA","BRAND SYSTEM","PACKAGING","UI/UX"]`
- `src/pages/projects/Elion.tsx` — `"ELION"`, `["LUXURY AUDIO","INDUSTRIAL DESIGN","IMMERSIVE SOUND"]`
- `src/pages/ProjectDetail.tsx` (catch-all for `nextrip`, `11ven`, etc.) — derive phrases from a small map keyed by `slug`, with a sensible default using `project.tag`.

Map (inside `ProjectDetail.tsx` or a tiny `src/lib/projectPhrases.ts`):
```ts
{
  nextrip: ["TRAVEL PLATFORM","MOBILE EXPERIENCE","FLIGHT SYSTEM"],
  "11ven": ["CULTURE","FASHION","IDENTITY","EXPERIENCE"],
  // fallback: [project.tag]
}
```

### Performance / a11y
- Only `transform` and `opacity` animated → GPU compositor, no layout.
- `will-change: transform` on both ribbon tracks; removed on unmount.
- Single rAF loop instance shared by both ribbons (one effect, two refs).
- `aria-hidden="true"` on ambience layers; ribbon has `role="marquee"` + visually-hidden text label `"{title} — themes"`.
- Reduced-motion: static text, no streaks/scanline animation.

### Out of scope
- No changes to the global site `Footer` (`contact` section).
- No GSAP dependency added — rAF is sufficient and lighter.
- Does not auto-mount via a router wrapper; explicitly placed per project page (4 small edits) so each page can pass tailored phrases without prop-drilling through routing.
