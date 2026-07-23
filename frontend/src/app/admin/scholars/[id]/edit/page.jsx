'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminPageHeader from '../../../../../components/admin/ui/AdminPageHeader.jsx';
import AdminCard from '../../../../../components/admin/ui/AdminCard.jsx';
import ScholarForm from '../../../../../components/admin/ScholarForm.jsx';
import { useAuth } from '../../../../../context/AuthContext.jsx';
import { fetchScholarById, updateScholar } from '../../../../../api/client.js';

export default function AdminScholarEditPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const router = useRouter();
  const [scholar, setScholar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchScholarById(id)
      .then(setScholar)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(payload) {
    setSubmitting(true);
    setError('');
    try {
      await updateScholar(id, payload, token);
      router.push('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader title="Edit Scholar" backTo="/admin" backLabel="All Scholars" />
      {loading ? (
        <AdminCard>
          <p className="text-center text-sm text-[#5f6368]">Loading…</p>
        </AdminCard>
      ) : !scholar ? (
        <AdminCard>
          <p className="text-center text-sm text-[#d93025]">{error || 'Scholar not found.'}</p>
        </AdminCard>
      ) : (
        <ScholarForm
          initialScholar={scholar}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
          submitting={submitting}
          error={error}
        />
      )}
    </div>
  );
}
