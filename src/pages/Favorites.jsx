import { Link } from 'react-router-dom';
import { useHotels } from '../hooks/useHotels';
import { useFavorites } from '../context/FavoritesContext';
import HotelCard from '../components/HotelCard';
import Loader from '../components/Loader';
import { ErrorState, EmptyState } from '../components/ErrorState';

export default function Favorites() {
  const { hotels, loading, error, reload } = useHotels();
  const { favoriteIds } = useFavorites();

  const saved = hotels.filter((h) => favoriteIds.has(h.id));

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <p className="font-mono text-xs uppercase tracking-widest text-pine-600">Saved stays</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Your shortlist
      </h1>
      <p className="mt-2 max-w-lg text-ink/60">
        Tap the heart on any stay to keep it here &mdash; stored right in this browser.
      </p>

      <div className="mt-8">
        {loading && <Loader />}
        {!loading && error && <ErrorState message={error} onRetry={reload} />}
        {!loading && !error && saved.length === 0 && (
          <EmptyState
            title="Nothing saved yet"
            description="Browse the listings and tap the heart icon on a stay to add it here."
            action={
              <Link
                to="/"
                className="rounded-full bg-ink px-5 py-2 font-mono text-xs uppercase tracking-widest text-paper transition hover:bg-pine-600"
              >
                Explore stays
              </Link>
            }
          />
        )}
        {!loading && !error && saved.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {saved.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
