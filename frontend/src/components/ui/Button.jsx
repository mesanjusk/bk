'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

const variants = {
  primary: 'bg-sage-800 text-white hover:bg-sage-900',
  secondary: 'bg-transparent border border-ink/15 text-ink hover:border-ink/30',
};

function useMagnetic(strength = 0.22) {
  const ref = useRef(null);
  const [transform, setTransform] = useState('translate(0px, 0px)');

  function onMouseMove(event) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * strength;
    const y = (event.clientY - rect.top - rect.height / 2) * strength;
    setTransform(`translate(${x}px, ${y}px)`);
  }

  function onMouseLeave() {
    setTransform('translate(0px, 0px)');
  }

  return { ref, style: { transform }, onMouseMove, onMouseLeave };
}

export default function Button({
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  children,
  className = '',
}) {
  const magnetic = useMagnetic();
  const classes = `inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-[transform,box-shadow,background-color,border-color] duration-300 ease-luxury hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none ${variants[variant]} ${className}`;

  const sharedProps = {
    ref: magnetic.ref,
    style: magnetic.style,
    onMouseMove: magnetic.onMouseMove,
    onMouseLeave: magnetic.onMouseLeave,
    className: classes,
  };

  if (to) {
    return (
      <Link href={to} {...sharedProps}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} {...sharedProps}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} {...sharedProps}>
      {children}
    </button>
  );
}
