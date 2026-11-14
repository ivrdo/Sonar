// STRANICA ArtistPage
/*
Stranica izvođača (dizajn 3.3). Slaže se od vrha prema dolje. Zasad su gotovi
SubpageHeader (traka sa strelicom natrag, dijeljenjem i tri točkice),
ArtistProfileCard (kartica izvođača s gumbima Follow i Like) i raspored
u dva stupca. Dijelovi stranice dodaju se jedan po jedan.

    Okvir je isti kao na stranici koncerta: omotač, SubpageHeader, sadržaj i BottomTabs.

    Podaci su zasad PROBNI: objekt "izvodjac" na vrhu datoteke. Komponente primaju
    podatke samo kroz propse, pa se kasnije mijenja samo taj objekt.

    Koriste se Tailwind klase:
    - bg-pozadinska min-h-screen: pozadina stranice, najmanje visine cijelog ekrana
    - desktop:hidden: ikone dijeljenja i tri točkice vide se samo na mobitelu
    - p-4 desktop:p-6 pb-20: razmak sadržaja, pb-20 da zadnji dio ne ostane iza
      fiksne donje navigacije
    - mt-6: razmak između kartice izvođača i stupaca ispod nje
    - flex flex-col gap-6: na mobitelu je sve u jednom stupcu
    - desktop:grid desktop:grid-cols-[1fr_20rem]: na desktopu su dva stupca, desni je širok 20rem
    - desktop:items-start: stupci se ne razvlače do iste visine
    - min-w-0: nužan da dugi tekst ne razvuče lijevi stupac
    - space-y-6: razmak između dijelova unutar stupca
*/

import { SubpageHeader } from "../components/SubpageHeader";
import { BottomTabs } from "../components/BottomTabs";
import { ArtistProfileCard } from "../components/ArtistProfileCard";

// PRIVREMENO: probni podaci dok query dohvatiIzvodjaca nije gotov.
const izvodjac = {
  name: "Orbita",
  image: "/dizajn/izvodjaci/orbita.svg",
  tags: ["indie rock", "melancholic"],
  city: "Zagreb",
  rating: 4.6,
  ratingsCount: 128,
  followers: 2341,
  following: false,
  liked: false,
};

export function ArtistPage() {
  return (
    <div className="bg-pozadinska min-h-screen">
      <SubpageHeader title={izvodjac.name}>
        {/* Ikone dijeljenja i tri točkice (samo mobitel). Funkcije se dodaju kasnije */}
        <div className="desktop:hidden flex items-center gap-1">
          <button
            type="button"
            aria-label="Share"
            className="hover:bg-pozadinska focus-visible:ring-akcent flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:ring-2 focus-visible:outline-none"
          >
            <img src="/dizajn/ikone/share.svg" alt="" className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="More options"
            className="hover:bg-pozadinska focus-visible:ring-akcent flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:ring-2 focus-visible:outline-none"
          >
            <img src="/dizajn/ikone/more.svg" alt="" className="h-5 w-5" />
          </button>
        </div>
      </SubpageHeader>

      <main className="desktop:p-6 p-4 pb-20">
        <ArtistProfileCard
          image={izvodjac.image}
          name={izvodjac.name}
          tags={izvodjac.tags}
          city={izvodjac.city}
          rating={izvodjac.rating}
          ratingsCount={izvodjac.ratingsCount}
          followers={izvodjac.followers}
          following={izvodjac.following}
          liked={izvodjac.liked}
        />

        <div className="desktop:grid desktop:grid-cols-[1fr_20rem] desktop:items-start mt-6 flex flex-col gap-6">
          {/* Lijevi stupac */}
          <div className="min-w-0 space-y-6">
            {/* Next near you, Discography, Popular songs, Ratings & reviews */}
          </div>

          {/* Desni stupac */}
          <div className="space-y-6">
            {/* Upcoming concerts, About, Fans also like */}
          </div>
        </div>
      </main>

      <BottomTabs />
    </div>
  );
}

export default ArtistPage;
