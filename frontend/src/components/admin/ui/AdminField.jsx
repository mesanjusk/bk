export const fieldClasses =
  'mt-1.5 w-full rounded-md border border-[#dadce0] bg-white px-3.5 py-2 text-sm text-[#202124] placeholder:text-[#80868b] focus:border-[#1a73e8] focus:outline-none focus:ring-1 focus:ring-[#1a73e8]';

export default function AdminField({ label, htmlFor, children, hint }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-medium text-[#3c4043]">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-[#5f6368]">{hint}</p>}
    </div>
  );
}
