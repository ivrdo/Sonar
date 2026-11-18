import { dohvatiNadolazeceKoncerte, useQuery } from "wasp/client/operations";
import type { ConcertSummary } from "../landing/types";
import { ConcertCard } from "./ConcertCard";
import { Section } from "./Section";
import { Link as RouterLink } from "react-router";

// Poveznica "See all" desno od naslova sekcije (Section je oboji tirkizno).
// Prikazuje se SAMO kad ima podataka; kod učitavanja, greške i praznog popisa je skrivena.
// Stranica /concerts još ne postoji, pa zasad vodi na 404.
const SEE_ALL = <RouterLink to="/concerts">See all</RouterLink>;

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// "Fri 20 Nov"
function datum(d: Date): string {
  return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

// "20:00"
function vrijeme(d: Date): string {
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

/*
    PRIVREMENO: probni koncerti kao u dizajnu, da se vidi
    kako stranica izgleda dok ne dohvaćamo podatke iz baze. Kad query
    dohvatiNadolazeceKoncerte bude vraćao podatke, LandingPage opet koristi
    UpcomingConcertsSection, a ovaj popis se može obrisati.
    (mjesec u new Date je od 0: 10 = studeni, 11 = prosinac)
*/
export const PROBNI_KONCERTI: ConcertSummary[] = [
  {
    id: 1,
    title: "Orbita + Kiša u Svibnju",
    startsAt: new Date(2026, 10, 20, 20, 0),
    venue: "Dom kulture, Zagreb",
    image: "/dizajn/izvodjaci/orbita.svg",
  },
  {
    id: 2,
    title: "Noćni Autobus",
    startsAt: new Date(2026, 10, 21, 22, 0),
    venue: "Tvornica Zvuka, Zagreb",
    image: "/dizajn/izvodjaci/nocni-autobus.svg",
  },
  {
    id: 3,
    title: "Plavi Sat + Orbita",
    startsAt: new Date(2026, 10, 14, 21, 0),
    venue: "Klub Obala, Rijeka",
    image: "/dizajn/izvodjaci/plavi-sat.svg",
  },
  {
    id: 4,
    title: "Mali Mjesec",
    startsAt: new Date(2026, 11, 3, 20, 30),
    venue: "Dom kulture, Zagreb",
    image: "/dizajn/izvodjaci/mali-mjesec.svg",
  },
];

export function UpcomingConcertsView({ concerts = PROBNI_KONCERTI }: { concerts?: ConcertSummary[] }) {
  return (
    <Section title="Upcoming concerts" action={SEE_ALL}>
      <div className="desktop:grid-cols-2 grid grid-cols-1 gap-3">
        {concerts.map((c) => (
          <ConcertCard
            key={c.id}
            id={c.id}
            title={c.title}
            date={datum(c.startsAt)}
            time={vrijeme(c.startsAt)}
            venue={c.venue}
            image={c.image}
          />
        ))}
      </div>
    </Section>
  );
}

export function UpcomingConcertsSection() {
  const { data, isLoading, error } = useQuery(dohvatiNadolazeceKoncerte);

  if (isLoading) {
    return (
      <Section title="Upcoming Concerts On Sonar">
        <p className="text-tekst-druga text-sm">Loading…</p>
      </Section>
    );
  }
  if (error || !data) {
    return (
      <Section title="Upcoming Concerts On Sonar">
        <p className="text-tekst-druga text-sm">
          Could not load upcoming concerts...
        </p>
      </Section>
    );
  }
  if (data.length === 0) {
    return (
      <Section title="Upcoming Concerts On Sonar">
        <p className="text-tekst-druga text-sm">No upcoming concerts yet...</p>
      </Section>
    );
  }
  return <UpcomingConcertsView concerts={data} />;
}

export default UpcomingConcertsSection;
