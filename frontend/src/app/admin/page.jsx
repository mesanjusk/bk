'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminPageHeader from '../../components/admin/ui/AdminPageHeader.jsx';
import AdminButton from '../../components/admin/ui/AdminButton.jsx';
import AdminCard from '../../components/admin/ui/AdminCard.jsx';
import { PlusIcon, UploadIcon, ArrowUpIcon, ArrowDownIcon } from '../../components/admin/ui/icons.jsx';
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

export default function AdminPage() {
  const { token } = useAuth();
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
    <div className="mx-auto max-w-6xl">
      <AdminPageHeader
        title="Scholars"
        description="Manage every scholar record shown on the public site, grouped by year."
        actions={
          <>
            <AdminButton to="/admin/scholars/bulk" variant="secondary" icon={<UploadIcon className="h-4 w-4" />}>
              Bulk Upload
            </AdminButton>
            <AdminButton to="/admin/scholars/new" icon={<PlusIcon className="h-4 w-4" />}>
              Add Scholar
            </AdminButton>
          </>
        }
      />

      {error && (
        <div className="mb-6 rounded-md border border-[#fad2cf] bg-[#fce8e6] px-4 py-3 text-sm text-[#d93025]">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {loading ? (
          <AdminCard>
            <p className="text-center text-sm text-[#5f6368]">Loading scholars…</p>
          </AdminCard>
        ) : scholars.length === 0 ? (
          <AdminCard>
            <p className="text-center text-sm text-[#5f6368]">No scholars recorded yet.</p>
          </AdminCard>
        ) : (
          groupByYear(scholars).map(([year, yearGroup]) => (
            <AdminCard key={year} padded={false} className="overflow-hidden">
              <h2 className="border-b border-[#dadce0] bg-[#f8f9fa] px-6 py-3 text-sm font-medium text-[#202124]">
                {year}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-[#dadce0] text-xs font-medium text-[#5f6368]">
                    <tr>
                      <th className="px-6 py-3 font-medium">Order</th>
                      <th className="px-6 py-3 font-medium">Name</th>
                      <th className="px-6 py-3 font-medium">Category</th>
                      <th className="px-6 py-3 font-medium">Percentage</th>
                      <th className="px-6 py-3 font-medium">Photo</th>
                      <th className="px-6 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearGroup.map((scholar, index) => (
                      <tr key={scholar._id} className="border-b border-[#e8eaed] last:border-none hover:bg-[#f8f9fa]">
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleReorder(yearGroup, index, -1)}
                              disabled={index === 0 || reorderingId === scholar._id}
                              className="rounded p-1 text-[#5f6368] hover:bg-[#e8eaed] disabled:opacity-30"
                              aria-label={`Move ${scholar.name} up`}
                            >
                              <ArrowUpIcon className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleReorder(yearGroup, index, 1)}
                              disabled={index === yearGroup.length - 1 || reorderingId === scholar._id}
                              className="rounded p-1 text-[#5f6368] hover:bg-[#e8eaed] disabled:opacity-30"
                              aria-label={`Move ${scholar.name} down`}
                            >
                              <ArrowDownIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-3 font-medium text-[#202124]">{scholar.name}</td>
                        <td className="px-6 py-3 text-[#5f6368]">{scholar.category || '—'}</td>
                        <td className="px-6 py-3 text-[#5f6368]">{scholar.score || '—'}</td>
                        <td className="px-6 py-3">
                          {scholar.photoUrl ? (
                            <img
                              src={scholar.photoUrl}
                              alt={scholar.name}
                              className="h-9 w-9 rounded object-cover ring-1 ring-[#dadce0]"
                            />
                          ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded bg-[#f1f3f4] text-[9px] uppercase text-[#80868b] ring-1 ring-[#dadce0]">
                              None
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-3 text-right">
                          <div className="flex justify-end gap-4">
                            <Link
                              href={`/admin/scholars/${scholar._id}/edit`}
                              className="text-sm font-medium text-[#1a73e8] hover:underline"
                            >
                              Edit
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDelete(scholar)}
                              disabled={deletingId === scholar._id}
                              className="text-sm font-medium text-[#d93025] hover:underline disabled:opacity-50"
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
            </AdminCard>
          ))
        )}
      </div>
    </div>
  );
}
