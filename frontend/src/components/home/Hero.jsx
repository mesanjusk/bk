'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button.jsx';
import Container from '../ui/Container.jsx';
import MediaFrame from '../ui/MediaFrame.jsx';
import EditorialVisual from './EditorialVisual.jsx';
import { content } from '../../data/content.js';
import { impactStats } from '../../data/siteContent.js';
import { fetchSettings } from '../../api/client.js';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const { title, subtitle, ctaPrimary, ctaSecondary } = content.hero;
  const [heroMedia, setHeroMedia] = useState(null);
  const scholarsFigure = impactStats.find((stat) => stat.label === 'Scholars');

  useEffect(() => {
    let isMounted = true;
    fetchSettings()
      .then((settings) => {
        if (isMounted && settings.heroMediaUrl) {
          setHeroMedia({ type: settings.heroMediaType, src: settings.heroMediaUrl });
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-canvas pt-20">
      <Container maxWidth="max-w-[1280px]" className="grid items-center gap-16 py-16 md:grid-cols-2 md:gap-12">
        <div>
          <motion.div initial="hidden" animate="show" custom={0} variants={fadeUp} className="flex items-center gap-4">
            <span className="font-serif text-sm text-sage-600">01</span>
            <span className="h-px w-10 bg-sage-400/50" />
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-sage-600">Chapter One</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={0.1}
            variants={fadeUp}
            className="mt-8 max-w-xl font-serif text-5xl font-medium leading-[0.98] tracking-tight text-ink sm:text-6xl md:text-7xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={0.2}
            variants={fadeUp}
            className="mt-7 max-w-md text-lg leading-relaxed text-muted"
          >
            {subtitle}
          </motion.p>

          <motion.div initial="hidden" animate="show" custom={0.3} variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <Button to={ctaPrimary.to}>{ctaPrimary.label}</Button>
            <Button to={ctaSecondary.to} variant="secondary">
              {ctaSecondary.label}
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="hidden md:block"
        >
          {heroMedia ? (
            <MediaFrame
              type={heroMedia.type}
              src={heroMedia.src}
              alt={title}
              aspect="aspect-[4/5]"
              rounded="rounded-3xl"
              className="shadow-lift"
            />
          ) : (
            <EditorialVisual figure={scholarsFigure?.value || '150+'} caption="Scholars supported" />
          )}
        </motion.div>
      </Container>
    </section>
  );
}
