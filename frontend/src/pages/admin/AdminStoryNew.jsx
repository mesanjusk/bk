import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../../components/ui/Section.jsx';
import StoryForm from '../../components/admin/StoryForm.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { createStory } from '../../api/client.js';

export default function AdminStoryNew() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(payload) {
    setSubmitting(true);
    setError('');
    try {
      await createStory(payload, token);
      navigate('/admin/stories');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Section maxWidth="max-w-2xl">
      <h1 className="text-3xl font-semibold text-sage-900">Add Story</h1>
      <div className="mt-10">
        <StoryForm onSubmit={handleSubmit} submitLabel="Add Story" submitting={submitting} error={error} />
      </div>
    </Section>
  );
}
