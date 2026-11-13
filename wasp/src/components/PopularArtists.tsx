import { Section } from "./Section";
import { Tile } from "./Tile";

export type PopularArtist = {
  id: string; // kod nas će to biti mbid
  name: string;
  genre: string;
  image?: string; // neobavezno
};

type PopularArtistsProps = {
  artists?: PopularArtist[]; // neobavezno, ako ga nema, koriste se probni podaci
};

// Probni podaci, dok ne stigne query dohvatiPopularneIzvodjace
export const PROBNI_IZVODJACI: PopularArtist[] = [
  {
    id: "1",
    name: "Orbita",
    genre: "indie rock",
    image: "/dizajn/izvodjaci/orbita.svg",
  },
  {
    id: "2",
    name: "Mali Mjesec",
    genre: "folk",
    image: "/dizajn/izvodjaci/mali-mjesec.svg",
  },
  {
    id: "3",
    name: "Sidro",
    genre: "ambient",
    image: "/dizajn/izvodjaci/sidro.svg",
  },
  {
    id: "4",
    name: "Mjesečeva strana",
    genre: "electronic",
    image: "/dizajn/izvodjaci/mjeseceva-strana.svg",
  },
  {
    id: "5",
    name: "Plavi sat",
    genre: "acoustic",
    image: "/dizajn/izvodjaci/plavi-sat.svg",
  },
  {
    id: "6",
    name: "Noćni autobus",
    genre: "post punk",
    image: "/dizajn/izvodjaci/nocni-autobus.svg",
  },
];

export function PopularArtists({ artists = PROBNI_IZVODJACI } : PopularArtistsProps) {
  return (
    <Section title="Popular on Sonar">
      <div className="desktop:grid-cols-6 desktop:gap-x-4 desktop:gap-y-5 grid grid-cols-3 gap-x-2 gap-y-3">
        {artists.map((a) => (
          <Tile
            key={a.id}
            variant="round"
            image={a.image}
            title={a.name}
            subtitle={a.genre}
          />
        ))}
      </div>
    </Section>
  );
}

export default PopularArtists;
