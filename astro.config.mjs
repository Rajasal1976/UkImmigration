import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// Pages hidden from Google, or moved to the bin, in the editor are left out of the sitemap.
const read = (dir) => readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => {
  try { return [f.replace(/\.json$/, ''), JSON.parse(readFileSync(`${dir}/${f}`, 'utf8'))]; } catch { return [f, {}]; }
});
const hidden = [
  ...read('./content/pages').filter(([, p]) => p.noindex === true || p.hidden === true).map(([s]) => `/${s}/`),
  ...read('./content/blog').filter(([, p]) => p.noindex === true || p.draft === true).map(([s]) => `/blog/${s}/`),
];

export default defineConfig({
  site: 'https://ukimmigrationadvisor.co.uk',
  trailingSlash: 'always',
  integrations: [
    sitemap({ filter: (url) => !hidden.some((h) => url.endsWith(h)) && !/\/(search|client-forms|thank-you|forms-register)\//.test(url) }),
  ],
});
