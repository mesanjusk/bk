'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Section from '../../../../../components/ui/Section.jsx';
import ScholarForm from '../../../../../components/admin/ScholarForm.jsx';
import RequireAuth from '../../../../../components/admin/RequireAuth.jsx';
import { useAuth } from '../../../../../context/AuthContext.jsx';
import { fetchScholarById, updateScholar } from '../../../../../api/client.js';

function AdminScholarEdit() {
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
    <Section maxWidth="max-w-2xl">
      <h1 className="text-3xl font-semibold text-sage-900">Edit Scholar</h1>
      <div className="mt-10">
        {loading ? (
          <p className="text-center text-sage-500">Loading…</p>
        ) : !scholar ? (
          <p className="text-center text-red-600">{error || 'Scholar not found.'}</p>
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
    </Section>
  );
}

export default function AdminScholarEditPage() {
  return (
    <RequireAuth>
      <AdminScholarEdit />
    </RequireAuth>
  );
}
