import { useRef } from 'react';
import PosterCanvas from './PosterCanvas.jsx';
import useElementWidth from './useElementWidth.js';

export default function TemplateCard({ template, onClick }) {
  const wrapRef = useRef(null);
  const width = useElementWidth(wrapRef, 240);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group overflow-hidden rounded-xl2 bg-white text-left shadow-soft ring-1 ring-gold-400/20 transition-transform duration-300 hover:-translate-y-1 hover:shadow-book focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
    >
      <div ref={wrapRef} className="overflow-hidden bg-sand/40 p-3">
        <PosterCanvas
          elements={template.elements}
          background={template.background}
          containerWidth={width}
          interactive={false}
        />
      </div>
      <div className="p-4">
        <p className="text-sm font-medium text-sage-800">{template.name}</p>
      </div>
    </button>
  );
}
