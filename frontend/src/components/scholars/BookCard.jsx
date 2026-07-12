import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const covers = ['bg-sage-800', 'bg-maroon-600'];
// Deterministic per-book tilt so the shelf feels hand-placed rather than mechanical.
const tilts = [-2, 1, -3, 2, -1, 3, -2, 1];

export default function BookCard({ year, index = 0 }) {
  const [centering, setCentering] = useState(false);
  const [opening, setOpening] = useState(false);
  const navigate = useNavigate();
  const navigated = useRef(false);
  const cover = covers[index % covers.length];
  const tilt = tilts[index % tilts.length];

  function goToYear() {
    if (navigated.current) return;
    navigated.current = true;
    navigate(`/scholars/${year}`);
  }

  useEffect(() => {
    if (!centering) return undefined;
    // Safety net: the layout/rotate animation callbacks below don't always
    // fire (framer-motion can drop them when layout + animate combine), so
    // this guarantees the click always ends in navigation.
    const timeout = window.setTimeout(goToYear, 900);
    return () => window.clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centering]);

  function handleClick() {
    if (centering) return;
    setCentering(true);
  }

  return (
    <>
      {centering && (
        <div className="fixed inset-0 z-[55] bg-sage-900/50 backdrop-blur-sm" aria-hidden="true" />
      )}
      <motion.button
        type="button"
        layout
        onClick={handleClick}
        aria-label={`Open Mita Scholars ${year}`}
        className={`group bg-gradient-to-br from-white/10 to-black/10 text-cream shadow-book focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${cover} ${
          centering
            ? 'fixed inset-0 z-[60] m-auto h-96 w-64 rounded-md'
            : 'relative h-60 w-40 flex-shrink-0 rounded-r-md rounded-l-sm'
        }`}
        style={!centering ? { rotate: `${tilt}deg` } : undefined}
        whileHover={!centering ? { y: -8, rotate: -2 } : undefined}
        animate={opening ? { rotateY: -25 } : { rotateY: 0 }}
        transition={{ type: 'spring', stiffness: 240, damping: 26 }}
        onLayoutAnimationComplete={() => {
          if (centering && !opening) setOpening(true);
        }}
        onAnimationComplete={() => {
          if (opening) goToYear();
        }}
      >
        <span className="pointer-events-none absolute inset-y-4 left-3 w-px bg-gold-400/60" />
        <span className="pointer-events-none absolute inset-y-4 left-4 w-px bg-gold-400/30" />

        <span className="flex h-full items-center justify-center py-8">
          <span className="flex [writing-mode:vertical-rl] items-center gap-6 rotate-180">
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-gold-300">
              Mita Scholars
            </span>
            <span className="font-serif text-3xl font-semibold">{year}</span>
          </span>
        </span>

        <span className="pointer-events-none absolute inset-0 rounded-md opacity-0 shadow-[0_0_24px_4px_rgba(194,168,120,0.35)] transition-opacity duration-300 group-hover:opacity-100" />
      </motion.button>
    </>
  );
}
