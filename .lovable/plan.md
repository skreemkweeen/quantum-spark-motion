## NexTrip — Cinematic Refinement Pass

A focused polish pass on the existing `/projects/nextrip` route. No new sections, no restructure — every change makes the existing flow feel sculptural, editorial, and atmospheric instead of templated.

### Scope
Touch only:
- `src/pages/projects/Nextrip.tsx`
- `src/components/nextrip/SectionFrame.tsx`
- `src/components/nextrip/NMark.tsx`
- `src/components/nextrip/UserFlowDiagram.tsx`
- one new helper `src/components/nextrip/Atmosphere.tsx` (lighting layers + reflections)
- minor utility additions to `src/index.css` (chrome gradient + reflection mask)

No route changes. No asset regeneration unless a section needs a softer, darker plate (only `bali.jpg` and `phones-row.jpg` are candidates, and only if the existing crops feel flat — decided per-section in the implementation pass).

---

### 1. Atmosphere & lighting system

Replace the single fixed radial gradient with a **multi-layer per-section lighting rig**:

- Top-center warm steel highlight (existing) → softened, larger falloff.
- New **per-section spotlight**: a tall vertical light cone behind the focal device (`radial-gradient(ellipse 30% 70% at 50% 40%, rgba(220,225,235,0.06), transparent 70%)`).
- New **floor reflection plate** under each phone/jet: thin elliptical shadow + faint mirrored gradient — sells weight.
- **Vignette ring** at section edges using `mask-image` so each section reads as its own cinematic frame.
- **Caustic streak** (single ultra-low-opacity diagonal light bar) on key sections (Hero, Splash, Mercedes, Closing).

All packaged in `Atmosphere.tsx` with named variants: `hero`, `editorial`, `device`, `wide`. Pure CSS — no JS, respects `prefers-reduced-motion`.

### 2. Depth & metallic gradients

- `Bezel` divider rebuilt with a true chrome gradient (4-stop: `#0a0a0f → #2a2a32 → #14141a → #050508`) plus a 1px specular highlight line and a soft inner-shadow seam below — gives the "device frame between scenes" feel from the reference.
- `GlassCard` upgraded: dual-border (outer `white/8`, inner `white/4`), corner-light highlight via `radial-gradient` in `::before`, deeper shadow stack (`0 1px 0 inset`, `0 40px 80px -40px black`, ambient `0 0 120px -40px white/5`).
- `NMark` gets a richer 6-stop chrome gradient + subtle inner bevel path for sculptural read at large sizes.

### 3. Editorial composition & negative space

- Increase vertical rhythm: section padding goes from `py-24` → responsive `py-32 md:py-40 lg:py-48`.
- Break symmetry on every "centered" composition:
  - Hero: jet shifted left ~8%, ghost wordmark shifted right ~6%, N badge repositioned for asymmetric balance.
  - Intro: phone moves to right column, copy collapses to left 2 columns with wider gutter.
  - Mercedes: phone offset right with a long left-side editorial caption stack.
  - Bali: 1fr/1.6fr/0.8fr asymmetric grid, image bleeds past container edge.
  - Closing shelf: tilted further, anchored bottom-right, with empty top-left for breathing room.
- Add **editorial micro-grid** behind sections (1px column lines at `white/3`) on Architecture, Identity, and Bali — only at `lg+`.

### 4. Typography hierarchy

- New **3-tier label system** consistently applied:
  - Tier 1 (8px, `tracking-[0.4em]`, `text-white/35`) — section meta, coordinates, indices.
  - Tier 2 (10px, `tracking-[0.3em]`, `text-white/50`) — column titles ("Application", "About").
  - Tier 3 (11px, `tracking-[0.25em]`, `text-white/70`) — inline labels.
- Section headlines: tighter tracking (`-0.02em`), reduced weight from `font-semibold` to `font-medium` for that editorial feel, larger size (`clamp(1.8rem,4vw,3.2rem)`).
- Body copy: max-width clamped to `52ch`, line-height `1.7`, color `text-white/70` (was `/80–/85`) for restraint.
- Italic accent words (e.g. *experience*) get a serif fallback (`font-serif italic text-white/95`) — a Figma-style typographic pivot.
- Remove duplicate `• • • Description` markers; use a single hairline + 1 word label.

### 5. Devices feel sculptural

For every phone/jet image:
- Wrap in a `Device` component that adds:
  - Top edge specular highlight (`::before` thin gradient bar).
  - Side rim light (`::after` 1px vertical gradient).
  - Floor reflection (mirrored, masked, blurred copy below — pure CSS via `transform: scaleY(-1)` + linear gradient mask).
  - Ambient glow halo (`box-shadow` ambient + cinematic drop shadow stack).
- Cursor-tracked subtle 3D tilt (max ±4°, lerped) on desktop only — disabled on touch and reduced motion.
- Mercedes phone: rotation softened (`-rotate-3` instead of `-6`), and the hover transition smoothed with a custom cubic-bezier (`[0.16,1,0.3,1]`).

### 6. Motion & transitions

- Replace pop-in `Reveal` with a slower, more cinematic curve: 900ms `cubic-bezier(0.22,1,0.36,1)`, 24px translate, blur-to-sharp (4px → 0).
- Stagger child reveals via `data-stagger` index (60ms increments).
- Parallax speeds re-tuned per layer (clouds 1.25, devices 0.92, ghost wordmarks 0.85, copy 1.0) for parallax depth without feeling busy.
- Section bezels animate in: chrome highlight sweeps L→R once on enter (CSS keyframe, 1.4s, ease-out).
- Add scroll-linked dim: as a section leaves viewport center, opacity fades to 0.55 (CSS `animation-timeline: view()` with JS fallback for unsupported browsers — soft fallback only, no blocking).

### 7. Color & contrast restraint

- Strip remaining warm tints from copy — everything resolves to pure neutral white scales.
- Background base shifts subtly per section via a fixed gradient backdrop: hero slightly cooler (`#06070b`), identity warmer (`#070608`), tour neutral — sells "rooms" in the same building.
- Reduce border opacity globally from `/10` → `/7` on glass; hover states brighten to `/18` only (was `/20`).

### 8. Accessibility & performance

- All new effects pure CSS where possible; tilt is 1 rAF subscription shared across devices.
- `prefers-reduced-motion`: disables tilt, parallax overrides, blur-in, and chrome sweep.
- Image `loading="lazy"` + `decoding="async"` retained; reflections are CSS-only (no extra image weight).
- No new fonts loaded; serif accents use system serif stack already available.

---

### Technical notes

```text
src/pages/projects/Nextrip.tsx
  - replace fixed atmosphere block with <Atmosphere variant="hero" />
  - rewrap each focal image with <Device tilt reflection halo />
  - retune section paddings, grid asymmetry, label tiers
  - drop duplicated "• • • Description" headers

src/components/nextrip/Atmosphere.tsx (new)
  - exports <Atmosphere variant /> + <Spotlight /> + <FloorReflection />
  - all CSS, no JS state

src/components/nextrip/SectionFrame.tsx
  - Bezel: 4-stop chrome gradient, specular highlight, inner-shadow seam
  - SectionHeader: tier-1 typography, hairline rule replaces dotted

src/components/nextrip/NMark.tsx
  - extend gradient to 6 stops, add bevel inner stroke

src/components/nextrip/UserFlowDiagram.tsx
  - thinner strokes (0.6 → 0.4), node fills get inner gradient, soft glow on active edge

src/index.css
  - .chrome-gradient utility
  - .device-reflection mask
  - @keyframes chrome-sweep
  - reduced-motion overrides
```

### Out of scope
- No new sections, no copy rewrites, no new images unless a specific plate reads as flat in QA.
- No changes to Nav, Footer, ribbon, or the global routing.
- No backend, no data, no dependency additions.
