'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../ui/Section.jsx';
import { impactStats } from '../../data/siteContent.js';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function parseStatValue(value) {
  const match = value.match(/(\d+)(.*)/);
  if (!match) return null;
  return { number: Number(match[1]), suffix: match[2] || '' };
}

export default function ImpactStats() {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return undefined;
    const ctx = gsap.context(() => {
      const cards = gridRef.current.querySelectorAll('[data-stat-card]');
      cards.forEach((card) => {
        const valueEl = card.querySelector('[data-stat-value]');
        const parsed = parseStatValue(valueEl?.dataset.statValue || '');

        gsap.fromTo(
          card,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' },
          }
        );

        if (parsed && valueEl) {
          const counter = { value: 0 };
          gsap.to(counter, {
            value: parsed.number,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 85%' },
            onUpdate: () => {
              valueEl.textContent = `${Math.round(counter.value)}${parsed.suffix}`;
            },
          });
        }
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section className="bg-cream">
      <h2 className="text-center text-3xl font-semibold text-sage-900">Our Impact</h2>
      <div ref={gridRef} className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {impactStats.map((stat) => (
          <div
            key={stat.label}
            data-stat-card
            className="rounded-xl2 bg-white p-8 text-center shadow-soft transition-transform duration-300 hover:-translate-y-1"
          >
            <p data-stat-value={stat.value} className="font-serif text-4xl font-semibold text-sage-800">
              0
            </p>
            <p className="mt-2 text-sm uppercase tracking-wide text-sage-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
