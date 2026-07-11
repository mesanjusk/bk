export default function Container({ children, className = '', maxWidth = 'max-w-6xl' }) {
  return <div className={`mx-auto w-full ${maxWidth} px-6 ${className}`}>{children}</div>;
}
