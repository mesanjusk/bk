'use client';

import Link from 'next/link';

const variants = {
  primary: 'bg-[#1a73e8] text-white hover:bg-[#1765cc] active:bg-[#185abc] shadow-sm',
  secondary: 'bg-white text-[#3c4043] border border-[#dadce0] hover:bg-[#f8f9fa]',
  danger: 'bg-white text-[#d93025] border border-[#dadce0] hover:bg-[#fce8e6]',
  text: 'bg-transparent text-[#1a73e8] hover:bg-[#f1f3f4]',
};

export default function AdminButton({
  to,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  icon,
  children,
  className = '',
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link href={to} className={classes}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {icon}
      {children}
    </button>
  );
}
