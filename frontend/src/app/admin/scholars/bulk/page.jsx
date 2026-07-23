'use client';

import { useEffect, useState } from 'react';
import AdminPageHeader from '../../../../components/admin/ui/AdminPageHeader.jsx';
import AdminCard from '../../../../components/admin/ui/AdminCard.jsx';
import AdminButton from '../../../../components/admin/ui/AdminButton.jsx';
import { fieldClasses } from '../../../../components/admin/ui/AdminField.jsx';
import OptionSelect from '../../../../components/admin/OptionSelect.jsx';
import { useAuth } from '../../../../context/AuthContext.jsx';
import { uploadImage, createScholar, fetchScholarOptions, addScholarOption } from '../../../../api/client.js';
import { parseScholarFilename } from '../../../../lib/parseScholarFilename.js';

let nextRowId = 0;

export default function AdminScholarsBulkPage() {
  const { token } = useAuth();
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('');
  const [descriptionTemplate, setDescriptionTemplate] = useState('');
  const [options, setOptions] = useState({ years: [], categories: [] });
  const [rows, setRows] = useState([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    fetchScholarOptions()
      .then(setOptions)
      .catch(() => {});
  }, []);

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
    <div className="mx-auto max-w-4xl">
      <AdminPageHeader
        title="Bulk Upload Scholars"
        backTo="/admin"
        backLabel="All Scholars"
        description={
          <>
            Set the year and category for this batch, then select every scholar photo at once. Each
            filename is parsed for a name (and score, if the file is named like{' '}
            <span className="rounded bg-[#f1f3f4] px-1 py-0.5 font-mono text-xs">90.17% Student Name.png</span>) —
            review and fix anything below before uploading.
          </>
        }
      />

      <AdminCard className="grid gap-5 sm:grid-cols-3">
        <OptionSelect
          id="bulk-year"
          label="Year"
          value={year}
          onChange={setYear}
          options={options.years}
          onAddOption={handleAddYear}
          inputType="number"
        />
        <OptionSelect
          id="bulk-category"
          label="Category"
          value={category}
          onChange={setCategory}
          options={options.categories}
          onAddOption={handleAddCategory}
          inputType="text"
        />
        <div>
          <label htmlFor="bulk-description" className="text-sm font-medium text-[#3c4043]">
            Description (optional)
          </label>
          <input
            id="bulk-description"
            placeholder="Applied to every scholar in this batch"
            value={descriptionTemplate}
            onChange={(event) => setDescriptionTemplate(event.target.value)}
            className={fieldClasses}
          />
        </div>
      </AdminCard>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <label className="cursor-pointer inline-flex items-center rounded-md border border-[#dadce0] bg-white px-4 py-2 text-sm font-medium text-[#3c4043] transition-colors hover:bg-[#f8f9fa]">
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
        <span className="text-sm text-[#5f6368]">{rows.length} file(s) selected</span>
      </div>

      {rows.length > 0 && (
        <AdminCard padded={false} className="mt-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#dadce0] text-xs font-medium text-[#5f6368]">
                <tr>
                  <th className="px-4 py-3 font-medium">Photo</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Score</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Remove</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-[#e8eaed] last:border-none hover:bg-[#f8f9fa]">
                    <td className="px-4 py-3">
                      <img src={row.previewUrl} alt="" className="h-11 w-11 rounded object-cover ring-1 ring-[#dadce0]" />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        value={row.name}
                        onChange={(event) => updateRow(row.id, { name: event.target.value })}
                        disabled={row.status === 'done' || running}
                        className={`${fieldClasses} mt-0`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        value={row.score}
                        onChange={(event) => updateRow(row.id, { score: event.target.value })}
                        disabled={row.status === 'done' || running}
                        className={`${fieldClasses} mt-0 w-28`}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {row.status === 'pending' && <span className="text-[#80868b]">Pending</span>}
                      {row.status === 'uploading' && <span className="text-[#5f6368]">Uploading photo…</span>}
                      {row.status === 'creating' && <span className="text-[#5f6368]">Saving…</span>}
                      {row.status === 'done' && <span className="text-[#188038]">Done</span>}
                      {row.status === 'error' && (
                        <span className="text-[#d93025]">{row.errorMessage || 'Failed'}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => removeRow(row.id)}
                        disabled={running}
                        className="text-sm font-medium text-[#d93025] hover:underline disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminCard>
      )}

      <div className="mt-6 flex items-center gap-4">
        <AdminButton onClick={handleUploadAll} disabled={!canUpload}>
          {running ? 'Uploading…' : `Upload All (${rows.length})`}
        </AdminButton>
        {!year && rows.length > 0 && <span className="text-sm text-[#d93025]">Set a year first.</span>}
        {(doneCount > 0 || errorCount > 0) && (
          <span className="text-sm text-[#5f6368]">
            {doneCount} saved{errorCount > 0 ? `, ${errorCount} failed` : ''}
          </span>
        )}
      </div>
    </div>
  );
}
