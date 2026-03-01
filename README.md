# Skyblock Guides

Skyblock Guides is a comprehensive web platform dedicated to providing detailed, high-quality guides for Hypixel Skyblock players. From mastering complex Dungeon floors to optimizing Slayer grinds, Fishing progression, and Combat stats like Magical Power, this platform aims to be the ultimate resource for both new and veteran players.

## Features

- **Search & Filter:** Quickly find guides by title, category, or specific tags (e.g., F7, MP, Fishing).
- **Categorized Content:** Dedicated sections for Dungeons, Combat, Fishing, Mining, and more.
- **Dynamic Content:** Supports modern guide formats, including direct `.docx` to web conversion using Mammoth.
- **Modern UI:** Built with React 19, Bootstrap 5, and Framer Motion for a smooth, responsive, and visually appealing experience.
- **Community Focused:** Features latest videos and contributions from top Skyblock creators like GDROGUE and GiantWizard.

---

## Developer Guide

This project is built using modern web technologies centered around the React ecosystem and Vite.

### Tech Stack

- **Frontend:** React 19, Vite, React Router 7
- **Styling:** Bootstrap 5, Lucide React (Icons), Framer Motion (Animations)
- **Data & Backend:** Supabase (Client-side integration)
- **Content Processing:** Mammoth (.docx parsing), React Markdown
- **Testing:** Vitest, React Testing Library

### Project Structure

- `src/components/`: Reusable UI components (Navbar, Hero, Cards, etc.)
- `src/pages/`: Main page views (Home, Guide Index, Guide Detail, etc.)
- `src/data/`: Static data registries for guides and categories.
- `src/lib/`: External service configurations (Supabase).
- `public/data/guides/`: Storage for physical guide files (e.g., `.docx` files).

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Skyblock-Guides
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

5. **Run Tests:**
   ```bash
   npm test
   ```

6. **Build for Production:**
   ```bash
   npm run build
   ```

### Guide Content System

The platform supports a flexible content delivery system:
- **Formats:** Supports both Markdown (`.md`) and Word Documents (`.docx`). Word documents are parsed client-side using Mammoth.js.
- **Data Fetching:** Implements a hybrid approach where guides are first attempted to be fetched from **Supabase**. If Supabase is unavailable or the guide is not found, it falls back to a **local registry** (`src/data/guides.js`).
- **Storage:** Physical guide files should be stored in `public/data/guides/` for local development or accessible via public URLs.

### Adding New Guides

To add a new guide:
1. **Local Method:**
   - Place your `.docx` or `.md` file in `public/data/guides/`.
   - Update `src/data/guides.js` to include the new guide's metadata (id, title, category, contentPath).
2. **Supabase Method:**
   - Add a new row to the `guides` table in your Supabase project with matching fields.
