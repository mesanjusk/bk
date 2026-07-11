import Section from '../ui/Section.jsx';
import Button from '../ui/Button.jsx';
import MediaFrame from '../ui/MediaFrame.jsx';
import { content } from '../../data/content.js';

export default function ScholarsSection() {
  const { eyebrow, title, subtitle, items } = content.scholars;

  return (
    <Section className="bg-sand">
      <p className="text-center text-xs font-medium uppercase tracking-[0.35em] text-gold-600">{eyebrow}</p>
      <h2 className="mt-3 text-center font-serif text-3xl font-semibold text-sage-900">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-center text-sage-600">{subtitle}</p>

      <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {items.map((scholar) => (
          <div
            key={scholar.name}
            className="group overflow-hidden rounded-xl2 bg-white shadow-soft transition-transform duration-300 hover:-translate-y-1"
          >
            <MediaFrame
              type={scholar.media.type}
              src={scholar.media.src}
              alt={scholar.name}
              aspect="aspect-[4/5]"
              rounded="rounded-none"
            />
            <div className="p-5">
              <p className="font-serif text-lg font-semibold text-sage-900">{scholar.name}</p>
              <p className="text-xs font-medium uppercase tracking-wide text-gold-600">
                {scholar.state} · {scholar.year}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-sage-600">{scholar.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button to="/scholars">View All Scholars</Button>
      </div>
    </Section>
  );
}
