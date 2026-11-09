# UK Immigration Advisory website (ukimmigrationadvisor.co.uk)

Built with Astro, hosted on Netlify, edited at **/admin** (Decap CMS). Same engine as uvsuk.co.uk.

## Putting it live (one-off, about 20 minutes)
1. **GitHub:** create a new repository called `ukimmigrationadvisor` (private is fine) and upload everything in this folder.
   If you use a different name, change `repo:` at the top of `public/admin/config.yml` to match.
2. **Netlify:** Add new site › Import an existing project › GitHub › choose `ukimmigrationadvisor`.
   Build command `npm run build`, publish directory `dist` (already set in `netlify.toml`). Deploy.
3. **Admin login:** in Netlify go to Site configuration › Access & security › OAuth › Install provider › GitHub,
   and paste the Client ID and Secret from a GitHub OAuth app (GitHub › Settings › Developer settings › OAuth Apps,
   callback URL `https://api.netlify.com/auth/done`). If you set this up for uvsuk, you can reuse the same OAuth app.
4. **Forms:** Netlify › Forms › enable form detection, then redeploy. Add an email notification for new submissions.
   Turn on reCAPTCHA for the contact form if you get spam.
5. **Test** on the temporary netlify.app address: open pages, try the forms, log in to `/admin`.
6. **Domain:** Domain management › add `ukimmigrationadvisor.co.uk`, then update DNS at your registrar as Netlify shows.
   Add any old website addresses to `src/data/redirects.mjs` so they redirect to the new pages.
7. **Google:** add the site to Google Search Console and submit `https://ukimmigrationadvisor.co.uk/sitemap-index.xml`.

## Editing the website (no code): go to /admin
- **Pages:** every page. Edit any section, or click **New Page** (quickest: open a similar page › Publish menu › Duplicate).
  Switch on **Move to bin** to remove a page (its address then sends visitors to its section), or delete it.
  Menus, homepage tiles, sitemap and search update themselves.
- **SEO panel:** while editing, a live SEO score, Google preview and tips appear on the right (like Rank Math).
  Each page has its Google title, description, focus keyword, sharing image and "hide from Google" switch.
- **Homepage:** headings, the four steps, banner visa options, "what we check", FAQs.
- **Client forms:** password-protected forms to send to a client.
- **Blog posts** and **Business details** (phone, email, address, fee, company name, social links).

Click Publish: the site rebuilds and changes are live in about a minute.

## Consultations, client forms and the absence calculator
There are no online visa application forms on this site: every button leads to Book a consultation (/contact-us/).
Client forms (admin › Client forms) work as on uvsuk: templates for spouse visa, ILR, Skilled Worker and British citizenship are included.
The absence calculator (src/components/AbsenceCalculator.astro) uses the same rules as the uvsuk.co.uk tool and appears on
the homepage, /absence-calculator/, and any page where "Absence calculator on this page" is switched on in the admin.

## For a developer
| What | File |
| --- | --- |
| Page template (visa, section, guide, company layouts) | `src/pages/[slug].astro` |
| Homepage | `src/pages/index.astro` |
| Page text | `content/pages/*.json` (edited in /admin) |
| Menus (built from the pages) | `src/data/nav.js`, `src/data/pages.js` |
| Absence calculator | `src/components/AbsenceCalculator.astro` |
| Colours and styling | `src/styles/site.css`, `src/styles/apply.css` |
| Redirects from old addresses | `src/data/redirects.mjs` |
| Admin settings | `public/admin/config.yml` |

Run locally: `npm install`, then `npm run dev` and open http://localhost:4321.
