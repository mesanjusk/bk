import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ScholarRecord from './ScholarRecord.jsx';

const PAGE_SIZE = 2;

const variants = {
  enter: (direction) => ({ rotateY: direction > 0 ? 55 : -55, opacity: 0 }),
  center: { rotateY: 0, opacity: 1 },
  exit: (direction) => ({ rotateY: direction > 0 ? -55 : 55, opacity: 0 }),
};

export default function PageFlip({ scholars }) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const pageCount = Math.max(1, Math.ceil(scholars.length / PAGE_SIZE));
  const current = scholars.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  function goTo(next) {
    if (next < 0 || next >= pageCount) return;
    setDirection(next > page ? 1 : -1);
    setPage(next);
  }

  return (
    <div>
      <div className="perspective-book min-h-[280px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: 'preserve-3d', transformOrigin: direction > 0 ? 'left' : 'right' }}
          >
            {current.length === 0 ? (
              <p className="text-sm text-sage-500">No scholars recorded for this page.</p>
            ) : (
              current.map((scholar, i) => (
                <ScholarRecord key={scholar._id} scholar={scholar} index={page * PAGE_SIZE + i} />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {pageCount > 1 && (
        <div className="mt-6 flex items-center justify-between border-t border-gold-400/30 pt-4">
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            className="text-xs font-medium uppercase tracking-wide text-sage-600 transition-colors hover:text-sage-900 disabled:opacity-30"
          >
            ← Previous
          </button>
          <span className="font-serif text-xs uppercase tracking-wide text-gold-600">
            {String(page + 1).padStart(2, '0')} / {String(pageCount).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={() => goTo(page + 1)}
            disabled={page === pageCount - 1}
            className="text-xs font-medium uppercase tracking-wide text-sage-600 transition-colors hover:text-sage-900 disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
