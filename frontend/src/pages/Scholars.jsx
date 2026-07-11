import { useEffect, useState } from 'react';
import Section from '../components/ui/Section.jsx';
import BookShelf from '../components/scholars/BookShelf.jsx';
import { fetchYears } from '../api/client.js';
import { getFallbackYears } from '../data/scholarsFallback.js';
import { library } from '../data/siteContent.js';

export default function Scholars() {
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchYears()
      .then((data) => {
        if (isMounted) setYears(data.length ? data : getFallbackYears());
      })
      .catch(() => {
        if (isMounted) setYears(getFallbackYears());
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Section>
      <p className="text-center text-xs font-medium uppercase tracking-[0.35em] text-gold-600">
        The Archive
      </p>
      <h1 className="mt-3 text-center text-4xl font-semibold text-sage-900">{library.title}</h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-sage-600">{library.intro}</p>

      <div className="mt-16">
        {loading ? (
          <p className="text-center text-sage-500">Opening the archive…</p>
        ) : (
          <BookShelf years={years} />
        )}
      </div>
    </Section>
  );
}
