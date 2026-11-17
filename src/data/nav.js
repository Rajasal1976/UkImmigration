// Menus, built automatically from the pages in the admin.
// Each page's "Section of the site" decides which menu it is in, and "Order in menus" its position.
import { groups, pagesIn, pageBySlug, navName } from './pages.js';
import { tools } from './tools.js';

const item = (p) => [navName(p), `/${p.slug}/`];
const section = (key, extra = []) => {
  const g = groups[key];
  const hub = pageBySlug[g.hub];
  return { label: g.label, href: hub ? `/${hub.slug}/` : (pagesIn(key)[0] ? `/${pagesIn(key)[0].slug}/` : '/'), items: [...(hub ? [[navName(hub), `/${hub.slug}/`]] : []), ...pagesIn(key).map(item), ...extra] };
};

// A menu entry with items opens a dropdown; one without items is a plain link.
export const menu = [
  section('visas'),
  section('employers'),
  // The list of tools is in src/data/tools.js (also used on the homepage and /uk-immigration-tools/)
  { label: 'UK immigration tools', href: '/uk-immigration-tools/', items: [...tools.map((t) => [t.menu, t.href]), ['All free tools', '/uk-immigration-tools/']] },
  section('guide', [['Blog', '/blog/'], ['News', '/news/']]),
  section('company', [['Contact us', '/contact-us/']]),
].filter((m) => m.items.length || m.href);
