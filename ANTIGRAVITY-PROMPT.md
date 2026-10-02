# ANTIGRAVITY MASTER PROMPT — Romantic Birthday Wish Website

Build a complete, polished, responsive romantic birthday-wisher website for a special girl. Use the uploaded design reference image as the visual direction: soft blush pink, warm white, rose pink accents, rounded cards, subtle borders, cute anime-inspired illustration energy, floating plus/sparkle decorations, soft shadows, and a dreamy, elegant layout. Do not copy the reference screenshot literally; create a more personal, story-driven birthday experience.

## Core experience and storyline
Make the site feel like a small interactive love letter, not a generic birthday template. Structure it as a guided story with a clear beginning, middle, and emotional finale:

1. **Opening / “A little world made for you”**
   - A dreamy loading/intro animation with tiny floating hearts, sparkles, and a handwritten-style title.
   - A button such as “Open your surprise” that starts the experience.
   - Optional soft background music toggle; never autoplay audio without a user gesture.
2. **Birthday landing**
   - A beautiful hero section with the birthday girl’s name editable in one central content file.
   - A live age/birthday line only if the user supplies the date; otherwise use an editable placeholder.
   - A short romantic birthday message with gentle typewriter reveal.
3. **Our story / timeline**
   - A vertical or horizontal timeline for how we met, first conversations, favorite moments, inside jokes, and milestones.
   - Use editable sample copy clearly marked for replacement. Do not invent real personal facts.
4. **Little facts about us**
   - Cute flip cards or tap-to-reveal cards for “Things I remember,” “Our little habits,” “What makes you special,” and “Things only we understand.”
   - All text must come from a central content file, not hardcoded across components.
5. **Memory gallery**
   - A responsive photo gallery with lightbox/modal viewing, captions, dates, and smooth transitions.
   - Use the files in `public/images/` directly. Do not embed image data, remote image URLs, or duplicate image copies inside components.
6. **Mini games**
   - Include at least two simple, polished games:
     - “How well do you know us?” multiple-choice quiz with editable questions and a playful score/reaction.
     - “Catch the hearts” or “Find the hidden hearts” mini interaction.
   - Games should work on mobile and desktop, have a restart button, and not require a backend.
7. **Birthday cake interaction**
   - Show a cute animated cake with candles.
   - Request microphone permission only after the user taps “Blow out the candles.”
   - Use the Web Audio API to detect sustained loudness from microphone input and extinguish candles when the user blows toward the speaker/microphone.
   - Include a visible fallback button: “Tap to blow out candles” for devices without a microphone, denied permission, or unsupported browsers.
   - Clearly handle permission errors and stop microphone tracks after the interaction. Do not record or upload audio.
   - Add a short celebration animation and a birthday wish after the candles go out.
8. **Love letter / message**
   - A letter card with a typewriter effect, paper-like styling, and optional “open letter” interaction.
9. **Final video message**
   - A dedicated finale section for a personal video message.
   - Use `public/images/final-message.mp4` as the default local video path and `public/images/final-poster.jpg` as its poster; if the video is absent, show a graceful placeholder with instructions rather than a broken player.
   - Include a short written message beneath the video.
10. **Final screen**
   - End with a warm, memorable closing message, floating hearts/confetti, and a “Replay our story” button that smoothly returns to the beginning.

## Technical requirements
- Use React + Vite, modern JavaScript, and clean reusable components.
- Use CSS animations or Framer Motion if already available; avoid adding unnecessary dependencies.
- Fully responsive and accessible: keyboard support, visible focus states, semantic HTML, reduced-motion preference support, good color contrast, alt text, and touch-friendly controls.
- Optimize for smooth performance; lazy-load gallery images and avoid heavy effects on mobile.
- Add a small music control that starts only after the user clicks it. Include a mute/pause state.
- Use localStorage only for harmless progress/preferences if useful; the website must still work without it.
- No login, database, API keys, analytics, or external services are required.
- Keep all copy and image paths editable from one central content file, preferably `src/data/siteContent.js`.
- Keep all images/videos/audio in `public/images/` (or `public/media/` if you choose to separate video/audio, but document the choice). Reference them by stable relative paths such as `/images/hero-girl.jpg`; do not hardcode image data into components.
- When an asset is replaced with another file at the same path and filename, the site should display the new asset without code changes. If a filename changes, update only the central content file.
- Use the assets and filenames described in `content/ASSET-MAP.md`.
- Do not invent actual shared memories, names, dates, relationship details, or personal photos. Use warm editable placeholders and make every personal detail easy to replace.
- Include helpful comments where the user should customize names, dates, messages, memories, quiz answers, and asset paths.

## Visual design system
- Main background: very pale blush pink / warm ivory.
- Primary accent: rose pink.
- Secondary accent: muted mauve / lavender.
- Text: deep plum / charcoal, not pure black.
- Rounded cards, subtle 1px borders, soft shadows, generous whitespace, delicate gradients, tiny floating sparkles/hearts.
- Use a modern rounded sans-serif for body text and a tasteful handwritten/script font only for selected headings.
- Keep the design romantic and cute, but not cluttered or overly childish.
- Use the reference screenshot for palette and mood: approximately blush `#FFF5F8`, rose `#E86F9A`, pale pink `#F8DCE7`, mauve `#B87591`, and deep plum `#493744`. Treat these as starting points, not rigid exact values.

## Deliverables
1. A complete working React + Vite project.
2. `src/data/siteContent.js` containing all editable text, timeline entries, facts, gallery captions, quiz questions, and media paths.
3. A `public/images/` folder containing every image/video asset used by the app, plus an asset map.
4. A `README.md` with exact install/run instructions and a simple guide explaining how to replace photos/videos without breaking the website.
5. A responsive finished UI with all navigation, games, candle interaction, gallery modal, video finale, and replay flow functional.
6. Check for missing assets, console errors, broken links, and mobile layout problems before finishing.

Start by inspecting the project folder and the provided reference image. Then build the website completely; do not stop after creating a mockup or plan.
