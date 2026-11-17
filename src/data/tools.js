// The free UK immigration tools. Used by the "UK immigration tools" menu and the tools band on the homepage.
// Add a new tool here and it appears in both. menu: short name for the menu. icon: one of the names in src/data/icons.js. featured: shown first and larger.
export const tools = [
  { name: 'Life in the UK practice test', menu: 'Life in the UK practice test', href: '/life-in-the-uk-practice-test/', icon: 'book', featured: true,
    text: '24 questions, 45 minutes and instant marking, like the real test. New questions every time.' },
  { name: 'B1 English test practice', menu: 'B1 English test practice', href: '/b1-english-test-practice/', icon: 'mic',
    text: 'Grammar, reading and listening for ILR and citizenship, with timed speaking tasks.' },
  { name: 'B2 English test practice', menu: 'B2 English test practice', href: '/b2-english-test-practice/', icon: 'school',
    text: 'Upper-intermediate practice for Skilled Worker applicants, marked instantly.' },
  { name: 'Absence calculator', menu: 'Absence calculator', href: '/absence-calculator/', icon: 'plane',
    text: 'Add your trips abroad and check them against the limits for ILR and citizenship.' },
  { name: 'Spouse visa calculator', menu: 'Spouse visa calculator', href: '/spouse-visa-calculator/', icon: 'family',
    text: 'Check your income and savings against the financial requirement.' },
  { name: 'UK visa fee calculator', menu: 'Visa fee calculator', href: '/uk-visa-fee-calculator/', icon: 'chart',
    text: 'The Home Office fee and Immigration Health Surcharge for everyone applying.' },
  { name: 'ILR eligibility checker', menu: 'ILR eligibility checker', href: '/ilr-eligibility-checker/', icon: 'clock',
    text: 'Find out when you can apply for settlement and what you still need.' },
  { name: 'SOC code checker', menu: 'SOC code checker', href: '/soc-code-checker/', icon: 'briefcase',
    text: 'Search a job for its occupation code, eligibility and minimum salary.' },
];
