'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { site } from '../../data/siteContent.js';

const links = [
  { to: '/', label: 'Home' },
  { to: '/scholars', label: 'Scholars' },
  { to: '/census', label: 'Census' },
  { to: '/create', label: 'Create Poster' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function isLinkActive(pathname, to) {
  if (to === '/') return pathname === '/';
  return pathname === to || pathname.startsWith(`${to}/`);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 h-[72px] transition-colors duration-300 ${
        scrolled ? 'border-b border-sage-100 bg-cream/95 shadow-soft backdrop-blur' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="flex h-full items-center justify-between px-6 md:px-12">
        <Link href="/" className="font-serif text-xl font-semibold text-sage-800">
          {site.name}
        </Link>

        <button
          className="text-sage-800 sm:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>

        <ul className="hidden gap-8 text-sm font-medium text-sage-700 sm:flex">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                href={link.to}
                className={`border-b transition-colors duration-200 hover:text-sage-900 ${
                  isLinkActive(pathname, link.to) ? 'border-gold-500 text-sage-900' : 'border-transparent'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 overflow-hidden border-t border-sage-100 bg-cream px-6 py-4 text-sm font-medium text-sage-700 sm:hidden"
          >
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  href={link.to}
                  onClick={() => setOpen(false)}
                  className={isLinkActive(pathname, link.to) ? 'text-sage-900' : ''}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
