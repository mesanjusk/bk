'use client';

import { useEffect, useState } from 'react';
import Chapter from '../ui/Chapter.jsx';
import { Stagger, StaggerItem } from '../ui/Stagger.jsx';
import CountUp from '../ui/CountUp.jsx';
import { fetchScholarStats } from '../../api/client.js';
import { about, programs } from '../../data/siteContent.js';

export default function ImpactStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchScholarStats().then((data) => {
      if (isMounted) setStats(data);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const impactStats = [
    { label: 'Scholars', value: stats?.scholars ?? 0 },
    { label: 'Years', value: stats?.years ?? 0 },
    { label: 'States', value: stats?.states ?? 0 },
    { label: 'Programs', value: programs.length },
  ];

  return (
    <Chapter
      id="why-choose-us"
      number="06"
      label="Why Choose Us"
      title="Numbers that carry a story."
      description="A decade of consistent, transparent work — measured in people, not just percentages."
    >
      <Stagger className="grid grid-cols-2 gap-6 lg:grid-cols-4" stagger={0.1}>
        {impactStats.map((stat) => (
          <StaggerItem
            key={stat.label}
            className="rounded-3xl bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-lift"
          >
            <p className="font-serif text-4xl font-medium text-ink sm:text-5xl">
              {stats ? <CountUp value={stat.value} /> : '—'}
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-muted">{stat.label}</p>
          </StaggerItem>
        ))}
      </Stagger>

      <Stagger className="mt-16 grid gap-10 border-t border-ink/[0.08] pt-14 sm:grid-cols-3" stagger={0.1}>
        {about.values.map((value) => (
          <StaggerItem key={value.title}>
            <p className="text-lg font-medium text-ink">{value.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Chapter>
  );
}
