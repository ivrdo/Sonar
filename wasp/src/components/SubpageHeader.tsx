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
*/

import type { ReactNode } from "react";

type SubpageHeaderProps = {
    title: string;
    children?: ReactNode;
};

export function SubpageHeader({ title, children }: SubpageHeaderProps) {
    return (
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-rubovi-2 bg-bijela px-4 py-3 desktop:px-8 desktop:py-4">
            {title}
            {children}
        </header>
    );
}

export default SubpageHeader;