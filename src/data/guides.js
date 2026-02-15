// Registry of all guides
export const categories = [
  "Dungeons",
  "Slayers",
  "Mining",
  "Kuudra",
  "Farming",
  "Fishing"
];

const guidesRegistry = [
  {
    id: 'f7-gear-guide',
    title: 'Floor 7 (F7) High-Level Gear Guide',
    description: 'The definitive guide for Archer and Berserker setups for Floor 7 mastery.',
    author: 'lotrszefOP',
    date: 'Jan 26, 2026',
    category: 'Dungeons',
    contentPath: '/data/markdown/f7-gear-guide.md', // We'll fetch this
    image: 'bg-gradient-to-br from-necron/40 to-slate-900',
    tags: ['F7', 'Archer', 'Berserker']
  },
  {
    id: 't5-rev-slayer',
    title: 'Axe of the Shredded: T5 Revenant Guide',
    description: 'Master the fastest slayer with this melee-focused guide.',
    author: 'SlayerKing',
    date: 'Feb 01, 2026',
    category: 'Slayers',
    contentPath: null, // Placeholder
    image: 'bg-gradient-to-br from-purple-600/40 to-slate-900',
    tags: ['Slayers', 'Zombie']
  },
  {
    id: 'mining-progression',
    title: 'HOTM 7: The Path to 10M Mining Speed',
    description: 'Everything from Mithril to Gemstones.',
    author: 'GoldDigger',
    date: 'Jan 15, 2026',
    category: 'Mining',
    contentPath: null,
    image: 'bg-gradient-to-br from-diamond/40 to-slate-900',
    tags: ['Mining', 'HOTM']
  }
];

export default guidesRegistry;
