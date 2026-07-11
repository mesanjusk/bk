import Section from '../ui/Section.jsx';
import StoryCard from './StoryCard.jsx';
import { content } from '../../data/content.js';

export default function StoriesSection() {
  const { eyebrow, subtitle, items } = content.stories;

  return (
    <Section className="bg-cream">
      <h2 className="text-center font-serif text-4xl font-semibold text-sage-900">{eyebrow}</h2>
      <p className="mx-auto mt-3 max-w-md text-center font-serif text-lg italic text-sage-600">{subtitle}</p>

      <div className="mt-16 divide-y divide-sage-200/60 sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {items.map((story) => (
          <StoryCard key={story.name} story={story} />
        ))}
      </div>
    </Section>
  );
}
