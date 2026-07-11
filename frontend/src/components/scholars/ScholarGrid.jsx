import ScholarCard from './ScholarCard.jsx';

export default function ScholarGrid({ scholars }) {
  if (!scholars.length) {
    return <p className="text-center text-sage-500">No scholars found for this selection.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {scholars.map((scholar) => (
        <ScholarCard key={scholar._id} scholar={scholar} />
      ))}
    </div>
  );
}
