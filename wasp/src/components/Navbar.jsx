// KOMPONENTA: Navbar

/*
    Ova komponenta predstavlja gornju navigacijsku traku aplikacije.
    Navbar nudi korisniku mogućnost pretraživanja.
*/
import { NavLink, useNavigate, useSearchParams } from "react-router";
import { Ikona } from "./navigacija";

export function Navbar({title="Discover"}) {
  // useNavigate: funkcija kojom kodom mijenjamo adresu (odlazak na drugu stranicu)
  const navigate = useNavigate();
  // useSearchParams: čita dio adrese iza "?" (npr. q=mjesec iz /search?q=mjesec)
  const [searchParams] = useSearchParams();
  const trenutniPojam = searchParams.get("q") ?? ""; // "" ako u adresi nema ?q=

  // Poziva se kad korisnik u polju pritisne Enter
  function pretrazi(e) {
    e.preventDefault(); // inače bi preglednik ponovno učitao cijelu stranicu
    const pojam = new FormData(e.currentTarget).get("q").toString().trim();
    if (!pojam) return; // prazan pojam: ne radimo ništa
    // encodeURIComponent: razmaci i "č" postanu ispravan dio adrese (npr. "Kiša u" -> "Ki%C5%A1a%20u")
    navigate(`/search?q=${encodeURIComponent(pojam)}`);
  }

  return (
    /*
        Glavni element navigacije.
        Koriste se Tailwind klase:
            - sticky top-0: traka je zalijepljena na vrhu ekrana prilikom skrolanja
            - z-10: postavlja element u viši sloj (z-level) kako bi bio iznad svog ostalog sadržaja
            - flex items-center justify-between: css kod (web iz 4. semestra...)
            - bg-white border-b border-rubovi-2: boja pozadine i rubova
            - px-8 py-4: definirani padding lijevo/desno i gore/dolje
            - text-xl: postavlja veličinu teksta na xl (20px)
            - text-xs: postavlja veličinu teksta na xs (12px)
            - font-bold: podebljan tekst
            - tracking-tight: prilagođava prored između slova
            - pointer-events-none: sprječava klikove miša po tom elementu
            - inset-y-0: postavlja top: 0 i bottom: 0
            - left-0: postavlja left: 0
            - h-4 w-4: definira height i width (4 označava 1rem (16px))
            - w-full: širina 100% (zauzima cijeli prozor roditelja)
            - w-80: fiksna širina od 20rem (320px)
            - pl-3, pl-9, pr-4, py-1.5: padding za lijevu (l) i desnu (r) te vertikalnu os (y)
            - focus:... : aktivira se kada je element u stanju fokusa, tj. kada korisnik klikne na element
            - focus:ring-2: dodaje obrubni prsten debljine 2px pri fokusu
            - focus:outline-none: uklanja zadani obrub
            - relative: na div bloku služi kao za apsolutno pozicioniranje ikone
            - rounded-lg: zaobljenje rubova (8px)
            - border: postavlja širinu ruba na 1px
            - transition: glatka animacija (npr. kada se mijenja boja pozadine na focus)
      */
    <header className="border-rubovi-2 bg-bijela desktop:px-8 desktop:py-4 sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3">
      {/* Naslov stranice */}
      <h2 className="text-tekst-prva desktop:text-xl min-w-0 flex-1 truncate text-[17px] font-bold tracking-tight">
        {title}
      </h2>

      {/* Polje za pretragu s ikonom */}
      {/* Vanjski kontejner mora biti 'relative' kako bi se ikona pozicionirala pomoću 'absolute' */}
      {/* Polje za pretragu: SAMO desktop */}
      {/* form + onSubmit: Enter u polju pokreće pretragu; role="search" govori čitačima ekrana da je ovo pretraga */}
      <form
        onSubmit={pretrazi}
        role="search"
        className="desktop:block relative hidden w-80"
      >
        {/* Pozicioniranje SVG ikone unutar lijeve strane input polja za pretragu */}
        <span className="text-tekst-treća pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
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
        {/*
          Input polje za pretragu:
            - name="q": po tom imenu FormData pronalazi vrijednost polja
            - defaultValue: na /search?q=mjesec polje već prikazuje "mjesec"
            - key: kad se adresa promijeni (npr. tipka Natrag), polje se osvježi
            - type="search": preglednik dodaje gumb za brisanje (x)
        */}
        <input
          key={trenutniPojam}
          name="q"
          type="search"
          defaultValue={trenutniPojam}
          aria-label="Search"
          placeholder="Search artists, releases, songs, venues"
          className="border-rubovi-1 bg-pozadinska text-tekst-prva placeholder-tekst-treća focus:bg-bijela focus:ring-akcent w-full rounded-lg border py-1.5 pr-4 pl-9 text-xs transition focus:ring-2 focus:outline-none"
        />
      </form>

      {/* Ikone: SAMO mobitel */}
      <div className="desktop:hidden flex items-center gap-1">
        <NavLink
          // ako u adresi već postoji pojam (npr. /search?q=mjesec), ikona ga zadrži
          to={
            trenutniPojam
              ? `/search?q=${encodeURIComponent(trenutniPojam)}`
              : "/search"
          }
          aria-label="Search"
          className="flex h-11 w-11 items-center justify-center rounded-lg"
        >
          <Ikona ime="search" />
        </NavLink>
        <NavLink
          to="/notifications"
          aria-label="Notifications"
          className="relative flex h-11 w-11 items-center justify-center rounded-lg"
        >
          <Ikona ime="bell" />
          {/* crveni brojač kao u dizajnu */}
          <span className="bg-status-crveni absolute top-1 right-1 min-w-[17px] rounded-full px-1 text-center text-[10.5px] leading-[17px] font-bold text-white">
            2
          </span>
        </NavLink>
      </div>
    </header>
  );
}

// Izvoz komponente za korištenje u drugim dijelovima aplikacije
export default Navbar;
