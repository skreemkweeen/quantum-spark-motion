## Plan

1. **Create `src/components/VantaSectionDivider.tsx`** with the exact code provided: a 110px-tall black divider featuring a canvas grain loop (ResizeObserver + 20fps rAF), scanlines, a ghost "VANTA — SUPPLY" oversized background text, a centre red/white glow line with left/right red accent bars and dots, monospace HUD labels (`[ VANTA SUPPLY`, `SYS-0x821A`, `BUILT IN THE DARK`, `VOID 01`), two crosshairs flanking centre, an animated framer-motion sweep, and edge vignettes.

2. **Update `src/pages/projects/Vanta.tsx`:**
   - Remove `import { BlendStack } from "@/components/BlendStack"`.
   - Add `import { VantaSectionDivider } from "@/components/VantaSectionDivider"`.
   - Replace the entire `<BlendStack ... />` block with the four image sections (hero / front+back grid / app / screens) separated by three `<VantaSectionDivider />` instances, wrapped in a `<div className="pb-32">`.

No other files change. The `CinematicProjectFooter` and page metadata sections remain untouched.
