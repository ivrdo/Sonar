// KOMPONENTA: AboutArtist (dizajn 3.3)
/*
    Dio stranice izvođača "About" u desnom stupcu: kratak opis izvođača, poveznice
    na njegove stranice (web, Bandcamp...) i sitan tekst s izvorima podataka.

    Props:
    - description: opis izvođača (tekst, može biti prazan)
    - links: popis poveznica, svaka ima label (što piše) i url (kamo vodi)

    Poveznice se otvaraju u novom tabu (target="_blank"). rel="noopener noreferrer"
    je zaštita da otvorena stranica ne dobije pristup ovoj. Ako nema ni opisa ni
    poveznica, cijeli dio se ne prikazuje.

    Koriste se Tailwind klase:
    - mb-3 text-lg font-bold text-tekst-prva: naslov dijela (desktop manji)
    - rounded-xl border border-rubovi-1 bg-bijela p-4: bijela kartica
    - leading-relaxed: malo veći razmak među retcima opisa
    - divide-y divide-rubovi-1: tanka crta između poveznica
    - flex items-center gap-3: ikona, tekst i strelica u jednom retku
    - min-w-0 flex-1 + truncate: dugi tekst se skrati umjesto da razvuče red
    - hover:bg-akcent-blijedi: red se blago oboji kad se pređe mišem
    - bg-akcent + mask: ikona poveznice obojana tirkiznom bojom
    - h-5 w-5 opacity-60: strelica (ikona chev), posvijetljena da bude siva
    - text-xs text-tekst-druga: sitan tekst s izvorima podataka
*/

export type AboutLink = {
    label: string;
    url: string;
};

type AboutProps = {
    description: string;
    links: AboutLink[];
};

export function AboutArtist({ description, links }: AboutProps) {
    // Ako nema ni opisa ni poveznica, cijeli dio se ne prikazuje
    if (!description && links.length === 0) {
        return null;
    }

    return (
        <section>
            <h2 className="mb-3 text-lg font-bold text-tekst-prva desktop:mb-2 desktop:text-xs">About</h2>

            <div className="rounded-xl border border-rubovi-1 bg-bijela p-4 desktop:p-3">
                {description && (
                    <p className="text-[15px] leading-relaxed text-tekst-prva desktop:text-[11px]">{description}</p>
                )}

                {links.length > 0 && (
                    <ul className="mt-3 divide-y divide-rubovi-1">
                        {links.map((link) => (
                            <li key={link.url}>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 py-3 transition hover:bg-akcent-blijedi focus-visible:ring-2 focus-visible:ring-akcent focus-visible:outline-none desktop:py-2"
                                >
                                    <span
                                        className="h-4 w-4 shrink-0 bg-akcent"
                                        style={{
                                            maskImage: "url(/dizajn/ikone/link.svg)",
                                            WebkitMaskImage: "url(/dizajn/ikone/link.svg)",
                                            maskRepeat: "no-repeat",
                                            WebkitMaskRepeat: "no-repeat",
                                            maskSize: "contain",
                                            WebkitMaskSize: "contain",
                                            maskPosition: "center",
                                            WebkitMaskPosition: "center",
                                        }}
                                    />
                                    <span className="min-w-0 flex-1 truncate text-[15px] font-semibold text-tekst-prva desktop:text-[11px]">
                                        {link.label}
                                    </span>
                                    <img src="/dizajn/ikone/chev.svg" alt="" className="h-5 w-5 shrink-0 opacity-60" />
                                </a>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Izvori podataka su isti za sve izvođače, pa nisu prop */}
                <p className="mt-3 text-xs text-tekst-druga desktop:text-[10px]">
                    Data: MusicBrainz · Last.fm · Image: fanart.tv
                </p>
            </div>
        </section>
    );
}

export default AboutArtist;