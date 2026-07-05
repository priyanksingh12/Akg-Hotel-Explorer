import { useMemo, useState } from 'react';
import { useHotels } from '../hooks/useHotels';
import HotelCard from '../components/HotelCard';
import Loader from '../components/Loader';
import { ErrorState, EmptyState } from '../components/ErrorState';
import SearchFilters, { DEFAULT_FILTERS } from '../components/SearchFilters';
import Pagination from '../components/Pagination';

const PAGE_SIZE = 8;

export default function Home() {
  const { hotels, loading, error, reload } = useHotels();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const locations = useMemo(
    () => [...new Set(hotels.map((h) => h.location))].sort(),
    [hotels]
  );

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const min = filters.minPrice ? parseFloat(filters.minPrice) : null;
    const max = filters.maxPrice ? parseFloat(filters.maxPrice) : null;

    let result = hotels.filter((h) => {
      const price = parseFloat(h.price);
      if (q && !`${h.name} ${h.location}`.toLowerCase().includes(q)) return false;
      if (filters.location && h.location !== filters.location) return false;
      if (min !== null && price < min) return false;
      if (max !== null && price > max) return false;
      if (h.rating < filters.minRating) return false;
      return true;
    });

    switch (filters.sort) {
      case 'price-asc':
        result = [...result].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'rating-desc':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [hotels, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFiltersChange = (next) => {
    setFilters(next);
    setPage(1);
  };

  return (
    <div>
      <section className="border-b border-ink/10 bg-gradient-to-b from-pine-50 to-paper">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-pine-600">
            {hotels.length > 0 ? `${hotels.length} stays across India` : 'Hotel explorer'}
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Find a room worth <span className="italic text-pine-500">the detour.</span>
          </h1>
          <p className="mt-4 max-w-lg text-ink/60">
            Browse real-time listings by city, price and rating &mdash; every card here is a
            boarding pass to somewhere new.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="-mt-24 mb-8">
          <SearchFilters filters={filters} onChange={handleFiltersChange} locations={locations} />
        </div>

        {loading && <Loader />}

        {!loading && error && <ErrorState message={error} onRetry={reload} />}

        {!loading && !error && filtered.length === 0 && (
          <EmptyState
            title="No stays match those filters"
            description="Try widening your price range or clearing the city filter."
            action={
              <button
                type="button"
                onClick={() => handleFiltersChange(DEFAULT_FILTERS)}
                className="rounded-full bg-ink px-5 py-2 font-mono text-xs uppercase tracking-widest text-paper transition hover:bg-pine-600"
              >
                Reset filters
              </button>
            }
          />
        )}

        {!loading && !error && filtered.length > 0 && (
          <>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-ink/50">
              Showing {paged.length} of {filtered.length} stays
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {paged.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </>
        )}
      </main>
    </div>
  );
}
