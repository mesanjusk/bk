'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import RequireAuth from './RequireAuth.jsx';
import AdminSidebar from './AdminSidebar.jsx';
import AdminTopbar from './AdminTopbar.jsx';

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === '/admin/login') {
    return <div className="admin-console min-h-screen bg-[#f8f9fa]">{children}</div>;
  }

  return (
    <RequireAuth>
      <div className="admin-console flex h-screen overflow-hidden bg-[#f8f9fa] text-[#202124]">
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">{children}</main>
        </div>
      </div>
    </RequireAuth>
  );
}
