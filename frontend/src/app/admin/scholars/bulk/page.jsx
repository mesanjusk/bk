'use client';

import { useState } from 'react';
import Link from 'next/link';
import Section from '../../../../components/ui/Section.jsx';
import Button from '../../../../components/ui/Button.jsx';
import RequireAuth from '../../../../components/admin/RequireAuth.jsx';
import { useAuth } from '../../../../context/AuthContext.jsx';
import { uploadImage, createScholar } from '../../../../api/client.js';
import { parseScholarFilename } from '../../../../lib/parseScholarFilename.js';

const inputClasses =
  'mt-1 w-full rounded-lg border border-sage-200 px-4 py-2 text-sm focus:border-sage-500 focus:outline-none';

let nextRowId = 0;

function AdminScholarsBulk() {
  const { token } = useAuth();
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('');
  const [descriptionTemplate, setDescriptionTemplate] = useState('');
  const [rows, setRows] = useState([]);
  const [running, setRunning] = useState(false);

  function handleFilesSelected(event) {
    const files = Array.from(event.target.files || []);
    event.target.value = '';
    if (files.length === 0) return;

    const newRows = files.map((file) => {
      const { name, score } = parseScholarFilename(file.name);
      return {
        id: `row-${nextRowId++}`,
        file,
        previewUrl: URL.createObjectURL(file),
        name,
        score,
        status: 'pending',
        errorMessage: '',
      };
    });

    setRows((prev) => [...prev, ...newRows]);
  }

  function updateRow(id, patch) {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  function removeRow(id) {
    setRows((prev) => {
      const row = prev.find((r) => r.id === id);
      if (row) URL.revokeObjectURL(row.previewUrl);
      return prev.filter((r) => r.id !== id);
    });
  }

  function defaultDescription() {
    if (descriptionTemplate.trim()) return descriptionTemplate.trim();
    return category ? `${category} — Badhte Kadam Scholar, ${year}` : `Badhte Kadam Scholar, ${year}`;
  }

  async function handleUploadAll() {
    if (!year) return;
    setRunning(true);

    for (const row of rows) {
      if (row.status === 'done') continue;
      if (!row.name.trim()) {
        updateRow(row.id, { status: 'error', errorMessage: 'Name is required.' });
        continue;
      }

      updateRow(row.id, { status: 'uploading', errorMessage: '' });
      try {
        const { url } = await uploadImage(row.file, token);
        updateRow(row.id, { status: 'creating' });
        await createScholar(
          {
            name: row.name.trim(),
            year: Number(year),
            category,
            score: row.score,
            photoUrl: url,
            description: defaultDescription(),
          },
          token
        );
        updateRow(row.id, { status: 'done' });
      } catch (err) {
        updateRow(row.id, { status: 'error', errorMessage: err.message });
      }
    }

    setRunning(false);
  }

  const doneCount = rows.filter((r) => r.status === 'done').length;
  const errorCount = rows.filter((r) => r.status === 'error').length;
  const canUpload = year && rows.length > 0 && !running;

  return (
    <Section maxWidth="max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold text-sage-900">Bulk Upload Scholars</h1>
        <Link href="/admin" className="text-sm font-medium text-sage-600 hover:text-sage-900">
          ← Back to Manage Scholars
        </Link>
      </div>

      <p className="mt-3 text-sm text-sage-600">
        Set the year and category for this batch, then select every scholar photo at once. Each
        filename is parsed for a name (and score, if the file is named like{' '}
        <span className="font-mono text-xs">90.17%  Student Name.png</span>) — review and fix
        anything below before uploading.
      </p>

      <div className="mt-8 grid gap-5 rounded-xl2 bg-white p-8 shadow-soft sm:grid-cols-3">
        <div>
          <label htmlFor="bulk-year" className="text-sm font-medium text-sage-700">Year</label>
          <input
            id="bulk-year"
            type="number"
            required
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="bulk-category" className="text-sm font-medium text-sage-700">Category</label>
          <input
            id="bulk-category"
            placeholder="e.g. XII Commerce State, CA, JEE"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="bulk-description" className="text-sm font-medium text-sage-700">
            Description (optional)
          </label>
          <input
            id="bulk-description"
            placeholder="Applied to every scholar in this batch"
            value={descriptionTemplate}
            onChange={(event) => setDescriptionTemplate(event.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="cursor-pointer inline-flex items-center rounded-full border border-sage-600 px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-sage-700 transition-colors hover:bg-sage-50">
          Select Photos
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesSelected}
            disabled={running}
            className="hidden"
          />
        </label>
        <span className="ml-4 text-xs text-sage-500">{rows.length} file(s) selected</span>
      </div>

      {rows.length > 0 && (
        <div className="mt-8 overflow-hidden rounded-xl2 bg-white shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-sage-100 text-xs uppercase tracking-wide text-sage-500">
              <tr>
                <th className="px-4 py-3">Photo</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Remove</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-sage-100 last:border-none">
                  <td className="px-4 py-3">
                    <img
                      src={row.previewUrl}
                      alt=""
                      className="h-12 w-12 rounded-sm object-cover ring-1 ring-gold-400/30"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      value={row.name}
                      onChange={(event) => updateRow(row.id, { name: event.target.value })}
                      disabled={row.status === 'done' || running}
                      className={`${inputClasses} mt-0`}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      value={row.score}
                      onChange={(event) => updateRow(row.id, { score: event.target.value })}
                      disabled={row.status === 'done' || running}
                      className={`${inputClasses} mt-0 w-28`}
                    />
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {row.status === 'pending' && <span className="text-sage-400">Pending</span>}
                    {row.status === 'uploading' && <span className="text-sage-600">Uploading photo…</span>}
                    {row.status === 'creating' && <span className="text-sage-600">Saving…</span>}
                    {row.status === 'done' && <span className="text-green-600">Done</span>}
                    {row.status === 'error' && (
                      <span className="text-red-600">{row.errorMessage || 'Failed'}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => removeRow(row.id)}
                      disabled={running}
                      className="text-xs font-medium uppercase tracking-wide text-maroon-500 hover:text-maroon-700 disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 flex items-center gap-4">
        <Button onClick={handleUploadAll} disabled={!canUpload}>
          {running ? 'Uploading…' : `Upload All (${rows.length})`}
        </Button>
        {!year && rows.length > 0 && <span className="text-xs text-red-600">Set a year first.</span>}
        {(doneCount > 0 || errorCount > 0) && (
          <span className="text-xs text-sage-600">
            {doneCount} saved{errorCount > 0 ? `, ${errorCount} failed` : ''}
          </span>
        )}
      </div>
    </Section>
  );
}

export default function AdminScholarsBulkPage() {
  return (
    <RequireAuth>
      <AdminScholarsBulk />
    </RequireAuth>
  );
}
