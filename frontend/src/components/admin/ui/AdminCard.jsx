export default function AdminCard({ children, className = '', padded = true }) {
  return (
    <div className={`rounded-lg border border-[#dadce0] bg-white ${padded ? 'p-6' : ''} ${className}`}>
      {children}
    </div>
  );
}
