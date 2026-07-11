import Button from '../ui/Button.jsx';
import Container from '../ui/Container.jsx';
import MediaFrame from '../ui/MediaFrame.jsx';
import { content } from '../../data/content.js';

export default function Hero() {
  const { eyebrow, title, subtitle, ctaPrimary, ctaSecondary, media } = content.hero;

  return (
    <section className="flex min-h-[90vh] items-center bg-gradient-to-b from-sand to-cream">
      <Container>
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div>
            <p className="animate-fadeIn text-sm font-medium uppercase tracking-[0.3em] text-gold-600">
              {eyebrow}
            </p>
            <span className="mt-4 block h-px w-16 animate-fadeIn bg-gold-400/60" />
            <h1 className="mt-6 max-w-xl animate-fadeIn text-4xl font-semibold leading-tight text-sage-900 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-6 max-w-md animate-fadeIn text-base text-sage-700">{subtitle}</p>
            <div className="mt-10 flex animate-fadeIn gap-4">
              <Button to={ctaPrimary.to}>{ctaPrimary.label}</Button>
              <Button to={ctaSecondary.to} variant="secondary">
                {ctaSecondary.label}
              </Button>
            </div>
          </div>

          <MediaFrame
            type={media.type}
            src={media.src}
            alt={title}
            aspect="aspect-[4/3]"
            className="hidden ring-1 ring-gold-400/30 md:block"
          />
        </div>
      </Container>
    </section>
  );
}
