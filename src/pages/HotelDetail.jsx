import { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useHotels } from '../hooks/useHotels';
import { findHotelById } from '../api/hotelApi';
import RatingStamp from '../components/RatingStamp';
import FavoriteButton from '../components/FavoriteButton';
import Loader from '../components/Loader';
import { ErrorState, EmptyState } from '../components/ErrorState';

function formatPrice(price) {
  const n = typeof price === 'string' ? parseFloat(price) : price;
  return n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

export default function HotelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hotels, loading, error, reload } = useHotels();
  const [activePhoto, setActivePhoto] = useState(0);
  const [booked, setBooked] = useState(false);

  const hotel = useMemo(() => findHotelById(hotels, id), [hotels, id]);
  const photos = hotel?.photos?.length ? hotel.photos : hotel ? [hotel.thumbnail] : [];

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <Loader count={1} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <ErrorState message={error} onRetry={reload} />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <EmptyState
          title="We couldn&rsquo;t find that stay"
          description="It may have been removed, or the link is off."
          action={
            <Link
              to="/"
              className="rounded-full bg-ink px-5 py-2 font-mono text-xs uppercase tracking-widest text-paper transition hover:bg-pine-600"
            >
              Back to all stays
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 font-mono text-xs uppercase tracking-widest text-ink/50 hover:text-pine-500"
      >
        &larr; Back
      </button>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="relative overflow-hidden rounded-2xl bg-ink/5">
            <img
              src={photos[activePhoto]}
              alt={`${hotel.name} photo ${activePhoto + 1}`}
              className="h-72 w-full object-cover sm:h-96"
            />
            <FavoriteButton hotelId={hotel.id} className="absolute right-3 top-3" />
          </div>

          {photos.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {photos.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setActivePhoto(i)}
                  className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                    i === activePhoto ? 'border-pine-500' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="mt-8">
            <p className="font-mono text-xs uppercase tracking-widest text-pine-600">
              {hotel.location}
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
              {hotel.name}
            </h1>
            <div className="mt-4">
              <RatingStamp rating={hotel.rating} size="lg" />
            </div>
            <p className="mt-6 max-w-2xl leading-relaxed text-ink/70">{hotel.description}</p>
          </div>
        </div>

        <aside className="ticket-notch h-fit rounded-2xl bg-white p-6 shadow-ticket">
          <p className="font-mono text-xs uppercase tracking-widest text-ink/50">
            Rate per night
          </p>
          <p className="mt-1 font-display text-3xl font-semibold text-ink">
            ₹{formatPrice(hotel.price)}
          </p>

          <div className="stub-divider-h my-5 bg-white" aria-hidden="true" />

          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink/50">Location</dt>
              <dd className="font-medium text-ink">{hotel.location}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink/50">Rating</dt>
              <dd className="font-medium text-ink">{hotel.rating.toFixed(1)} / 5</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink/50">Hotel ID</dt>
              <dd className="font-mono text-ink/70">#{hotel.id}</dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={() => setBooked(true)}
            disabled={booked}
            className="mt-6 w-full rounded-full bg-pine-500 px-5 py-3 font-mono text-xs uppercase tracking-widest text-paper transition hover:bg-pine-600 disabled:bg-pine-200"
          >
            {booked ? 'Reserved ✓' : 'Reserve this stay'}
          </button>
          {booked && (
            <p className="mt-3 text-center text-xs text-ink/50">
              This is a demo reservation &mdash; no booking was actually made.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
