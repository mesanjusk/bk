export default function Container({ children, className = '', maxWidth = 'max-w-[1280px]' }) {
  return <div className={`mx-auto w-full ${maxWidth} px-6 md:px-10 ${className}`}>{children}</div>;
}
