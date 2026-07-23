'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { fetchScholarOptions, addScholarOption, uploadImage, createScholar } from '../../api/client.js';
import OptionSelect from './OptionSelect.jsx';

const inputClasses =
  'mt-1 w-full rounded-lg border border-sage-200 px-4 py-2 text-sm focus:border-sage-500 focus:outline-none';

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
      <div className="space-y-5 rounded-xl2 bg-white p-8 shadow-soft">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-sage-500">Preview</p>

        <div className="flex items-center gap-5">
          {form.photoUrl ? (
            <img
              src={form.photoUrl}
              alt={form.name}
              className="h-24 w-24 flex-shrink-0 rounded-sm object-cover ring-1 ring-gold-400/30"
            />
          ) : (
            <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-sm bg-sand text-[10px] uppercase text-sage-400 ring-1 ring-gold-400/30">
              No photo
            </div>
          )}
          <div>
            <p className="font-serif text-2xl font-semibold text-sage-900">{form.name}</p>
            <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs uppercase tracking-wide text-sage-500">
              <div className="flex gap-1">
                <dt className="font-medium">Year</dt>
                <dd className="normal-case tracking-normal text-sage-700">{form.year}</dd>
              </div>
              {form.category && (
                <div className="flex gap-1">
                  <dt className="font-medium">Category</dt>
                  <dd className="normal-case tracking-normal text-sage-700">{form.category}</dd>
                </div>
              )}
              {form.score && (
                <div className="flex gap-1">
                  <dt className="font-medium">Percentage</dt>
                  <dd className="normal-case tracking-normal text-sage-700">{form.score}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setStep('form')}
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-full border border-sage-600 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-sage-700 transition-colors hover:bg-sage-50 disabled:opacity-60"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-full bg-sage-800 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-cream shadow-soft ring-1 ring-gold-400/40 transition-colors duration-300 hover:bg-sage-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Saving…' : 'Confirm & Add Scholar'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handlePreview} className="space-y-5 rounded-xl2 bg-white p-8 shadow-soft">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-sage-700">
          Name
        </label>
        <input
          id="name"
          required
          value={form.name}
          onChange={(event) => handleChange('name', event.target.value)}
          className={inputClasses}
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
        <label htmlFor="score" className="text-sm font-medium text-sage-700">
          Percentage
        </label>
        <input
          id="score"
          placeholder="e.g. 94.2%"
          value={form.score}
          onChange={(event) => handleChange('score', event.target.value)}
          className={inputClasses}
        />
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
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={uploading}
        className="inline-flex items-center justify-center rounded-full bg-sage-800 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-cream shadow-soft ring-1 ring-gold-400/40 transition-colors duration-300 hover:bg-sage-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Preview
      </button>
    </form>
  );
}
