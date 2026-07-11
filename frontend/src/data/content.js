// Single source of truth for editable site content.
// Swap any `src` value below (or the surrounding text) to change what
// renders on the site — no component code needs to change.

export const content = {
  site: {
    name: 'Mita Foundation',
    tagline: 'Opening doors to education, one scholar at a time.',
  },

  hero: {
    eyebrow: 'Mita Foundation',
    title: 'Preserving Excellence, Year After Year.',
    subtitle: 'An archive of scholars shaping the future.',
    ctaPrimary: { label: 'Meet Our Scholars', to: '/scholars' },
    ctaSecondary: { label: 'Learn More', to: '/about' },
    media: {
      type: 'video',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
  },

  stories: {
    eyebrow: 'Stories That Matter',
    subtitle: 'Behind every number is a life changed.',
    items: [
      {
        name: 'Aarav Mehta',
        state: 'Maharashtra',
        before: 'Helped his father repair bicycles after school, unsure college was even possible.',
        after: 'First-year engineering student researching low-cost solar irrigation for his village.',
        narrative:
          "Aarav's family runs a small cycle-repair shop on the edge of their village. He used to spend afternoons there instead of studying, unsure if college was even on the table. A scholarship covered his first year's tuition; a mentor helped him choose electrical engineering.",
        extended:
          'He still fixes cycles most weekends — it pays for his bus fare into town. What changed is the conversation at home: his father now asks about his coursework instead of his shop hours, and two younger boys from his lane come to him for help with their homework.',
        media: { type: 'image', src: 'https://picsum.photos/seed/aarav-mehta/480/480' },
      },
      {
        name: 'Priya Sharma',
        state: 'Rajasthan',
        before: 'One of six children in a farming family, expected to stop studying after school.',
        after: "Second-year medical aspirant volunteering at her district's only rural health camp.",
        narrative:
          "Priya's parents had already picked a wedding date for her the year she finished school. A scholarship and a difficult conversation bought her two more years. She spends her summers now at the health camp her village finally got — the one she used to walk four kilometers to reach.",
        extended:
          "She's not decided yet whether she wants to specialize in pediatrics or return to general practice in her district. Either way, she's told her younger sister she's allowed to ask for the same two years.",
        media: { type: 'image', src: 'https://picsum.photos/seed/priya-sharma/480/480' },
      },
      {
        name: 'Rohan Verma',
        state: 'Uttar Pradesh',
        before: 'Taught himself to code on a shared smartphone, with no formal computer science guidance.',
        after: 'Built a low-cost screen reader now used by three schools for the visually impaired.',
        narrative:
          'Rohan learned to code from videos buffered overnight on a phone he shared with two siblings. A scholarship got him a laptop and a seat in a computer science program. The tool he built started as a class project; it now runs in three schools he has never visited.',
        extended:
          "He answers questions about it over email most weeks, usually from a teacher he's never met, in a district he's never been to. He says that part — strangers writing to say it worked — is the part he didn't expect.",
        media: { type: 'image', src: 'https://picsum.photos/seed/rohan-verma/480/480' },
      },
    ],
  },

  scholars: {
    eyebrow: 'Meet the Scholars',
    title: 'A Few Faces Behind the Numbers',
    subtitle: 'A small preview of the scholars currently in the program.',
    items: [
      {
        name: 'Sneha Kulkarni',
        year: 2023,
        state: 'Maharashtra',
        description: 'Studying environmental science with a focus on water conservation.',
        media: { type: 'image', src: 'https://picsum.photos/seed/sneha-kulkarni/400/500' },
      },
      {
        name: 'Karan Singh',
        year: 2022,
        state: 'Madhya Pradesh',
        description: 'First-generation learner pursuing a degree in commerce.',
        media: { type: 'image', src: 'https://picsum.photos/seed/karan-singh/400/500' },
      },
      {
        name: 'Priya Sharma',
        year: 2024,
        state: 'Rajasthan',
        description: 'Aspiring physician focused on rural healthcare access.',
        media: { type: 'image', src: 'https://picsum.photos/seed/priya-sharma-2/400/500' },
      },
      {
        name: 'Rohan Verma',
        year: 2023,
        state: 'Uttar Pradesh',
        description: 'Computer science student building assistive technology.',
        media: { type: 'image', src: 'https://picsum.photos/seed/rohan-verma-2/400/500' },
      },
    ],
  },
};
