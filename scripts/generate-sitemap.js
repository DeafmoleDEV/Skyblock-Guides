import fs from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import guidesRegistry from '../src/data/guides.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = 'https://skyblock-guides.com';

const staticRoutes = [
  '/',
  '/guides',
  '/creators',
  '/privacy'
];

const dynamicRoutes = guidesRegistry.map(guide => `/guides/${guide.id}`);
const allRoutes = [...staticRoutes, ...dynamicRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join("\n")}
</urlset>`;

const publicDir = resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemap);
console.log('Sitemap generated at public/sitemap.xml');
