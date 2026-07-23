'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DashboardIcon, PlusIcon, UploadIcon, BookIcon, SettingsIcon, CloseIcon } from './ui/icons.jsx';

const navSections = [
  {
    label: 'Scholars',
    items: [
      { to: '/admin', label: 'All Scholars', icon: DashboardIcon, exact: true },
      { to: '/admin/scholars/new', label: 'Add Scholar', icon: PlusIcon },
      { to: '/admin/scholars/bulk', label: 'Bulk Upload', icon: UploadIcon },
    ],
  },
  {
    label: 'Content',
    items: [{ to: '/admin/stories', label: 'Stories', icon: BookIcon }],
  },
  {
    label: 'Configuration',
    items: [{ to: '/admin/settings', label: 'Site Settings', icon: SettingsIcon }],
  },
];

function isActive(pathname, item) {
  if (item.exact) return pathname === item.to;
  return pathname === item.to || pathname.startsWith(`${item.to}/`);
}

export default function AdminSidebar({ open, onClose }) {
  const pathname = usePathname();

  const content = (
    <nav className="flex h-full flex-col gap-6 overflow-y-auto py-4">
      {navSections.map((section) => (
        <div key={section.label}>
          <p className="px-6 pb-1 text-xs font-semibold uppercase tracking-wider text-[#80868b]">
            {section.label}
          </p>
          <ul>
            {section.items.map((item) => {
              const active = isActive(pathname, item);
              const ItemIcon = item.icon;
              return (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    onClick={onClose}
                    className={`flex items-center gap-3 border-l-[3px] px-[21px] py-2.5 text-sm transition-colors ${
                      active
                        ? 'border-[#1a73e8] bg-[#e8f0fe] font-medium text-[#1a73e8]'
                        : 'border-transparent text-[#3c4043] hover:bg-[#f1f3f4]'
                    }`}
                  >
                    <ItemIcon className="h-5 w-5 flex-shrink-0" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 flex-shrink-0 border-r border-[#dadce0] bg-white md:block">
        {content}
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={onClose} aria-hidden="true" />
          <aside className="absolute inset-y-0 left-0 w-64 bg-white shadow-lg">
            <div className="flex items-center justify-between border-b border-[#dadce0] px-4 py-3">
              <span className="text-sm font-medium text-[#202124]">Menu</span>
              <button type="button" onClick={onClose} aria-label="Close menu" className="text-[#5f6368]">
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
