'use client';

import { useEffect, useState } from 'react';
import Chapter from '../ui/Chapter.jsx';
import { Stagger, StaggerItem } from '../ui/Stagger.jsx';
import Button from '../ui/Button.jsx';
import StoryCard from './StoryCard.jsx';
import { fetchStories, fetchScholars } from '../../api/client.js';

const SCHOLAR_PREVIEW_COUNT = 4;

export default function StoriesSection() {
  const [stories, setStories] = useState([]);
  const [scholars, setScholars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    Promise.all([fetchStories(), fetchScholars()])
      .then(([storiesData, scholarsData]) => {
        if (!isMounted) return;
        setStories(storiesData);
        setScholars(scholarsData.slice(0, SCHOLAR_PREVIEW_COUNT));
      })
      .catch(() => {
        if (isMounted) setError(true);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!loading && error) return null;
  if (!loading && stories.length === 0 && scholars.length === 0) return null;

  return (
    <Chapter
      id="testimonials"
      number="07"
      label="Testimonials"
      title="Behind every number is a life changed."
      description="Real scholars, real trajectories — a small window into the program's day-to-day impact."
      tone="tint"
    >
      {loading ? (
        <p className="text-muted">Loading stories…</p>
      ) : (
        <>
          {stories.length > 0 && (
            <Stagger className="grid gap-6 sm:grid-cols-3" stagger={0.1}>
              {stories.map((story) => (
                <StaggerItem key={story._id}>
                  <StoryCard story={story} />
                </StaggerItem>
              ))}
            </Stagger>
          )}

          {scholars.length > 0 && (
            <div className="mt-20 border-t border-ink/[0.08] pt-14">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sage-600">Meet the Scholars</p>
              <Stagger className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4" stagger={0.08}>
                {scholars.map((scholar) => (
                  <StaggerItem
                    key={scholar._id}
                    className="group overflow-hidden rounded-3xl bg-white shadow-card transition-shadow duration-300 hover:shadow-lift"
                  >
                    {scholar.photoUrl ? (
                      <img
                        src={scholar.photoUrl}
                        alt={scholar.name}
                        className="aspect-[4/5] w-full object-cover transition-transform duration-500 ease-luxury group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex aspect-[4/5] w-full items-center justify-center bg-sand text-xs uppercase tracking-wide text-muted">
                        No Photo
                      </div>
                    )}
                    <div className="p-5">
                      <p className="font-medium text-ink">{scholar.name}</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-sage-600">
                        {scholar.state} · {scholar.year}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

              <div className="mt-12">
                <Button to="/scholars">View All Scholars</Button>
              </div>
            </div>
          )}
        </>
      )}
    </Chapter>
  );
}
