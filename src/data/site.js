// Business details. Everyday details (phone, email, hours, company name...) are edited in the
// admin under "Business details" and stored in content/settings.json.
import s from '../../content/settings.json';

// "0161 956 2003" -> "+441619562003" for tap-to-call links
const intl = (phone) => { const d = phone.replace(/\D/g, ''); return d.startsWith('0') ? `+44${d.slice(1)}` : `+${d}`; };

export const site = {
  name: s.siteName || 'UK Immigration Advisory',
  legalName: s.legalName || 'Unique Visa Services Ltd',
  groupName: s.groupName || '',
  url: 'https://ukimmigrationadvisor.co.uk',
  phone: s.phone,
  phoneIntl: intl(s.phone),
  phoneLabel: s.phoneLabel || '',
  phone2: s.phone2 || '',
  phone2Intl: s.phone2 ? intl(s.phone2) : '',
  phone2Label: s.phone2Label || '',
  googleVerification: s.googleVerification || '',
  iaaRef: s.iaaRef || '',
  iaaFinder: s.iaaFinder || '',
  email: s.email,
  address: { line1: s.addressLine1, city: s.city, postcode: s.postcode },
  hours: s.hours,
  hoursSchema: s.hoursForGoogle,
  since: s.since || 2008,
  yearsInPractice: s.yearsInPractice,
  applicationsHandled: s.applicationsHandled,
  googleRating: s.googleRating,
  googleReviewCount: s.googleReviewCount,
  googleReviewsUrl: s.googleReviewsUrl || '/contact-us/',
  companyNumber: s.companyNumber,
  serviceFee: s.serviceFee || '',
  bookingUrl: '/contact-us/',
  applyUrl: '/contact-us/',
  logo: s.siteLogo || '/images/emblem.jpg',
  officialSite: 'https://www.gov.uk/browse/visas-immigration',
  shareImage: s.shareImage || '',
  delivery: s.delivery || [],
  evisaDelivery: s.evisaDelivery || '',
  social: [
    ['Facebook', s.facebook], ['Instagram', s.instagram], ['LinkedIn', s.linkedin],
    ['X (Twitter)', s.x], ['TikTok', s.tiktok], ['YouTube', s.youtube], ['WhatsApp', s.whatsapp],
  ].filter(([, url]) => url && url.trim()).map(([name, url]) => ({ name, url: url.trim() })),
};
