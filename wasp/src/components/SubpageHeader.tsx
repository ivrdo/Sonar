// KOMPONENTA: SubpageHeader

/*
    Gornja traka podstranice: strelica natrag, naslov i neobavezni sadržaj
    s desne strane (npr. ikona dijeljenja ili tri točkice).

    Koristi se na svim podstranicama koje imaju strelicu natrag: npr. stranica koncerta,
    stranica izvođača i stranica mjesta. Zato ime NE sadrži naziv pojedine stranice.
    Razlikuje se od Navbara, koji je traka landing page-a s naslovom "Discover"
    i poljem za pretragu.

    Props (podaci koje komponenta prima od roditelja):
        - title: naslov trake (npr. "Concert" ili "Orbita")
        - children: neobavezno, sadržaj s desne strane. Svaka stranica šalje svoje
          ikone: koncert ima samo dijeljenje, izvođač dijeljenje i tri točkice.

    Koriste se Tailwind klase (boje su tokeni iz App.css, nikad hex):
        - sticky top-0 z-10: traka ostaje zalijepljena na vrhu pri skrolanju
        - flex items-center gap-3: elementi u redu, vertikalno centrirani
        - border-b border-rubovi-2 bg-bijela: bijela traka s tankim donjim rubom
        - px-4 py-3: unutarnji razmak na mobitelu, desktop:px-8 desktop:py-4 na desktopu
        - -ml-2: strelica je malo pomaknuta ulijevo da se vizualno poravna s rubom
        - h-9 w-9 rounded-lg: klikabilno područje strelice (36px)
        - hover:bg-pozadinska: blaga siva pozadina kad se pređe mišem
        - focus-visible:ring-2 focus-visible:ring-akcent: okvir pri navigaciji tipkovnicom
        - h-5 w-5: veličina ikone strelice (20px)
        - flex-1: naslov zauzima preostali prostor pa desni sadržaj ide skroz udesno
        - text-[17px] font-semibold: naslov, desktop:text-sm manji na desktopu

    Strelica natrag koristi window.history.back(), što vraća korisnika na
    prethodnu stranicu. Ikona je /dizajn/ikone/back.svg (iz mape public).
*/

import type { ReactNode } from "react";

type SubpageHeaderProps = {
    title: string;
    children?: ReactNode;
};

export function SubpageHeader({ title, children }: SubpageHeaderProps) {
    return (
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-rubovi-2 bg-bijela px-4 py-3 desktop:px-8 desktop:py-4">
            {/* Strelica natrag (ikona back iz dizajna) */}
            <button
                type="button"
                onClick={() => window.history.back()}
                aria-label="Back"
                className="-ml-2 flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-pozadinska focus-visible:ring-2 focus-visible:ring-akcent focus-visible:outline-none"
            >
                <img src="/dizajn/ikone/back.svg" alt="" className="h-5 w-5" />
            </button>

            {/* Naslov */}
            <h1 className="flex-1 text-[17px] font-semibold text-tekst-prva desktop:text-sm">
                {title}
            </h1>

            {children}
        </header>
    );
}

export default SubpageHeader;