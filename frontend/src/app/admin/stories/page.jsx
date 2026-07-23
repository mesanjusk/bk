'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminPageHeader from '../../../components/admin/ui/AdminPageHeader.jsx';
import AdminButton from '../../../components/admin/ui/AdminButton.jsx';
import AdminCard from '../../../components/admin/ui/AdminCard.jsx';
import { PlusIcon } from '../../../components/admin/ui/icons.jsx';
import { useAuth } from '../../../context/AuthContext.jsx';
import { fetchStories, deleteStory } from '../../../api/client.js';

export default function AdminStoriesPage() {
  const { token } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadStories();
  }, []);

  function loadStories() {
    setLoading(true);
    fetchStories()
      .then(setStories)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  async function handleDelete(story) {
    if (!window.confirm(`Remove ${story.name}'s story?`)) return;

    setDeletingId(story._id);
    try {
      await deleteStory(story._id, token);
      setStories((prev) => prev.filter((s) => s._id !== story._id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <AdminPageHeader
        title="Stories"
        description="Testimonials shown on the homepage."
        actions={
          <AdminButton to="/admin/stories/new" icon={<PlusIcon className="h-4 w-4" />}>
            Add Story
          </AdminButton>
        }
      />

      {error && (
        <div className="mb-6 rounded-md border border-[#fad2cf] bg-[#fce8e6] px-4 py-3 text-sm text-[#d93025]">
          {error}
        </div>
      )}

      <AdminCard padded={false} className="overflow-hidden">
        {loading ? (
          <p className="p-8 text-center text-sm text-[#5f6368]">Loading stories…</p>
        ) : stories.length === 0 ? (
          <p className="p-8 text-center text-sm text-[#5f6368]">No stories recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#dadce0] text-xs font-medium text-[#5f6368]">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">State</th>
                  <th className="px-6 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stories.map((story) => (
                  <tr key={story._id} className="border-b border-[#e8eaed] last:border-none hover:bg-[#f8f9fa]">
                    <td className="px-6 py-3 font-medium text-[#202124]">{story.name}</td>
                    <td className="px-6 py-3 text-[#5f6368]">{story.state || '—'}</td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end gap-4">
                        <Link
                          href={`/admin/stories/${story._id}/edit`}
                          className="text-sm font-medium text-[#1a73e8] hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(story)}
                          disabled={deletingId === story._id}
                          className="text-sm font-medium text-[#d93025] hover:underline disabled:opacity-50"
                        >
                          {deletingId === story._id ? 'Removing…' : 'Remove'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>
    </div>
  );
}
