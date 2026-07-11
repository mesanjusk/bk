// Used when the backend API is unreachable, so the site is never empty.
export const scholarsFallback = [
  {
    _id: 'fallback-1',
    name: 'Aarav Mehta',
    year: 2024,
    photoUrl: '',
    state: 'Maharashtra',
    score: '94.2%',
    description: 'First-year engineering student passionate about renewable energy.',
    bio: 'Aarav grew up in a small village and is the first in his family to attend college.',
    achievements: ['District-topper in Class XII'],
  },
  {
    _id: 'fallback-2',
    name: 'Priya Sharma',
    year: 2024,
    photoUrl: '',
    state: 'Rajasthan',
    score: '91.6%',
    description: 'Aspiring physician focused on rural healthcare access.',
    bio: 'Priya volunteers at her local health camp every summer.',
    achievements: ['Volunteer, Rural Health Camp'],
  },
  {
    _id: 'fallback-3',
    name: 'Rohan Verma',
    year: 2023,
    photoUrl: '',
    state: 'Uttar Pradesh',
    score: '89.8%',
    description: 'Computer science student building assistive technology.',
    bio: 'Rohan built a low-cost screen reader for visually impaired students.',
    achievements: ['Winner, State Science Fair 2022'],
  },
  {
    _id: 'fallback-4',
    name: 'Sneha Kulkarni',
    year: 2023,
    photoUrl: '',
    state: 'Maharashtra',
    score: '93.1%',
    description: 'Studying environmental science with a focus on water conservation.',
    bio: 'Sneha leads a youth group that restored a local pond used by 200+ families.',
    achievements: ['Youth Environmental Leadership Award'],
  },
  {
    _id: 'fallback-5',
    name: 'Karan Singh',
    year: 2022,
    photoUrl: '',
    state: 'Madhya Pradesh',
    score: '87.4%',
    description: 'First-generation learner pursuing a degree in commerce.',
    bio: 'Karan supports his family business while studying.',
    achievements: [],
  },
];

export function getFallbackYears() {
  return [...new Set(scholarsFallback.map((s) => s.year))].sort((a, b) => b - a);
}
