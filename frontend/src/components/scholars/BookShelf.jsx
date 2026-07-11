import BookCard from './BookCard.jsx';

export default function BookShelf({ years }) {
  if (!years.length) {
    return <p className="text-center text-sage-500">No volumes have been added to the archive yet.</p>;
  }

  return (
    <div className="perspective-book grid grid-cols-1 place-items-center gap-12 rounded-2xl bg-gradient-to-b from-sand/50 to-transparent p-10 sm:grid-cols-2 lg:grid-cols-4">
      {years.map((year, index) => (
        <BookCard key={year} year={year} index={index} />
      ))}
    </div>
  );
}
