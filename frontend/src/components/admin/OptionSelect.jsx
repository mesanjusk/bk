'use client';

import { useState } from 'react';

const ADD_NEW = '__add_new__';

const inputClasses =
  'mt-1 w-full rounded-lg border border-sage-200 px-4 py-2 text-sm focus:border-sage-500 focus:outline-none';

// A <select> populated from `options`, plus a "+ Add new" entry that reveals
// an inline input; the new value is persisted via onAddOption and selected.
export default function OptionSelect({ id, label, value, onChange, options, onAddOption, inputType = 'text' }) {
  const [adding, setAdding] = useState(false);
  const [newValue, setNewValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const allOptions = value !== '' && value !== undefined && !options.includes(value) ? [...options, value] : options;

  async function handleAdd() {
    if (!newValue.trim()) return;
    setSaving(true);
    setError('');
    try {
      const added = await onAddOption(newValue.trim());
      onChange(added);
      setAdding(false);
      setNewValue('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (adding) {
    return (
      <div>
        <label className="text-sm font-medium text-sage-700">{label}</label>
        <div className="mt-1 flex gap-2">
          <input
            autoFocus
            type={inputType}
            value={newValue}
            onChange={(event) => setNewValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleAdd();
              }
            }}
            placeholder={`New ${label.toLowerCase()}`}
            className={inputClasses}
          />
          <button
            type="button"
            onClick={handleAdd}
            disabled={saving}
            className="mt-1 rounded-lg bg-sage-800 px-4 py-2 text-xs font-medium uppercase tracking-wide text-cream disabled:opacity-60"
          >
            {saving ? 'Adding…' : 'Add'}
          </button>
          <button
            type="button"
            onClick={() => {
              setAdding(false);
              setNewValue('');
              setError('');
            }}
            className="mt-1 rounded-lg border border-sage-200 px-4 py-2 text-xs font-medium uppercase tracking-wide text-sage-600"
          >
            Cancel
          </button>
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-sage-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => {
          if (event.target.value === ADD_NEW) {
            setAdding(true);
            return;
          }
          onChange(event.target.value);
        }}
        className={inputClasses}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {allOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        <option value={ADD_NEW}>+ Add new {label.toLowerCase()}…</option>
      </select>
    </div>
  );
}
