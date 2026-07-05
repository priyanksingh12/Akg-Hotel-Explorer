function ratingLabel(rating) {
  if (rating >= 4.5) return 'Exceptional';
  if (rating >= 4) return 'Excellent';
  if (rating >= 3.5) return 'Very good';
  if (rating >= 3) return 'Good';
  if (rating >= 2) return 'Fair';
  return 'Basic';
}

export default function RatingStamp({ rating, size = 'md' }) {
  const dims = size === 'lg' ? 'h-16 w-16 text-base' : 'h-12 w-12 text-sm';
  return (
    <div className="flex items-center gap-2">
      <div className={`rating-stamp ${dims}`} title={`${rating.toFixed(1)} / 5`}>
        {rating.toFixed(1)}
      </div>
      <span className="hidden font-mono text-xs uppercase tracking-wide text-ink/80 sm:inline">
        {ratingLabel(rating)}
      </span>
    </div>
  );
}
