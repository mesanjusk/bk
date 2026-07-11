import Section from '../ui/Section.jsx';
import { about } from '../../data/siteContent.js';

export default function AboutSection() {
  return (
    <Section className="bg-cream">
      <div className="grid gap-12 sm:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold text-sage-900">Who We Are</h2>
          <p className="mt-4 text-sage-600 leading-relaxed">{about.intro}</p>
        </div>
        <div className="space-y-8">
          <div className="rounded-xl2 bg-white p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-sage-800">Our Vision</h3>
            <p className="mt-2 text-sm text-sage-600 leading-relaxed">{about.vision}</p>
          </div>
          <div className="rounded-xl2 bg-white p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-sage-800">Our Mission</h3>
            <p className="mt-2 text-sm text-sage-600 leading-relaxed">{about.mission}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
