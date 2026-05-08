## Update UI/UX Design gallery image

Replace the Unsplash photo currently used for the "UX / UI Design" card in the WhatWeDo circular gallery with the uploaded mockup image.

### Steps

1. Copy `user-uploads://ChatGPT_Image_May_7_2026_09_07_12_PM.png` → `src/assets/service-uxui.png`.
2. In `src/components/WhatWeDo.tsx`:
   - Add `import serviceUxUi from "@/assets/service-uxui.png";`
   - In `serviceData[0]` (UX / UI Design), replace the Unsplash `photo.url` with `serviceUxUi`.
   - Keep `pos: "center"` so the phone mockup stays framed nicely inside the 300×400 card.

No other cards or styles change.