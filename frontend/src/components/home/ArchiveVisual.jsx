export default function ArchiveVisual({ className = '' }) {
  return (
    <div className={`relative aspect-[4/3] w-full ${className}`}>
      <div className="absolute inset-0 rounded-xl2 bg-gradient-to-br from-sage-800/10 via-gold-400/10 to-maroon-500/10 blur-2xl" />
      <div className="absolute inset-6 rounded-xl2 border border-gold-400/20 bg-cream/40" />

      <div className="absolute left-1/2 top-1/2 h-40 w-28 -translate-x-[70%] -translate-y-1/2 -rotate-6 rounded-sm bg-sage-800/80 shadow-book" />
      <div className="absolute left-1/2 top-1/2 h-44 w-28 -translate-x-1/3 -translate-y-[55%] rotate-3 rounded-sm bg-maroon-600/80 shadow-book" />
      <div className="absolute left-1/2 top-1/2 h-36 w-24 -translate-x-1/2 -translate-y-1/3 rotate-12 rounded-sm bg-sage-600/70 shadow-book" />

      <div className="absolute left-1/2 top-1/2 h-px w-24 -translate-x-[70%] -translate-y-1/2 -rotate-6 bg-gold-300/60" />
      <div className="absolute left-1/2 top-1/2 h-px w-24 -translate-x-1/3 -translate-y-[55%] rotate-3 bg-gold-300/60" />
    </div>
  );
}
