import { Link } from 'react-router-dom';
import RatingStamp from './RatingStamp';
import FavoriteButton from './FavoriteButton';

function formatPrice(price) {
  const n = typeof price === 'string' ? parseFloat(price) : price;
  return n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

export default function HotelCard({ hotel }) {
  const { id, name, location, price, rating, thumbnail } = hotel;

  return (
    <Link
      to={`/hotels/${id}`}
      className="group flex overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-ink/10"
    >
      <div className="relative w-36 shrink-0 sm:w-48">
        <img
          src={thumbnail}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <FavoriteButton hotelId={id} className="absolute right-2 top-2" />
      </div>

      <div className="stub-divider bg-paper" aria-hidden="true" />

      <div className="flex flex-1 flex-col justify-between gap-3 p-4 sm:p-5">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-primary-500">
            {location}
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
            {name}
          </h3>
          <p className="mt-1 hidden text-sm text-ink/60 sm:line-clamp-2">{hotel.description}</p>
        </div>

        <div className="flex items-end justify-between gap-3">
          <RatingStamp rating={rating} />
          <div className="text-right">
            <p className="font-mono text-lg font-medium text-ink">
              ₹{formatPrice(price)}
            </p>
            <p className="text-xs text-ink/50">per night</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
