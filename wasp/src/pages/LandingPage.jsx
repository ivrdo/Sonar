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
