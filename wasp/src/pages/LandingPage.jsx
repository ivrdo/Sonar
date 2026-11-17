// KOMPONENTA: LandingPage

/*
    Ovo je glavna stranica (landing page) naše aplikacije, služi kao kontejner
    za slaganje vizualnih komponenti sučelja.

    Ljuska (Sidebar, Navbar, BottomTabs, footer) je u App.tsx, pa ovdje
    dolazi samo sadržaj stranice.

    Filter gumbi odlučuju koje se sekcije prikazuju ispod njih:
        - Everything: sve tri sekcije
        - Concerts: samo Upcoming concerts
        - Artists: samo Popular on Sonar
        - Venues: samo Venues
    Odabrani filter pamti se u stanju (useState); HeroBanner je uvijek vidljiv.
*/

import { useState } from "react";
import { HeroBanner } from "../components/HeroBanner.jsx";
import { LandingPageFilterButtons } from "../components/LandingPageFilterButtons.jsx";
/*
    PRIVREMENO: sekcije prikazuju PROBNE podatke,
    a ne podatke iz baze. Koriste se "View" verzije komponenti, koje samo crtaju
    zadani popis (PROBNI_KONCERTI, PROBNI_IZVODJACI, PROBNA_MJESTA).

    Kad budemo dohvaćali podatke iz baze, ovdje vratiti komponente s queryjem:
        UpcomingConcertsView -> UpcomingConcertsSection
        PopularArtistsView   -> PopularArtists
        VenuesSectionView    -> VenuesSection
*/
import { UpcomingConcertsView } from "../components/UpcomingConcertsSection.tsx";
import { PopularArtistsView } from "../components/PopularArtists.jsx";
import { VenuesSectionView } from "../components/VenuesSection.tsx";
/*
    Definicija i uvoz glavne funkcionalne komponente LandingPage.
    U Reactu, komponente su JavaScript funkcije koje vraćaju JSX strukturu, koja se kasnije pretvara u DOM elemente.
*/
export function LandingPage() {
  // Odabrani filter: "all", "concerts", "artists" ili "venues"
  const [filter, setFilter] = useState("all");

  // Prikazuje li se sekcija za zadani filter (Everything prikazuje sve)
  const prikazi = (vrsta) => filter === "all" || filter === vrsta;

  return (
    <div className="desktop:px-8 desktop:py-6 flex flex-col gap-5 p-4">
      <HeroBanner /> {/* Početni "Live music near you..." tekst */}
      {/* Filter gumbi: Everything, Concerts, Artists, Venues */}
      <LandingPageFilterButtons active={filter} onChange={setFilter} />

      {/* SEKCIJA: Upcoming concerts */}
      {prikazi("concerts") && <UpcomingConcertsView />}
      {/* SEKCIJA: Popular on Sonar */}
      {prikazi("artists") && (
        <div className={filter === "all" ? "mt-4" : ""}>
          <PopularArtistsView />
        </div>
      )}
      {/* SEKCIJA: Venues */}
      {prikazi("venues") && (
        <div className={filter === "all" ? "mt-4" : ""}>
          <VenuesSectionView />
        </div>
      )}
    </div>
  );
}

/*
    Export omogućuje da se LandingPage uvozi u Wasp rutu ili druge dijelove aplikacije
    bez korištenja vitičastih zagrada pri uvozu.
*/
export default LandingPage;
