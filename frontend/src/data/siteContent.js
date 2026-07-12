export const site = {
  name: 'Badhte Kadam',
  tagline: 'Opening doors to education, one scholar at a time.',
};

export const about = {
  intro:
    'Badhte Kadam is a community-driven nonprofit dedicated to expanding access to education for first-generation learners. We believe that talent is universal, but opportunity is not — so we work to close that gap.',
  vision:
    'A world where every capable student, regardless of background, has the resources and support to pursue their education.',
  mission:
    'To identify promising students from underserved communities and provide them with scholarships, mentorship, and a lasting support network.',
  story:
    'Badhte Kadam began a decade ago as a small group of alumni pooling resources to support a handful of students from their hometown. What started as an informal collection has grown into a structured scholarship program supporting over 150 scholars across 25 states, alongside health and livelihood initiatives for the wider community.',
  founders: [
    {
      name: 'Meera Iyer',
      role: 'Co-Founder & Director',
      bio: 'Meera has spent over a decade in education policy and is passionate about closing access gaps in higher education.',
    },
    {
      name: 'Arjun Rao',
      role: 'Co-Founder & Treasurer',
      bio: 'Arjun oversees fundraising and financial stewardship, ensuring every contribution reaches the students who need it.',
    },
  ],
  values: [
    { title: 'Integrity', description: 'We are transparent about how funds are raised and used.' },
    { title: 'Dignity', description: 'We support scholars as partners, not charity cases.' },
    { title: 'Community', description: 'Lasting change happens when communities lead their own progress.' },
  ],
  timeline: [
    { year: '2016', event: 'Badhte Kadam founded with 5 scholars.' },
    { year: '2019', event: 'Expanded to a formal scholarship program across multiple states.' },
    { year: '2022', event: 'Launched community health camps alongside the scholarship program.' },
    { year: '2025', event: 'Reached 150+ scholars supported across 25 states.' },
  ],
};

export const impactStats = [
  { label: 'Scholars', value: '150+' },
  { label: 'Years', value: '10' },
  { label: 'States', value: '25' },
  { label: 'Programs', value: '3' },
];

export const programs = [
  {
    title: 'Badhte Kadam Scholars',
    description: 'Scholarships, mentorship, and academic support for first-generation college students.',
  },
  {
    title: 'Community Health Camps',
    description: 'Free health check-ups and awareness drives in underserved villages.',
  },
  {
    title: 'Livelihood Support',
    description: 'Skill-building workshops to help families build sustainable incomes.',
  },
  {
    title: 'Mentorship Circles',
    description: 'Pairing scholars with professionals for long-term guidance and support.',
  },
];

export const contactInfo = {
  email: 'hello@badhtekadam.org',
  phone: '+91 98765 43210',
  address: 'Pune, Maharashtra, India',
};

export const library = {
  title: 'Meet Our Scholars',
  intro: 'Browse by year through our archival collection.',
};

const defaultYearQuote = 'Each name entered here is a promise kept — a door opened, a future underway.';

export const yearNotes = {
  2024: {
    quote: 'The record of 2024 — a cohort defined by resolve, and by the communities that shaped them.',
    description:
      'This volume holds the twelfth cohort admitted into the Badhte Kadam Scholars program, drawn from four states and recommended by their district committees.',
  },
  2023: {
    quote: 'The record of 2023 — students who turned local challenges into fields of study.',
    description:
      'This volume holds scholars selected for their academic merit and their commitment to returning knowledge to their home communities.',
  },
  2022: {
    quote: 'The record of 2022 — our early cohort, still closely mentored by the founding circle.',
    description:
      'This volume holds the scholars who joined as the program moved from an informal collection to a structured scholarship.',
  },
};

export function getYearNote(year) {
  return (
    yearNotes[year] || {
      quote: defaultYearQuote,
      description: `This volume holds the Badhte Kadam Scholars cohort admitted in ${year}.`,
    }
  );
}
