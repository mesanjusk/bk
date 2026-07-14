'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Section from '../../../../components/ui/Section.jsx';
import ScholarForm from '../../../../components/admin/ScholarForm.jsx';
import RequireAuth from '../../../../components/admin/RequireAuth.jsx';
import { useAuth } from '../../../../context/AuthContext.jsx';
import { createScholar } from '../../../../api/client.js';

function AdminScholarNew() {
  const { token } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(payload) {
    setSubmitting(true);
    setError('');
    try {
      await createScholar(payload, token);
      router.push('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Section maxWidth="max-w-2xl">
      <h1 className="text-3xl font-semibold text-sage-900">Add Scholar</h1>
      <div className="mt-10">
        <ScholarForm onSubmit={handleSubmit} submitLabel="Add Scholar" submitting={submitting} error={error} />
      </div>
    </Section>
  );
}

export default function AdminScholarNewPage() {
  return (
    <RequireAuth>
      <AdminScholarNew />
    </RequireAuth>
  );
}
