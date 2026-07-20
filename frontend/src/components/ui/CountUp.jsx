'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

export default function CountUp({ value, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const match = String(value).match(/([\d,.]+)(.*)/);
  const number = match ? parseFloat(match[1].replace(/,/g, '')) : 0;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    if (!inView || !ref.current) return undefined;
    const node = ref.current;
    const controls = animate(0, number, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(latest) {
        node.textContent = `${Math.round(latest).toLocaleString()}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, number, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
