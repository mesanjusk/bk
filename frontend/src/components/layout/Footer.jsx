import Link from 'next/link';
import { site, contactInfo } from '../../data/siteContent.js';

const links = [
  { to: '/about', label: 'About' },
  { to: '/scholars', label: 'Scholars' },
  { to: '/contact', label: 'Get Involved' },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/[0.08] bg-canvas">
      <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10">
        <p className="font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Let&rsquo;s open the
          <br />
          next door together.
        </p>

        <div className="mt-16 grid gap-12 border-t border-ink/[0.08] pt-10 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/40">{site.name}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{site.tagline}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/40">Navigate</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {links.map((link) => (
                <li key={link.to}>
                  <Link href={link.to} className="link-underline hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/40">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>{contactInfo.email}</li>
              <li>{contactInfo.phone}</li>
              <li>{contactInfo.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-ink/[0.08] pt-6 text-xs text-ink/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <Link href="/admin/login" className="hover:text-ink/70">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
