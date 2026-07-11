import { Link } from 'react-router-dom';

export default function ScholarRecord({ scholar, index }) {
  return (
    <div className="border-b border-sage-200/70 py-4 first:pt-0 last:border-none last:pb-0">
      <div className="flex gap-5">
        {scholar.photoUrl ? (
          <img
            src={scholar.photoUrl}
            alt={scholar.name}
            className="h-20 w-16 flex-shrink-0 rounded-sm border border-gold-400/40 object-cover"
          />
        ) : (
          <div className="flex h-20 w-16 flex-shrink-0 items-center justify-center rounded-sm border border-gold-400/40 bg-sand font-serif text-lg text-sage-500">
            {scholar.name.charAt(0)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-4">
            <Link
              to={`/scholars/${scholar.year}/${scholar._id}`}
              className="font-serif text-xl font-semibold text-sage-900 hover:text-gold-600"
            >
              {scholar.name}
            </Link>
            <span className="whitespace-nowrap text-xs font-medium uppercase tracking-wide text-gold-600">
              Entry {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <dl className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs uppercase tracking-wide text-sage-500">
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

          <p className="mt-3 text-sm leading-relaxed text-sage-600">{scholar.bio || scholar.description}</p>

          {scholar.achievements?.length > 0 && (
            <ul className="mt-3 space-y-1 text-xs text-sage-500">
              {scholar.achievements.map((achievement) => (
                <li key={achievement}>— {achievement}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
