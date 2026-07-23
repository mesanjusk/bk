'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { fetchScholarOptions, addScholarOption, uploadImage, createScholar } from '../../api/client.js';
import OptionSelect from './OptionSelect.jsx';
import AdminCard from './ui/AdminCard.jsx';
import AdminButton from './ui/AdminButton.jsx';
import { fieldClasses } from './ui/AdminField.jsx';

const emptyForm = { name: '', year: '', category: '', score: '', photoUrl: '' };

export default function QuickAddScholarForm({ onDone }) {
  const { token } = useAuth();
  const [step, setStep] = useState('form');
  const [form, setForm] = useState(emptyForm);
  const [options, setOptions] = useState({ years: [], categories: [] });
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchScholarOptions()
      .then(setOptions)
      .catch(() => {});
  }, []);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleAddYear(value) {
    const { years } = await addScholarOption('year', value, token);
    setOptions((prev) => ({ ...prev, years }));
    return Number(value);
  }

  async function handleAddCategory(value) {
    const { categories } = await addScholarOption('category', value, token);
    setOptions((prev) => ({ ...prev, categories }));
    return value;
  }

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const { url } = await uploadImage(file, token);
      handleChange('photoUrl', url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  function handlePreview(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.year) {
      setError('Name and year are required.');
      return;
    }
    setError('');
    setStep('preview');
  }

  async function handleConfirm() {
    setSubmitting(true);
    setError('');
    try {
      await createScholar(
        {
          name: form.name.trim(),
          year: Number(form.year),
          category: form.category,
          score: form.score,
          photoUrl: form.photoUrl,
        },
        token
      );
      onDone();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (step === 'preview') {
    return (
      <AdminCard className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#5f6368]">Preview</p>

        <div className="flex items-center gap-5">
          {form.photoUrl ? (
            <img
              src={form.photoUrl}
              alt={form.name}
              className="h-24 w-24 flex-shrink-0 rounded object-cover ring-1 ring-[#dadce0]"
            />
          ) : (
            <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded bg-[#f1f3f4] text-[10px] uppercase text-[#80868b] ring-1 ring-[#dadce0]">
              No photo
            </div>
          )}
          <div>
            <p className="text-xl font-medium text-[#202124]">{form.name}</p>
            <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[#5f6368]">
              <div className="flex gap-1">
                <dt className="font-medium text-[#3c4043]">Year</dt>
                <dd>{form.year}</dd>
              </div>
              {form.category && (
                <div className="flex gap-1">
                  <dt className="font-medium text-[#3c4043]">Category</dt>
                  <dd>{form.category}</dd>
                </div>
              )}
              {form.score && (
                <div className="flex gap-1">
                  <dt className="font-medium text-[#3c4043]">Percentage</dt>
                  <dd>{form.score}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {error && <p className="text-sm text-[#d93025]">{error}</p>}

        <div className="flex gap-3">
          <AdminButton variant="secondary" onClick={() => setStep('form')} disabled={submitting}>
            Edit
          </AdminButton>
          <AdminButton onClick={handleConfirm} disabled={submitting}>
            {submitting ? 'Saving…' : 'Confirm & Add Scholar'}
          </AdminButton>
        </div>
      </AdminCard>
    );
  }

  return (
    <form onSubmit={handlePreview}>
      <AdminCard className="space-y-5">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-[#3c4043]">
            Name
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(event) => handleChange('name', event.target.value)}
            className={fieldClasses}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <OptionSelect
            id="year"
            label="Year"
            value={form.year}
            onChange={(value) => handleChange('year', value)}
            options={options.years}
            onAddOption={handleAddYear}
            inputType="number"
          />
          <OptionSelect
            id="category"
            label="Category"
            value={form.category}
            onChange={(value) => handleChange('category', value)}
            options={options.categories}
            onAddOption={handleAddCategory}
            inputType="text"
          />
        </div>

        <div>
          <label htmlFor="score" className="text-sm font-medium text-[#3c4043]">
            Percentage
          </label>
          <input
            id="score"
            placeholder="e.g. 94.2%"
            value={form.score}
            onChange={(event) => handleChange('score', event.target.value)}
            className={fieldClasses}
          />
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
        </div>

        {error && <p className="text-sm text-[#d93025]">{error}</p>}

        <AdminButton type="submit" disabled={uploading}>
          Preview
        </AdminButton>
      </AdminCard>
    </form>
  );
}
