import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-sage-600 text-white hover:bg-sage-700',
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
  const classes = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 shadow-soft disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`;

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
