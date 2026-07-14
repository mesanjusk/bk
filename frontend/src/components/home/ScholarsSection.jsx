'use client';

import { useEffect, useState } from 'react';
import Section from '../ui/Section.jsx';
import Button from '../ui/Button.jsx';
import { fetchScholars } from '../../api/client.js';
import { scholarsFallback } from '../../data/scholarsFallback.js';

const PREVIEW_COUNT = 4;

export default function ScholarsSection() {
  const [scholars, setScholars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchScholars()
      .then((data) => {
        if (isMounted) setScholars((data.length ? data : scholarsFallback).slice(0, PREVIEW_COUNT));
      })
      .catch(() => {
        if (isMounted) setScholars(scholarsFallback.slice(0, PREVIEW_COUNT));
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Section className="bg-sand">
      <p className="text-center text-xs font-medium uppercase tracking-[0.35em] text-gold-600">
        Meet the Scholars
      </p>
      <h2 className="mt-3 text-center font-serif text-3xl font-semibold text-sage-900">
        A Few Faces Behind the Numbers
      </h2>
      <p className="mx-auto mt-3 max-w-md text-center text-sage-600">
        A small preview of the scholars currently in the program.
      </p>

      {loading ? (
        <p className="mt-14 text-center text-sage-500">Loading scholars…</p>
      ) : (
        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {scholars.map((scholar) => (
            <div
              key={scholar._id}
              className="group overflow-hidden rounded-xl2 bg-white shadow-soft transition-transform duration-300 hover:-translate-y-1"
            >
              {scholar.photoUrl ? (
                <img
                  src={scholar.photoUrl}
                  alt={scholar.name}
                  className="aspect-[4/5] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/5] w-full items-center justify-center bg-sand text-xs uppercase tracking-wide text-sage-400">
                  No Photo
                </div>
              )}
              <div className="p-5">
                <p className="font-serif text-lg font-semibold text-sage-900">{scholar.name}</p>
                <p className="text-xs font-medium uppercase tracking-wide text-gold-600">
                  {scholar.state} · {scholar.year}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-sage-600">{scholar.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <Button to="/scholars">View All Scholars</Button>
      </div>
    </Section>
  );
}
