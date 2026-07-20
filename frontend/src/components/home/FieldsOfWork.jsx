'use client';

import Chapter from '../ui/Chapter.jsx';
import { Stagger, StaggerItem } from '../ui/Stagger.jsx';

const fields = [
  {
    label: 'Education',
    description: 'Scholarships and academic support for first-generation college students.',
    icon: <path d="M12 3l9 5-9 5-9-5 9-5zM7 10.5V16c0 1.5 2.5 3 5 3s5-1.5 5-3v-5.5" />,
  },
  {
    label: 'Health',
    description: 'Free check-ups and awareness drives in underserved villages.',
    icon: <path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 5 6.5 5c2 0 3.5 1.2 4.5 2.5C12 6.2 13.5 5 15.5 5 19 5 21.5 8.5 20.5 12.5 18 16.65 12 21 12 21z" />,
  },
  {
    label: 'Livelihood',
    description: 'Skill-building workshops for sustainable family incomes.',
    icon: <path d="M12 21c-1 0-1.8-.8-1.8-1.8V13c-3-.4-5.2-3-5.2-6.2C5 3.6 8.1 2 12 2s7 1.6 7 4.8c0 3.2-2.2 5.8-5.2 6.2v6.2c0 1-.8 1.8-1.8 1.8z" />,
  },
  {
    label: 'Mentorship',
    description: 'Pairing scholars with professionals for long-term guidance.',
    icon: <path d="M17 8a3 3 0 11-6 0 3 3 0 016 0zM7 10a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM2 20c0-3 2.5-5 5-5s5 2 5 5M12 20c0-3.5 2.5-6 6-6s6 2.5 6 6" />,
  },
];

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
    <Chapter
      id="services"
      number="05"
      label="Services"
      title="Where we focus our effort."
      description="Four pillars, one goal — sustained opportunity for the communities we serve."
      tone="tint"
    >
      <Stagger className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
        {fields.map((field, index) => (
          <StaggerItem key={field.label}>
            <button
              type="button"
              onClick={() => goToProgram(index)}
              aria-label={`Jump to ${field.label} program`}
              className="group flex flex-col items-start text-left focus:outline-none"
            >
              <svg
                className="h-9 w-9 text-sage-800 transition-transform duration-300 ease-luxury group-hover:-translate-y-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {field.icon}
              </svg>
              <p className="mt-6 text-lg font-medium text-ink">{field.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{field.description}</p>
            </button>
          </StaggerItem>
        ))}
      </Stagger>
    </Chapter>
  );
}
