import { Link } from 'react-router-dom';
import { site, contactInfo } from '../../data/siteContent.js';

export default function Footer() {
  return (
    <footer className="border-t border-sage-100 bg-sand">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 sm:grid-cols-3">
        <div>
          <p className="font-serif text-lg font-semibold text-sage-800">{site.name}</p>
          <p className="mt-2 text-sm text-sage-600">{site.tagline}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-sage-800">Quick Links</p>
          <ul className="mt-3 space-y-2 text-sm text-sage-600">
            <li><Link to="/scholars" className="hover:text-sage-900">Scholars</Link></li>
            <li><Link to="/about" className="hover:text-sage-900">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-sage-900">Get Involved</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-sage-800">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-sage-600">
            <li>{contactInfo.email}</li>
            <li>{contactInfo.phone}</li>
            <li>{contactInfo.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sage-200 py-4 text-center text-xs text-sage-500">
        © {new Date().getFullYear()} {site.name}. All rights reserved.{' '}
        <Link to="/admin/login" className="text-sage-400 hover:text-sage-600">
          Admin
        </Link>
      </div>
    </footer>
  );
}
