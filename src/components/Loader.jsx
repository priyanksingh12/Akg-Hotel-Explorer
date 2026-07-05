export function CardSkeleton() {
  return (
    <div className="flex animate-pulse overflow-hidden rounded-2xl bg-white shadow-ticket">
      <div className="w-36 shrink-0 bg-ink/10 sm:w-48" />
      <div className="stub-divider bg-paper" aria-hidden="true" />
      <div className="flex flex-1 flex-col justify-between gap-3 p-4 sm:p-5">
        <div className="space-y-2">
          <div className="h-2.5 w-16 rounded bg-ink/10" />
          <div className="h-4 w-3/4 rounded bg-ink/10" />
          <div className="h-3 w-full rounded bg-ink/10" />
        </div>
        <div className="flex items-end justify-between">
          <div className="h-12 w-12 rounded-full bg-ink/10" />
          <div className="h-5 w-16 rounded bg-ink/10" />
        </div>
      </div>
    </div>
  );
}

export default function Loader({ count = 6 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2" role="status" aria-label="Loading hotels">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
