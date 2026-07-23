'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext.jsx';
import { fieldClasses } from '../../../components/admin/ui/AdminField.jsx';

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
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1a73e8] text-lg font-semibold text-white">
            BK
          </span>
          <h1 className="mt-4 text-2xl font-normal text-[#202124]">Admin Console</h1>
          <p className="mt-1 text-sm text-[#5f6368]">Sign in to manage Badhte Kadam</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border border-[#dadce0] bg-white p-8">
          <div>
            <label htmlFor="username" className="text-sm font-medium text-[#3c4043]">
              Username
            </label>
            <input
              id="username"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={fieldClasses}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-[#3c4043]">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldClasses}
            />
          </div>

          {error && (
            <div className="rounded-md border border-[#fad2cf] bg-[#fce8e6] px-3 py-2 text-sm text-[#d93025]">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-[#1a73e8] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1765cc] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={null}>
      <AdminLoginForm />
    </Suspense>
  );
}
