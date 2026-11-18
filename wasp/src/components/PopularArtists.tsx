import { Section } from "./Section";
import { Tile } from "./Tile";
import type { PopularArtist } from "../landing/types";
import { dohvatiPopularneIzvodjace, useQuery } from "wasp/client/operations";
import { Link } from "wasp/client/router";
import { Link as RouterLink } from "react-router";

// Poveznica "See all" desno od naslova sekcije (Section je oboji tirkizno).
// Prikazuje se SAMO kad ima podataka; kod učitavanja, greške i praznog popisa je skrivena.
// Stranica /artists još ne postoji, pa zasad vodi na 404.
const SEE_ALL = <RouterLink to="/artists">See all</RouterLink>;

type PopularArtistsViewProps = {
  artists?: PopularArtist[]; // neobavezno, ako ga nema, koriste se probni podaci
};

/*
    PRIVREMENO: probni izvođači kao u dizajnu, uz dodatne da
    redak bude pun i na širokim ekranima. Služe da se vidi
    kako stranica izgleda dok ne dohvaćamo podatke iz baze. Kad query
    dohvatiPopularneIzvodjace bude vraćao podatke, LandingPage opet koristi
    PopularArtists, a ovaj popis se može obrisati.
*/
export const PROBNI_IZVODJACI: PopularArtist[] = [
  {
    id: "1",
    name: "Orbita",
    genre: "indie rock",
    image: "/dizajn/izvodjaci/orbita.svg",
  },
  {
    id: "2",
    name: "Plavi Sat",
    genre: "dream pop",
    image: "/dizajn/izvodjaci/plavi-sat.svg",
  },
  {
    id: "3",
    name: "Kiša u Svibnju",
    genre: "shoegaze",
    image: "/dizajn/izvodjaci/kisa-u-svibnju.svg",
  },
  {
    id: "4",
    name: "Noćni Autobus",
    genre: "electronic",
    image: "/dizajn/izvodjaci/nocni-autobus.svg",
  },
  {
    id: "5",
    name: "Mali Mjesec",
    genre: "acoustic",
    image: "/dizajn/izvodjaci/mali-mjesec.svg",
  },
  {
    id: "6",
    name: "Zlatna Groznica",
    genre: "post-punk",
    image: "/dizajn/izvodjaci/zlatna-groznica.svg",
  },
  {
    id: "7",
    name: "Betonski Vrt",
    genre: "noise rock",
    image: "/dizajn/izvodjaci/betonski-vrt.svg",
  },
  {
    id: "8",
    name: "Crveni Signal",
    genre: "synth-pop",
    image: "/dizajn/izvodjaci/crveni-signal.svg",
  },
  {
    id: "9",
    name: "Ljetna Smjena",
    genre: "indie pop",
    image: "/dizajn/izvodjaci/ljetna-smjena.svg",
  },
  {
    id: "10",
    name: "Mjesečeva Strana",
    genre: "ambient",
    image: "/dizajn/izvodjaci/mjeseceva-strana.svg",
  },
  {
    id: "11",
    name: "Sidro",
    genre: "folk",
    image: "/dizajn/izvodjaci/sidro.svg",
  },
  {
    id: "12",
    name: "Tihi Kvart",
    genre: "jazz",
    image: "/dizajn/izvodjaci/tihi-kvart.svg",
  },
  {
    id: "13",
    name: "Zvjezdana Prašina",
    genre: "psychedelic",
    image: "/dizajn/izvodjaci/zvjezdana-prasina.svg",
  },
];

export function PopularArtistsView({ artists = PROBNI_IZVODJACI } : PopularArtistsViewProps) {
  return (
    <Section title="Popular on Sonar" action={SEE_ALL}>
      {/*
        Responzivna mreža u JEDNOM retku:
          - grid-cols-[repeat(auto-fill,minmax(6rem,1fr))]: stane što više stupaca
            širokih barem 6rem (desktop 8rem); preostala širina se podijeli među
            njima (1fr), pa je redak uvijek popunjen do desnog ruba
          - grid-rows-1 auto-rows-0 overflow-hidden: vidi se samo prvi redak; stavke
            koje ne stanu prelaze u sljedeće retke visine 0 i skrivene su
          - zato gap-y nema (gap-x je razmak između stupaca)
        Veći ekran = više ikona u retku; najmanja širina mijenja se u minmax(...).
      */}
      <div className="desktop:grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] desktop:gap-x-4 grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] grid-rows-1 auto-rows-0 gap-x-3 overflow-hidden">
        {artists.map((a) => (
          <Link key={a.id} to="/artists/:id" params={{ id: a.id }} className="min-w-0">
            <Tile
              variant="round"
              image={a.image}
              title={a.name}
              subtitle={a.genre}
            />
          </Link>
        ))}
      </div>
    </Section>
  );
}

export function PopularArtists() {
  const { data, isLoading, error } = useQuery(dohvatiPopularneIzvodjace);

  if (isLoading) {
    return (
      <Section title="Popular on Sonar">
        <p className="text-tekst-druga text-sm">Loading…</p>
      </Section>
    );
  }
  if (error || !data) {
    return (
      <Section title="Popular on Sonar">
        <p className="text-tekst-druga text-sm">Could not load artists.</p>
      </Section>
    );
  }
  if (data.length === 0) {
    return (
      <Section title="Popular on Sonar">
        <p className="text-tekst-druga text-sm">No artists yet.</p>
      </Section>
    );
  }
  return <PopularArtistsView artists={data} />;
}

export default PopularArtists;
