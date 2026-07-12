// Used when the backend API is unreachable, so the site is never empty.
export const storiesFallback = [
  {
    _id: 'story-fallback-1',
    name: 'Aarav Mehta',
    state: 'Maharashtra',
    photoUrl: '',
    before: 'Helped his father repair bicycles after school, unsure college was even possible.',
    after: 'First-year engineering student researching low-cost solar irrigation for his village.',
    narrative:
      "Aarav's family runs a small cycle-repair shop on the edge of their village. He used to spend afternoons there instead of studying, unsure if college was even on the table. A scholarship covered his first year's tuition; a mentor helped him choose electrical engineering.",
    extended:
      'He still fixes cycles most weekends — it pays for his bus fare into town. What changed is the conversation at home: his father now asks about his coursework instead of his shop hours, and two younger boys from his lane come to him for help with their homework.',
  },
  {
    _id: 'story-fallback-2',
    name: 'Priya Sharma',
    state: 'Rajasthan',
    photoUrl: '',
    before: 'One of six children in a farming family, expected to stop studying after school.',
    after: "Second-year medical aspirant volunteering at her district's only rural health camp.",
    narrative:
      "Priya's parents had already picked a wedding date for her the year she finished school. A scholarship and a difficult conversation bought her two more years. She spends her summers now at the health camp her village finally got — the one she used to walk four kilometers to reach.",
    extended:
      "She's not decided yet whether she wants to specialize in pediatrics or return to general practice in her district. Either way, she's told her younger sister she's allowed to ask for the same two years.",
  },
  {
    _id: 'story-fallback-3',
    name: 'Rohan Verma',
    state: 'Uttar Pradesh',
    photoUrl: '',
    before: 'Taught himself to code on a shared smartphone, with no formal computer science guidance.',
    after: 'Built a low-cost screen reader now used by three schools for the visually impaired.',
    narrative:
      'Rohan learned to code from videos buffered overnight on a phone he shared with two siblings. A scholarship got him a laptop and a seat in a computer science program. The tool he built started as a class project; it now runs in three schools he has never visited.',
    extended:
      "He answers questions about it over email most weeks, usually from a teacher he's never met, in a district he's never been to. He says that part — strangers writing to say it worked — is the part he didn't expect.",
  },
];
