// KOMPONENTA: VenueFacts

/*
    Kartica s osnovnim podacima o mjestu održavanja na stranici koncerta:
    Venue, Address i Capacity. Na desktopu je u desnom stupcu, ispod karte.

    Podaci su u HTML-ovoj "definition list" (<dl>): <dt> je naziv podatka, a <dd> njegova
    vrijednost. To je ispravan element za parove "naziv: vrijednost", a čitači ekrana
    ih čitaju kao povezane.

    Props (podaci koje komponenta prima od roditelja):
        - venue: naziv mjesta (npr. "Dom kulture")
        - address: adresa zajedno s gradom (npr. "Ilica 211, Zagreb")
        - capacity: kapacitet mjesta kao broj (npr. 350)

    Koriste se Tailwind klase (boje su tokeni iz App.css):
        - grid grid-cols-[7rem_1fr]: dva stupca, prvi (nazivi) je širok 7rem, a drugi
          (vrijednosti) zauzima ostatak. Svaki <dt> i <dd> automatski ide u svoj stupac,
          pa se parovi slažu u redove
        - gap-y-1.5: razmak između redova, desktop:gap-y-2 veći na desktopu
        - rounded-xl border border-rubovi-1 bg-bijela: bijela kartica sa zaobljenim rubom
        - p-4: unutarnji razmak kartice, desktop:p-3 gušće na desktopu
        - text-[15px]: veličina teksta, desktop:text-[11px] manji na desktopu
        - text-tekst-druga: sivi nazivi podataka
        - font-semibold text-akcent: naziv mjesta je podebljan i tirkizan
          (u dizajnu izgleda kao poveznica)
        - text-tekst-prva: tamne vrijednosti adrese i kapaciteta


        - Naziv mjesta treba postati poveznica na stranicu venue kad ona bude postojala!!!
*/

type VenueFactsProps = {
    venue: string;
    address: string;
    capacity: number;
};

export function VenueFacts({ venue, address, capacity }: VenueFactsProps) {
    return (
        <dl className="grid grid-cols-[7rem_1fr] gap-y-1.5 rounded-xl border border-rubovi-1 bg-bijela p-4 text-[15px] desktop:gap-y-2 desktop:p-3 desktop:text-[11px]">
            <dt className="text-tekst-druga">Venue</dt>
            <dd className="font-semibold text-akcent">{venue}</dd>

            <dt className="text-tekst-druga">Address</dt>
            <dd className="text-tekst-prva">{address}</dd>

            <dt className="text-tekst-druga">Capacity</dt>
            <dd className="text-tekst-prva">{capacity}</dd>
        </dl>
    );
}

export default VenueFacts;