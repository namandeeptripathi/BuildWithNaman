# Naman Deep Tripathi — Portfolio

Personal portfolio of Naman Deep Tripathi. It contains project case studies, an interactive 3D hero lattice, a technical skill and dependency listing, work history, and a validated contact form.

## Features

- Editorial Design System: Typography with Bodoni Moda, Hanken Grotesk, and DM Mono, supporting dark-luxury and warm-light themes with localStorage persistence and zero-FOUC inline theme loading.
- 3D Hero Lattice: Three.js icosahedron canvas loaded lazily post-paint with pointer reactivity; if WebGL is unavailable or the context is lost, the canvas is hidden and the hero stays readable without console errors.
- Scroll Motion: Section reveals, an animated connecting line in the Work section, and dependency listing stagger effects orchestrated via dynamically imported Anime.js.
- Case Studies: Project cards featuring browser-frame previews with a spotlight hover, tech tags, and links to live deployments and GitHub repositories.
- Accessible Contact Form: Inline-validated contact form with honeypot spam protection, a 15-second timeout guard, and Formspree integration.
- SEO and Social Preview: 1200x630 Open Graph preview image, Twitter Card meta tags, and Schema.org Person JSON-LD structured data.
- Accessibility: Color tokens pass WCAG 2.1 AA contrast ratios, skip-to-content link, keyboard-accessible scroll regions, and prefers-reduced-motion support.

## Tech Stack

- Core: React 19, TypeScript, Vite
- Styling: Tailwind CSS v4 and Vanilla CSS custom properties
- 3D and Animation: Three.js, Anime.js v4, Motion (motion/react)
- UI Components: React Bits (BlurText, SpotlightCard)
- Form Backend: Formspree

## Getting Started

### Prerequisites
- Node.js: ^20.19.0 || >=22.12.0 (required by Vite; tested on Node.js v26.5.0, npm 11.17.0)

### Installation and Commands
Clone the repository:
```bash
git clone https://github.com/namandeeptripathi/BuildWithNaman.git
cd BuildWithNaman
npm install
```

Development and build commands:
- `npm run dev`: starts the Vite local development server at http://localhost:5173
- `npm run build`: runs `tsc -b && vite build` (TypeScript check and Vite production bundling)
- `npm run preview`: previews the production build locally at http://localhost:4173
- `npm run lint`: runs Oxlint across project source files

## Environment Variables

Create a `.env` file in the project root (excluded from version control via `.gitignore`). Refer to `.env.example`:

```bash
VITE_FORMSPREE_ID=your_formspree_form_id
VITE_SITE_URL=https://yourdomain.com
```

- `VITE_FORMSPREE_ID`: The Formspree form identifier for receiving contact form submissions. If omitted, the form falls back to direct mailto links.
- `VITE_SITE_URL`: Production site base URL used to resolve canonical and Open Graph URLs during build.

## Project Structure

```
├── public/
│   ├── projects/          # Project screenshots (WebP)
│   ├── apple-touch-icon.png
│   ├── favicon.svg
│   ├── og.png             # 1200x630 social preview image
│   └── robots.txt
├── reference/             # Original single-file HTML/CSS prototype
├── src/
│   ├── components/        # React components (Hero, Header, ProjectRow, ContactForm)
│   │   └── reactbits/     # BlurText and SpotlightCard components
│   ├── lib/
│   │   ├── motion/        # Scroll motion controllers (reveal, stack, manifest, line)
│   │   ├── useTheme.ts    # Light/dark theme toggle and persistence hook
│   │   └── usePrefersReducedMotion.ts
│   ├── data.ts            # Profile content, project info, skills, and copy
│   ├── index.css          # Design tokens, typography, and utility stylesheets
│   ├── App.tsx            # Main layout and landmark structure
│   └── main.tsx           # React DOM root entrypoint
├── tools/
│   └── og/                # HTML templates used to generate og.png and apple-touch-icon.png
├── index.html             # Shell HTML, Google Fonts, theme loader script, SEO metadata
└── vite.config.ts         # Vite bundler configuration and build plugins
```

## Editing Content

All site copy, personal bio, social links, skills list, Maven-style dependency listing, and project metadata reside in `src/data.ts`. Content changes can be made there without modifying component JSX.

## Credits

UI motion components (`BlurText`, `SpotlightCard`) adapted from React Bits (https://reactbits.dev/) by David Haz, under the MIT + Commons Clause License Condition v1.0.

## License

All rights reserved for personal content, case-study copy, project media, and custom design elements (c) Naman Deep Tripathi. Open-source third-party dependencies are governed by their respective licenses.
