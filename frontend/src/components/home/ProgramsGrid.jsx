import Section from '../ui/Section.jsx';
import { programs } from '../../data/siteContent.js';

export default function ProgramsGrid() {
  return (
    <Section className="bg-cream">
      <h2 className="text-center text-3xl font-semibold text-sage-900">Programs & Initiatives</h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {programs.map((program) => (
          <div
            key={program.title}
            className="rounded-xl2 bg-white p-6 shadow-soft transition-transform duration-200 hover:-translate-y-1"
          >
            <h3 className="text-lg font-semibold text-sage-800">{program.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-sage-600">{program.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
