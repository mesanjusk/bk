import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Section from '../components/ui/Section.jsx';
import BookLayout from '../components/scholars/BookLayout.jsx';
import LeftPage from '../components/scholars/LeftPage.jsx';
import RightPage from '../components/scholars/RightPage.jsx';
import PaginationControls from '../components/scholars/PaginationControls.jsx';
import { fetchScholarsByYear } from '../api/client.js';
import { scholarsFallback } from '../data/scholarsFallback.js';
import { getYearNote } from '../data/siteContent.js';

export default function ScholarYearDetail() {
  const { year } = useParams();
  const [scholars, setScholars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const note = getYearNote(Number(year));

  useEffect(() => {
    let isMounted = true;

    fetchScholarsByYear(year)
      .then((data) => {
        if (isMounted) setScholars(data.length ? data : scholarsFallback.filter((s) => String(s.year) === year));
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

  useEffect(() => {
    setActiveIndex(0);
    setDirection(1);
  }, [scholars.length]);

  function goTo(next) {
    if (next < 0 || next >= scholars.length) return;
    setDirection(next > activeIndex ? 1 : -1);
    setActiveIndex(next);
  }

  return (
    <Section maxWidth="max-w-5xl">
      <Link to="/scholars" className="text-sm font-medium text-sage-600 hover:text-sage-900">
        ← Back to the shelf
      </Link>

      {loading ? (
        <p className="mt-16 text-center text-sage-500">Turning to this volume…</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="perspective-book mx-auto mt-10 md:w-[900px]"
        >
          <BookLayout
            left={
              <LeftPage year={year} note={note} scholars={scholars} activeIndex={activeIndex} onSelect={goTo} />
            }
            right={
              <>
                <PaginationControls
                  current={activeIndex}
                  total={scholars.length}
                  onPrev={() => goTo(activeIndex - 1)}
                  onNext={() => goTo(activeIndex + 1)}
                />
                <RightPage scholar={scholars[activeIndex]} direction={direction} />
              </>
            }
          />
        </motion.div>
      )}
    </Section>
  );
}
