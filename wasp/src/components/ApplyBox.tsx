// KOMPONENTA: ApplyBox

/*
    Kućica s gumbom za prijavu na koncert (Apply) na stranici koncerta.
    Na mobitelu je to samo velik gumb s rečenicom ispod, bez okvira.
    Na desktopu je to bijela kućica s rubom u desnom stupcu, uz mapu.

    Ovo je zasad samo izgled. Gumb još nema funkciju, a stanja "prijavljen" (Show ticket)
    i "popunjeno" (Sold out) dodaju se kasnije, kao i poziv prijaviNaKoncert.

    Props (podaci koje komponenta prima od roditelja):
        - price: cijena kao tekst (npr. "free")
        - cancelUntil: do kada se može otkazati (npr. "19:00")

    Koriste se Tailwind klase (boje su tokeni iz App.css):
        - desktop:rounded-xl desktop:border desktop:border-rubovi-1 desktop:bg-bijela desktop:p-4:
          okvir kućice, vidi se samo na desktopu, na mobitelu ga nema
        - h-10 w-full: gumb je visok 40px i na punoj širini, desktop:h-8 manji na desktopu
        - rounded-lg bg-akcent text-bijela: tirkizni gumb s bijelim tekstom
        - hover:bg-akcent-jaki: gumb potamni kad se pređe mišem
        - text-[15px] font-semibold: tekst gumba, desktop:text-xs manji na desktopu
        - focus-visible:ring-2 focus-visible:ring-akcent: okvir pri navigaciji tipkovnicom
        - mt-2 text-center text-sm text-tekst-druga: rečenica ispod gumba, centrirana na mobitelu,
          desktop:text-left desktop:text-[11px] poravnata lijevo i manja na desktopu
        - hidden desktop:inline: dodatak o QR karti vidi se samo na desktopu
*/

type ApplyBoxProps = {
    price: string;
    cancelUntil: string;
};

export function ApplyBox({ price, cancelUntil }: ApplyBoxProps) {
    return (
        <section className="desktop:rounded-xl desktop:border desktop:border-rubovi-1 desktop:bg-bijela desktop:p-4">
            <button
                type="button"
                className="h-10 w-full rounded-lg bg-akcent text-[15px] font-semibold text-bijela transition hover:bg-akcent-jaki focus-visible:ring-2 focus-visible:ring-akcent focus-visible:outline-none desktop:h-8 desktop:text-xs"
            >
                Apply · {price}
            </button>
            <p className="mt-2 text-center text-sm text-tekst-druga desktop:text-left desktop:text-[11px]">
                You can cancel until {cancelUntil} on the day.
                <span className="hidden desktop:inline"> Your QR ticket appears in Tickets.</span>
            </p>
        </section>
    );
}

export default ApplyBox;