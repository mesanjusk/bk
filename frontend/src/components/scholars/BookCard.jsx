import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const covers = ['bg-sage-800', 'bg-maroon-600'];

export default function BookCard({ year, index = 0 }) {
  const [isOpening, setIsOpening] = useState(false);
  const navigate = useNavigate();
  const cover = covers[index % covers.length];

  function handleOpen() {
    if (isOpening) return;
    setIsOpening(true);
  }

  return (
    <motion.button
      type="button"
      onClick={handleOpen}
      aria-label={`Open Mita Scholars ${year}`}
      className={`group relative h-72 w-48 flex-shrink-0 origin-left rounded-r-md rounded-l-sm text-cream shadow-book focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${cover}`}
      style={{ transformStyle: 'preserve-3d' }}
      initial={{ rotateY: 0, scale: 1 }}
      animate={isOpening ? { rotateY: -28, scale: 1.03 } : { rotateY: 0, scale: 1 }}
      whileHover={!isOpening ? { y: -10 } : undefined}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (isOpening) navigate(`/scholars/${year}`);
      }}
    >
      <span className="absolute inset-y-3 left-2 w-px bg-gold-400/60" />
      <span className="absolute inset-y-3 left-3 w-px bg-gold-400/30" />
      <span className="flex h-full flex-col items-center justify-between py-8">
        <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-gold-300">
          Mita Scholars
        </span>
        <span className="font-serif text-5xl font-semibold">{year}</span>
        <span className="h-px w-10 bg-gold-400/60" />
      </span>
      <span className="pointer-events-none absolute inset-0 rounded-r-md rounded-l-sm shadow-[inset_0_0_0_1px_rgba(201,162,39,0.35)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.button>
  );
}
