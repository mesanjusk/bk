'use client';

import { useEffect, useState } from 'react';
import Chapter from '../ui/Chapter.jsx';
import Reveal from '../ui/Reveal.jsx';
import EditorialVisual from './EditorialVisual.jsx';
import { about } from '../../data/siteContent.js';
import { fetchScholarStats } from '../../api/client.js';

export default function AboutSection() {
  const [yearCount, setYearCount] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetchScholarStats()
      .then((stats) => {
        if (isMounted) setYearCount(stats.years);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Chapter
      id="about"
      number="02"
      label="About"
      title="A decade of opening doors."
      description="Badhte Kadam is a community-driven nonprofit closing the gap between talent and opportunity for first-generation learners."
    >
      <div className="grid items-center gap-14 md:grid-cols-2 md:gap-16">
        <Reveal className="order-2">
          <p className="font-serif text-2xl italic leading-snug text-ink/85 sm:text-3xl">
            &ldquo;{about.story}&rdquo;
          </p>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {about.founders.map((founder) => (
              <div key={founder.name}>
                <p className="text-sm font-medium text-ink">{founder.name}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">{founder.role}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1">
          <EditorialVisual figure={yearCount === null ? '—' : yearCount} caption="Years of impact" />
        </Reveal>
      </div>
    </Chapter>
  );
}
