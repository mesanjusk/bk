'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Section from '../../../components/ui/Section.jsx';
import { useAuth } from '../../../context/AuthContext.jsx';

function AdminLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await login(username, password);
      router.replace(searchParams.get('from') || '/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Section maxWidth="max-w-md">
      <h1 className="text-center text-3xl font-semibold text-sage-900">Admin Login</h1>
      <form onSubmit={handleSubmit} className="mt-10 space-y-5 rounded-xl2 bg-white p-8 shadow-soft">
        <div>
          <label htmlFor="username" className="text-sm font-medium text-sage-700">Username</label>
          <input
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full rounded-lg border border-sage-200 px-4 py-2 text-sm focus:border-sage-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-sage-700">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-sage-200 px-4 py-2 text-sm focus:border-sage-500 focus:outline-none"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-sage-800 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-cream shadow-soft ring-1 ring-gold-400/40 transition-colors duration-300 hover:bg-sage-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </Section>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={null}>
      <AdminLoginForm />
    </Suspense>
  );
}
