'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import PageTransition from './PageTransition.jsx';

export default function Layout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return children;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
