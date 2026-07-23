'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Section from '../../components/ui/Section.jsx';
import Button from '../../components/ui/Button.jsx';
import RequireAuth from '../../components/admin/RequireAuth.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { fetchScholars, deleteScholar, updateScholar } from '../../api/client.js';

function groupByYear(scholars) {
  const groups = new Map();
  for (const scholar of scholars) {
    const key = scholar.year;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(scholar);
  }
  return [...groups.entries()].sort((a, b) => b[0] - a[0]);
}

function AdminDashboard() {
  const { token, logout } = useAuth();
  const [scholars, setScholars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [reorderingId, setReorderingId] = useState(null);

  useEffect(() => {
    loadScholars();
  }, []);

  function loadScholars() {
    setLoading(true);
    fetchScholars()
      .then(setScholars)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  async function handleDelete(scholar) {
    if (!window.confirm(`Remove ${scholar.name} from the ${scholar.year} register?`)) return;

    setDeletingId(scholar._id);
    try {
      await deleteScholar(scholar._id, token);
      setScholars((prev) => prev.filter((s) => s._id !== scholar._id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  async function handleReorder(yearGroup, index, direction) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= yearGroup.length) return;

    const a = yearGroup[index];
    const b = yearGroup[targetIndex];
    setReorderingId(a._id);
    try {
      const [updatedA, updatedB] = await Promise.all([
        updateScholar(a._id, { ...a, order: b.order }, token),
        updateScholar(b._id, { ...b, order: a.order }, token),
      ]);
      setScholars((prev) =>
        prev.map((s) => {
          if (s._id === updatedA._id) return updatedA;
          if (s._id === updatedB._id) return updatedB;
          return s;
        })
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setReorderingId(null);
    }
  }

  return (
    <Section maxWidth="max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold text-sage-900">Manage Scholars</h1>
        <div className="flex flex-wrap gap-3">
          <Button to="/admin/scholars/new">Add Scholar</Button>
          <Button to="/admin/scholars/bulk" variant="secondary">Bulk Upload</Button>
          <Button to="/admin/stories" variant="secondary">Stories</Button>
          <Button to="/admin/settings" variant="secondary">Site Settings</Button>
          <Button variant="secondary" onClick={logout}>Log Out</Button>
        </div>
      </div>

      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

      <div className="mt-10 space-y-10">
        {loading ? (
          <p className="p-8 text-center text-sage-500">Loading scholars…</p>
        ) : scholars.length === 0 ? (
          <p className="p-8 text-center text-sage-500">No scholars recorded yet.</p>
        ) : (
          groupByYear(scholars).map(([year, yearGroup]) => (
            <div key={year} className="overflow-hidden rounded-xl2 bg-white shadow-soft">
              <h2 className="border-b border-sage-100 px-6 py-4 font-serif text-lg font-semibold text-sage-900">
                {year}
              </h2>
              <table className="w-full text-left text-sm">
                <thead className="border-b border-sage-100 text-xs uppercase tracking-wide text-sage-500">
                  <tr>
                    <th className="px-6 py-4">Order</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Percentage</th>
                    <th className="px-6 py-4">Photo</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {yearGroup.map((scholar, index) => (
                    <tr key={scholar._id} className="border-b border-sage-100 last:border-none">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleReorder(yearGroup, index, -1)}
                            disabled={index === 0 || reorderingId === scholar._id}
                            className="text-sage-500 hover:text-sage-900 disabled:opacity-30"
                            aria-label={`Move ${scholar.name} up`}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReorder(yearGroup, index, 1)}
                            disabled={index === yearGroup.length - 1 || reorderingId === scholar._id}
                            className="text-sage-500 hover:text-sage-900 disabled:opacity-30"
                            aria-label={`Move ${scholar.name} down`}
                          >
                            ↓
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-serif font-semibold text-sage-900">{scholar.name}</td>
                      <td className="px-6 py-4 text-sage-600">{scholar.category || '—'}</td>
                      <td className="px-6 py-4 text-sage-600">{scholar.score || '—'}</td>
                      <td className="px-6 py-4">
                        {scholar.photoUrl ? (
                          <img
                            src={scholar.photoUrl}
                            alt={scholar.name}
                            className="h-10 w-10 rounded-sm object-cover ring-1 ring-gold-400/30"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-sand text-[9px] uppercase text-sage-400 ring-1 ring-gold-400/30">
                            None
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-4">
                          <Link
                            href={`/admin/scholars/${scholar._id}/edit`}
                            className="text-xs font-medium uppercase tracking-wide text-sage-700 hover:text-sage-900"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(scholar)}
                            disabled={deletingId === scholar._id}
                            className="text-xs font-medium uppercase tracking-wide text-maroon-500 hover:text-maroon-700 disabled:opacity-50"
                          >
                            {deletingId === scholar._id ? 'Removing…' : 'Remove'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </Section>
  );
}

export default function AdminPage() {
  return (
    <RequireAuth>
      <AdminDashboard />
    </RequireAuth>
  );
}
