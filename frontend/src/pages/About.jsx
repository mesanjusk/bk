import Section from '../components/ui/Section.jsx';
import { about } from '../data/siteContent.js';

export default function About() {
  return (
    <>
      <Section className="bg-sand">
        <h1 className="text-center text-4xl font-semibold text-sage-900">Our Story</h1>
        <p className="mx-auto mt-6 max-w-2xl text-center leading-relaxed text-sage-600">{about.story}</p>
      </Section>

      <Section className="bg-cream">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl2 bg-white p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-sage-800">Vision</h3>
            <p className="mt-2 text-sm leading-relaxed text-sage-600">{about.vision}</p>
          </div>
          <div className="rounded-xl2 bg-white p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-sage-800">Mission</h3>
            <p className="mt-2 text-sm leading-relaxed text-sage-600">{about.mission}</p>
          </div>
          <div className="rounded-xl2 bg-white p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-sage-800">Values</h3>
            <ul className="mt-2 space-y-2 text-sm text-sage-600">
              {about.values.map((value) => (
                <li key={value.title}>
                  <span className="font-medium text-sage-800">{value.title}:</span> {value.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-sand">
        <h2 className="text-center text-3xl font-semibold text-sage-900">Founders</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {about.founders.map((founder) => (
            <div key={founder.name} className="rounded-xl2 bg-white p-6 shadow-soft">
              <h3 className="font-serif text-lg font-semibold text-sage-900">{founder.name}</h3>
              <p className="text-xs font-medium uppercase tracking-wide text-sage-500">{founder.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-sage-600">{founder.bio}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-cream">
        <h2 className="text-center text-3xl font-semibold text-sage-900">Our Journey</h2>
        <div className="mx-auto mt-10 max-w-2xl space-y-6 border-l-2 border-sage-200 pl-6">
          {about.timeline.map((item) => (
            <div key={item.year} className="relative">
              <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-sage-500" />
              <p className="font-serif text-lg font-semibold text-sage-800">{item.year}</p>
              <p className="text-sm text-sage-600">{item.event}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
