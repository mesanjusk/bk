import { useEffect, useRef } from 'react';
import { colorThemes } from '../../data/posterTemplates.js';

const FONT_SIZE_MIN = 12;
const FONT_SIZE_MAX = 96;

export default function ControlsPanel({ selectedElement, onUpdateElement, onApplyTheme, activeThemeId }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (selectedElement?.type === 'text' && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [selectedElement?.id, selectedElement?.type]);

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onUpdateElement({ src: reader.result });
    reader.readAsDataURL(file);
  }

  function handleUrlKeyDown(event) {
    if (event.key === 'Enter' && event.currentTarget.value) {
      onUpdateElement({ src: event.currentTarget.value });
    }
  }

  return (
    <div className="space-y-8">
      {selectedElement?.type === 'text' && (
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">Text</h3>
          <div className="mt-4 space-y-4">
            <textarea
              ref={textareaRef}
              rows={3}
              value={selectedElement.text}
              onChange={(e) => onUpdateElement({ text: e.target.value })}
              className="w-full rounded-lg border border-sage-200 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
            />
            <div className="flex items-center gap-3">
              <label htmlFor="font-size" className="text-xs font-medium uppercase tracking-wide text-sage-600">
                Size
              </label>
              <input
                id="font-size"
                type="range"
                min={FONT_SIZE_MIN}
                max={FONT_SIZE_MAX}
                value={selectedElement.fontSize}
                onChange={(e) => onUpdateElement({ fontSize: Number(e.target.value) })}
                className="flex-1 accent-sage-700"
              />
              <span className="w-8 text-right text-xs text-sage-500">{selectedElement.fontSize}</span>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="text-color" className="text-xs font-medium uppercase tracking-wide text-sage-600">
                Color
              </label>
              <input
                id="text-color"
                type="color"
                value={selectedElement.fill}
                onChange={(e) => onUpdateElement({ fill: e.target.value })}
                className="h-8 w-14 cursor-pointer rounded border border-sage-200 bg-transparent"
              />
            </div>
          </div>
        </section>
      )}

      {selectedElement?.type === 'image' && (
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">Photo</h3>
          <div className="mt-4 space-y-4">
            <label className="inline-block cursor-pointer rounded-full border border-sage-600 px-4 py-2 text-xs font-medium uppercase tracking-wide text-sage-700 transition-colors hover:bg-sage-50">
              Upload Photo
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>

            <div>
              <label htmlFor="image-url" className="text-xs font-medium uppercase tracking-wide text-sage-600">
                Or paste an image URL
              </label>
              <input
                id="image-url"
                type="text"
                placeholder="https://…  (press Enter)"
                defaultValue={selectedElement.src?.startsWith('data:') ? '' : selectedElement.src}
                onKeyDown={handleUrlKeyDown}
                className="mt-1 w-full rounded-lg border border-sage-200 px-3 py-2 text-sm focus:border-sage-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-sage-600">Fit</span>
              <div className="flex overflow-hidden rounded-full border border-sage-300">
                {['cover', 'contain'].map((fit) => (
                  <button
                    key={fit}
                    type="button"
                    onClick={() => onUpdateElement({ fit })}
                    className={`px-3 py-1 text-xs uppercase tracking-wide transition-colors ${
                      (selectedElement.fit || 'cover') === fit
                        ? 'bg-sage-800 text-cream'
                        : 'text-sage-600 hover:bg-sage-50'
                    }`}
                  >
                    {fit === 'cover' ? 'Cover' : 'Fit'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {!selectedElement && (
        <p className="text-sm leading-relaxed text-sage-500">
          Click any text or photo on the poster to edit it. Drag to reposition, or drag a photo&rsquo;s corner to
          resize it.
        </p>
      )}

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">Template Colors</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          {colorThemes.map((theme) => (
            <button
              key={theme.id}
              type="button"
              onClick={() => onApplyTheme(theme)}
              aria-label={theme.name}
              title={theme.name}
              className={`h-10 w-10 rounded-full ring-2 ring-offset-2 ring-offset-white transition-transform hover:scale-105 ${
                activeThemeId === theme.id ? 'ring-gold-500' : 'ring-transparent'
              }`}
              style={{ backgroundColor: theme.accent }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
