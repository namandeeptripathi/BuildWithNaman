# Naman Deep Tripathi — Portfolio

Personal portfolio and digital archive of Naman Deep Tripathi, showcasing practical software engineering, AI/ML systems, and full-stack web applications. Built with an editorial dark-luxury design aesthetic, subtle scroll physics, and responsive layouts.

## Features

- **Editorial Design System**: Curated typography (Bodoni Moda, Hanken Grotesk, DM Mono) with dark-luxury and warm-light themes, smooth transitions, and zero-FOUC state restoration.
- **3D Hero Lattice**: Interactive Three.js icosahedron canvas loaded lazily post-paint with pointer reactivity, WebGL context loss recovery, and graceful static fallback.
- **Scroll Motion**: Coordinated section reveals, line animations, and manifesto stagger effects orchestrated via dynamically imported Anime.js.
- **Case Studies**: Interactive project cards featuring glassmorphic browser mockups, radial spotlight effects, and live demo links.
- **Accessible Contact Form**: Accessible contact form with inline validation, honeypot spam protection, 15s timeout guard, and Formspree integration.
- **SEO & Social Preview**: 1200×630 Open Graph preview image, Twitter Card meta tags, and Schema.org Person JSON-LD structured data.
- **Accessibility & Performance**: WCAG 2.1 AA compliant color tokens, skip-to-content navigation, keyboard-accessible scroll regions, and strict `prefers-reduced-motion` compliance.

## Tech Stack

- **Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS custom properties
- **3D & Animation**: [Three.js](https://threejs.org/), [Anime.js v4](https://animejs.com/), [Motion](https://motion.dev/)
- **UI Components**: [React Bits](https://reactbits.dev/) (`BlurText`, `SpotlightCard`)
- **Backend / Forms**: [Formspree](https://formspree.io/)

## Getting Started

### Prerequisites
- Node.js 18+ (tested on Node.js 20+)
- npm 9+

### Installation & Development
```bash
# Clone repository
git clone https://github.com/namandeeptripathi/BuildWithNaman.git
cd BuildWithNaman

# Install dependencies
npm install

# Start local dev server (http://localhost:5173)
npm run dev

# Run type check & build production bundle
npm run build

# Preview production build locally (http://localhost:4173)
npm run preview

# Run linter
npm run lint
```

## Environment Variables

Create a `.env` file in the project root (never committed to git, excluded via `.gitignore`). Refer to `.env.example`:

```bash
VITE_FORMSPREE_ID=your_formspree_form_id
VITE_SITE_URL=https://yourdomain.com
```

- `VITE_FORMSPREE_ID`: The Formspree endpoint identifier for receiving contact form messages. If omitted, the contact form falls back gracefully to direct mailto links.
- `VITE_SITE_URL`: The production site base URL used to resolve canonical and Open Graph meta tags during build.

## Project Structure

```
├── public/                # Static assets (og.png, apple-touch-icon, favicon, screenshots)
├── src/
│   ├── components/        # React UI components (Hero, Header, ProjectRow, ContactForm)
│   │   └── reactbits/     # Specialized interactive components (BlurText, SpotlightCard)
│   ├── lib/
│   │   ├── motion/        # Scroll motion controllers (reveal, stack, manifest, line)
│   │   ├── useTheme.ts    # Light/dark theme toggle and persistence hook
│   │   └── usePrefersReducedMotion.ts
│   ├── data.ts            # Single source of truth for all portfolio content and metadata
│   ├── index.css          # Design tokens, typography, and utility stylesheets
│   ├── App.tsx            # Main application layout and landmark structure
│   └── main.tsx           # React DOM root entrypoint
├── index.html             # Shell HTML, Google Fonts, theme loader script, SEO tags
└── vite.config.ts         # Vite bundler configuration and build plugins
```

## Editing Content

All site copy, personal bio, social URLs, skills list, manifesto lines, and project metadata are centralized in [`src/data.ts`](src/data.ts). Updating content does not require editing component JSX.

## Credits

- UI motion components (`BlurText`, `SpotlightCard`) adapted from [React Bits](https://reactbits.dev/) by David Haz, licensed under the **MIT + Commons Clause License**.

## License

All rights reserved for personal content, case-study texts, project media, and custom design elements © Naman Deep Tripathi. Open-source third-party dependencies are governed by their respective licenses.
