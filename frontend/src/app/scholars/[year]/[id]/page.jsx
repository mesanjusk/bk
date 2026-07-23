'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Section from '../../../../components/ui/Section.jsx';
import { fetchScholarById } from '../../../../api/client.js';

export default function ScholarDetail() {
  const { year, id } = useParams();
  const [scholar, setScholar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setNotFound(false);

    fetchScholarById(id)
      .then((data) => {
        if (isMounted) setScholar(data);
      })
      .catch(() => {
        if (isMounted) setNotFound(true);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <Section maxWidth="max-w-3xl">
      <Link href={`/scholars/${year}`} className="text-sm font-medium text-sage-600 hover:text-sage-900">
        ← Back to Badhte Kadam Scholars {year}
      </Link>

      {loading ? (
        <p className="mt-16 text-center text-sage-500">Loading record…</p>
      ) : notFound || !scholar ? (
        <p className="mt-16 text-center text-sage-500">This scholar record could not be found.</p>
      ) : (
        <div className="mt-10 rounded-xl2 bg-white p-10 shadow-book ring-1 ring-gold-400/30">
          <div className="flex flex-col gap-8 sm:flex-row">
            {scholar.photoUrl ? (
              <img
                src={scholar.photoUrl}
                alt={scholar.name}
                className="h-40 w-32 flex-shrink-0 rounded-sm border border-gold-400/40 object-cover"
              />
            ) : (
              <div className="flex h-40 w-32 flex-shrink-0 items-center justify-center rounded-sm border border-gold-400/40 bg-sand font-serif text-4xl text-sage-500">
                {scholar.name?.charAt(0) || '?'}
              </div>
            )}

            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-600">
                Badhte Kadam Scholars {scholar.year}
              </p>
              <h1 className="mt-2 font-serif text-3xl font-semibold text-sage-900">{scholar.name}</h1>

              <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-wide text-sage-500">
                {scholar.state && (
                  <div className="flex gap-1">
                    <dt className="font-medium">State</dt>
                    <dd className="normal-case tracking-normal text-sage-700">{scholar.state}</dd>
                  </div>
                )}
                {scholar.score && (
                  <div className="flex gap-1">
                    <dt className="font-medium">Score</dt>
                    <dd className="normal-case tracking-normal text-sage-700">{scholar.score}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          <div className="mt-8 border-t border-gold-400/20 pt-8">
            <p className="text-sm leading-relaxed text-sage-600">{scholar.bio || scholar.description}</p>

            {scholar.achievements?.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-sage-500">Achievements</p>
                <ul className="mt-3 space-y-1 text-sm text-sage-600">
                  {scholar.achievements.map((achievement) => (
                    <li key={achievement}>— {achievement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </Section>
  );
}
