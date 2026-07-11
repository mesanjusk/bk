import Section from '../ui/Section.jsx';
import { impactStats } from '../../data/siteContent.js';

export default function ImpactStats() {
  return (
    <Section className="bg-cream">
      <h2 className="text-center text-3xl font-semibold text-sage-900">Our Impact</h2>
      <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {impactStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl2 bg-white p-8 text-center shadow-soft transition-transform duration-300 hover:-translate-y-1"
          >
            <p className="font-serif text-4xl font-semibold text-sage-800">{stat.value}</p>
            <p className="mt-2 text-sm uppercase tracking-wide text-sage-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
