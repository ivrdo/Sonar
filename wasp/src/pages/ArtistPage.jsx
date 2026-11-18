// STRANICA ArtistPage
/*
Stranica izvođača (dizajn 3.3). Slaže se od vrha prema dolje. Zasad su gotovi
ArtistProfileCard (kartica izvođača s gumbima Follow i Like), Discography
(diskografija s filterima), PopularSongs (popis pjesama), UpcomingConcerts
(nadolazeći koncerti) i raspored u dva stupca. Dijelovi stranice dodaju
se jedan po jedan.

    Ljuska (SubpageHeader sa strelicom natrag, Sidebar, BottomTabs) je u App.tsx,
    pa ovdje dolazi samo sadržaj stranice.

    Podatke dohvaća query dohvatiIzvodjaca (useQuery). Adresa /artists/:id sadrži
    mbid izvođača. Query vraća podatke u obliku iz baze (albumi, pjesme...), pa se
    na početku funkcije složi objekt "izvodjac" s poljima koja komponente očekuju.
    Dijelovi koje query (još) ne vraća imaju privremene vrijednosti, označene
    komentarom PRIVREMENO.

    Tri stanja stranice: učitavanje (isLoading), greška ili izvođač ne postoji (error)
    i inače crtanje stranice.

    Koriste se Tailwind klase:
    - p-4 desktop:p-6: razmak sadržaja
    - mt-6: razmak između kartice izvođača i stupaca ispod nje
    - flex flex-col gap-6: na mobitelu je sve u jednom stupcu
    - desktop:grid desktop:grid-cols-[1fr_20rem]: na desktopu su dva stupca, desni je širok 20rem
    - desktop:items-start: stupci se ne razvlače do iste visine
    - min-w-0: nužan da dugi tekst ne razvuče lijevi stupac
    - space-y-6: razmak između dijelova unutar stupca
*/
import { useParams } from "react-router";
import { useQuery, dohvatiIzvodjaca } from "wasp/client/operations";
import { ArtistProfileCard } from "../components/ArtistProfileCard";
import { Discography } from "../components/Discography";
import PopularSongs from "../components/PopularSongs";
import { UpcomingConcerts } from "../components/UpcomingConcerts";
import { AboutArtist } from "../components/AboutArtist";

// PRIVREMENO
const NASLOVNICE = [
  "/dizajn/naslovnice/valovi.svg",
  "/dizajn/naslovnice/prvi-val.svg",
  "/dizajn/naslovnice/plima.svg",
  "/dizajn/naslovnice/kratki-spoj.svg",
  "/dizajn/naslovnice/bez-mjeseca.svg",
  "/dizajn/naslovnice/sidriste.svg",
  "/dizajn/naslovnice/demo-2019.svg",
  "/dizajn/naslovnice/uzivo-u-tvornici.svg",
];

// Trajanje u sekundama kao "4:12" (prazno ako trajanje nije poznato)
function trajanjeTekst(sekunde) {
  if (!sekunde) return "";
  const minute = Math.floor(sekunde / 60);
  const sek = String(sekunde % 60).padStart(2, "0");
  return `${minute}:${sek}`;
}

export function ArtistPage() {
  const { id } = useParams();
  // Adresa /artists/:id sadrži mbid izvođača, a query ga prima kao "mbid"
  const { data: baza, isLoading, error } = useQuery(dohvatiIzvodjaca, { mbid: id });

  if (isLoading) {
    return <p className="text-tekst-druga desktop:p-6 p-4">Loading artist...</p>;
  }

  if (error || !baza) {
    return (
      <p className="text-tekst-druga desktop:p-6 p-4">
        {error?.statusCode === 404 || error?.statusCode === 400
          ? "Artist not found."
          : "Something went wrong. Please try again."}
      </p>
    );
  }

  // Izdanja: albumi su tipa "Album", a pjesme bez albuma su "Single"
  const albumi = baza.albumi.map((a, index) => ({
    id: `album-${a.sifAlbum}`,
    title: a.nazAlbum,
    type: "Album",
    year: a.godinaIzdanja,
    cover: NASLOVNICE[index % NASLOVNICE.length],
  }));
  const singlovi = baza.pjesme.map((p, index) => ({
    id: `single-${p.sifPjesma}`,
    title: p.nazPjesma,
    type: "Single",
    year: null, // pjesma u bazi nema godinu
    cover: NASLOVNICE[(baza.albumi.length + index) % NASLOVNICE.length],
  }));

  // Pjesme: prvo one s albuma, pa singlovi; prikazuje se prvih 5
  // (PRIVREMENO: query ne vraća ocjene pjesama, pa se ocjena ne prikazuje)
  const pjesmeSAlbuma = baza.albumi.flatMap((a, index) =>
    a.pjesme.map((p) => ({
      p,
      album: a.nazAlbum,
      type: "Album",
      cover: albumi[index].cover,
    })),
  );
  const pjesmeSinglova = baza.pjesme.map((p, index) => ({
    p,
    album: p.nazPjesma,
    type: "Single",
    cover: singlovi[index].cover,
  }));
  const pjesme = [...pjesmeSAlbuma, ...pjesmeSinglova]
    .slice(0, 5)
    .map(({ p, album, type, cover }) => ({
      id: p.sifPjesma,
      title: p.nazPjesma,
      album,
      type,
      cover,
      rating: null,
      duration: trajanjeTekst(p.trajanje),
      liked: false,
    }));

  const izvodjac = {
    name: baza.nazIzvodjaca,
    image: "/dizajn/izvodjaci/orbita.svg", // PRIVREMENO
    tags: ["Indie", "Rock"], // PRIVREMENO: query ne vraća oznake (žanrove)
    city: "Zagreb", // PRIVREMENO: izvođač u bazi nema grad
    rating: 4.6, // PRIVREMENO: query ne vraća prosjek ocjena
    ratingsCount: 128, // PRIVREMENO
    followers: 2341, // PRIVREMENO: query ne vraća broj pratitelja
    following: false, // PRIVREMENO: query ne vraća prati li korisnik izvođača
    liked: false, // PRIVREMENO
    releases: [...albumi, ...singlovi],
    songs: pjesme,
    // PRIVREMENO: query ne vraća koncerte izvođača (oblik kao props ConcertCard)
    concerts: [
      {
        id: 1,
        image: "/dizajn/izvodjaci/orbita.svg",
        title: baza.nazIzvodjaca,
        date: "Fri 20 Nov",
        time: "20:00",
        venue: "Dom kulture, Zagreb",
      },
      {
        id: 2,
        image: "/dizajn/izvodjaci/orbita.svg",
        title: baza.nazIzvodjaca,
        date: "Sat 5 Dec",
        time: "21:00",
        venue: "Tvornica kulture, Zagreb",
      },
      {
        id: 3,
        image: "/dizajn/izvodjaci/orbita.svg",
        title: baza.nazIzvodjaca,
        date: "Fri 18 Dec",
        time: "20:30",
        venue: "Boogaloo, Zagreb",
      },
    ],
    about: baza.biografija ?? "",
    // PRIVREMENO: baza nema poveznice izvođača
    links: [
      { label: "Official website", url: "https://example.com" },
      { label: "Bandcamp", url: "https://example.com/bandcamp" },
    ],
  };

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
