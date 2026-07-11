import { useState } from 'react';

const emptyForm = {
  name: '',
  year: '',
  state: '',
  score: '',
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
    photoUrl: scholar.photoUrl || '',
    description: scholar.description || '',
    bio: scholar.bio || '',
    achievements: (scholar.achievements || []).join('\n'),
  };
}

const inputClasses =
  'mt-1 w-full rounded-lg border border-sage-200 px-4 py-2 text-sm focus:border-sage-500 focus:outline-none';

export default function ScholarForm({ initialScholar, onSubmit, submitLabel = 'Save', submitting = false, error }) {
  const [form, setForm] = useState(() => toFormValues(initialScholar));

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      name: form.name,
      year: Number(form.year),
      state: form.state,
      score: form.score,
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
      </div>

      <div>
        <label htmlFor="photoUrl" className="text-sm font-medium text-sage-700">Photo URL</label>
        <input
          id="photoUrl"
          name="photoUrl"
          placeholder="https://…"
          value={form.photoUrl}
          onChange={handleChange}
          className={inputClasses}
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
        disabled={submitting}
        className="inline-flex items-center justify-center rounded-full bg-sage-800 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-cream shadow-soft ring-1 ring-gold-400/40 transition-colors duration-300 hover:bg-sage-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}
