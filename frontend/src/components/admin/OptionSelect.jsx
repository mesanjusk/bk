'use client';

import { useState } from 'react';
import { fieldClasses } from './ui/AdminField.jsx';

const ADD_NEW = '__add_new__';

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
        <label className="text-sm font-medium text-[#3c4043]">{label}</label>
        <div className="mt-1.5 flex gap-2">
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
            className={fieldClasses}
          />
          <button
            type="button"
            onClick={handleAdd}
            disabled={saving}
            className="rounded-md bg-[#1a73e8] px-4 py-2 text-sm font-medium text-white hover:bg-[#1765cc] disabled:opacity-60"
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
            className="rounded-md border border-[#dadce0] px-4 py-2 text-sm font-medium text-[#3c4043] hover:bg-[#f8f9fa]"
          >
            Cancel
          </button>
        </div>
        {error && <p className="mt-1 text-sm text-[#d93025]">{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-[#3c4043]">
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
        className={fieldClasses}
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
