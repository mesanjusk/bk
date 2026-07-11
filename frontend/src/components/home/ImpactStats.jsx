import Section from '../ui/Section.jsx';
import { impactStats } from '../../data/siteContent.js';

export default function ImpactStats() {
  return (
    <Section className="bg-sage-800 text-white">
      <h2 className="text-center text-3xl font-semibold">Our Impact</h2>
      <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
        {impactStats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-serif text-4xl font-semibold">{stat.value}</p>
            <p className="mt-2 text-sm text-sage-200">{stat.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
