import Container from './Container.jsx';
import Reveal from './Reveal.jsx';

const toneClasses = {
  canvas: 'bg-canvas',
  tint: 'bg-sand',
  card: 'bg-white',
};

export default function Chapter({
  id,
  number,
  label,
  title,
  description,
  tone = 'canvas',
  align = 'left',
  className = '',
  headerClassName = '',
  children,
}) {
  const alignClasses = align === 'center' ? 'mx-auto text-center' : '';

  return (
    <section
      id={id}
      className={`relative flex min-h-screen items-center py-28 md:py-32 ${toneClasses[tone] || toneClasses.canvas} ${className}`}
    >
      <Container maxWidth="max-w-[1280px]" className="w-full">
        {(number || label) && (
          <Reveal className={`flex items-center gap-4 ${alignClasses}`}>
            {number && <span className="font-serif text-sm text-sage-600">{number}</span>}
            {number && <span className="h-px w-10 bg-sage-400/50" />}
            {label && (
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-sage-600">{label}</span>
            )}
          </Reveal>
        )}

        {title && (
          <Reveal as="h2" delay={0.06} className={`mt-6 max-w-3xl text-4xl font-medium leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-7xl ${alignClasses} ${headerClassName}`}>
            {title}
          </Reveal>
        )}

        {description && (
          <Reveal delay={0.12} className={`mt-6 max-w-xl text-lg leading-relaxed text-muted ${alignClasses}`}>
            {description}
          </Reveal>
        )}

        {children && <div className="mt-16">{children}</div>}
      </Container>
    </section>
  );
}
