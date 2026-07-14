'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../ui/Button.jsx';

export default function CensusFeedbackModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  function handleClose() {
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-sage-900/50 p-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid w-full max-w-2xl overflow-hidden rounded-xl2 bg-white shadow-book ring-1 ring-gold-400/30 sm:grid-cols-2"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-sand text-sage-700 transition-colors hover:bg-sage-100"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="p-8 sm:p-10">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-600">Badhte Kadam</p>
              <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight text-sage-900">
                Your feedback <span className="text-gold-600">can make a difference!</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-sage-600">
                Take a quick survey and help us understand your community better.
              </p>

              <div className="mt-6 flex items-center gap-3 rounded-lg bg-sand p-4">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-sage-700 shadow-soft">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-sage-800">It only takes 2 minutes</p>
                  <p className="text-xs text-sage-500">Your opinion matters to us!</p>
                </div>
              </div>

              <Button onClick={handleClose} className="mt-8">
                Take the Survey
              </Button>
            </div>

            <div className="relative hidden bg-sand/50 sm:block">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-40 w-40">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sage-800/10 via-gold-400/10 to-maroon-500/10 blur-xl" />
                  <div className="absolute inset-4 rounded-2xl border border-gold-400/30 bg-white shadow-soft" />
                  <svg
                    className="absolute inset-0 h-full w-full p-9 text-sage-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <rect x="4" y="3" width="16" height="18" rx="2" />
                    <path d="M8 8h8M8 12h8M8 16h5" />
                  </svg>
                  <span className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-gold-400 text-white shadow-soft">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
