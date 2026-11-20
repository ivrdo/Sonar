// KOMPONENTA: ApplyBox

/*
    Kućica s gumbom za prijavu na koncert (Apply) na stranici koncerta.
    Na mobitelu je to samo velik gumb s rečenicom ispod, bez okvira.
    Na desktopu je to bijela kućica s rubom u desnom stupcu, uz mapu.

    Stanje gumba NE računamo ovdje: dohvatiKoncert ga već vraća u polju stanjeGumba
    (računa ga backend), a komponenta ga samo prikazuje:
        - APPLY: korisnik se može prijaviti, gumb piše "Apply · free"
        - PRIJAVLJEN: korisnik je već prijavljen, gumb piše "Show ticket"
        - POPUNJENO: nema slobodnih mjesta, gumb piše "Sold out" i onemogućen je
        - ZATVORENO: prijave nisu otvorene ili je koncert počeo, gumb je onemogućen

    Props (podaci koje komponenta prima od roditelja):
        - stanje: "APPLY" | "PRIJAVLJEN" | "POPUNJENO" | "ZATVORENO" (stanjeGumba iz querya)
        - price: cijena kao tekst (npr. "free")
        - cancelUntil: do kada se može otkazati (npr. "19:00")
        - slobodnaMjesta: broj slobodnih mjesta (slobodnaMjesta iz querya)
        - onApply: neobavezno, funkcija koja se pozove klikom na "Apply" (poziv prijaviNaKoncert)
                - saljeSe: neobavezno, true dok se prijava šalje (gumb piše "Applying..." i onemogućen je)
                - greska: neobavezno, poruka o neuspjeloj prijavi, prikazuje se ispod gumba

    Koriste se Tailwind klase (boje su tokeni iz App.css):
        - desktop:rounded-xl desktop:border desktop:border-rubovi-1 desktop:bg-bijela desktop:p-4:
          okvir kućice, vidi se samo na desktopu, na mobitelu ga nema
        - h-10 w-full: gumb je visok 40px i na punoj širini, desktop:h-8 manji na desktopu
        - rounded-lg bg-akcent text-bijela: tirkizni gumb s bijelim tekstom
        - hover:bg-akcent-jaki: gumb potamni kad se pređe mišem
        - disabled:cursor-not-allowed disabled:bg-rubovi-2 disabled:text-tekst-druga disabled:hover:bg-rubovi-2:
          onemogućen gumb (Sold out, zatvoreno) je siv i ne reagira na hover
        - text-[15px] font-semibold: tekst gumba, desktop:text-xs manji na desktopu
        - focus-visible:ring-2 focus-visible:ring-akcent: okvir pri navigaciji tipkovnicom
        - mt-2 text-center text-sm text-tekst-druga: rečenica ispod gumba, centrirana na mobitelu,
          desktop:text-left desktop:text-[11px] poravnata lijevo i manja na desktopu
        - hidden desktop:inline: dodatak o QR karti vidi se samo na desktopu
*/

type ApplyBoxProps = {
    stanje: "APPLY" | "PRIJAVLJEN" | "POPUNJENO" | "ZATVORENO";
    price: string;
    cancelUntil: string;
    slobodnaMjesta: number;
    onApply?: () => void;
    saljeSe?: boolean;
    greska?: string;
};

export function ApplyBox({ stanje, price, cancelUntil, slobodnaMjesta, onApply, saljeSe, greska }: ApplyBoxProps) {
    // Tekst na gumbu ovisi o stanju
    let tekstGumba = "Apply · " + price;
    if (saljeSe) {
      tekstGumba = "Applying...";
    } else if (stanje === "PRIJAVLJEN") {
      tekstGumba = "Show ticket";
    } else if (stanje === "POPUNJENO") {
      tekstGumba = "Sold out";
    } else if (stanje === "ZATVORENO") {
      tekstGumba = "Applications closed";
    }

    // Gumb radi samo kad se korisnik može prijaviti
    const onemogucen =
      stanje === "POPUNJENO" || stanje === "ZATVORENO" || saljeSe;

    return (
      <section className="desktop:rounded-xl desktop:border desktop:border-rubovi-1 desktop:bg-bijela desktop:p-4">
        {/* upozorenje iznad gumba */}
        {stanje === "APPLY" && slobodnaMjesta < 10 && (
          <p className="text-tekst-druga desktop:text-left desktop:text-[11px] mb-2 text-center text-sm">
            Under 10 spots left
          </p>
        )}

        <button
          type="button"
          disabled={onemogucen}
          onClick={stanje === "APPLY" ? onApply : undefined}
          className="bg-akcent text-bijela hover:bg-akcent-jaki focus-visible:ring-akcent disabled:bg-rubovi-2 disabled:text-tekst-druga disabled:hover:bg-rubovi-2 desktop:h-8 desktop:text-xs h-10 w-full rounded-lg text-[15px] font-semibold transition focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed"
        >
          {tekstGumba}
        </button>

        {greska && (
          <p
            role="alert"
            className="text-status-crveni desktop:text-left desktop:text-[11px] mt-2 text-center text-sm"
          >
            {greska}
          </p>
        )}

        <p className="text-tekst-druga desktop:text-left desktop:text-[11px] mt-2 text-center text-sm">
          You can cancel until {cancelUntil} on the day.
          <span className="desktop:inline hidden">
            {" "}
            Your QR ticket appears in Tickets.
          </span>
        </p>
      </section>
    );
}

export default ApplyBox;