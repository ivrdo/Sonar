// KOMPONENTA: Lineup

/*
    Popis izvođača koji nastupaju na koncertu ("Lineup") na stranici koncerta.
    Bijela kartica s redovima: sličica izvođača, ime, podnaslov (žanr, uloga i
    vrijeme nastupa) te gumb Follow / Following.

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

import { Link } from "wasp/client/router";

type LineupArtist = {
  id: number | string; // mbid izvođača je tekst
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
      <h2 className="text-tekst-prva desktop:mb-2 desktop:text-xs mb-3 text-lg font-bold">
        Lineup
      </h2>

      <ul className="divide-rubovi-2 border-rubovi-1 bg-bijela divide-y overflow-hidden rounded-xl border">
        {artists.map((a) => (
          <li
            key={a.id}
            className="hover:bg-akcent-blijedi desktop:p-2 relative flex items-center gap-3 p-3 transition"
          >
            {/* Slika i tekst vode na stranicu izvođača. Gumb Follow je izvan poveznice */}
            <Link
              to="/artists/:id"
              params={{ id: a.id }}
              className="focus-visible:after:ring-akcent flex min-w-0 flex-1 items-center gap-3 after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2"
            >
              {/* Sličica izvođača */}
              <img
                src={a.image}
                className="desktop:h-7 desktop:w-7 h-12 w-12 shrink-0 rounded-full object-cover"
              />

              {/* Ime i podnaslov */}
              <div className="min-w-0 flex-1">
                <p className="text-tekst-prva desktop:text-[11px] truncate text-[15px] font-semibold">
                  {a.name}
                </p>
                <p className="text-tekst-druga desktop:text-[10px] truncate text-sm">
                  {a.genre} · {a.role} · {a.time}
                </p>
              </div>
            </Link>
            {/* Gumb Follow / Following (zasad bez funkcije) */}
            <button
              type="button"
              aria-pressed={a.following}
              aria-label={`Follow ${a.name}`}
              className="border-akcent bg-bijela text-akcent hover:bg-akcent-blijedi focus-visible:ring-akcent desktop:h-6 desktop:px-2 desktop:text-[10px] relative z-10 h-9 shrink-0 rounded-lg border px-3 text-sm font-semibold transition focus-visible:ring-2 focus-visible:outline-none"
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
