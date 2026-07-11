import BookCard from './BookCard.jsx';

export default function BookShelf({ years }) {
  if (!years.length) {
    return <p className="text-center text-sage-500">No volumes have been added to the archive yet.</p>;
  }

  return (
    <div className="perspective-book">
      <div className="flex flex-wrap items-end justify-center gap-8 rounded-2xl bg-gradient-to-b from-sand/60 to-transparent p-10">
        {years.map((year, index) => (
          <BookCard key={year} year={year} index={index} />
        ))}
      </div>
      <div className="mx-auto -mt-2 h-3 w-[92%] rounded-full bg-sage-900/10 blur-sm" />
    </div>
  );
}
