import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-sage-800 text-cream hover:bg-sage-900 ring-1 ring-gold-400/40',
  secondary: 'bg-transparent border border-sage-600 text-sage-700 hover:bg-sage-50',
};

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
  const classes = `inline-flex items-center justify-center rounded-full px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 shadow-soft disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
