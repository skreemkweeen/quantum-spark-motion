# Element UX — Motion & Interaction System

The current `Index` page is a placeholder, so this plan builds the full single-page site implementing the precision motion system you described.

## Sections to build

1. **Top nav** with the `ELEMENT UX` logo (glitch on hover) and minimal nav links.
2. **Hero** — large heading, supporting copy, right-side stats column, parallax background.
3. **Project list** — VANTA / ELION / SIP SOCIETY / NEXTRIP / 11VEN with hover preview panel.
4. **Device mockup** section with floating + scroll-rotation behavior.
5. **Footer** with animated divider lines.

## 01 — Logo glitch system

- Component `GlitchLogo` rendering "ELEMENT UX" three times stacked (base + two offset color layers using `mix-blend-mode: screen`, very subtle red/cyan offsets ~1px).
- On `mouseenter`: fire a one-shot 0.3s timeline:
  - 4 keyframes of clip-path horizontal slice offsets (1–2px translateX)
  - Channel separation animates from 0 → 1.5px → 0
  - Faint scanline overlay (repeating-linear-gradient, opacity 0 → 0.15 → 0) on a pseudo layer
- Snap back; locked from re-trigger until `mouseleave` to prevent loop spam.
- Pure CSS keyframes + a single `data-glitch="on"` toggle — no JS animation libs needed for this.

## 02 — Project list

Layout:

```text
┌───────────────────────────┬────────────────────────┐
│ VANTA                     │                        │
│ ELION                     │   [preview image]      │
│ SIP SOCIETY               │                        │
│ NEXTRIP                   │                        │
│ 11VEN                     │                        │
└───────────────────────────┴────────────────────────┘
```

- Left column: vertically stacked names, large display type, tight tracking, muted color by default.
- Hover a name → it brightens to foreground, others dim to ~40%; right panel cross-fades to that project's preview with a subtle scale (1.02 → 1.0) and 250ms fade.
- First item active by default; sticky preview panel on desktop.
- Placeholder preview images generated as solid-tone gradients per project (real assets can be swapped in later).

## 03 — Parallax scroll system

- Single hook `useParallax(speed)` that subscribes to a shared rAF scroll loop and writes `transform: translate3d(0, y*speed, 0)` to a ref.
- Wrapper `<Parallax speed={...}>` for ergonomic use.
- Layer speeds:
  - Background shapes/gradients: `0.3` (slower)
  - Mid images/mockups: `1.0` (normal)
  - Foreground text: `1.15` (slightly faster)
- Smoothed with a lerp (current → target at 0.1) for cinematic feel.
- Respect `prefers-reduced-motion` → disable all parallax.

## 04 — Hero parallax

- Heading wrapped in `<Parallax speed={0.85}>` (slower than scroll).
- Background gradient/lines layer at `0.4`.
- Right stats column at `1.1` so it drifts independently.
- Optional mouse parallax: a `useMouseParallax` hook applies `translate(x*4px, y*4px)` to background + `*-2px` to stats. Very subtle, eased.

## 05 — Device mockups

- Floating: continuous CSS keyframe `translateY(-6px ↔ 6px)` over 6s ease-in-out, staggered per device.
- Scroll rotation: `useParallax`-style hook returning a rotate value (`-3deg → 3deg` mapped to viewport progress).
- Two/three layered devices with different `z` translate and parallax speeds for depth.

## 06 — Micro-interactions

- `Reveal` component using IntersectionObserver: child fades in + translateY(16px → 0) over 600ms, once.
- Animated divider lines: `scaleX(0 → 1)` from left origin when in view (500ms).
- Global hover utility classes: `hover:scale-[1.03] transition-transform duration-200`, opacity shifts on links.

## 07 — Performance

- Animations use only `transform` and `opacity`.
- Single shared rAF loop for all parallax subscribers (no per-component listeners).
- `will-change: transform` only on parallax layers, removed when offscreen.
- No backdrop-filter / blur on scrolling layers.

## 08 — Design tokens

Add to `index.css` (HSL):
- Near-black background, off-white foreground, muted gray, single subtle accent.
- Tailwind keyframes/animations: `glitch`, `glitch-slice`, `float`, `reveal-up`, `divider-in`, `scanlines`.

## Technical notes

- New files:
  - `src/components/GlitchLogo.tsx`
  - `src/components/Parallax.tsx` + `src/hooks/useParallax.ts` (shared rAF store)
  - `src/hooks/useMouseParallax.ts`
  - `src/components/Reveal.tsx`
  - `src/components/sections/Hero.tsx`
  - `src/components/sections/Projects.tsx`
  - `src/components/sections/Devices.tsx`
  - `src/components/sections/Footer.tsx`
  - `src/components/Nav.tsx`
- Replace `src/pages/Index.tsx` to compose the sections.
- Extend `tailwind.config.ts` keyframes/animations and `index.css` tokens.
- No new dependencies required.

## Open question

Project preview images: generate placeholder gradient panels for now, or do you want to upload real artwork for VANTA / ELION / SIP SOCIETY / NEXTRIP / 11VEN before implementing? (Default: placeholders, easy to swap.)
