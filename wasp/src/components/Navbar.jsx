// KOMPONENTA: Navbar

/*
    Ova komponenta predstavlja gornju navigacijsku traku aplikacije.
    Navbar nudi korisniku mogućnost pretraživanja.

    Prijavljeni korisnik na desktopu desno od pretrage vidi zvonce za obavijesti
    (s brojačem) i krug sa svojim inicijalima koji vodi na /profile.
*/
import { NavLink, useNavigate, useSearchParams } from "react-router";
import { useAuth } from "wasp/client/auth";
import { Ikona } from "./navigacija";

// PRIVREMENO: broj nepročitanih obavijesti je fiksan (kao u dizajnu) dok ne
// postoji query za obavijesti (tablica Obavijest, polje procitano)
const BROJ_OBAVIJESTI = 2;

/*
    Props:
        - title: naslov trake
        - pretraga: false sakriva polje za pretragu (desktop) i ikone pretrage
          i obavijesti (mobitel); npr. na stranici /login. Zadano: true
*/
export function Navbar({title="Discover", pretraga = true}) {
  // user je null ako korisnik nije prijavljen; nazKorisnik je ime iz Google profila
  const { data: user, isLoading } = useAuth();

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
      {pretraga && (
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
      )}

      {/* Ikone: SAMO mobitel (povećalo uvijek, zvonce samo prijavljenom korisniku) */}
      {pretraga && (
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
        {/* Zvonce samo za prijavljenog korisnika (neprijavljeni nema obavijesti) */}
        {!isLoading && user && (
          <NavLink
            to="/notifications"
            aria-label="Notifications"
            className="relative flex h-11 w-11 items-center justify-center rounded-lg"
          >
            <Ikona ime="bell" />
            {/* crveni brojač kao u dizajnu */}
            <span className="bg-status-crveni absolute top-1 right-1 min-w-[17px] rounded-full px-1 text-center text-[10.5px] leading-[17px] font-bold text-white">
              {BROJ_OBAVIJESTI}
            </span>
          </NavLink>
        )}
      </div>
      )}

      {/*
        SAMO desktop i SAMO prijavljeni korisnik: zvonce s brojačem i krug s inicijalima.
        Stoje desno od polja za pretragu. Dok se prijava provjerava (isLoading), ne prikazuju se.
      */}
      {!isLoading && user && (
        <div className="desktop:flex hidden items-center gap-2">
          <NavLink
            to="/notifications"
            aria-label={`Notifications (${BROJ_OBAVIJESTI} unread)`}
            className="hover:bg-pozadinska focus-visible:ring-akcent text-tekst-druga relative flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:ring-2 focus-visible:outline-none"
          >
            <Ikona ime="bell" />
            <span className="bg-status-crveni absolute -top-0.5 -right-0.5 min-w-[17px] rounded-full px-1 text-center text-[10.5px] leading-[17px] font-bold text-white">
              {BROJ_OBAVIJESTI}
            </span>
          </NavLink>
          <NavLink
            to="/profile"
            aria-label="Profile"
            title={user.nazKorisnik}
            className="bg-akcent-mekani text-akcent focus-visible:ring-akcent flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition hover:brightness-95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {inicijali(user.nazKorisnik)}
          </NavLink>
        </div>
      )}
    </header>
  );
}

/*
    Inicijali iz imena: prvo slovo prve i zadnje riječi, velikim slovima.
        "Filip Juračić" -> "FJ", "Ana" -> "A", "" -> "?"
*/
function inicijali(ime) {
  const rijeci = (ime ?? "").trim().split(/\s+/).filter(Boolean);
  if (rijeci.length === 0) return "?";
  const prvo = rijeci[0][0];
  const zadnje = rijeci.length > 1 ? rijeci[rijeci.length - 1][0] : "";
  return (prvo + zadnje).toUpperCase();
}

// Izvoz komponente za korištenje u drugim dijelovima aplikacije
export default Navbar;
