'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import PosterCanvas from './PosterCanvas.jsx';
import ControlsPanel from './ControlsPanel.jsx';
import useElementWidth from './useElementWidth.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT, cloneTemplate } from '../../data/posterTemplates.js';

const DRAFT_KEY_PREFIX = 'poster_draft_';
const MAX_CANVAS_WIDTH = 520;

function applyThemeToElements(elements, theme) {
  return elements.map((el) => {
    switch (el.role) {
      case 'accent':
        return { ...el, fill: theme.accent };
      case 'heading':
        return { ...el, fill: theme.heading };
      case 'heading-on-accent':
        return { ...el, fill: theme.headingOnAccent };
      case 'subheading':
        return { ...el, fill: theme.subheading };
      case 'body':
        return { ...el, fill: theme.body };
      case 'body-on-accent':
        return { ...el, fill: theme.bodyOnAccent };
      default:
        return el;
    }
  });
}

function loadDraft(draftKey, template) {
  try {
    const saved = localStorage.getItem(draftKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed?.elements && parsed?.background) return parsed;
    }
  } catch {
    // Corrupt or inaccessible storage — fall back to the template as-authored.
  }
  return cloneTemplate(template);
}

export default function PosterEditor({ template, onBack }) {
  const draftKey = `${DRAFT_KEY_PREFIX}${template.id}`;
  const initial = useMemo(() => loadDraft(draftKey, template), [draftKey, template]);

  const [elements, setElements] = useState(initial.elements);
  const [background, setBackground] = useState(initial.background);
  const [selectedId, setSelectedId] = useState(null);
  const [activeThemeId, setActiveThemeId] = useState(null);
  const [status, setStatus] = useState('');

  const stageRef = useRef(null);
  const canvasWrapRef = useRef(null);
  const measuredWidth = useElementWidth(canvasWrapRef, MAX_CANVAS_WIDTH);
  const canvasWidth = Math.min(measuredWidth, MAX_CANVAS_WIDTH);

  useEffect(() => {
    if (!status) return undefined;
    const timeout = setTimeout(() => setStatus(''), 2500);
    return () => clearTimeout(timeout);
  }, [status]);

  const selectedElement = elements.find((el) => el.id === selectedId) || null;

  function updateElement(id, patch) {
    setElements((prev) => prev.map((el) => (el.id === id ? { ...el, ...patch } : el)));
  }

  function applyTheme(theme) {
    setElements((prev) => applyThemeToElements(prev, theme));
    setBackground(theme.background);
    setActiveThemeId(theme.id);
  }

  function captureDataUrl() {
    const stage = stageRef.current;
    if (!stage) return null;
    const prevScale = stage.scaleX();
    const prevWidth = stage.width();
    const prevHeight = stage.height();

    stage.scale({ x: 1, y: 1 });
    stage.width(CANVAS_WIDTH);
    stage.height(CANVAS_HEIGHT);
    stage.batchDraw();

    let dataUrl = null;
    try {
      dataUrl = stage.toDataURL({ pixelRatio: 2, mimeType: 'image/png' });
    } catch {
      dataUrl = null;
    }

    stage.scale({ x: prevScale, y: prevScale });
    stage.width(prevWidth);
    stage.height(prevHeight);
    stage.batchDraw();

    return dataUrl;
  }

  function handleDownload() {
    flushSync(() => setSelectedId(null));
    const dataUrl = captureDataUrl();
    if (!dataUrl) {
      setStatus('Could not export — try replacing any linked photo with an uploaded one.');
      return;
    }
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${template.id}-poster.png`;
    link.click();
    setStatus('Downloaded.');
  }

  async function handleShare() {
    flushSync(() => setSelectedId(null));
    const dataUrl = captureDataUrl();
    if (!dataUrl) {
      setStatus('Could not prepare the poster for sharing.');
      return;
    }

    try {
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `${template.id}-poster.png`, { type: 'image/png' });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: template.name, text: 'Made with Badhte Kadam' });
        setStatus('Shared.');
        return;
      }
    } catch {
      // Fall through to a plain download below.
    }

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${template.id}-poster.png`;
    link.click();
    setStatus("Sharing isn't supported here — downloaded instead.");
  }

  function handleSaveDraft() {
    try {
      localStorage.setItem(draftKey, JSON.stringify({ elements, background }));
      setStatus('Saved on this device.');
    } catch {
      setStatus('Could not save — your browser storage may be full.');
    }
  }

  return (
    <div className="mt-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button type="button" onClick={onBack} className="text-sm font-medium text-sage-600 hover:text-sage-900">
          ← Back to templates
        </button>
        <div className="flex flex-wrap items-center gap-3">
          {status && <span className="text-xs text-sage-500">{status}</span>}
          <button
            type="button"
            onClick={handleSaveDraft}
            className="rounded-full border border-sage-300 px-4 py-2 text-xs font-medium uppercase tracking-wide text-sage-700 transition-colors hover:bg-sage-50"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="rounded-full border border-sage-300 px-4 py-2 text-xs font-medium uppercase tracking-wide text-sage-700 transition-colors hover:bg-sage-50"
          >
            Share Poster
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="rounded-full bg-sage-800 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-cream shadow-soft ring-1 ring-gold-400/40 transition-colors hover:bg-sage-900"
          >
            Download Poster
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div
          ref={canvasWrapRef}
          className="mx-auto w-full max-w-[520px] overflow-hidden rounded-xl2 shadow-book ring-1 ring-gold-400/20"
        >
          <PosterCanvas
            stageRef={stageRef}
            elements={elements}
            background={background}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onChange={updateElement}
            containerWidth={canvasWidth}
          />
        </div>

        <div className="rounded-xl2 bg-white p-6 shadow-soft ring-1 ring-gold-400/20 lg:sticky lg:top-24 lg:self-start">
          <ControlsPanel
            selectedElement={selectedElement}
            onUpdateElement={(patch) => selectedElement && updateElement(selectedElement.id, patch)}
            onApplyTheme={applyTheme}
            activeThemeId={activeThemeId}
          />
        </div>
      </div>
    </div>
  );
}
