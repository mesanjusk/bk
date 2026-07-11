import { Link } from 'react-router-dom';

export default function ScholarCard({ scholar }) {
  return (
    <Link
      to={`/scholars/${scholar.year}`}
      className="group block overflow-hidden rounded-xl2 bg-white shadow-soft transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-sage-100">
        {scholar.photoUrl ? (
          <img
            src={scholar.photoUrl}
            alt={scholar.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-serif text-3xl text-sage-400">
            {scholar.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-sage-900">{scholar.name}</h3>
        <p className="text-xs font-medium uppercase tracking-wide text-sage-500">{scholar.year}</p>
        <p className="mt-2 text-sm leading-relaxed text-sage-600">{scholar.description}</p>
      </div>
    </Link>
  );
}
