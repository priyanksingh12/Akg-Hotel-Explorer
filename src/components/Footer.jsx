export default function Footer() {
  return (
    <footer className="mt-16 border-t border-ink/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs text-ink/50 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>Waypoint — a demo hotel explorer built for a frontend module capstone.</p>
        <p className="font-mono">
          Data via{' '}
          <a
            href="https://demohotelsapi.pythonanywhere.com/"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-primary-500"
          >
            Hotel Search API
          </a>
        </p>
      </div>
    </footer>
  );
}
