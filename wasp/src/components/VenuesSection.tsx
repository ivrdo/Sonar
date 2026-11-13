import { Link } from "wasp/client/router";
import { Section } from "./Section";
import { Tile } from "./Tile";

export type VenueSummary = {
  id: number;
  name: string;
  city: string;
  upcoming: number; // broj nadolazećih koncerata
  image?: string;
};

type VenuesSectionProps = {
  venues?: VenueSummary[];
};

// Probni podaci, dok ne stigne query dohvatiMjesta
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
    name: "Klub Mjesečina",
    city: "Zagreb",
    upcoming: 1,
    image: "/dizajn/mjesta/klub-mjesecina.svg",
  },
  {
    id: 3,
    name: "Tvornica zvuka",
    city: "Zagreb",
    upcoming: 2,
    image: "/dizajn/mjesta/tvornica-zvuka.svg",
  },
  {
    id: 4,
    name: "Klub Mlin",
    city: "Zagreb",
    upcoming: 0,
    image: "/dizajn/mjesta/klub-mlin.svg",
  },
];

// Drugi redak pločice: "Zagreb · 3 upcoming" ili "Zagreb · nothing announced"
function podnaslov(v: VenueSummary): string {
  if (v.upcoming > 0) {
    return `${v.city} · ${v.upcoming} upcoming`;
  }
  return `${v.city} · nothing announced`;
}

export function VenuesSection({ venues = PROBNA_MJESTA }: VenuesSectionProps) {
  return (
    <Section title="Venues" action={<Link to="/map">Open map</Link>}>
      <div className="desktop:grid-cols-4 desktop:gap-x-4 desktop:gap-y-5 grid grid-cols-2 gap-x-3 gap-y-3.5">
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

export default VenuesSection;
