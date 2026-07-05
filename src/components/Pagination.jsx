export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-1.5"
      aria-label="Pagination"
    >
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="rounded-full px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-ink/60 transition hover:bg-white disabled:opacity-30"
      >
        Prev
      </button>

      {pages.map((p, i) => {
        const prevP = pages[i - 1];
        const showEllipsis = prevP && p - prevP > 1;
        return (
          <span key={p} className="flex items-center gap-1.5">
            {showEllipsis && <span className="px-1 text-ink/40">&hellip;</span>}
            <button
              type="button"
              onClick={() => onChange(p)}
              aria-current={p === page ? 'page' : undefined}
              className={`h-8 w-8 rounded-full font-mono text-xs transition ${
                p === page ? 'bg-ink text-paper' : 'text-ink/70 hover:bg-white'
              }`}
            >
              {p}
            </button>
          </span>
        );
      })}

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="rounded-full px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-ink/60 transition hover:bg-white disabled:opacity-30"
      >
        Next
      </button>
    </nav>
  );
}
