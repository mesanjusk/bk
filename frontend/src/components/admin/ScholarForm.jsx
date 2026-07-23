'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { uploadImage } from '../../api/client.js';
import AdminCard from './ui/AdminCard.jsx';
import AdminButton from './ui/AdminButton.jsx';
import { fieldClasses } from './ui/AdminField.jsx';

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
    <form onSubmit={handleSubmit}>
      <AdminCard className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-[#3c4043]">Name</label>
            <input id="name" name="name" required value={form.name} onChange={handleChange} className={fieldClasses} />
          </div>
          <div>
            <label htmlFor="year" className="text-sm font-medium text-[#3c4043]">Year</label>
            <input
              id="year"
              name="year"
              type="number"
              required
              value={form.year}
              onChange={handleChange}
              className={fieldClasses}
            />
          </div>
          <div>
            <label htmlFor="state" className="text-sm font-medium text-[#3c4043]">State</label>
            <input id="state" name="state" value={form.state} onChange={handleChange} className={fieldClasses} />
          </div>
          <div>
            <label htmlFor="score" className="text-sm font-medium text-[#3c4043]">Score</label>
            <input
              id="score"
              name="score"
              placeholder="e.g. 94.2%"
              value={form.score}
              onChange={handleChange}
              className={fieldClasses}
            />
          </div>
          <div>
            <label htmlFor="category" className="text-sm font-medium text-[#3c4043]">Category</label>
            <input
              id="category"
              name="category"
              placeholder="e.g. XII Commerce State, CA, JEE, NEET"
              value={form.category}
              onChange={handleChange}
              className={fieldClasses}
            />
          </div>
          <div>
            <label htmlFor="order" className="text-sm font-medium text-[#3c4043]">Display order</label>
            <input
              id="order"
              name="order"
              type="number"
              placeholder="Lower shows first"
              value={form.order}
              onChange={handleChange}
              className={fieldClasses}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#3c4043]">Photo</label>
          <div className="mt-1.5 flex items-center gap-4">
            {form.photoUrl ? (
              <img
                src={form.photoUrl}
                alt="Scholar preview"
                className="h-16 w-16 flex-shrink-0 rounded object-cover ring-1 ring-[#dadce0]"
              />
            ) : (
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded bg-[#f1f3f4] text-[10px] uppercase text-[#80868b] ring-1 ring-[#dadce0]">
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
          <label htmlFor="description" className="text-sm font-medium text-[#3c4043]">
            Short description
          </label>
          <textarea
            id="description"
            name="description"
            rows="2"
            required
            value={form.description}
            onChange={handleChange}
            className={fieldClasses}
          />
        </div>

        <div>
          <label htmlFor="bio" className="text-sm font-medium text-[#3c4043]">Full bio</label>
          <textarea id="bio" name="bio" rows="4" value={form.bio} onChange={handleChange} className={fieldClasses} />
        </div>

        <div>
          <label htmlFor="achievements" className="text-sm font-medium text-[#3c4043]">
            Achievements (one per line)
          </label>
          <textarea
            id="achievements"
            name="achievements"
            rows="4"
            value={form.achievements}
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
