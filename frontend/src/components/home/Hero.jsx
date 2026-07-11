import Button from '../ui/Button.jsx';
import Container from '../ui/Container.jsx';
import ArchiveVisual from './ArchiveVisual.jsx';
import { site } from '../../data/siteContent.js';

export default function Hero() {
  return (
    <section className="flex min-h-[90vh] items-center bg-gradient-to-b from-sand to-cream">
      <Container>
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div>
            <p className="animate-fadeIn text-sm font-medium uppercase tracking-[0.3em] text-gold-600">
              {site.name}
            </p>
            <span className="mt-4 block h-px w-16 animate-fadeIn bg-gold-400/60" />
            <h1 className="mt-6 max-w-xl animate-fadeIn text-4xl font-semibold leading-tight text-sage-900 sm:text-5xl">
              Preserving Excellence, Year After Year.
            </h1>
            <p className="mt-6 max-w-md animate-fadeIn text-base text-sage-700">
              An archive of scholars shaping the future.
            </p>
            <div className="mt-10 flex animate-fadeIn gap-4">
              <Button to="/scholars">Meet Our Scholars</Button>
              <Button to="/about" variant="secondary">Learn More</Button>
            </div>
          </div>

          <ArchiveVisual className="hidden md:block" />
        </div>
      </Container>
    </section>
  );
}
