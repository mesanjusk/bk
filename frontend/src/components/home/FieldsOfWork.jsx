'use client';

import Section from '../ui/Section.jsx';

const fields = [
  {
    label: 'Education',
    color: 'sage',
    icon: (
      <path d="M12 3l9 5-9 5-9-5 9-5zM7 10.5V16c0 1.5 2.5 3 5 3s5-1.5 5-3v-5.5" />
    ),
  },
  {
    label: 'Health',
    color: 'maroon',
    icon: <path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 5 6.5 5c2 0 3.5 1.2 4.5 2.5C12 6.2 13.5 5 15.5 5 19 5 21.5 8.5 20.5 12.5 18 16.65 12 21 12 21z" />,
  },
  {
    label: 'Livelihood',
    color: 'gold',
    icon: (
      <path d="M12 21c-1 0-1.8-.8-1.8-1.8V13c-3-.4-5.2-3-5.2-6.2C5 3.6 8.1 2 12 2s7 1.6 7 4.8c0 3.2-2.2 5.8-5.2 6.2v6.2c0 1-.8 1.8-1.8 1.8z" />
    ),
  },
  {
    label: 'Mentorship',
    color: 'sage',
    icon: (
      <path d="M17 8a3 3 0 11-6 0 3 3 0 016 0zM7 10a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM2 20c0-3 2.5-5 5-5s5 2 5 5M12 20c0-3.5 2.5-6 6-6s6 2.5 6 6" />
    ),
  },
];

const colorClasses = {
  sage: { bg: 'bg-sage-50', text: 'text-sage-700', label: 'text-sage-800' },
  maroon: { bg: 'bg-maroon-50', text: 'text-maroon-500', label: 'text-maroon-500' },
  gold: { bg: 'bg-gold-300/30', text: 'text-gold-600', label: 'text-gold-600' },
};

// Below-the-fold sections fetch data asynchronously and can shift page layout
// mid-scroll, leaving a single scrollIntoView call short of its target. Re-run
// it a couple of times as that content settles so the click always lands on
// the right section regardless of fetch timing.
const CORRECTION_DELAYS_MS = [0, 400, 1000];

export default function FieldsOfWork() {
  function goToProgram(index) {
    CORRECTION_DELAYS_MS.forEach((delay) => {
      window.setTimeout(() => {
        document.getElementById(`program-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, delay);
    });
  }

  return (
    <Section className="bg-sand">
      <h2 className="text-center text-3xl font-semibold text-sage-900">Our Fields of Work</h2>
      <div className="mt-14 flex flex-wrap justify-center gap-x-16 gap-y-10">
        {fields.map((field, index) => {
          const colors = colorClasses[field.color];
          return (
            <button
              key={field.label}
              type="button"
              onClick={() => goToProgram(index)}
              aria-label={`Jump to ${field.label} program`}
              className="flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-lg"
            >
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full shadow-soft transition-transform duration-300 hover:-translate-y-1 ${colors.bg}`}
              >
                <svg
                  className={`h-9 w-9 ${colors.text}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {field.icon}
                </svg>
              </div>
              <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.2em] ${colors.label}`}>
                {field.label}
              </p>
            </button>
          );
        })}
      </div>
    </Section>
  );
}
