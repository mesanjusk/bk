'use client';

import Link from 'next/link';
import { useAuth } from '../../context/AuthContext.jsx';
import { MenuIcon, LogoutIcon, ExternalLinkIcon } from './ui/icons.jsx';

export default function AdminTopbar({ onMenuClick }) {
  const { logout } = useAuth();

  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-[#dadce0] bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Toggle menu"
          className="rounded-full p-2 text-[#5f6368] hover:bg-[#f1f3f4] md:hidden"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
        <Link href="/admin" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#1a73e8] text-sm font-semibold text-white">
            BK
          </span>
          <span className="hidden text-[19px] leading-none text-[#5f6368] sm:inline">
            <span className="font-medium text-[#202124]">Badhte Kadam</span> Console
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-[#3c4043] hover:bg-[#f1f3f4] sm:flex"
        >
          <ExternalLinkIcon className="h-4 w-4" />
          View site
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-[#3c4043] hover:bg-[#f1f3f4]"
        >
          <LogoutIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Log out</span>
        </button>
      </div>
    </header>
  );
}
