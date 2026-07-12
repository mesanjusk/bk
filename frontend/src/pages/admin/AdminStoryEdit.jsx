import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Section from '../../components/ui/Section.jsx';
import StoryForm from '../../components/admin/StoryForm.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { fetchStoryById, updateStory } from '../../api/client.js';

export default function AdminStoryEdit() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
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
      navigate('/admin/stories');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Section maxWidth="max-w-2xl">
      <h1 className="text-3xl font-semibold text-sage-900">Edit Story</h1>
      <div className="mt-10">
        {loading ? (
          <p className="text-center text-sage-500">Loading…</p>
        ) : !story ? (
          <p className="text-center text-red-600">{error || 'Story not found.'}</p>
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
    </Section>
  );
}
