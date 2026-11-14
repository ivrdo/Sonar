// STRANICA ArtistPage
/*
Stranica izvođača (dizajn 3.3). Slaže se od vrha prema dolje. Zasad su gotovi
SubpageHeader (traka sa strelicom natrag, dijeljenjem i tri točkice),
ArtistProfileCard (kartica izvođača s gumbima Follow i Like), Discography
(diskografija s filterima), PopularSongs (popis pjesama) i raspored u dva
stupca. Dijelovi stranice dodaju se jedan po jedan.

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
import { Discography } from "../components/Discography";
import PopularSongs from "../components/PopularSongs";

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
  releases: [
    {
      id: 1,
      title: "Valovi",
      type: "Album",
      year: 2024,
      cover: "/dizajn/naslovnice/valovi.svg",
    },
    {
      id: 2,
      title: "Prvi val",
      type: "Album",
      year: 2021,
      cover: "/dizajn/naslovnice/prvi-val.svg",
    },
    {
      id: 3,
      title: "Plima",
      type: "EP",
      year: 2023,
      cover: "/dizajn/naslovnice/plima.svg",
    },
    {
      id: 4,
      title: "Kratki spoj",
      type: "EP",
      year: 2022,
      cover: "/dizajn/naslovnice/kratki-spoj.svg",
    },
    {
      id: 5,
      title: "Bez mjeseca",
      type: "Single",
      year: 2024,
      cover: "/dizajn/naslovnice/bez-mjeseca.svg",
    },
    {
      id: 6,
      title: "Sidrište",
      type: "Single",
      year: 2023,
      cover: "/dizajn/naslovnice/sidriste.svg",
    },
    {
      id: 7,
      title: "Demo 2019",
      type: "Single",
      year: 2019,
      cover: "/dizajn/naslovnice/demo-2019.svg",
    },
    {
      id: 8,
      title: "Uživo u Tvornici",
      type: "Live",
      year: 2025,
      cover: "/dizajn/naslovnice/uzivo-u-tvornici.svg",
    },
  ],

  songs: [
    {
      id: 1,
      title: "Plima",
      album: "Plima",
      type: "EP",
      cover: "/dizajn/naslovnice/plima.svg",
      rating: 4.4,
      duration: "4:12",
      liked: false,
    },
    {
      id: 2,
      title: "Bez mjeseca",
      album: "Bez mjeseca",
      type: "Single",
      cover: "/dizajn/naslovnice/bez-mjeseca.svg",
      rating: 4.8,
      duration: "3:38",
      liked: true,
    },
    {
      id: 3,
      title: "Valovi",
      album: "Valovi",
      type: "Album",
      cover: "/dizajn/naslovnice/valovi.svg",
      rating: 4.6,
      duration: "5:21",
      liked: false,
    },
    {
      id: 4,
      title: "Sidro",
      album: "Valovi",
      type: "Album",
      cover: "/dizajn/naslovnice/valovi.svg",
      rating: 4.1,
      duration: "3:05",
      liked: false,
    },
    {
      id: 5,
      title: "Svjetionik",
      album: "Valovi",
      type: "Album",
      cover: "/dizajn/naslovnice/valovi.svg",
      rating: 4.5,
      duration: "4:47",
      liked: false,
    },
  ],
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
            {/* Next near you, Ratings & reviews */}
            <Discography releases={izvodjac.releases} />
            <PopularSongs songs={izvodjac.songs} />
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
