// KOMPONENTA: AboutConcert

/*
    Opis koncerta ("About this concert") na stranici koncerta: naslov sekcije
    i bijela kartica s tekstom podijeljenim u odlomke.

    Props (podaci koje komponenta prima od roditelja):
        - description: opis koncerta kao jedan tekst. Svaki novi red (\n) je novi odlomak,
          a prazni redovi se preskaču. Ako opisa nema, komponenta ne prikazuje ništa

    Koriste se Tailwind klase (boje su tokeni iz App.css):
        - text-lg font-bold: naslov sekcije, desktop:text-xs manji na desktopu
          (isti stil kao naslov u Lineup)
        - rounded-xl border border-rubovi-1 bg-bijela: bijela kartica sa zaobljenim rubom
        - p-4: unutarnji razmak kartice, desktop:p-3 gušće na desktopu
        - space-y-3: razmak između odlomaka
        - text-[15px] leading-relaxed: veličina teksta i prored za lakše čitanje,
          desktop:text-[11px] manji na desktopu
        - text-tekst-prva: tamna boja teksta
*/

type AboutConcertProps = {
    description: string;
};

export function AboutConcert({ description }: AboutConcertProps) {
    // Rastavljamo opis na odlomke: svaki novi red je novi odlomak
    const paragraphs = description.split("\n").filter((p) => p.trim() !== "");

    // Ako nema teksta, ne prikazujemo ni naslov ni praznu karticu
    if (paragraphs.length === 0) {
        return null;
    }

    return (
        <section>
            <h2 className="mb-3 text-lg font-bold text-tekst-prva desktop:mb-2 desktop:text-xs">
                About this concert
            </h2>

            <div className="space-y-3 rounded-xl border border-rubovi-1 bg-bijela p-4 text-[15px] leading-relaxed text-tekst-prva desktop:p-3 desktop:text-[11px]">
                {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                ))}
            </div>
        </section>
    );
}

export default AboutConcert;