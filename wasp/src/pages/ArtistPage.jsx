// STRANICA ArtistPage
/*
Stranica izvođača (dizajn 3.3). Slaže se od vrha prema dolje. Zasad su gotovi
ArtistProfileCard (kartica izvođača s gumbima Follow i Like), Discography
(diskografija s filterima), PopularSongs (popis pjesama), UpcomingConcerts
(nadolazeći koncerti) i raspored u dva stupca. Dijelovi stranice dodaju
se jedan po jedan.

    Ljuska (SubpageHeader sa strelicom natrag, Sidebar, BottomTabs) je u App.tsx,
    pa ovdje dolazi samo sadržaj stranice.

    Podaci su zasad PROBNI: objekt "izvodjac" na vrhu datoteke. Komponente primaju
    podatke samo kroz propse, pa se kasnije mijenja samo taj objekt.

    Koriste se Tailwind klase:
    - p-4 desktop:p-6: razmak sadržaja
    - mt-6: razmak između kartice izvođača i stupaca ispod nje
    - flex flex-col gap-6: na mobitelu je sve u jednom stupcu
    - desktop:grid desktop:grid-cols-[1fr_20rem]: na desktopu su dva stupca, desni je širok 20rem
    - desktop:items-start: stupci se ne razvlače do iste visine
    - min-w-0: nužan da dugi tekst ne razvuče lijevi stupac
    - space-y-6: razmak između dijelova unutar stupca
*/

import { ArtistProfileCard } from "../components/ArtistProfileCard";
import { Discography } from "../components/Discography";
import PopularSongs from "../components/PopularSongs";
import { UpcomingConcerts } from "../components/UpcomingConcerts";
import { AboutArtist } from "../components/AboutArtist";

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
  concerts: [
    {
      id: 1,
      title: "Orbita + Kiša u Svibnju",
      date: "Fri 20 Nov",
      time: "20:00",
      venue: "Dom kulture, Zagreb",
      image: "/dizajn/izvodjaci/orbita.svg",
    },
    {
      id: 2,
      title: "Plavi Sat + Orbita",
      date: "Sat 14 Nov",
      time: "21:00",
      venue: "Klub Obala, Rijeka",
      image: "/dizajn/izvodjaci/orbita.svg",
    },
    {
      id: 3,
      title: "Orbita",
      date: "Sat 9 Jan",
      time: "21:00",
      venue: "Klub Tunel, Split",
      image: "/dizajn/izvodjaci/orbita.svg",
    },
  ],
  about:
    "Four-piece from Zagreb. Started in a basement in Trešnjevka in 2018, two albums since. Long songs, loud endings.",
  links: [
    { label: "orbita.example", url: "https://orbita.example" },
    { label: "Bandcamp", url: "https://orbita.bandcamp.com" },
  ],
};

export function ArtistPage() {
  return (
      <div className="desktop:p-6 p-4">
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
            <UpcomingConcerts concerts={izvodjac.concerts} />
            <AboutArtist description={izvodjac.about} links={izvodjac.links} />
            {/* Fans also like */}
          </div>
        </div>
      </div>
  );
}

export default ArtistPage;
