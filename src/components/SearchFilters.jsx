const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating-desc', label: 'Rating: high to low' },
];

export default function SearchFilters({ filters, onChange, locations }) {
  const { query, location, minPrice, maxPrice, minRating, sort } = filters;

  const update = (patch) => onChange({ ...filters, ...patch });

  return (
    <div className="rounded-2xl bg-white p-4 shadow-ticket sm:p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <label className="flex flex-col gap-1 lg:col-span-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
            Search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => update({ query: e.target.value })}
            placeholder="Hotel name or city"
            className="rounded-lg border border-ink/15 bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-primary-500 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
            City
          </span>
          <select
            value={location}
            onChange={(e) => update({ location: e.target.value })}
            className="rounded-lg border border-ink/15 bg-paper px-3 py-2 text-sm text-ink focus:border-primary-500 focus:outline-none"
          >
            <option value="">All cities</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
            Min price (₹)
          </span>
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(e) => update({ minPrice: e.target.value })}
            placeholder="0"
            className="rounded-lg border border-ink/15 bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-primary-500 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
            Max price (₹)
          </span>
          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) => update({ maxPrice: e.target.value })}
            placeholder="10000"
            className="rounded-lg border border-ink/15 bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-primary-500 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
            Sort by
          </span>
          <select
            value={sort}
            onChange={(e) => update({ sort: e.target.value })}
            className="rounded-lg border border-ink/15 bg-paper px-3 py-2 text-sm text-ink focus:border-primary-500 focus:outline-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
          Min rating
        </span>
        {[0, 3, 3.5, 4, 4.5].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => update({ minRating: r })}
            className={`rounded-full px-3 py-1 font-mono text-xs transition ${
              minRating === r
                ? 'bg-primary-500 text-paper'
                : 'bg-paper text-ink/60 hover:bg-primary-50'
            }`}
          >
            {r === 0 ? 'Any' : `${r}+`}
          </button>
        ))}
      </div>
    </div>
  );
}

export const DEFAULT_FILTERS = {
  query: '',
  location: '',
  minPrice: '',
  maxPrice: '',
  minRating: 0,
  sort: 'relevance',
};
