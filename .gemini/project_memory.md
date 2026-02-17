# Project Memory: Skyblock Guides

This document serves as a persistent memory of the project's state, findings, and architecture for future sessions.

## 📌 Notable Findings

### Content Rendering
- **Dual Format Support**: The application renders guides in both **Markdown** and **HTML (from .docx)**.
- **Link Processing**: 
  - For `.docx` files, `DOMParser` is used in `GuideDetail.jsx` to inject `target="_blank"` and `rel="noopener noreferrer"`.
  - For Markdown, `ReactMarkdown` is configured with custom components for the same purpose.
  - Global link styling is defined in `src/index.css` under `.prose-custom a`.
- **Mammoth.js**: Used for converting `.docx` to HTML.

### Data Management
- **Supabase Integration**: 
  - Primary source for guide metadata (`guides` table) and category definitions (`categories` table).
  - Fetched in `GuideDetail.jsx` (for specific guides) and `CategoriesContext.jsx` (for category filtering).
- **Local Fallback**: `src/data/guides.js` provides hardcoded metadata if Supabase is unreachable or unconfigured.

### Environment & Tools
- **Vite/React**: Frontend framework.
- **Node compatible**: `vite.config.js` uses `node:process` for GITHUB_ACTIONS check.
- **ESLint**: Custom rules allow `useCategories` export in context files and ignore false-positive "unused vars" for `motion` components.

## 🏗️ Architecture & Conventions

### Styling
- **Bootstrap 5**: Base CSS framework.
- **Custom Theme**: Defined in `src/index.css` (Elite Farmer Green: `#55ff55`).
- **Animations**: `framer-motion` is used extensively. Most components include a `Firefox` detection check to simplify or disable complex animations for better performance.

### Navigation
- **React Router 7**: Handles routing (`/guides`, `/guides/:id`, `/creators`, `/privacy`).
- **Basename**: Configured for GitHub Pages deployment (`/Skyblock-Guides/`).

## 🧹 Maintenance Status
- **Obsolete Files Removed**: `supabase_update.sql`, `public/data/markdown/`.
- **Lint Status**: Clean (as of Feb 17, 2026).
- **Test Status**: Passing (7 tests in `Button.test.jsx` and `Card.test.jsx`).

## 🚀 Key URLs & SEO
- **Discord**: `https://discord.gg/5humW7QHkK`
- **Deployment**: Configured for GitHub Actions (`.github/workflows/deploy.yml`).
- **SEO & Embeds**: 
  - Configured in `index.html` via Open Graph (`og:`) and Twitter Card tags.
  - Theme color set to Elite Farmer Green (`#55ff55`) for platform-specific vertical bar colors (e.g., Discord).
  - Banner image: `skyblock-guides.png` (stored in `public/`).
  - Current Twitter card type: `summary_large_image` (provides a large, high-impact preview on social platforms).
