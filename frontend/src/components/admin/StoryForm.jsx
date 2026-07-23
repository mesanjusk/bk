'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { uploadImage } from '../../api/client.js';
import AdminCard from './ui/AdminCard.jsx';
import AdminButton from './ui/AdminButton.jsx';
import { fieldClasses } from './ui/AdminField.jsx';

const emptyForm = {
  name: '',
  state: '',
  photoUrl: '',
  before: '',
  after: '',
  narrative: '',
  extended: '',
};

function toFormValues(story) {
  if (!story) return emptyForm;
  return {
    name: story.name || '',
    state: story.state || '',
    photoUrl: story.photoUrl || '',
    before: story.before || '',
    after: story.after || '',
    narrative: story.narrative || '',
    extended: story.extended || '',
  };
}

export default function StoryForm({ initialStory, onSubmit, submitLabel = 'Save', submitting = false, error }) {
  const { token } = useAuth();
  const [form, setForm] = useState(() => toFormValues(initialStory));
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setUploading(true);
    setUploadError('');
    try {
      const { url } = await uploadImage(file, token);
      setForm((prev) => ({ ...prev, photoUrl: url }));
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <AdminCard className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-[#3c4043]">Name</label>
            <input id="name" name="name" required value={form.name} onChange={handleChange} className={fieldClasses} />
          </div>
          <div>
            <label htmlFor="state" className="text-sm font-medium text-[#3c4043]">State</label>
            <input id="state" name="state" value={form.state} onChange={handleChange} className={fieldClasses} />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#3c4043]">Photo</label>
          <div className="mt-1.5 flex items-center gap-4">
            {form.photoUrl ? (
              <img
                src={form.photoUrl}
                alt="Story preview"
                className="h-16 w-16 flex-shrink-0 rounded-full object-cover ring-1 ring-[#dadce0]"
              />
            ) : (
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[#f1f3f4] text-[10px] uppercase text-[#80868b] ring-1 ring-[#dadce0]">
                No photo
              </div>
            )}

            <label className="cursor-pointer rounded-md border border-[#dadce0] bg-white px-4 py-2 text-sm font-medium text-[#3c4043] transition-colors hover:bg-[#f8f9fa]">
              {uploading ? 'Uploading…' : 'Upload Photo'}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          {uploadError && <p className="mt-2 text-sm text-[#d93025]">{uploadError}</p>}

          <input
            id="photoUrl"
            name="photoUrl"
            placeholder="or paste an image URL"
            value={form.photoUrl}
            onChange={handleChange}
            className={`${fieldClasses} mt-3`}
          />
        </div>

        <div>
          <label htmlFor="before" className="text-sm font-medium text-[#3c4043]">Before</label>
          <textarea
            id="before"
            name="before"
            rows="2"
            required
            value={form.before}
            onChange={handleChange}
            className={fieldClasses}
          />
        </div>

        <div>
          <label htmlFor="after" className="text-sm font-medium text-[#3c4043]">After</label>
          <textarea
            id="after"
            name="after"
            rows="2"
            required
            value={form.after}
            onChange={handleChange}
            className={fieldClasses}
          />
        </div>

        <div>
          <label htmlFor="narrative" className="text-sm font-medium text-[#3c4043]">Narrative</label>
          <textarea
            id="narrative"
            name="narrative"
            rows="4"
            required
            value={form.narrative}
            onChange={handleChange}
            className={fieldClasses}
          />
        </div>

        <div>
          <label htmlFor="extended" className="text-sm font-medium text-[#3c4043]">
            Extended (shown behind &ldquo;Read More&rdquo;)
          </label>
          <textarea
            id="extended"
            name="extended"
            rows="4"
            value={form.extended}
            onChange={handleChange}
            className={fieldClasses}
          />
        </div>

        {error && <p className="text-sm text-[#d93025]">{error}</p>}

        <AdminButton type="submit" disabled={submitting || uploading}>
          {submitting ? 'Saving…' : submitLabel}
        </AdminButton>
      </AdminCard>
    </form>
  );
}
