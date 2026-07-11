import Button from '../ui/Button.jsx';
import Container from '../ui/Container.jsx';
import { site } from '../../data/siteContent.js';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-sand to-cream py-28">
      <Container className="text-center">
        <p className="animate-fadeIn text-sm font-medium uppercase tracking-[0.3em] text-gold-600">
          {site.name}
        </p>
        <span className="mx-auto mt-4 block h-px w-16 animate-fadeIn bg-gold-400/60" />
        <h1 className="mx-auto mt-4 max-w-3xl animate-fadeIn text-4xl font-semibold leading-tight text-sage-900 sm:text-5xl">
          {site.tagline}
        </h1>
        <p className="mx-auto mt-6 max-w-xl animate-fadeIn text-base text-sage-600">
          We support first-generation students and their communities through education,
          mentorship, and health initiatives.
        </p>
        <div className="mt-10 flex animate-fadeIn justify-center gap-4">
          <Button to="/scholars">Meet Our Scholars</Button>
          <Button to="/about" variant="secondary">Learn More</Button>
        </div>
      </Container>
    </section>
  );
}
