import Chapter from '../ui/Chapter.jsx';
import { Stagger, StaggerItem } from '../ui/Stagger.jsx';
import Reveal from '../ui/Reveal.jsx';
import Button from '../ui/Button.jsx';
import EditorialVisual from './EditorialVisual.jsx';
import { programs } from '../../data/siteContent.js';

export default function ProgramsGrid() {
  return (
    <Chapter
      id="programs"
      number="04"
      label="Programs"
      title="Every program carries a scholar further."
      description="From the classroom to their community — structured support at every step of the journey."
    >
      <div className="grid items-start gap-14 md:grid-cols-2 md:gap-16">
        <Stagger className="space-y-8" stagger={0.1}>
          {programs.map((program, index) => (
            <StaggerItem key={program.title} id={`program-${index}`} className="scroll-mt-28 border-l border-ink/10 pl-6">
              <p className="font-serif text-sm text-sage-600">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 text-xl font-medium text-ink">{program.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{program.description}</p>
            </StaggerItem>
          ))}

          <Reveal delay={0.2}>
            <Button to="/about" className="mt-4">
              Learn More
            </Button>
          </Reveal>
        </Stagger>

        <Reveal delay={0.1} className="hidden md:block">
          <EditorialVisual figure={programs.length} caption="Active programs" />
        </Reveal>
      </div>
    </Chapter>
  );
}
