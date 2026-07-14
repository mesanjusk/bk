import Link from 'next/link';

export default function ScholarRecord({ scholar, index }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold-600">
        Entry {String(index + 1).padStart(2, '0')}
      </span>

      {scholar.photoUrl ? (
        <img
          src={scholar.photoUrl}
          alt={scholar.name}
          className="mt-4 h-48 w-40 flex-shrink-0 rounded-md border border-gold-400/40 object-cover shadow-book"
        />
      ) : (
        <div className="mt-4 flex h-48 w-40 flex-shrink-0 items-center justify-center rounded-md border border-gold-400/40 bg-sand font-serif text-5xl text-sage-400">
          {scholar.name?.charAt(0) || '?'}
        </div>
      )}

      <Link
        href={`/scholars/${scholar.year}/${scholar._id}`}
        className="mt-5 font-serif text-2xl font-semibold text-sage-900 hover:text-gold-600"
      >
        {scholar.name}
      </Link>

      <dl className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs uppercase tracking-wide text-sage-500">
        {scholar.state && (
          <div className="flex gap-1">
            <dt className="font-medium">State</dt>
            <dd className="normal-case tracking-normal text-sage-700">{scholar.state}</dd>
          </div>
        )}
        {scholar.score && (
          <div className="flex gap-1">
            <dt className="font-medium">Score</dt>
            <dd className="normal-case tracking-normal text-sage-700">{scholar.score}</dd>
          </div>
        )}
      </dl>

      <p className="mt-4 max-w-sm text-sm leading-relaxed text-sage-600">
        {scholar.bio || scholar.description}
      </p>

      {scholar.achievements?.length > 0 && (
        <ul className="mt-4 space-y-1 text-xs text-sage-500">
          {scholar.achievements.map((achievement) => (
            <li key={achievement}>— {achievement}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
