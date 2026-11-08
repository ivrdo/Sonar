// KOMPONENTA: LandingPage

/*
    Ovo je glavna stranica (landing page) naše aplikacije, služi kao kontejner
    za slaganje vizualnih komponenti sučelja.

    U početnoj fazi razvoja, stanica je namjerno pojednostavljena kako bismo
    stabilno postavili i u potpunosti razumjeli temelje layouta (trenutno sadrži samo navbar)
*/

// Uvozimo navbar komponentu definiranu u direktoriju s komponentama.
// Koristi se relativna putanja.
import { Navbar } from "../components/Navbar";

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
    <div className="min-h-screen bg-pozadinska"> {/* div blok u kojem se prikazuje navbar */}
      <Navbar /> {/* Ovdje se stavlja i prikazuje navbar na vrhu stranice. */}
    </div>
  );
}

/*
    Export omogućuje da se LandingPage uvozi u Wasp rutu ili druge dijelove aplikacije
    bez korištenja vitičastih zagrada pri uvozu.
*/
export default LandingPage;
