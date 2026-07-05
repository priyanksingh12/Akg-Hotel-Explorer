import { useFavorites } from '../context/FavoritesContext';

export default function FavoriteButton({ hotelId, className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(hotelId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(hotelId);
      }}
      aria-pressed={active}
      aria-label={active ? 'Remove from saved stays' : 'Save this stay'}
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 shadow-ticket backdrop-blur transition hover:scale-105 active:scale-95 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`h-5 w-5 transition ${active ? 'fill-rose-500 stroke-rose-500' : 'fill-none stroke-ink'}`}
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20.5s-7.5-4.6-9.8-9.1C.6 8.1 2 4.8 5.3 4.1c2-.4 3.9.5 5 2.1a5.4 5.4 0 0 1 5-2.1c3.3.7 4.7 4 3.1 7.3-2.3 4.5-9.8 9.1-9.8 9.1z"
        />
      </svg>
    </button>
  );
}
