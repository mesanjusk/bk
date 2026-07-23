'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminPageHeader from '../../../../components/admin/ui/AdminPageHeader.jsx';
import StoryForm from '../../../../components/admin/StoryForm.jsx';
import { useAuth } from '../../../../context/AuthContext.jsx';
import { createStory } from '../../../../api/client.js';

export default function AdminStoryNewPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(payload) {
    setSubmitting(true);
    setError('');
    try {
      await createStory(payload, token);
      router.push('/admin/stories');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader title="Add Story" backTo="/admin/stories" backLabel="Stories" />
      <StoryForm onSubmit={handleSubmit} submitLabel="Add Story" submitting={submitting} error={error} />
    </div>
  );
}
