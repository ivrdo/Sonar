// KOMPONENTA: Lineup

/*
    Popis izvođača koji nastupaju na koncertu ("Lineup") na stranici koncerta.
    Bijela kartica s redovima: sličica izvođača, ime, podnaslov (žanr, uloga i
    vrijeme nastupa) te gumb Follow / Following.

    Ovo je zasad samo izgled. Gumb još nema funkciju (kad bude akcija za praćenje
    izvođača, poziva se iz onClick), a redovi još ne vode na stranicu izvođača.

    Props (podaci koje komponenta prima od roditelja):
        - artists: popis izvođača, svaki ima:
            id: jedinstveni broj izvođača
            name: ime (npr. "Orbita")
            image: putanja do slike (npr. "/dizajn/izvodjaci/orbita.svg")
            genre: žanr (npr. "indie rock")
            role: uloga na koncertu (npr. "headliner" ili "support")
            time: vrijeme nastupa (npr. "21:15")
            following: true ako korisnica već prati izvođača

    Koriste se Tailwind klase (boje su tokeni iz App.css):
        - text-lg font-bold: naslov sekcije, desktop:text-xs manji na desktopu
        - overflow-hidden rounded-xl border border-rubovi-1 bg-bijela: bijela kartica sa zaobljenim
          rubom (overflow-hidden da hover na redu ne izlazi preko zaobljenih kutova)
        - divide-y divide-rubovi-2: tanka crta između redova
        - flex items-center gap-3 p-3: red, sve u jednoj liniji, vertikalno centrirano,
          desktop:p-2 gušće na desktopu
        - h-12 w-12 rounded-full object-cover: okrugla sličica od 48px, desktop:h-7 desktop:w-7
        - shrink-0: sprječava stiskanje sličice i gumba kad je tekst dug
        - min-w-0 flex-1 truncate: tekst zauzima preostali prostor, a predugi završava
          s tri točkice (min-w-0 je nužan da truncate radi unutar flexa)
        - border border-akcent text-akcent bg-bijela: gumb s tirkiznim rubom i tekstom
        - hover:bg-akcent-blijedi: gumb blago posvijetli kad se pređe mišem
        - focus-visible:ring-2 focus-visible:ring-akcent: okvir pri navigaciji tipkovnicom


    aria-pressed govori čitaču ekrana prati li korisnica izvođača, a aria-label
    kaže kojeg (jer na stranici ima više gumba s tekstom "Follow").
*/

type LineupArtist = {
    id: number;
    name: string;
    image: string;
    genre: string;
    role: string;
    time: string;
    following: boolean;
};

type LineupProps = {
    artists: LineupArtist[];
};

export function Lineup({ artists }: LineupProps) {
    return (
        <section>
            <h2 className="mb-3 text-lg font-bold text-tekst-prva desktop:mb-2 desktop:text-xs">
                Lineup
            </h2>

            <ul className="divide-y divide-rubovi-2 overflow-hidden rounded-xl border border-rubovi-1 bg-bijela">
                {artists.map((a) => (
                    <li key={a.id} className="flex items-center gap-3 p-3 desktop:p-2">
                        {/* Sličica izvođača */}
                        <img
                            src={a.image}
                            className="h-12 w-12 shrink-0 rounded-full object-cover desktop:h-7 desktop:w-7"
                        />

                        {/* Ime i podnaslov */}
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-[15px] font-semibold text-tekst-prva desktop:text-[11px]">
                                {a.name}
                            </p>
                            <p className="truncate text-sm text-tekst-druga desktop:text-[10px]">
                                {a.genre} · {a.role} · {a.time}
                            </p>
                        </div>

                        {/* Gumb Follow / Following (zasad bez funkcije) */}
                        <button
                            type="button"
                            aria-pressed={a.following}
                            aria-label={`Follow ${a.name}`}
                            className="h-9 shrink-0 rounded-lg border border-akcent bg-bijela px-3 text-sm font-semibold text-akcent transition hover:bg-akcent-blijedi focus-visible:ring-2 focus-visible:ring-akcent focus-visible:outline-none desktop:h-6 desktop:px-2 desktop:text-[10px]"
                        >
                            {a.following ? "✓ Following" : "Follow"}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Lineup;