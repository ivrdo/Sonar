import { Link } from "wasp/client/router";
import { Section } from "./Section";
import { Tile } from "./Tile";
import type { VenueSummary } from "../landing/types";
import { dohvatiMjesta, useQuery } from "wasp/client/operations";

// Poveznica "Open map" desno od naslova sekcije.
// Prikazuje se SAMO kad ima mjesta; kod učitavanja, greške i praznog popisa je skrivena.
const OPEN_MAP = <Link to="/map">Open map</Link>;

type VenuesSectionViewProps = {
  venues?: VenueSummary[];
};

/*
    PRIVREMENO: probna mjesta kao u dizajnu, uz dodatna da
    redak bude pun i na širokim ekranima. Služe da se vidi
    kako stranica izgleda dok ne dohvaćamo podatke iz baze. Kad query
    dohvatiMjesta bude vraćao podatke, LandingPage opet koristi VenuesSection,
    a ovaj popis se može obrisati.
*/
export const PROBNA_MJESTA: VenueSummary[] = [
  {
    id: 1,
    name: "Dom kulture",
    city: "Zagreb",
    upcoming: 3,
    image: "/dizajn/mjesta/dom-kulture.svg",
  },
  {
    id: 2,
    name: "Tvornica Zvuka",
    city: "Zagreb",
    upcoming: 4,
    image: "/dizajn/mjesta/tvornica-zvuka.svg",
  },
  {
    id: 3,
    name: "Klub Mlin",
    city: "Zagreb",
    upcoming: 2,
    image: "/dizajn/mjesta/klub-mlin.svg",
  },
  {
    id: 4,
    name: "Galerija Zvuk",
    city: "Zagreb",
    upcoming: 1,
    image: "/dizajn/mjesta/galerija-zvuk.svg",
  },
  {
    id: 5,
    name: "Atrij",
    city: "Zagreb",
    upcoming: 0,
    image: "/dizajn/mjesta/atrij.svg",
  },
  {
    id: 6,
    name: "Klub Mjesečina",
    city: "Zagreb",
    upcoming: 2,
    image: "/dizajn/mjesta/klub-mjesecina.svg",
  },
  {
    id: 7,
    name: "Sjever",
    city: "Zagreb",
    upcoming: 1,
    image: "/dizajn/mjesta/sjever.svg",
  },
];

// Drugi redak pločice: "Zagreb · 3 upcoming" ili "Zagreb · nothing announced"
function podnaslov(v: VenueSummary): string {
  if (v.upcoming > 0) {
    return `${v.city} · ${v.upcoming} upcoming`;
  }
  return `${v.city} · nothing announced`;
}

export function VenuesSectionView({ venues = PROBNA_MJESTA }: VenuesSectionViewProps) {
  return (
    <Section title="Venues" action={OPEN_MAP}>
      {/*
        Responzivna mreža u JEDNOM retku:
          - grid-cols-[repeat(auto-fill,minmax(6rem,1fr))]: stane što više stupaca
            širokih barem 10rem (desktop 13rem); preostala širina se podijeli među
            njima (1fr), pa je redak uvijek popunjen do desnog ruba
          - grid-rows-1 auto-rows-0 overflow-hidden: vidi se samo prvi redak; stavke
            koje ne stanu prelaze u sljedeće retke visine 0 i skrivene su
          - zato gap-y nema (gap-x je razmak između stupaca)
        Veći ekran = više ikona u retku; najmanja širina mijenja se u minmax(...).
      */}
      <div className="desktop:grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] desktop:gap-x-4 grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] grid-rows-1 auto-rows-0 gap-x-3 overflow-hidden">
        {venues.map((v) => (
          <Tile
            key={v.id}
            variant="wide"
            image={v.image}
            title={v.name}
            subtitle={podnaslov(v)}
          />
        ))}
      </div>
    </Section>
  );
}

export function VenuesSection() {
  const { data, isLoading, error } = useQuery(dohvatiMjesta);

  if (isLoading) {
    return (
      <Section title="Venues">
        <p className="text-tekst-druga text-sm">Loading…</p>
      </Section>
    );
  }
  if (error || !data) {
    return (
      <Section title="Venues">
        <p className="text-tekst-druga text-sm">Could not load venues.</p>
      </Section>
    );
  }
  if (data.length === 0) {
    return (
      <Section title="Venues">
        <p className="text-tekst-druga text-sm">No venues yet.</p>
      </Section>
    );
  }
  return <VenuesSectionView venues={data} />;
}

export default VenuesSection;
