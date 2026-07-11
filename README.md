# Jahana Sherin K.J — Developer & QA Portfolio

A premium, interactive, dark-themed bento-style portfolio website designed for **Jahana Sherin K.J**, Software Developer and QA Tester. Built using high-performance vanilla HTML5, CSS3, and JavaScript, featuring interactive canvas animations, accessibility compliance, and built-in text-to-speech (TTS) capability.

## 🚀 Live Demo
You can view the live deployed site here: **[Deploy Link Placeholder]**

---

## ✨ Features

- **Double Canvas System**:
  - **Background Canvas**: A binary dot-grid animation rendering shimmering binary streams (`0`, `1`, and `·`) that respond dynamically to viewport rendering.
  - **Interactive Particle Orb**: A glowing canvas nucleus orb with interactive particles that drift towards the cursor on hover.
- **AI Voice Profile Speaker**:
  - An interactive speaker badge in the Hero section utilizing the **Web Speech API (`SpeechSynthesis`)** to read Jahana's professional profile out loud.
  - Features a custom pick-voice algorithm that automatically targets premium online/offline natural female voices (such as `Microsoft Aria`, `Samantha`, or `Zira`).
  - Includes custom active states (pulsing green indicator, animated waveform SVG/CSS, and toggled text state).
- **Modern Bento Grid Layout**:
  - Clean cards showcasing professional summary, education, and soft skills with animated level bars.
- **Real-Time Project Previews**:
  - Embedded browser mockup frames containing live iframes for Render/Vercel deployed projects (Cookie Tracker Graph and Data Exhaust Dashboard), complete with lazy loading, fallback placeholders, and iframe load checking.
- **Mobile-First Responsive Design**:
  - Custom fluid layouts down to `320px` width.
  - Tailored mobile adaptations such as a 2x2 grid structure for hero statistics, scaled-down canvas dimensions, safe-aligned margins to prevent layout clipping, and word-wrapping for long link strings.
- **Accessibility & SEO Optimized**:
  - Full screen reader accessibility markings (`aria-label`, `role="button"`).
  - Clean HTML5 semantic tagging, optimized meta headers, and custom search engine tags.

---

## 🛠️ Technology Stack

- **Core**: Vanilla HTML5, Vanilla JavaScript (ES6+ Modules)
- **Styling**: Vanilla CSS3 (Custom Variables/Design Tokens)
- **APIs**: Web Speech API (`speechSynthesis`, `SpeechSynthesisUtterance`)
- **Graphics**: HTML5 2D Canvas API

---

## 📂 Project Structure

```
├── index.html          # Main HTML structure, layout, and meta tag setup
├── style.css           # Design token system, typography, animations, and media queries
├── script.js          # Interactive canvas engines, navbar triggers, and SpeechSynthesis controls
├── jahana_resume.pdf   # Jahana's professional CV (view & download actions)
└── README.md           # Documentation
```

---

## 💻 Local Setup & Development

To run this project locally, you don't need any complex build configurations. Simply serve it using a standard static server:

1. Clone or download this repository.
2. Ensure you have Jahana's resume named `jahana_resume.pdf` placed in the root directory.
3. Open `index.html` directly in your browser, or serve it using an extension like **Live Server** in VS Code to ensure canvas and SpeechSynthesis modules run smoothly:
   ```bash
   # Or use python's built-in HTTP server:
   python -m http.server 8000
   ```
4. Access the site locally at `http://localhost:8000`.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
