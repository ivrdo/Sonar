// KOMPONENTA: Discography

/*
    Diskografija izvođača na stranici izvođača: naslov sekcije, gumbi za filtriranje
    (FilterButton: All, Albums, EPs, Singles, Live) i mreža naslovnica izdanja.
    Naslovnice su 3 u redu na mobitelu i 4 u redu na desktopu.

    Filtriranje radi sama komponenta: u stanju (useState) pamti koji je filter odabran,
    a klik na gumb ga promijeni, pa se mreža ponovno nacrta samo s izdanjima te vrste.
    Brojevi uz gumbe računaju se iz cijelog popisa, pa se ne mijenjaju klikanjem.

    Props (podaci koje komponenta prima od roditelja):
        - releases: popis izdanja, svako ima:
            id: jedinstveni broj izdanja
            title: naslov (npr. "Valovi")
            type: vrsta, jedno od "Album", "EP", "Single", "Live"
            year: godina (npr. 2025)
            cover: putanja do naslovnice (npr. "/dizajn/naslovnice/valovi.svg")
        Ako je popis prazan, komponenta ne prikazuje ništa.

    Koriste se Tailwind klase (boje su tokeni iz App.css):
        - text-lg font-bold: naslov sekcije, desktop:text-xs manji na desktopu
          (isti stil kao naslovi u Lineup i AboutConcert)
        - flex flex-wrap gap-2: gumbi filtera u redu, na uskom ekranu se prelome u novi red
        - grid grid-cols-3 gap-3 desktop:grid-cols-4: mreža naslovnica, 3 u redu
          na mobitelu, 4 na desktopu
        - min-w-0: nužan da truncate radi unutar mreže (isti trik kao u ConcertCard)
        - aspect-square w-full rounded-xl object-cover: kvadratna naslovnica sa
          zaobljenim rubom, popunjava kvadrat bez izobličenja
        - truncate: predugi naslov završava s tri točkice umjesto da se prelomi
        - text-[15px] font-semibold / text-[13px]: naslov izdanja i podnaslov
          (vrsta i godina), desktop:text-[11px] / desktop:text-[10px] manji na desktopu

    Izdanja još ne vode nigdje (stranica izdanja ne postoji). Dizajn ima i poveznicu
    "See all 14" uz prikaz najviše 8 izdanja; to se dodaje kad query donese puni popis.
    Vrijednosti u "type" treba uskladiti s onima iz baze kad query stigne.
*/

import { useState } from "react";
import { FilterButton } from "./FilterButton";

export type Release = {
  id: number;
  title: string;
  type: "Album" | "EP" | "Single" | "Live";
  year: number;
  cover: string;
};

type DiscographyProps = {
  releases: Release[];
};

export function Discography({ releases }: DiscographyProps) {
  // Odabrani filter: "all" ili jedna od vrsta ("Album", "EP", "Single", "Live")
  const [filter, setFilter] = useState("all");

  // Ako nema izdanja, ne prikazujemo ni naslov ni gumbe
  if (releases.length === 0) {
    return null;
  }

  // Brojevi uz gumbe: koliko izdanja pojedine vrste ima u cijelom popisu
  const brojAlbuma = releases.filter((r) => r.type === "Album").length;
  const brojEPova = releases.filter((r) => r.type === "EP").length;
  const brojSinglova = releases.filter((r) => r.type === "Single").length;
  const brojLive = releases.filter((r) => r.type === "Live").length;

  // Što mreža prikazuje: sve, ili samo izdanja odabrane vrste
  const prikazano = filter === "all" ? releases : releases.filter((r) => r.type === filter);

  return (
    <section>
      <h2 className="mb-3 text-lg font-bold text-tekst-prva desktop:mb-2 desktop:text-xs">
        Discography
      </h2>

      {/* Gumbi za filtriranje. Aktivan je onaj čija vrijednost je u stanju filter */}
      <div className="mb-3 flex flex-wrap gap-2">
        <FilterButton label="All" count={releases.length} active={filter === "all"} onClick={() => setFilter("all")} />
        <FilterButton label="Albums" count={brojAlbuma} active={filter === "Album"} onClick={() => setFilter("Album")} />
        <FilterButton label="EPs" count={brojEPova} active={filter === "EP"} onClick={() => setFilter("EP")} />
        <FilterButton label="Singles" count={brojSinglova} active={filter === "Single"} onClick={() => setFilter("Single")} />
        <FilterButton label="Live" count={brojLive} active={filter === "Live"} onClick={() => setFilter("Live")} />
      </div>

      {/* Mreža naslovnica */}
      <ul className="grid grid-cols-3 gap-3 desktop:grid-cols-4">
        {prikazano.map((r) => (
          <li key={r.id} className="min-w-0">
            <img src={r.cover} alt="" className="aspect-square w-full rounded-xl object-cover" />
            <p className="mt-2 truncate text-[15px] font-semibold text-tekst-prva desktop:text-[11px]">
              {r.title}
            </p>
            <p className="truncate text-[13px] text-tekst-druga desktop:text-[10px]">
              {r.type} · {r.year}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Discography;