## Plan

Three small edits to create a seamless fade from the Vanta image stack into the cinematic footer.

### 1. `src/pages/projects/Vanta.tsx`
- Change the outer wrapper around the four image sections from `<div className="pb-32">` to `<div className="relative">`.
- Add a non-interactive gradient overlay as the last child inside that wrapper (before its closing `</div>`):
  ```tsx
  {/* Seamless fade into footer */}
  <div
    className="pointer-events-none absolute inset-x-0 bottom-0"
    style={{
      height: 280,
      background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 40%, #000 100%)',
      zIndex: 5,
    }}
  />
  ```

### 2. `src/components/footer/FooterTransitionVeil.tsx`
Replace the outer wrapper style:
```tsx
style={{ height: 420, marginTop: -320, position: "relative", zIndex: 10 }}
```
with:
```tsx
style={{ height: 0, margin: 0, padding: 0, overflow: 'hidden' }}
```
This effectively disables the veil so the image-stack gradient owns the transition.

### 3. `src/components/footer/CinematicProjectFooter.tsx`
Update the footer `<section>` element (currently rendered with `marginTop: -2`) so it has no negative offset and gets a small top padding:
- Change className/style to `className="relative overflow-hidden"` and `style={{ background: '#000', paddingTop: '2rem' }}` (drop `marginTop: -2` and `text-white` is preserved on inner content via existing children — keep `text-white` on the section as today).

Net result: the image stack fades to pure black via its own gradient, the veil collapses to zero height, and the footer starts cleanly on solid black with breathing room above the ribbon.
