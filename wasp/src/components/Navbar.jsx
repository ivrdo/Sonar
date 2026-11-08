// KOMPONENTA: Navbar

/*
    Ova komponenta predstavlja gornju navigacijsku traku aplikacije.
    Navbar nudi korisniku mogućnost pretraživanja.
*/

export function Navbar() {
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
    <header className="border-rubovi-2 bg-bijela sticky top-0 z-10 flex items-center justify-between border-b px-8 py-4">
      {/* Naslov stranice */}
      <h2 className="text-tekst-prva text-xl font-bold tracking-tight">
        Discover
      </h2>

      {/* Polje za pretragu s ikonom */}
      {/* Vanjski kontejner mora biti 'relative' kako bi se ikona pozicionirala pomoću 'absolute' */}
      <div className="relative w-80">
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
        {/* Input polje za pretragu */}
        <input
          type="text"
          placeholder="Search artists, releases, songs, venues"
          className="border-rubovi-1 bg-pozadinska text-tekst-prva placeholder-tekst-treća focus:bg-bijela focus:ring-akcent w-full rounded-lg border py-1.5 pr-4 pl-9 text-xs transition focus:ring-2 focus:outline-none"
        />
      </div>
    </header>
  );
}

// Izvoz komponente za korištenje u drugim dijelovima aplikacije
export default Navbar;
