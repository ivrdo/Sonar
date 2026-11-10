// KOMPONENTA: ConcertInfo

/*
    Blok s osnovnim podacima o koncertu na stranici koncerta, ispod slike:
    datum i vrijeme, naslov, mjesto i oznake stanja.

    Props (podaci koje komponenta prima od roditelja):
        - date: datum (npr. "Fri 20 Nov 2026")
        - time: vrijeme početka (npr. "20:00")
        - doors: vrijeme otvaranja vrata (npr. "19:00")
        - title: naziv koncerta

    Koriste se Tailwind klase (boje su tokeni iz App.css):
        - text-sm text-tekst-druga: redak s datumom, sitniji i sivi,
          desktop:text-[11px] manji na desktopu
        - mt-1: mali razmak između datuma i naslova
        - text-2xl font-bold tracking-tight leading-tight: krupan podebljan naslov,
          desktop:text-lg manji na desktopu
        - text-tekst-prva: tamna boja teksta
*/

type ConcertInfoProps = {
    date: string;
    time: string;
    doors: string;
    title: string;
};

export function ConcertInfo({ date, time, doors, title }: ConcertInfoProps) {
    return (
        <section>
            <p className="text-sm text-tekst-druga desktop:text-[11px]">
                {date} · {time} · doors {doors}
            </p>
            <h2 className="mt-1 text-2xl leading-tight font-bold tracking-tight text-tekst-prva desktop:text-lg">
                {title}
            </h2>
        </section>
    );
}

export default ConcertInfo;