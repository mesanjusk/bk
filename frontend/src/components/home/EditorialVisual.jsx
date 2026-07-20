'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function EditorialVisual({ figure = '150+', caption = 'Scholars supported', className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-28, 28]);

  return (
    <div ref={ref} className={`relative aspect-[4/5] w-full ${className}`}>
      <motion.div
        style={{ y }}
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sage-800 via-sage-700 to-sage-900"
      />
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl p-10"
      >
        <div className="h-px w-14 bg-white/30" />

        <div>
          <p className="font-serif text-7xl font-medium leading-none tracking-tight text-white sm:text-8xl">
            {figure}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">{caption}</p>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full border border-white/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full border border-white/10"
        />
      </motion.div>
    </div>
  );
}
