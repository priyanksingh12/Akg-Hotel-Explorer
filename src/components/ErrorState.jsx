export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 px-6 py-16 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-rose-600">
        Connection trouble
      </p>
      <h3 className="font-display text-xl font-semibold text-ink">
        We couldn&rsquo;t load the hotels
      </h3>
      <p className="max-w-sm text-sm text-ink/60">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full bg-ink px-5 py-2 font-mono text-xs uppercase tracking-widest text-paper transition hover:bg-pine-600"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-ink/20 px-6 py-16 text-center">
      <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
      {description && <p className="max-w-sm text-sm text-ink/60">{description}</p>}
      {action}
    </div>
  );
}
