import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Section from '../../components/ui/Section.jsx';
import Button from '../../components/ui/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { fetchScholars, deleteScholar } from '../../api/client.js';

export default function AdminDashboard() {
  const { token, logout } = useAuth();
  const [scholars, setScholars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

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

  return (
    <Section maxWidth="max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold text-sage-900">Manage Scholars</h1>
        <div className="flex gap-3">
          <Button to="/admin/scholars/new">Add Scholar</Button>
          <Button variant="secondary" onClick={logout}>Log Out</Button>
        </div>
      </div>

      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

      <div className="mt-10 overflow-hidden rounded-xl2 bg-white shadow-soft">
        {loading ? (
          <p className="p-8 text-center text-sage-500">Loading scholars…</p>
        ) : scholars.length === 0 ? (
          <p className="p-8 text-center text-sage-500">No scholars recorded yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-sage-100 text-xs uppercase tracking-wide text-sage-500">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Year</th>
                <th className="px-6 py-4">State</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scholars.map((scholar) => (
                <tr key={scholar._id} className="border-b border-sage-100 last:border-none">
                  <td className="px-6 py-4 font-serif font-semibold text-sage-900">{scholar.name}</td>
                  <td className="px-6 py-4 text-sage-600">{scholar.year}</td>
                  <td className="px-6 py-4 text-sage-600">{scholar.state || '—'}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-4">
                      <Link
                        to={`/admin/scholars/${scholar._id}/edit`}
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
        )}
      </div>
    </Section>
  );
}
