'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { site } from '../../data/siteContent.js';

const links = [
  { to: '/about', label: 'About' },
  { to: '/scholars', label: 'Scholars' },
  { to: '/census', label: 'Census' },
  { to: '/create', label: 'Create Poster' },
];

function isLinkActive(pathname, to) {
  return pathname === to || pathname.startsWith(`${to}/`);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
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
      className={`sticky top-0 z-50 transition-all duration-500 ease-luxury ${
        scrolled ? 'border-b border-ink/[0.06] bg-canvas/90 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6 md:px-10">
        <Link href="/" className="font-serif text-lg font-semibold tracking-tight text-ink">
          {site.name}
        </Link>

        <button
          className="text-ink sm:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>

        <div className="hidden items-center gap-10 sm:flex">
          <ul className="flex gap-9 text-[13px] font-medium uppercase tracking-[0.12em] text-ink/70">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  href={link.to}
                  className={`link-underline pb-0.5 transition-colors duration-200 hover:text-ink ${
                    isLinkActive(pathname, link.to) ? 'text-ink' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-sage-800 px-6 py-2.5 text-[13px] font-medium text-white transition-all duration-300 ease-luxury hover:shadow-lift"
          >
            Get Involved
          </Link>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 overflow-hidden border-t border-ink/[0.06] bg-canvas px-6 py-6 text-sm font-medium text-ink/70 sm:hidden"
          >
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  href={link.to}
                  onClick={() => setOpen(false)}
                  className={isLinkActive(pathname, link.to) ? 'text-ink' : ''}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" onClick={() => setOpen(false)} className="text-ink">
                Get Involved
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
