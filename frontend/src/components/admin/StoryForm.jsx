'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { uploadImage } from '../../api/client.js';

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

const inputClasses =
  'mt-1 w-full rounded-lg border border-sage-200 px-4 py-2 text-sm focus:border-sage-500 focus:outline-none';

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
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl2 bg-white p-8 shadow-soft">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-sage-700">Name</label>
          <input id="name" name="name" required value={form.name} onChange={handleChange} className={inputClasses} />
        </div>
        <div>
          <label htmlFor="state" className="text-sm font-medium text-sage-700">State</label>
          <input id="state" name="state" value={form.state} onChange={handleChange} className={inputClasses} />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-sage-700">Photo</label>
        <div className="mt-1 flex items-center gap-4">
          {form.photoUrl ? (
            <img
              src={form.photoUrl}
              alt="Story preview"
              className="h-16 w-16 flex-shrink-0 rounded-full object-cover ring-1 ring-gold-400/30"
            />
          ) : (
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-sand text-[10px] uppercase text-sage-400 ring-1 ring-gold-400/30">
              No photo
            </div>
          )}

          <label className="cursor-pointer rounded-full border border-sage-600 px-4 py-2 text-xs font-medium uppercase tracking-wide text-sage-700 transition-colors hover:bg-sage-50">
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

        {uploadError && <p className="mt-2 text-xs text-red-600">{uploadError}</p>}

        <input
          id="photoUrl"
          name="photoUrl"
          placeholder="or paste an image URL"
          value={form.photoUrl}
          onChange={handleChange}
          className={`${inputClasses} mt-3`}
        />
      </div>

      <div>
        <label htmlFor="before" className="text-sm font-medium text-sage-700">Before</label>
        <textarea
          id="before"
          name="before"
          rows="2"
          required
          value={form.before}
          onChange={handleChange}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="after" className="text-sm font-medium text-sage-700">After</label>
        <textarea
          id="after"
          name="after"
          rows="2"
          required
          value={form.after}
          onChange={handleChange}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="narrative" className="text-sm font-medium text-sage-700">Narrative</label>
        <textarea
          id="narrative"
          name="narrative"
          rows="4"
          required
          value={form.narrative}
          onChange={handleChange}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="extended" className="text-sm font-medium text-sage-700">
          Extended (shown behind &ldquo;Read More&rdquo;)
        </label>
        <textarea
          id="extended"
          name="extended"
          rows="4"
          value={form.extended}
          onChange={handleChange}
          className={inputClasses}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting || uploading}
        className="inline-flex items-center justify-center rounded-full bg-sage-800 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-cream shadow-soft ring-1 ring-gold-400/40 transition-colors duration-300 hover:bg-sage-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}
