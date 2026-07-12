import { useEffect, useState } from 'react';
import Section from '../ui/Section.jsx';
import StoryCard from './StoryCard.jsx';
import { fetchStories } from '../../api/client.js';
import { storiesFallback } from '../../data/storiesFallback.js';

export default function StoriesSection() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchStories()
      .then((data) => {
        if (isMounted) setStories(data.length ? data : storiesFallback);
      })
      .catch(() => {
        if (isMounted) setStories(storiesFallback);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Section className="bg-cream">
      <h2 className="text-center font-serif text-4xl font-semibold text-sage-900">Stories That Matter</h2>
      <p className="mx-auto mt-3 max-w-md text-center font-serif text-lg italic text-sage-600">
        Behind every number is a life changed.
      </p>

      {loading ? (
        <p className="mt-16 text-center text-sage-500">Loading stories…</p>
      ) : (
        <div className="mt-16 divide-y divide-sage-200/60 sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
      )}
    </Section>
  );
}
