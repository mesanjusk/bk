import Link from 'next/link';

export default function AdminPageHeader({ title, description, backTo, backLabel, actions }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-[#dadce0] pb-5">
      <div>
        {backTo && (
          <Link href={backTo} className="mb-1 inline-block text-sm font-medium text-[#1a73e8] hover:underline">
            ← {backLabel}
          </Link>
        )}
        <h1 className="text-[22px] font-medium leading-tight text-[#202124]">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-sm text-[#5f6368]">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </div>
  );
}
