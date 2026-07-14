'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import Section from '../ui/Section.jsx';
import TemplateGrid from './TemplateGrid.jsx';
import PosterEditor from './PosterEditor.jsx';
import { posterTemplates } from '../../data/posterTemplates.js';

const PosterFlourishScene = dynamic(() => import('../three/PosterFlourishScene.jsx'), { ssr: false });

export default function CreatePosterView() {
  const [templateId, setTemplateId] = useState(null);
  const template = posterTemplates.find((t) => t.id === templateId) || null;

  return (
    <Section maxWidth={template ? 'max-w-6xl' : 'max-w-5xl'}>
      <div className="text-center">
        {!template && (
          <div className="pointer-events-none mx-auto h-40 max-w-2xl opacity-90 sm:h-48">
            <PosterFlourishScene />
          </div>
        )}
        <h1 className="font-serif text-4xl font-semibold text-sage-900">Create a Poster</h1>
        <p className="mt-3 text-sage-600">Design and share for a cause.</p>
      </div>

      <AnimatePresence mode="wait">
        {template ? (
          <motion.div
            key="editor"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <PosterEditor template={template} onBack={() => setTemplateId(null)} />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <TemplateGrid templates={posterTemplates} onSelect={setTemplateId} />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
