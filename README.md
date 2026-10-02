# 💗 Romantic Birthday Wisher Website for a Special Girl

A complete, polished, responsive romantic birthday-wisher website built with **React, Vite, and Tailwind CSS**. Designed with soft blush pink tones, warm ivory, rose pink accents, rounded cards, cute anime-inspired illustration framing, floating plus/sparkle decorations, and a dreamy, story-driven love letter experience.

---

## ✨ Core Experience & Storyline

1. **Opening / "A Little World Made For You"**: Dreamy intro animation with floating sparkles, handwritten title, and an "Open your surprise" button. Includes a background music toggle.
2. **Birthday Landing Hero**: Displays the birthday girl's name (editable), live age / birthday calculation, gentle typewriter message reveal, and anime reference profile card widget.
3. **Our Story / Timeline**: Interactive vertical timeline highlighting how you met, late conversations, inside jokes, and special milestones.
4. **Little Facts About Us**: Cute 3D flip cards with tap-to-reveal memories, shared habits, and admired qualities.
5. **Memory Gallery**: Responsive photo gallery with category filter tabs (All, Sweet Days, Favorites, Adventures) and lightbox modal viewing with full-size images and captions.
6. **Mini Games**:
   - **How Well Do You Know Us?**: Editable multiple-choice romantic quiz with instant feedback, score calculation, and celebratory confetti.
   - **Catch the Falling Hearts**: Interactive heart-catching game with combo scores, timer, floating physics, and win celebration.
7. **Birthday Cake Interaction**:
   - Animated 3D/CSS birthday cake with glowing candles.
   - Web Audio API microphone detection that extinguishes candles when the user blows toward the microphone.
   - Visible fallback button ("Tap to blow out candles") for desktop/no-mic/denied permission environments.
   - Automatic microphone track teardown for privacy & zero audio recording.
8. **Love Letter**: Paper-styled letter card with envelope seal, typewriter body animation, signature, and warm closing.
9. **Final Video Message**: Dedicated video section (`/images/final-message.mp4` & poster `/images/final-poster.jpg`) with a graceful placeholder when no video file is present.
10. **Final Closing Screen**: Warm closing message, floating hearts/confetti, and a smooth "Replay our story" flow returning to the opening.

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`

### Installation & Running Locally

```bash
# 1. Navigate to the project directory
cd path/to/romantic_birthday_website_starter/romantic_birthday_website_starter

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# Visit http://localhost:3000
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 📝 How to Customize Content & Replace Media

### 1. Editing All Copy & Personal Details
All text, names, dates, quiz questions, timeline entries, flip card secrets, and asset paths are managed in **one central file**:
👉 `src/data/siteContent.js`

Open `src/data/siteContent.js` in your text editor and customize:
- `recipientName`: Her name (e.g. `"Kaoruko"`)
- `birthdayDate`: Her birthday in `"YYYY-MM-DD"` format (e.g. `"2002-10-24"`)
- `hero.messageTypewriter`: The romantic message shown in the hero section
- `timeline.entries`: Replace bracketed placeholders with your real memories
- `facts.cards`: Customize flip card secrets
- `quiz.questions`: Add your own Q&As and correct answers

### 2. Replacing Photos, Video & Music
All media files are stored in `public/images/`.

| Filename | Purpose | Recommended Format |
|---|---|---|
| `hero-girl.jpg` | Main hero portrait | JPG or PNG |
| `memory-01.jpg` to `memory-06.jpg` | Gallery photos | JPG or PNG |
| `final-poster.jpg` | Video poster image | JPG or PNG |
| `final-message.mp4` | Personal birthday video message | MP4 video |
| `background-music.mp3` | Romantic background music | MP3 audio |

> **Pro Tip for Media Replacement**:
> Simply save your new photo or video into `public/images/` using the exact filenames listed above (e.g. replace `hero-girl.jpg` with her photo). Refresh the website and it will update automatically without requiring any code changes!

If you use a different extension (e.g., `.png` instead of `.jpg`), update the file path string in `src/data/siteContent.js`.

---

## 🛠️ Tech Stack & Features

- **React 19** + **Vite 6**
- **Tailwind CSS v4** for aesthetic responsive styling
- **Framer Motion** & CSS keyframe animations
- **Lucide React** icons
- **Canvas Confetti** for celebration bursts
- **Web Audio API** for synthesized background melody fallback and real-time mic volume blow detection
