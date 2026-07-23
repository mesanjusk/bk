'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { uploadImage } from '../../api/client.js';

const emptyForm = {
  name: '',
  year: '',
  state: '',
  score: '',
  category: '',
  order: '',
  photoUrl: '',
  description: '',
  bio: '',
  achievements: '',
};

function toFormValues(scholar) {
  if (!scholar) return emptyForm;
  return {
    name: scholar.name || '',
    year: scholar.year ?? '',
    state: scholar.state || '',
    score: scholar.score || '',
    category: scholar.category || '',
    order: scholar.order ?? '',
    photoUrl: scholar.photoUrl || '',
    description: scholar.description || '',
    bio: scholar.bio || '',
    achievements: (scholar.achievements || []).join('\n'),
  };
}

const inputClasses =
  'mt-1 w-full rounded-lg border border-sage-200 px-4 py-2 text-sm focus:border-sage-500 focus:outline-none';

export default function ScholarForm({ initialScholar, onSubmit, submitLabel = 'Save', submitting = false, error }) {
  const { token } = useAuth();
  const [form, setForm] = useState(() => toFormValues(initialScholar));
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
    onSubmit({
      name: form.name,
      year: Number(form.year),
      state: form.state,
      score: form.score,
      category: form.category,
      order: form.order === '' ? undefined : Number(form.order),
      photoUrl: form.photoUrl,
      description: form.description,
      bio: form.bio,
      achievements: form.achievements
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl2 bg-white p-8 shadow-soft">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-sage-700">Name</label>
          <input id="name" name="name" required value={form.name} onChange={handleChange} className={inputClasses} />
        </div>
        <div>
          <label htmlFor="year" className="text-sm font-medium text-sage-700">Year</label>
          <input
            id="year"
            name="year"
            type="number"
            required
            value={form.year}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="state" className="text-sm font-medium text-sage-700">State</label>
          <input id="state" name="state" value={form.state} onChange={handleChange} className={inputClasses} />
        </div>
        <div>
          <label htmlFor="score" className="text-sm font-medium text-sage-700">Score</label>
          <input
            id="score"
            name="score"
            placeholder="e.g. 94.2%"
            value={form.score}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="category" className="text-sm font-medium text-sage-700">Category</label>
          <input
            id="category"
            name="category"
            placeholder="e.g. XII Commerce State, CA, JEE, NEET"
            value={form.category}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="order" className="text-sm font-medium text-sage-700">Display order</label>
          <input
            id="order"
            name="order"
            type="number"
            placeholder="Lower shows first"
            value={form.order}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-sage-700">Photo</label>
        <div className="mt-1 flex items-center gap-4">
          {form.photoUrl ? (
            <img
              src={form.photoUrl}
              alt="Scholar preview"
              className="h-16 w-16 flex-shrink-0 rounded-sm object-cover ring-1 ring-gold-400/30"
            />
          ) : (
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-sm bg-sand text-[10px] uppercase text-sage-400 ring-1 ring-gold-400/30">
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
        <label htmlFor="description" className="text-sm font-medium text-sage-700">
          Short description
        </label>
        <textarea
          id="description"
          name="description"
          rows="2"
          required
          value={form.description}
          onChange={handleChange}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="bio" className="text-sm font-medium text-sage-700">Full bio</label>
        <textarea id="bio" name="bio" rows="4" value={form.bio} onChange={handleChange} className={inputClasses} />
      </div>

      <div>
        <label htmlFor="achievements" className="text-sm font-medium text-sage-700">
          Achievements (one per line)
        </label>
        <textarea
          id="achievements"
          name="achievements"
          rows="4"
          value={form.achievements}
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
