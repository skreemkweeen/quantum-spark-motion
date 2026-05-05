## Dependencies

- `gsap` is already installed (^3.15.0).
- `motion` (the modern successor to framer-motion, same API via `motion/react`) is already installed (^12.38.0) and used across the project.
- `framer-motion` itself is **not** installed.

## Plan

Install `framer-motion` so any component using `from "framer-motion"` imports works alongside the existing `motion/react` imports.

Single step:
1. Add `framer-motion` to dependencies.

No code changes required — this is a dependency-only addition.