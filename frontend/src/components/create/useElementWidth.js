import { useEffect, useState } from 'react';

// Tracks an element's rendered width so a Konva stage can scale to fit it.
export default function useElementWidth(ref, fallback = 320) {
  const [width, setWidth] = useState(fallback);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver((entries) => {
      const measured = entries[0]?.contentRect.width;
      if (measured) setWidth(measured);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return width;
}
