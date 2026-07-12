import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const flipVariants = {
  enter: (direction) => ({ rotateY: direction > 0 ? 80 : -80, opacity: 0 }),
  center: { rotateY: 0, opacity: 1 },
  exit: (direction) => ({ rotateY: direction > 0 ? -80 : 80, opacity: 0 }),
};

const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches,
  );

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const handler = (e) => setIsDesktop(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isDesktop;
}

export default function RightPage({ scholar, direction }) {
  const isDesktop = useIsDesktop();

  if (!scholar) {
    return (
      <div className="flex h-full items-center justify-center p-10">
        <p className="text-sm text-sage-500">No scholars recorded for this volume.</p>
      </div>
    );
  }

  return (
    <div className="perspective-book flex-1">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={scholar._id}
          custom={direction}
          variants={isDesktop ? flipVariants : fadeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={
            isDesktop
              ? { transformStyle: 'preserve-3d', transformOrigin: direction > 0 ? 'left' : 'right' }
              : undefined
          }
          className="flex h-full flex-col items-center overflow-y-auto p-8 text-center md:p-12"
        >
          {scholar.photoUrl ? (
            <img
              src={scholar.photoUrl}
              alt={scholar.name}
              className="h-56 w-48 flex-shrink-0 rounded-md border border-gold-400/40 object-cover shadow-book md:h-64 md:w-56"
            />
          ) : (
            <div className="flex h-56 w-48 flex-shrink-0 items-center justify-center rounded-md border border-gold-400/40 bg-sand font-serif text-6xl text-sage-400 md:h-64 md:w-56">
              {scholar.name?.charAt(0) || '?'}
            </div>
          )}

          <h2 className="mt-6 font-serif text-2xl font-bold text-sage-900 md:text-3xl">{scholar.name}</h2>

          {scholar.score && <p className="mt-1 font-serif text-xl font-bold text-maroon-600">{scholar.score}</p>}

          {scholar.state && (
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-sage-500">{scholar.state}</p>
          )}

          <div className="mt-10 max-w-sm pt-4">
            <p className="text-sm leading-relaxed text-sage-600">{scholar.bio || scholar.description}</p>

            {scholar.achievements?.length > 0 && (
              <ul className="mt-4 space-y-1 text-xs text-sage-500">
                {scholar.achievements.map((achievement) => (
                  <li key={achievement}>— {achievement}</li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
