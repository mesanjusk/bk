export default function YearFilter({ years, activeYear, onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button
        onClick={() => onSelect(null)}
        className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
          activeYear === null ? 'bg-sage-600 text-white' : 'bg-white text-sage-700 shadow-soft hover:bg-sage-50'
        }`}
      >
        All Years
      </button>
      {years.map((year) => (
        <button
          key={year}
          onClick={() => onSelect(year)}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
            activeYear === year ? 'bg-sage-600 text-white' : 'bg-white text-sage-700 shadow-soft hover:bg-sage-50'
          }`}
        >
          {year}
        </button>
      ))}
    </div>
  );
}
