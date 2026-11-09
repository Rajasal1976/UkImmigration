import { site } from './site.js';
// Online application forms. Each form is a list of steps; each step a list of questions.
// The questions follow what the official application asks, so we can transfer the answers.
// CHECK these against the current official forms from time to time, as embassies change them.
//
// Question types: text, email, tel, date, number, textarea, select, radio, yesno, country, repeat
//   required: true      -> must be answered
//   showIf: { name: 'x', is: 'Yes' }  (or is: ['A','B']) -> only shown when another answer matches
//   autofill: 'surname' -> filled in from the passport scan
//   half: true          -> sits beside the next question on wide screens
//   repeat: a list of rows (e.g. children) with `fields`, `addLabel`, `max`
// Uploads: { name, label, hint, required, showIf } — `name` must be one of the file slots in
// src/pages/forms-register.astro (passport, photo, doc1 ... doc8).

const yesNo = (name, label, extra = {}) => ({ name, label, type: 'yesno', required: true, ...extra });
const details = (name, onField, label = 'Please give details') => ({ name, label, type: 'textarea', required: true, showIf: { name: onField, is: 'Yes' } });

// One upload slot that asks for a different document depending on the visa chosen.
// map: { 'Visa option': { label, hint, required } }
const byVisa = (name, map) => Object.entries(map).map(([visa, u]) => ({ name, ...u, showIf: { name: 'visaType', is: visa } }));

// ---------- Shared steps ----------

const passportFields = [
  { name: 'surname', label: 'Surname (family name)', type: 'text', required: true, autofill: 'surname', half: true },
  { name: 'givenNames', label: 'Given names', type: 'text', required: true, autofill: 'givenNames', half: true, hint: 'Exactly as in your passport, including middle names.' },
  { name: 'sex', label: 'Sex', type: 'radio', options: ['Male', 'Female'], required: true, autofill: 'sex' },
  { name: 'dateOfBirth', label: 'Date of birth', type: 'date', required: true, autofill: 'dateOfBirth', half: true },
  { name: 'placeOfBirth', label: 'Town or city of birth', type: 'text', required: true, half: true },
  { name: 'countryOfBirth', label: 'Country of birth', type: 'country', required: true, half: true },
  { name: 'nationality', label: 'Current nationality', type: 'country', required: true, autofill: 'nationality', half: true },
  { name: 'passportNumber', label: 'Passport number', type: 'text', required: true, autofill: 'passportNumber', half: true },
  { name: 'passportIssuingCountry', label: 'Country that issued your passport', type: 'country', required: true, autofill: 'issuingCountry', half: true },
  { name: 'passportIssueDate', label: 'Passport date of issue', type: 'date', required: true, half: true },
  { name: 'passportExpiry', label: 'Passport expiry date', type: 'date', required: true, autofill: 'passportExpiry', half: true },
  { name: 'passportPlaceOfIssue', label: 'Place of issue', type: 'text', required: true, hint: 'As shown in your passport, for example "HMPO" for UK passports.' },
];

// Only the details read automatically from the passport scan. We take the rest
// (place of birth, issue date, place of issue) from the uploaded passport ourselves.
const passportScanFields = passportFields.filter((f) => f.autofill);

const passportStep = (extra = [], base = passportFields) => ({
  id: 'passport',
  title: 'Your passport',
  intro: 'Upload a photo of your passport photo page and we’ll fill in your details for you. Your passport is read on your own device.',
  passportScan: true,
  fields: [...base, ...extra],
});

const contactStep = (extra = []) => ({
  id: 'contact',
  title: 'Contact details',
  fields: [
    { name: 'email', label: 'Email address', type: 'email', required: true, half: true },
    { name: 'phone', label: 'Mobile number', type: 'tel', required: true, half: true },
    { name: 'addressLine1', label: 'Home address', type: 'text', required: true },
    { name: 'addressLine2', label: 'Address line 2 (optional)', type: 'text' },
    { name: 'city', label: 'Town or city', type: 'text', required: true, half: true },
    { name: 'postcode', label: 'Postcode', type: 'text', required: true, half: true },
    { name: 'country', label: 'Country you live in', type: 'country', required: true, default: 'United Kingdom' },
    { name: 'ukStatus', label: 'Your status in the UK', type: 'select', required: true, options: ['British citizen', 'Indefinite leave to remain / settled', 'EU Settlement Scheme', 'Skilled Worker or other work visa', 'Student visa', 'Spouse or family visa', 'Other'], showIf: { name: 'nationality', isNot: 'United Kingdom' } },
    { name: 'ukStatusExpiry', label: 'When does your UK permission expire?', type: 'date', showIf: { name: 'ukStatus', is: ['Skilled Worker or other work visa', 'Student visa', 'Spouse or family visa', 'Other'] } },
    ...extra,
  ],
});

const declarationNote = `I confirm the information I’ve given is true and complete. I understand ${site.name} will use it to prepare my application, and that false information can lead to a refusal.`;


const married = { name: 'maritalStatus', is: 'Married' };

export const applications = [];
export const applicationBySlug = {};
export const declaration = declarationNote;

export const FILE_SLOTS = ['passport', 'photo', 'doc1', 'doc2', 'doc3', 'doc4', 'doc5', 'doc6', 'doc7', 'doc8', ...Array.from({ length: 20 }, (_, i) => `extra${i + 1}`)];

export { passportStep, passportScanFields, contactStep, declarationNote };
