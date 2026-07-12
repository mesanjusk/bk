import Section from '../ui/Section.jsx';
import Button from '../ui/Button.jsx';
import ArchiveVisual from './ArchiveVisual.jsx';
import { programs } from '../../data/siteContent.js';

export default function ProgramsGrid() {
  return (
    <Section className="bg-cream">
      <div className="grid items-center gap-16 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold text-sage-900">Programs &amp; Initiatives</h2>
          <p className="mt-4 text-sage-600">
            Every program is built to carry a scholar further than the last — from the classroom to
            their community.
          </p>
          <ul className="mt-8 space-y-6">
            {programs.map((program, index) => (
              <li
                key={program.title}
                id={`program-${index}`}
                className="scroll-mt-28 border-l-2 border-gold-400/50 pl-5"
              >
                <h3 className="font-serif text-lg font-semibold text-sage-800">{program.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-sage-600">{program.description}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button to="/about">Learn More</Button>
          </div>
        </div>

        <ArchiveVisual className="hidden md:block" />
      </div>
    </Section>
  );
}
