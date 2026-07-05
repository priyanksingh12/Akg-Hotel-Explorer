import { NavLink } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const linkBase =
  'font-mono text-xs uppercase tracking-widest transition-colors hover:text-pine-500';

export default function Navbar() {
  const { count } = useFavorites();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight text-ink">
            Waypoint
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-pine-500 sm:inline">
            Stays · India
          </span>
        </NavLink>

        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'text-pine-500' : 'text-ink/70'}`
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/saved"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'text-pine-500' : 'text-ink/70'}`
            }
          >
            Saved{count > 0 ? ` (${count})` : ''}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
