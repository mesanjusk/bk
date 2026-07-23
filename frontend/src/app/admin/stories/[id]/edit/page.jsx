'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminPageHeader from '../../../../../components/admin/ui/AdminPageHeader.jsx';
import AdminCard from '../../../../../components/admin/ui/AdminCard.jsx';
import StoryForm from '../../../../../components/admin/StoryForm.jsx';
import { useAuth } from '../../../../../context/AuthContext.jsx';
import { fetchStoryById, updateStory } from '../../../../../api/client.js';

export default function AdminStoryEditPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const router = useRouter();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchStoryById(id, token)
      .then(setStory)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, token]);

  async function handleSubmit(payload) {
    setSubmitting(true);
    setError('');
    try {
      await updateStory(id, payload, token);
      router.push('/admin/stories');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader title="Edit Story" backTo="/admin/stories" backLabel="Stories" />
      {loading ? (
        <AdminCard>
          <p className="text-center text-sm text-[#5f6368]">Loading…</p>
        </AdminCard>
      ) : !story ? (
        <AdminCard>
          <p className="text-center text-sm text-[#d93025]">{error || 'Story not found.'}</p>
        </AdminCard>
      ) : (
        <StoryForm
          initialStory={story}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
          submitting={submitting}
          error={error}
        />
      )}
    </div>
  );
}
