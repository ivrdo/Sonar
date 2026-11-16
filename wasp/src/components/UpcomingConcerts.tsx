// KOMPONENTA: UpcomingConcerts (dizajn 3.3)
/*
    Dio stranice izvođača "Upcoming concerts" u desnom stupcu: naslov i popis
    nadolazećih koncerata tog izvođača. Svaki koncert prikazuje već gotova
    komponenta ConcertCard (ista kao na landing pageu), pa se ovdje ne piše
    novi izgled retka.

    Props:
    - concerts: popis koncerata (id, title, date, time, venue, image)

    Ako izvođač nema koncerata, cijeli dio se ne prikazuje.

    Prikazuje se najviše 3 koncerta (MAX_KONCERATA). Popis treba biti sortiran
    od najranijeg i sadržavati samo koncerte koji tek dolaze, to radi query.

    Koriste se Tailwind klase:
    - mb-3 text-lg font-bold text-tekst-prva: naslov dijela (desktop manji)
    - flex flex-col gap-3: kartice jedna ispod druge s razmakom od 12px
*/

import { ConcertCard } from "./ConcertCard";

// Najviše toliko koncerata prikazuje se u ovom dijelu stranice
const MAX_KONCERATA = 3;

export type UpcomingConcert = {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  image: string;
};

type UpcomingConcertsProps = {
  concerts: UpcomingConcert[];
};

export function UpcomingConcerts({ concerts }: UpcomingConcertsProps) {
  // Ako nema koncerata, cijeli dio se ne prikazuje
  if (concerts.length === 0) {
    return null;
  }

  const prikazano = concerts.slice(0, MAX_KONCERATA);

  return (
    <section>
      <h2 className="mb-3 text-lg font-bold text-tekst-prva desktop:mb-2 desktop:text-xs">Upcoming concerts</h2>

      <div className="flex flex-col gap-3">
        {prikazano.map((c) => (
          <ConcertCard
            key={c.id}
            id={c.id}
            title={c.title}
            date={c.date}
            time={c.time}
            venue={c.venue}
            image={c.image}
          />
        ))}
      </div>
    </section>
  );
}

export default UpcomingConcerts;