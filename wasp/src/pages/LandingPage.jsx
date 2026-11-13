// KOMPONENTA: LandingPage

/*
    Ovo je glavna stranica (landing page) naše aplikacije, služi kao kontejner
    za slaganje vizualnih komponenti sučelja.

    U početnoj fazi razvoja, stanica je namjerno pojednostavljena kako bismo
    stabilno postavili i u potpunosti razumjeli temelje layouta (trenutno sadrži samo navbar)
*/

// Uvozimo navbar i sidebar komponente definirane u direktoriju ../src/components.
// Koristi se relativna putanja.
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { BottomTabs } from "../components/BottomTabs";
import { HeroBanner } from "../components/HeroBanner.jsx";
import { LandingPageFilterButtons } from "../components/LandingPageFilterButtons.jsx";
import { ConcertCard } from "../components/ConcertCard.jsx";
import { PopularArtists } from "../components/PopularArtists.jsx";

/*
    Definicija i uvoz glavne funkcionalne komponente LandingPage.
    U Reactu, komponente su JavaScript funkcije koje vraćaju JSX strukturu, koja se kasnije pretvara u DOM elemente.
*/
export function LandingPage() {
  return (
    /*
        Ovo je glavni wrapper cijele stranice.

        Koriste se Tailwind klase:
            - min-h-screen: visina elemenata je jednaka visini cijelog prozora preglednika (100vh)
            - bg-pozadinska: koristi se unaprijed definirana boja pozadine iz App.tsx datoteke
      */
    <div className="bg-pozadinska flex min-h-screen">
      {" "}
      {/* div blok u kojem se prikazuje navbar i sidebar */}
      <Sidebar />{" "}
      {/* Ovdje se stavlja i prikazuje sidebar uz lijevi rub stranice. */}
      <div className="flex flex-1 flex-col">
        {" "}
        {/* div blok za cijeli prostor desno od sidebara */}
        <Navbar /> {/* Ovdje se stavlja i prikazuje navbar na vrhu stranice. */}
        <div className="desktop:px-8 desktop:py-6 flex flex-col gap-5 p-4">
          {/* Ovdje dolaze sekcije: Upcoming concerts, Popular on Sonar, Venues… */}
          <HeroBanner /> {/* Početni "Live music near you..." tekst */}
          <LandingPageFilterButtons />{" "}
          {/* Filter gumbi: Everything, Concerts, Artists, Venues */}
          {/* SEKCIJA: Upcoming concerts - Zaglavlje */}
          <div className="flex items-center justify-between">
            {/* Naslov sekcije */}
            <h2 className="text-tekst-prva text-base font-bold">
              Upcoming concerts
            </h2>
            {/* Poveznica "See all" uz desni rub */}
            <a
              href="#"
              className="text-akcent text-xs font-medium hover:underline"
            >
              See all
            </a>
          </div>
          {/* Grid kontejner s 4 hard-kodirane kartice (PRIVREMENO!!!) */}
          <div className="desktop:grid-cols-2 grid grid-cols-1 gap-3">
            <ConcertCard
              id={1}
              title="Orbita + Kiša u Svibnju"
              date="Fri 20 Nov"
              time="20:00"
              venue="Dom kulture, Zagreb"
              image="/dizajn/izvodjaci/orbita.svg"
            />
            <ConcertCard
              id={2}
              title="Noćni Autobus"
              date="Sat 21 Nov"
              time="22:00"
              venue="Tvornica Zvuka, Zagreb"
              image="/dizajn/izvodjaci/nocni-autobus.svg"
            />
            <ConcertCard
              id={3}
              title="Plavi Sat + Orbita"
              date="Sat 14 Nov"
              time="21:00"
              venue="Klub Obala, Rijeka"
              image="/dizajn/izvodjaci/plavi-sat.svg"
            />
            <ConcertCard
              id={4}
              title="Mali Mjesec"
              date="Thu 3 Dec"
              time="20:30"
              venue="Dom kulture, Zagreb"
              image="/dizajn/izvodjaci/mali-mjesec.svg"
            />
          </div>
          {/* SEKCIJA: Popular on Sonar */}
          <div className="mt-4">
            <PopularArtists />
          </div>
        </div>
      </div>
      <BottomTabs />
    </div>
  );
}

/*
    Export omogućuje da se LandingPage uvozi u Wasp rutu ili druge dijelove aplikacije
    bez korištenja vitičastih zagrada pri uvozu.
*/
export default LandingPage;
