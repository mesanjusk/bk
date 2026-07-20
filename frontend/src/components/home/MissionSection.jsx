import Chapter from '../ui/Chapter.jsx';
import Reveal from '../ui/Reveal.jsx';
import { about } from '../../data/siteContent.js';

export default function MissionSection() {
  return (
    <Chapter id="mission" number="03" label="Mission" tone="tint" align="center">
      <div className="mx-auto max-w-3xl space-y-14 text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sage-600">Our Vision</p>
          <p className="mt-5 font-serif text-3xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
            {about.vision}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sage-600">Our Mission</p>
          <p className="mt-5 font-serif text-3xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
            {about.mission}
          </p>
        </Reveal>
      </div>
    </Chapter>
  );
}
