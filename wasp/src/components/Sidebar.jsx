// ==========================================
// KOMPONENTA: Sidebar
// ==========================================
/*
    Ova komponenta predstavlja bočnu navigacijsku traku (sidebar) aplikacije.
    Sadrži logotip/naziv aplikacije ("Sonar"), navigacijske linkove (Home, Map)
    te gumb za prijavu (Sign in with Google) na dnu.

    Korištene Tailwind klase u komponenti:
    - sticky top-0: drži sidebar fiksiranim na vrhu ekrana pri skrolanju
    - flex h-screen w-64 flex-col: flexbox stupčasti raspored pune visine i fiksne širine (16rem / 256px)
    - justify-between: razmješta sadržaj tako da je navigacija gore, a gumb za prijavu dolje
    - bg-bijela & border-r border-rubovi-2: bijela pozadina i elegantni desni rub prema temi
    - px-6 py-6: unutarnji razmaci (padding) lijevo/desno (6) i gore/dolje (6)
    - text-xl font-bold tracking-tight text-akcent: stilizirani tirkizni naziv aplikacije
    - flex flex-col gap-1: vertikalni razmak između navigacijskih stavki
    - rounded-lg: zaobljenje rubova elemenata (8px)
    - transition: omogućuje glatku animaciju prijelaza pri hoveru
    - border border-akcent: tanak obrub u našoj akcent tirkiznoj boji za gumb prijave
*/

import { NavLink } from "react-router";

function klaseStavke({ isActive }) {
  const zajednicke =
    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition";
  return isActive
    ? `${zajednicke} bg-akcent-mekani text-akcent`
    : `${zajednicke} text-tekst-druga hover:bg-pozadinska hover:text-tekst-prva`;
}

export function Sidebar() {
  return (
    <aside className="border-rubovi-2 bg-bijela sticky top-0 flex h-screen w-64 flex-col justify-between border-r px-6 py-6">
      {/* Gornji dio: Naslov aplikacije i navigacija */}
      <div>
        {/* Naziv brenda / aplikacije */}
        <h1 className="text-akcent mb-8 text-xl font-bold tracking-tight">
          Sonar
        </h1>

        {/* Glavna navigacijska lista */}
        <nav className="flex flex-col gap-1">
          {/* Aktivna stavka: Home */}
          <NavLink to="/" end className={klaseStavke}>
            {/* Home ikona */}
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </NavLink>

          {/* Neaktivna stavka: Map */}
          <NavLink to="/map" className={klaseStavke}>
            {/* Map ikona */}
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            Map
          </NavLink>
        </nav>
      </div>

      {/* Donji dio: Gumb za prijavu (Sign in with Google) */}
      <div>
        <button
          type="button"
          className="border-akcent text-akcent hover:bg-akcent-blijedi flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition"
        >
          {/* Google logotip ikona */}
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.17 21.36 7.24 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.19C.43 8.1 0 9.99 0 12s.43 3.9 1.19 5.42l4.09-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.24 0 3.17 2.64 1.19 6.58l4.09 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </aside>
  );
}

// Izvoz komponente
export default Sidebar;