// KOMPONENTA: ConcertInfo

/*
    Blok s osnovnim podacima o koncertu na stranici koncerta, ispod slike:
    datum i vrijeme, naslov i mjesto. Oznake stanja dodaju se u sljedećem koraku.
    Gumb Apply NIJE dio ove komponente: na desktopu je u bočnom stupcu,
    pa je zasebna komponenta.

    Props (podaci koje komponenta prima od roditelja):
        - date: datum (npr. "Fri 20 Nov 2026")
        - time: vrijeme početka (npr. "20:00")
        - doors: vrijeme otvaranja vrata (npr. "19:00")
        - title: naziv koncerta
        - venue: naziv mjesta (npr. "Dom kulture, Zagreb")
        - address: adresa (npr. "Ilica 211")
        - distance: neobavezno, udaljenost od korisnika (npr. "3 km").
          Ako ga nema, dio "from you" se ne prikazuje

    Koriste se Tailwind klase (boje su tokeni iz App.css):
        - text-sm text-tekst-druga: redak s datumom, sitniji i sivi,
          desktop:text-[11px] manji na desktopu
        - mt-1: mali razmak između datuma i naslova
        - text-2xl font-bold tracking-tight leading-tight: krupan podebljan naslov,
          desktop:text-lg manji na desktopu
        - text-tekst-prva: tamna boja teksta
        - mt-2 text-[15px]: redak s mjestom, desktop:text-xs manji na desktopu
        - font-semibold: naziv mjesta je podebljan, ostatak retka je sivi
*/

type ConcertInfoProps = {
    date: string;
    time: string;
    doors: string;
    title: string;
    venue: string;
    address: string;
    distance?: string;
};

export function ConcertInfo({ date, time, doors, title, venue, address, distance }: ConcertInfoProps) {
    return (
      <section>
        <p className="text-tekst-druga desktop:text-[11px] text-sm">
          {date} · {time} · doors {doors}
        </p>
        <h2 className="text-tekst-prva desktop:text-lg mt-1 text-2xl leading-tight font-bold tracking-tight">
          {title}
        </h2>
        {/* Udaljenost se prikazuje samo ako postoji */}
        <p className="text-tekst-druga desktop:text-xs mt-2 text-[15px]">
          <span className="text-tekst-prva font-semibold">{venue}</span> ·{" "}
          {address}
          {distance ? <> · {distance} from you</> : null}
        </p>
      </section>
    );
}

export default ConcertInfo;