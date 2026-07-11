import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Section from '../components/ui/Section.jsx';
import { fetchScholarsByYear } from '../api/client.js';
import { scholarsFallback } from '../data/scholarsFallback.js';
import { site } from '../data/siteContent.js';

export default function ScholarYearDetail() {
  const { year } = useParams();
  const [scholars, setScholars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchScholarsByYear(year)
      .then((data) => {
        if (isMounted) {
          setScholars(data.length ? data : scholarsFallback.filter((s) => String(s.year) === year));
        }
      })
      .catch(() => {
        if (isMounted) setScholars(scholarsFallback.filter((s) => String(s.year) === year));
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [year]);

  return (
    <Section>
      <Link to="/scholars" className="text-sm font-medium text-sage-600 hover:text-sage-900">
        ← Back to all scholars
      </Link>

      <h1 className="mt-4 text-4xl font-semibold text-sage-900">
        {site.name.split(' ')[0]} Scholars {year}
      </h1>

      <div className="mt-12">
        {loading ? (
          <p className="text-center text-sage-500">Loading…</p>
        ) : scholars.length === 0 ? (
          <p className="text-center text-sage-500">No scholars found for {year}.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            {scholars.map((scholar) => (
              <div key={scholar._id} className="flex gap-5 rounded-xl2 bg-white p-6 shadow-soft">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-full bg-sage-100">
                  {scholar.photoUrl ? (
                    <img src={scholar.photoUrl} alt={scholar.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-serif text-2xl text-sage-400">
                      {scholar.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-sage-900">{scholar.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-sage-600">{scholar.bio || scholar.description}</p>
                  {scholar.achievements?.length > 0 && (
                    <ul className="mt-3 space-y-1 text-xs text-sage-500">
                      {scholar.achievements.map((achievement) => (
                        <li key={achievement}>• {achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
