import { useMemo, useState } from 'react';
import Papa from 'papaparse';
import JSZip from 'jszip';
import { renderPosterDataUrl } from './posterRenderer.js';

function slugify(value, fallback) {
  const slug = String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || fallback;
}

function rowLabel(row, fields, index) {
  const firstField = fields.find((f) => row[f]);
  return slugify(firstField ? row[firstField] : '', `poster-${index + 1}`);
}

// Applies one CSV row's values onto a clone of the current poster layout —
// text elements get their `text` replaced, image elements get a matching
// uploaded photo (by filename) or a URL pasted directly into that column.
function buildRowElements(elements, row, photoMap) {
  return elements.map((el) => {
    if (el.type === 'text') {
      const value = row[el.id];
      return value ? { ...el, text: value } : el;
    }
    if (el.type === 'image') {
      const value = row[el.id];
      if (!value) return el;
      if (/^(https?:|data:)/.test(value)) return { ...el, src: value };
      const matched = photoMap.get(value.trim().toLowerCase());
      return matched ? { ...el, src: matched } : el;
    }
    return el;
  });
}

export default function BulkGeneratePanel({ templateId, background, elements, onClose }) {
  const [rows, setRows] = useState([]);
  const [csvError, setCsvError] = useState('');
  const [photoMap, setPhotoMap] = useState(new Map());
  const [progress, setProgress] = useState(null); // { current, total } | null
  const [done, setDone] = useState(false);

  const fields = useMemo(
    () => elements.filter((el) => el.type === 'text' || el.type === 'image').map((el) => el.id),
    [elements]
  );

  const missingColumns = useMemo(() => {
    if (!rows.length) return [];
    const headers = new Set(Object.keys(rows[0]));
    return fields.filter((f) => !headers.has(f));
  }, [rows, fields]);

  function handleDownloadCsvTemplate() {
    const example = {};
    elements.forEach((el) => {
      if (el.type === 'text') example[el.id] = el.text;
      if (el.type === 'image') example[el.id] = '';
    });
    const csv = Papa.unparse({ fields, data: [fields.map((f) => example[f] ?? '')] });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${templateId}-bulk-template.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleCsvFile(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setDone(false);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setRows(results.data);
        setCsvError(results.errors?.[0]?.message || '');
      },
      error: (err) => setCsvError(err.message),
    });
  }

  function handlePhotoFiles(event) {
    const files = Array.from(event.target.files || []);
    event.target.value = '';
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoMap((prev) => {
          const next = new Map(prev);
          next.set(file.name.toLowerCase(), reader.result);
          return next;
        });
      };
      reader.readAsDataURL(file);
    });
  }

  async function handleGenerateAll() {
    if (!rows.length) return;
    setDone(false);
    setProgress({ current: 0, total: rows.length });

    const zip = new JSZip();
    for (let i = 0; i < rows.length; i += 1) {
      const rowElements = buildRowElements(elements, rows[i], photoMap);
      // eslint-disable-next-line no-await-in-loop -- posters must render one at a time (shared offscreen stage)
      const dataUrl = await renderPosterDataUrl(background, rowElements);
      zip.file(`${rowLabel(rows[i], fields, i)}.png`, dataUrl.split(',')[1], { base64: true });
      setProgress({ current: i + 1, total: rows.length });
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${templateId}-posters.zip`;
    link.click();
    URL.revokeObjectURL(url);
    setProgress(null);
    setDone(true);
  }

  const previewRows = rows.slice(0, 5);

  return (
    <div className="mt-8 rounded-xl2 bg-white p-6 shadow-soft ring-1 ring-gold-400/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-semibold text-sage-900">Bulk Generate</h2>
          <p className="mt-1 text-sm text-sage-600">
            Fill in a spreadsheet and generate one poster per row — great for a whole class of marksheets or a
            donor list. Uses the current layout, text styling and photo positions from this template.
          </p>
        </div>
        <button type="button" onClick={onClose} className="text-sm font-medium text-sage-500 hover:text-sage-800">
          Close
        </button>
      </div>

      <ol className="mt-6 space-y-6">
        <li>
          <p className="text-sm font-medium text-sage-800">1. Download the CSV template</p>
          <p className="mt-1 text-xs text-sage-500">
            Columns match this poster&rsquo;s fields: {fields.join(', ')}. For photo columns, put an image URL, or
            the exact filename of a photo you upload in step 3.
          </p>
          <button
            type="button"
            onClick={handleDownloadCsvTemplate}
            className="mt-2 rounded-full border border-sage-300 px-4 py-2 text-xs font-medium uppercase tracking-wide text-sage-700 transition-colors hover:bg-sage-50"
          >
            Download CSV Template
          </button>
        </li>

        <li>
          <p className="text-sm font-medium text-sage-800">2. Upload your filled-in CSV</p>
          <label className="mt-2 inline-block cursor-pointer rounded-full border border-sage-600 px-4 py-2 text-xs font-medium uppercase tracking-wide text-sage-700 transition-colors hover:bg-sage-50">
            Choose CSV File
            <input type="file" accept=".csv,text/csv" onChange={handleCsvFile} className="hidden" />
          </label>
          {csvError && <p className="mt-2 text-xs text-red-600">{csvError}</p>}
          {rows.length > 0 && (
            <p className="mt-2 text-xs text-sage-500">
              {rows.length} row{rows.length === 1 ? '' : 's'} loaded.
              {missingColumns.length > 0 && (
                <span className="text-gold-700"> Missing columns: {missingColumns.join(', ')}.</span>
              )}
            </p>
          )}
        </li>

        <li>
          <p className="text-sm font-medium text-sage-800">3. Upload photos (optional)</p>
          <p className="mt-1 text-xs text-sage-500">
            Select all the photo files referenced by filename in your CSV&rsquo;s photo column(s).
          </p>
          <label className="mt-2 inline-block cursor-pointer rounded-full border border-sage-600 px-4 py-2 text-xs font-medium uppercase tracking-wide text-sage-700 transition-colors hover:bg-sage-50">
            Choose Photos
            <input type="file" accept="image/*" multiple onChange={handlePhotoFiles} className="hidden" />
          </label>
          {photoMap.size > 0 && <p className="mt-2 text-xs text-sage-500">{photoMap.size} photo(s) ready.</p>}
        </li>
      </ol>

      {previewRows.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-lg border border-sage-200">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-sage-50 text-sage-600">
              <tr>
                {Object.keys(previewRows[0]).map((header) => (
                  <th key={header} className="px-3 py-2 font-medium uppercase tracking-wide">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-100 text-sage-700">
              {previewRows.map((row, i) => (
                // eslint-disable-next-line react/no-array-index-key -- rows have no stable id
                <tr key={i}>
                  {Object.keys(previewRows[0]).map((header) => (
                    <td key={header} className="px-3 py-2">
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length > previewRows.length && (
            <p className="bg-sage-50 px-3 py-2 text-xs text-sage-500">…and {rows.length - previewRows.length} more</p>
          )}
        </div>
      )}

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={handleGenerateAll}
          disabled={!rows.length || !!progress}
          className="rounded-full bg-sage-800 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-cream shadow-soft ring-1 ring-gold-400/40 transition-colors hover:bg-sage-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {progress ? `Generating ${progress.current} / ${progress.total}…` : `Generate ${rows.length || ''} Posters`}
        </button>
        {done && <span className="text-xs text-sage-500">Downloaded as a ZIP.</span>}
      </div>
    </div>
  );
}
