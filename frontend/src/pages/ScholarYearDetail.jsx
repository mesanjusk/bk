import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Section from '../components/ui/Section.jsx';
import PageFlip from '../components/scholars/PageFlip.jsx';
import { fetchScholarsByYear } from '../api/client.js';
import { scholarsFallback } from '../data/scholarsFallback.js';
import { getYearNote } from '../data/siteContent.js';

export default function ScholarYearDetail() {
  const { year } = useParams();
  const [scholars, setScholars] = useState([]);
  const [loading, setLoading] = useState(true);
  const note = getYearNote(Number(year));

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
    <Section maxWidth="max-w-5xl">
      <Link to="/scholars" className="text-sm font-medium text-sage-600 hover:text-sage-900">
        ← Back to the shelf
      </Link>

      {loading ? (
        <p className="mt-16 text-center text-sage-500">Turning to this volume…</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, rotateX: -6, y: 24 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="perspective-book mx-auto mt-10 overflow-hidden rounded-lg bg-cream shadow-book ring-1 ring-gold-400/30 md:grid md:h-[600px] md:w-[900px] md:grid-cols-2"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="flex flex-col justify-center border-b border-gold-400/20 bg-sand/40 p-8 md:border-b-0 md:border-r md:p-12">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold-600">Mita Scholars</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold text-sage-900">{year}</h1>
            <p className="mt-6 font-serif text-lg italic leading-relaxed text-sage-700">
              &ldquo;{note.quote}&rdquo;
            </p>
            <p className="mt-6 text-sm leading-relaxed text-sage-600">{note.description}</p>
            <p className="mt-8 text-xs uppercase tracking-wide text-gold-600">
              {scholars.length} {scholars.length === 1 ? 'entry' : 'entries'} recorded
            </p>
          </div>

          <div className="overflow-y-auto p-8 md:p-10">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-sage-500">
              Scholar Register
            </p>
            <PageFlip scholars={scholars} />
          </div>
        </motion.div>
      )}
    </Section>
  );
}
