function Arrow({ direction, ...props }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path
        d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PaginationControls({ current, total, onPrev, onNext }) {
  if (total === 0) return null;

  return (
    <>
      <span className="absolute right-6 top-6 z-10 font-serif text-xs tracking-wide text-gold-600">
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={onPrev}
            disabled={current === 0}
            aria-label="Previous scholar"
            className="absolute bottom-6 left-6 z-10 text-sage-400 transition-colors hover:text-maroon-600 disabled:pointer-events-none disabled:opacity-20"
          >
            <Arrow direction="left" />
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={current === total - 1}
            aria-label="Next scholar"
            className="absolute bottom-6 right-6 z-10 text-sage-400 transition-colors hover:text-maroon-600 disabled:pointer-events-none disabled:opacity-20"
          >
            <Arrow direction="right" />
          </button>
        </>
      )}
    </>
  );
}
