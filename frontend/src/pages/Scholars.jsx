import { useEffect, useState } from 'react';
import Section from '../components/ui/Section.jsx';
import ScholarGrid from '../components/scholars/ScholarGrid.jsx';
import YearFilter from '../components/scholars/YearFilter.jsx';
import { fetchScholars } from '../api/client.js';
import { scholarsFallback, getFallbackYears } from '../data/scholarsFallback.js';

export default function Scholars() {
  const [scholars, setScholars] = useState([]);
  const [activeYear, setActiveYear] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchScholars()
      .then((data) => {
        if (isMounted) setScholars(data.length ? data : scholarsFallback);
      })
      .catch(() => {
        if (isMounted) setScholars(scholarsFallback);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const years = scholars.length
    ? [...new Set(scholars.map((s) => s.year))].sort((a, b) => b - a)
    : getFallbackYears();

  const visibleScholars = activeYear ? scholars.filter((s) => s.year === activeYear) : scholars;

  return (
    <Section>
      <h1 className="text-center text-4xl font-semibold text-sage-900">Mita Scholars</h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-sage-600">
        Meet the students supported by our scholarship program, grouped by year.
      </p>

      <div className="mt-10">
        <YearFilter years={years} activeYear={activeYear} onSelect={setActiveYear} />
      </div>

      <div className="mt-12">
        {loading ? (
          <p className="text-center text-sage-500">Loading scholars…</p>
        ) : (
          <ScholarGrid scholars={visibleScholars} />
        )}
      </div>
    </Section>
  );
}
