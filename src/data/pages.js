// Every page on the website comes from a file in content/pages (edited in the admin at /admin).
// Add a page in the admin and it appears on the site, in the menus and in the sitemap.
// Delete it, or switch on "Move to bin", and it disappears everywhere; its address then
// redirects to the section it belonged to (see scripts/make-redirects.mjs).
const files = import.meta.glob('../../content/pages/*.json', { eager: true, import: 'default' });

const all = Object.entries(files).map(([path, data]) => ({
  slug: path.split('/').pop().replace('.json', ''),
  order: 50,
  ...data,
}));

// The sections of the site. Each page chooses one in the admin ("Section of the site").
export const groups = {
  visas: { label: 'Visas', hub: 'uk-immigration-services' },
  employers: { label: 'Employers', hub: 'uk-immigration-for-employers' },
  guide: { label: 'Guides', hub: 'uk-immigration-guides' },
  company: { label: 'About', hub: 'about-us' },
};

const byOrder = (a, b) => (a.order ?? 50) - (b.order ?? 50) || (a.navLabel || a.h1).localeCompare(b.navLabel || b.h1);
export const pages = all.filter((p) => p.hidden !== true).sort(byOrder);
export const pageBySlug = Object.fromEntries(pages.map((p) => [p.slug, p]));

// Pages in a section, in menu order (the section's own main page is left out)
export const pagesIn = (group, { listedOnly = true } = {}) => pages.filter((p) => p.group === group
  && p.slug !== groups[group]?.hub && (!listedOnly || p.hideFromMenus !== true));

// Short name used in menus and cards
export const navName = (p) => p.navLabel || p.h1;

const shown = new Set(pages.map((p) => p.slug));
const known = new Set(all.map((p) => p.slug));
const slugOf = (href) => (href || '').replace(/^\/|\/$/g, '').split(/[?#]/)[0];
// true if a site address is a page that is currently shown (other addresses are always true)
export const isShown = (href) => !known.has(slugOf(href)) || shown.has(slugOf(href));
