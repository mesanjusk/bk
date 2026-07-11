export default function MediaFrame({
  type = 'image',
  src,
  alt = '',
  aspect = 'aspect-[4/3]',
  rounded = 'rounded-xl2',
  className = '',
}) {
  if (!src) return null;

  return (
    <div className={`overflow-hidden ${rounded} bg-sand shadow-soft ${aspect} ${className}`}>
      {type === 'video' ? (
        <video
          src={src}
          controls
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      ) : (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      )}
    </div>
  );
}
