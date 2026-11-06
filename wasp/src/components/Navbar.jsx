// ==========================================
// KOMPONENTA: Navbar
// Opis: Gornja navigacijska traka s bijelom pozadinom, naslovom "Discover" i poljem za pretragu.
// ==========================================

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4">
      {/* Naslov sekcije */}
      <h2 className="text-xl font-bold tracking-tight text-gray-900">
        Discover
      </h2>

      {/* Polje za pretragu s ikonom */}
      <div className="relative w-80">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search artists, releases, songs, venues"
          className="w-full rounded-lg border border-slate-200 bg-slate-100 py-1.5 pr-4 pl-9 text-xs text-gray-700 placeholder-gray-400 transition focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
        />
      </div>
    </header>
  );
}

export default Navbar;
