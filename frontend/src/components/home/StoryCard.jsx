import { useState } from 'react';
import MediaFrame from '../ui/MediaFrame.jsx';

export default function StoryCard({ story }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group px-8 py-10 transition-all duration-300 hover:z-10 hover:scale-[1.03] hover:shadow-soft sm:py-0">
      <div className="flex items-center gap-4">
        {story.media?.src ? (
          <MediaFrame
            type={story.media.type}
            src={story.media.src}
            alt={story.name}
            aspect="aspect-square"
            rounded="rounded-full"
            className="h-14 w-14 flex-shrink-0 ring-1 ring-gold-400/30"
          />
        ) : (
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-sand font-serif text-xl text-sage-600 ring-1 ring-gold-400/30">
            {story.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-serif text-lg font-semibold text-sage-900">{story.name}</p>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-600">{story.state}</p>
        </div>
      </div>

      <div className="mt-6 space-y-2 border-l-2 border-gold-400/40 pl-4">
        <div>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-sage-400">Before</span>
          <p className="text-sm text-sage-500">{story.before}</p>
        </div>
        <div>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-600">After</span>
          <p className="text-sm font-medium text-sage-800">{story.after}</p>
        </div>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-sage-600">{story.narrative}</p>

      {expanded && (
        <p className="mt-4 text-sm leading-relaxed text-sage-600">{story.extended}</p>
      )}

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-5 text-xs font-medium uppercase tracking-wide text-sage-700 underline decoration-gold-400/60 underline-offset-4 hover:text-sage-900"
      >
        {expanded ? 'Show Less' : 'Read More'}
      </button>
    </div>
  );
}
