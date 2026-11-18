// KOMPONENTA: SubpageHeader

/*
    Gornja traka podstranice: strelica natrag, naslov i neobavezni sadržaj
    s desne strane (npr. ikona dijeljenja ili tri točkice).

    Na desktopu traka ima i pretragu, zvonce s brojačem obavijesti i krug s
    inicijalima prijavljenog korisnika (kao u dizajnu stranice izvođača). To je
    KOPIJA istih dijelova iz Navbara: ako se pretraga ili obavijesti u Navbaru
    promijene, treba ih promijeniti i ovdje.

    Koristi se na svim podstranicama koje imaju strelicu natrag: npr. stranica koncerta,
    stranica izvođača i stranica mjesta. Zato ime NE sadrži naziv pojedine stranice.
    Razlikuje se od Navbara, koji je traka landing page-a s naslovom "Discover".

    Props (podaci koje komponenta prima od roditelja):
        - title: naslov trake (npr. "Concert" ili "Orbita")
        - children: neobavezno, sadržaj s desne strane. Svaka stranica šalje svoje
          ikone: koncert ima samo dijeljenje, izvođač dijeljenje i tri točkice.

    Koriste se Tailwind klase (boje su tokeni iz App.css, nikad hex):
        - sticky top-0 z-10: traka ostaje zalijepljena na vrhu pri skrolanju
        - flex items-center gap-3: elementi u redu, vertikalno centrirani
        - border-b border-rubovi-2 bg-bijela: bijela traka s tankim donjim rubom
        - px-4 py-3: unutarnji razmak na mobitelu, desktop:px-8 desktop:py-4 na desktopu
        - -ml-2: strelica je malo pomaknuta ulijevo da se vizualno poravna s rubom
        - h-9 w-9 rounded-lg: klikabilno područje strelice (36px)
        - hover:bg-pozadinska: blaga siva pozadina kad se pređe mišem
        - focus-visible:ring-2 focus-visible:ring-akcent: okvir pri navigaciji tipkovnicom
        - h-5 w-5: veličina ikone strelice (20px)
        - flex-1: naslov zauzima preostali prostor pa desni sadržaj ide skroz udesno
        - text-[17px] font-semibold: naslov, desktop:text-sm manji na desktopu
        - hidden desktop:block / desktop:flex: pretraga, zvonce i avatar vide se samo na desktopu
        - relative + absolute inset-y-0 left-0: ikona povećala unutar polja za pretragu
        - w-80: polje za pretragu je široko 20rem (320px)
        - rounded-full bg-akcent-mekani text-akcent: krug s inicijalima
        - bg-status-crveni: crveni brojač na zvoncu

    Strelica natrag koristi window.history.back(), što vraća korisnika na
    prethodnu stranicu. Ikona je /dizajn/ikone/back.svg (iz mape public).
*/

import { NavLink, useNavigate } from "react-router";
import { useAuth } from "wasp/client/auth";
import { Ikona } from "./navigacija";

// PRIVREMENO: broj nepročitanih obavijesti je fiksan (kao u Navbaru) dok ne
// postoji query za obavijesti
const BROJ_OBAVIJESTI = 2;

export function SubpageHeader({ title, children }) {
  // user je null ako korisnik nije prijavljen; nazKorisnik je ime iz Google profila
  const { data: user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Poziva se kad korisnik u polju pritisne Enter
  function pretrazi(e) {
    e.preventDefault(); // inače bi preglednik ponovno učitao cijelu stranicu
    const pojam = new FormData(e.currentTarget).get("q").toString().trim();
    if (!pojam) return; // prazan pojam: ne radimo ništa
    // encodeURIComponent: razmaci i "č" postanu ispravan dio adrese (npr. "Kiša u" -> "Ki%C5%A1a%20u")
    navigate(`/search?q=${encodeURIComponent(pojam)}`);
  }

  return (
    <header className="border-rubovi-2 bg-bijela desktop:px-8 desktop:py-4 sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3">
      {/* Strelica natrag (ikona back iz dizajna) */}
      <button
        type="button"
        onClick={() => window.history.back()}
        aria-label="Back"
        className="hover:bg-pozadinska focus-visible:ring-akcent -ml-2 flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:ring-2 focus-visible:outline-none"
      >
        <img src="/dizajn/ikone/back.svg" alt="" className="h-5 w-5" />
      </button>

      {/* Naslov */}
      <h1 className="text-tekst-prva desktop:text-sm flex-1 text-[17px] font-semibold">
        {title}
      </h1>

      {/* Ikone sa stranice (dijeljenje, tri točkice) */}
      {children}

      {/* Polje za pretragu: SAMO desktop */}
      <form
        onSubmit={pretrazi}
        role="search"
        className="desktop:block relative hidden w-80"
      >
        <span className="text-tekst-druga pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <img src="/dizajn/ikone/search.svg" alt="" className="h-4 w-4" />
        </span>
        <input
          name="q"
          type="search"
          aria-label="Search"
          placeholder="Search artists, releases, songs, venues"
          className="border-rubovi-1 bg-pozadinska text-tekst-prva placeholder:text-tekst-druga focus:bg-bijela focus:ring-akcent w-full rounded-lg border py-1.5 pr-4 pl-9 text-xs transition focus:ring-2 focus:outline-none"
        />
      </form>

      {/* Zvonce i krug s inicijalima: SAMO desktop i SAMO prijavljeni korisnik */}
      {!isLoading && user && (
        <div className="desktop:flex hidden items-center gap-2">
          <NavLink
            to="/notifications"
            aria-label={`Notifications (${BROJ_OBAVIJESTI} unread)`}
            className="text-tekst-druga hover:bg-pozadinska focus-visible:ring-akcent relative flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:ring-2 focus-visible:outline-none"
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

export default SubpageHeader;
