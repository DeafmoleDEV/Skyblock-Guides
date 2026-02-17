// Registry of all guides
export const categories = [
  "Dungeons",
  "Slayers",
  "Mining"
];

const guidesRegistry = [
  {
    id: 'f7-gear-guide',
    title: 'Floor 7 (F7) High-Level Gear Guide',
    description: 'The definitive guide for Archer and Berserker setups for Floor 7 mastery.',
    author: 'lotrszefOP',
    date: 'Jan 26, 2026',
    category: 'Dungeons',
    contentPath: 'data/guides/f7-gear-guide.docx', // Now using .docx
    tags: ['F7', 'Archer', 'Berserker']
  },
  {
    id: 't5-rev-slayer',
    title: 'T5 Revenant Guide',
    description: 'Complete this shitty grind in less than 2 hours.',
    author: 'SlayerKing',
    date: 'Feb 01, 2026',
    category: 'Slayers',
    contentPath: null, // Placeholder
    tags: ['Slayers', 'Zombie']
  },
  {
    id: 'mining-progression',
    title: 'HOTM 7 in 5 hours',
    description: 'Everything from First step in Dwarven Mines to Making 60m per hour.',
    author: 'GoldDigger',
    date: 'Jan 15, 2026',
    category: 'Mining',
    contentPath: null, // Placeholder
    tags: ['Mining', 'HOTM']
  }
];

export default guidesRegistry;
