'use client';

import { useState } from 'react';

export default function StoryCard({ story }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-3xl bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-lift">
      <div className="flex items-center gap-4">
        {story.photoUrl ? (
          <img src={story.photoUrl} alt={story.name} className="h-14 w-14 flex-shrink-0 rounded-full object-cover" />
        ) : (
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-sand font-serif text-xl text-sage-700">
            {story.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-lg font-medium text-ink">{story.name}</p>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-600">{story.state}</p>
        </div>
      </div>

      <div className="mt-6 space-y-2 border-l border-ink/10 pl-4">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Before</span>
          <p className="text-sm text-muted">{story.before}</p>
        </div>
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-600">After</span>
          <p className="text-sm font-medium text-ink">{story.after}</p>
        </div>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-muted">{story.narrative}</p>

      {expanded && <p className="mt-4 text-sm leading-relaxed text-muted">{story.extended}</p>}

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="link-underline mt-5 text-xs font-semibold uppercase tracking-wide text-ink"
      >
        {expanded ? 'Show Less' : 'Read More'}
      </button>
    </div>
  );
}
