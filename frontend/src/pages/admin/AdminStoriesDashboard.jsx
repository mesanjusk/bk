import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Section from '../../components/ui/Section.jsx';
import Button from '../../components/ui/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { fetchStories, deleteStory } from '../../api/client.js';

export default function AdminStoriesDashboard() {
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
    <Section maxWidth="max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold text-sage-900">Manage Stories</h1>
        <div className="flex gap-3">
          <Button to="/admin/stories/new">Add Story</Button>
          <Button to="/admin" variant="secondary">Scholars</Button>
          <Button to="/admin/settings" variant="secondary">Site Settings</Button>
        </div>
      </div>

      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

      <div className="mt-10 overflow-hidden rounded-xl2 bg-white shadow-soft">
        {loading ? (
          <p className="p-8 text-center text-sage-500">Loading stories…</p>
        ) : stories.length === 0 ? (
          <p className="p-8 text-center text-sage-500">No stories recorded yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-sage-100 text-xs uppercase tracking-wide text-sage-500">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">State</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stories.map((story) => (
                <tr key={story._id} className="border-b border-sage-100 last:border-none">
                  <td className="px-6 py-4 font-serif font-semibold text-sage-900">{story.name}</td>
                  <td className="px-6 py-4 text-sage-600">{story.state || '—'}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-4">
                      <Link
                        to={`/admin/stories/${story._id}/edit`}
                        className="text-xs font-medium uppercase tracking-wide text-sage-700 hover:text-sage-900"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(story)}
                        disabled={deletingId === story._id}
                        className="text-xs font-medium uppercase tracking-wide text-maroon-500 hover:text-maroon-700 disabled:opacity-50"
                      >
                        {deletingId === story._id ? 'Removing…' : 'Remove'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Section>
  );
}
