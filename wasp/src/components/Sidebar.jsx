// ==========================================
// KOMPONENTA: Sidebar
// ==========================================
/*
    Ova komponenta predstavlja bočnu navigacijsku traku (sidebar) aplikacije.
    Sadrži logotip/naziv aplikacije ("Sonar"), navigacijske linkove (isti popis kao BottomTabs: Home, Search, Map, Tickets, Profile)
    te na dnu gumb za prijavu (Sign in with Google), koji nakon prijave nestaje.

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
import { Link } from "wasp/client/router";
import { useAuth, logout } from "wasp/client/auth";
import { GLAVNE_STRANICE, Ikona } from "./navigacija";
import { GoogleIkona } from "./GoogleIkona";

function klaseStavke({ isActive }) {
  const zajednicke =
    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition";
  return isActive
    ? `${zajednicke} bg-akcent-mekani text-akcent`
    : `${zajednicke} text-tekst-druga hover:bg-pozadinska hover:text-tekst-prva`;
}

export function Sidebar() {
  // user je null ako korisnik nije prijavljen; inače ima polja iz tablice Korisnik
  const { data: user, isLoading } = useAuth();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 flex-none flex-col justify-between border-r border-rubovi-2 bg-bijela px-6 py-6 desktop:flex">
      {/* Gornji dio: Naslov aplikacije i navigacija */}
      <div>
        {/* Naziv brenda / aplikacije */}
        <h1 className="text-akcent mb-8 text-xl font-bold tracking-tight">
          Sonar
        </h1>

        {/* Glavna navigacijska lista: isti popis kao BottomTabs (navigacija.jsx) */}
        <nav aria-label="Main" className="flex flex-col gap-1">
          {GLAVNE_STRANICE.map((s) => (
            <NavLink
              key={s.to}
              to={s.to}
              end={s.to === "/"}
              className={klaseStavke}
            >
              <Ikona ime={s.ikona} />
              {s.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/*
        Donji dio ovisi o prijavi (dok se provjerava, isLoading, ne prikazuje se ništa):
          - nije prijavljen: "Sign in with Google", vodi na /login
          - prijavljen: PRIVREMENA poveznica "Sign out" (dok ne postoji stranica profila)
      */}
      <div>
        {!isLoading && user && (
          // PRIVREMENO: odjava. logout() briše sesiju, pa se opet pojavi "Sign in with Google"
          <button
            type="button"
            onClick={() => logout()}
            className="text-tekst-druga hover:text-akcent focus-visible:ring-akcent w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            Sign out
          </button>
        )}
        {!isLoading && !user && (
        <Link
          to="/login"
          className="border-akcent text-akcent hover:bg-akcent-blijedi focus-visible:ring-akcent flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition focus-visible:ring-2 focus-visible:outline-none"
        >
          <GoogleIkona />
          Sign in with Google
        </Link>
        )}
      </div>
    </aside>
  );
}

// Izvoz komponente
export default Sidebar;