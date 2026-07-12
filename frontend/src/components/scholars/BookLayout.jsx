export default function BookLayout({ left, right }) {
  return (
    <div className="overflow-hidden rounded-xl2 bg-cream shadow-book ring-1 ring-gold-400/30 md:grid md:h-[640px] md:grid-cols-2">
      <div className="relative border-b border-gold-400/20 bg-sand/40 md:border-b-0 md:border-r">
        {left}
        <span className="pointer-events-none absolute inset-y-0 right-0 hidden w-6 translate-x-full bg-gradient-to-r from-black/10 to-transparent md:block" />
      </div>
      <div className="relative flex flex-col overflow-hidden">{right}</div>
    </div>
  );
}
