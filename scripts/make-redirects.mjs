// Turns src/data/redirects.mjs into permanent (301) redirects Netlify understands.
// Runs automatically before every build. Pages moved to the bin in the admin are redirected
// to the main page of their section, so old links and Google results never hit a dead end.
import { writeFileSync, readdirSync, readFileSync } from 'node:fs';
import { redirects as fixed } from '../src/data/redirects.mjs';

const hubs = { visas: '/uk-immigration-services/', employers: '/uk-immigration-for-employers/', guide: '/uk-immigration-guides/', company: '/' };
const binned = readdirSync('content/pages').filter((f) => f.endsWith('.json')).flatMap((f) => {
  try {
    const p = JSON.parse(readFileSync(`content/pages/${f}`, 'utf8'));
    const slug = f.replace(/\.json$/, '');
    return p.hidden === true ? [[`/${slug}/`, hubs[p.group] && hubs[p.group] !== `/${slug}/` ? hubs[p.group] : '/']] : [];
  } catch { return []; }
});
const redirects = [...fixed, ...binned];
const lines = redirects.flatMap(([from, to]) => [`${from}  ${to}  301`, `${from.replace(/\/$/, '')}  ${to}  301`]);
writeFileSync('public/_redirects', lines.join('\n') + '\n');
console.log(`Wrote ${redirects.length} redirects.`);
