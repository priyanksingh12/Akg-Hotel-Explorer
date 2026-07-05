import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-24 text-center sm:px-8">
      <p className="font-mono text-xs uppercase tracking-widest text-pine-600">404</p>
      <h1 className="font-display text-4xl font-semibold text-ink">Wrong platform.</h1>
      <p className="max-w-sm text-ink/60">
        This route doesn&rsquo;t exist. Let&rsquo;s get you back to the listings.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-full bg-ink px-5 py-2 font-mono text-xs uppercase tracking-widest text-paper transition hover:bg-pine-600"
      >
        Back to all stays
      </Link>
    </div>
  );
}
