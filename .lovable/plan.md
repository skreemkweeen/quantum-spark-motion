## NexTrip — Cinematic Case Study Page

Recreate the reference PDF (one tall composition, ~14 stacked frames) as a dedicated, fully responsive case study route for NexTrip, replacing the generic `ProjectDetail` fallback for `slug: "nextrip"`. Black-on-black, metallic gradients, glassmorphism, smooth scroll storytelling.

### Route & wiring
- New page: `src/pages/projects/Nextrip.tsx`
- Add route in `src/App.tsx` above the `/projects/:slug` fallback: `/projects/nextrip → Nextrip`
- Reuse existing `Nav`, `Footer` (StudioFooter), `Reveal`, `Parallax`, `useParallax` for consistency.

### Section flow (mirrors reference exactly)

```
01  HERO            Top-down jet, "nextrip" oversized ghost wordmark, meta (Name/Type/Year), N logo mark
02  INTRO           Application / About / Main Task — 3-column editorial copy + floating phone mockup with flight search UI
03  ARCHITECTURE    "Application structure" — MVP/Coming lists + node-graph user flow diagram
04  IDENTITY        Three glass cards: jet, N monogram, palette + WCAG + Satoshi typography
05  SPLASH SCREENS  Three iPhones in a row over giant "NEXTRIP" ghost text
06  DESCRIPTION     Centered statement + clouds + N wordmark, atmospheric
07  REGISTRATION    Stacked auth modals over phone frame + side description
08  REMINDER        Phone + Apple Watch float + reminder cards
09  FILTERS         Three phones + filter UI panels — "Simplified view of ticket purchase"
10  TRAVELER COPY   "All the main settings are within walking distance" — 3-column with N
11  USERFLOW        Centered statement "Traveler version offers extensive functionality" + tilted Mercedes phone
12  TOURS           Bali — Indonesia: rating, review card, share panel, phone with image carousel
13  CONTACTS        Seat map phone + ticket cards + add-ons panel cluster
14  PROFILE         Profile phone + stats chips + persona toggles (Beginner / Traveler / Businessman)
15  CLOSING SHELF   Tilted iPhone array (perspective row of mockups)
16  RIBBON + FOOTER Reuses ProjectFooterRibbon + StudioFooter
```

Each numbered section gets the small frame chrome from the reference: top index pill (`01`, `02`...), tiny plane glyph, dotted rule, ellipsis on the right; subtle rounded "device-bezel" top/bottom edges between sections (matte chrome curve).

### Visual system
- Background `#050508` with layered radial gradients (warm steel highlight top-center per section), faint grid mask, grain overlay (reuse `GrainOverlay`).
- Section chrome divider component `NextripBezel` — thin metallic chrome curve top + bottom, replicating the reference's "device frame between sections".
- Glass panels: `bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]`.
- Metallic gradients for the N mark and accent rules (`linear-gradient` chrome silver).
- Typography: Satoshi if available, else fall back to existing system stack with semi-bold tight tracking. Oversized ghost wordmarks at ~`clamp(6rem,18vw,18rem)` with `text-white/[0.04]`.

### Motion
- `Reveal` fade-up on every text block.
- `Parallax` / `useParallax` on phones, planes, clouds (different speeds per layer, 0.6–1.2).
- Floating device animation: reuse `animate-float-y` keyframe.
- Hover: phones lift/tilt slightly, glass cards brighten border.
- Userflow nodes: subtle staggered fade-in via IntersectionObserver.
- Honors `prefers-reduced-motion` (existing utilities already do).

### Assets
Generate (premium where text legibility matters, otherwise standard) into `src/assets/nextrip/`:
- `hero-jet-top.png` — top-down dark metallic jet, transparent bg
- `phone-search.png` — iPhone mockup showing flight search UI (NY → Dubai)
- `phone-splash-1/2/3.png` — three splash variants (city/mountain/world)
- `phone-registration.png`, `phone-reminder.png`, `watch-reminder.png`
- `phone-filters.png`, `phone-ticket.png`, `phone-mercedes.png`
- `phone-bali.png`, `bali-landscape.jpg`
- `phone-seatmap.png`, `phone-passenger.png`, `phone-summary.png`
- `phone-profile.png`, profile avatar
- `clouds-soft.png`
- Closing perspective row: a single composed `phones-row.jpg`
Where generation cost matters, reuse `vantaHero` style techniques (single composed image per cluster instead of many separate).

### Responsive behavior
- Desktop (≥1024px): full editorial layout, multi-column, devices floating, ghost wordmarks at full size.
- Tablet (768–1023px): collapse 3-col copy to 2-col, scale phones to 70%, keep ghost wordmarks.
- Mobile (<768px): single column, devices stack vertically and center, ghost wordmarks shrink and clip via `overflow-hidden`, section bezels simplify to a thin hairline.

### Update the work index
- `src/components/sections/Projects.tsx`: NexTrip already links to `/projects/nextrip` via the catch-all; new explicit route takes over. No other changes needed.

### Out of scope
- No backend, no data fetching.
- No changes to existing sections on `/`.
- Footer/ribbon untouched.

### Files to create / edit
- create `src/pages/projects/Nextrip.tsx`
- create `src/components/nextrip/NextripBezel.tsx` (chrome divider)
- create `src/components/nextrip/SectionFrame.tsx` (index pill + plane + ellipsis chrome)
- create `src/components/nextrip/NMark.tsx` (metallic SVG N logo)
- create `src/components/nextrip/UserFlowDiagram.tsx` (SVG node graph)
- generate assets under `src/assets/nextrip/`
- edit `src/App.tsx` to register the route
