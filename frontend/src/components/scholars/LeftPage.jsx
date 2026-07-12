export default function LeftPage({ year, note, scholars, activeIndex, onSelect }) {
  return (
    <div className="flex h-full flex-col justify-between overflow-y-auto p-8 md:p-12">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold-600">Volume {year}</p>
        <h1 className="mt-3 font-serif text-4xl font-bold leading-[1.1] text-sage-900 md:text-5xl">
          बढ़ते कदम Scholars
        </h1>

        <nav className="mt-10 border-t border-gold-400/25" aria-label="Scholars in this volume">
          <ul>
            {scholars.map((scholar, i) => (
              <li key={scholar._id}>
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  aria-current={i === activeIndex}
                  className={`flex w-full items-baseline gap-4 border-b border-gold-400/15 py-3 text-left transition-colors hover:bg-sand/60 ${
                    i === activeIndex ? 'text-maroon-600' : 'text-sage-700'
                  }`}
                >
                  <span className="font-serif text-xs text-gold-600">{String(i + 1).padStart(2, '0')}</span>
                  <span className={`font-serif text-base ${i === activeIndex ? 'font-semibold' : ''}`}>
                    {scholar.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {note?.quote && (
        <p className="mt-10 max-w-sm font-serif text-sm italic leading-relaxed text-sage-600">
          &ldquo;{note.quote}&rdquo;
        </p>
      )}
    </div>
  );
}
