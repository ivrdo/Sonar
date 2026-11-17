// STRANICA: SearchPage

/*
    Rezultati pretrage. Pojam se čita iz adrese: /search?q=mjesec

    useSearchParams (react-router) daje pristup dijelu adrese iza "?".
    Zato pretraga preživi osvježavanje stranice, tipku Natrag i dijeljenje linka.
*/

import { useSearchParams } from "react-router";
import { pretrazi, useQuery } from "wasp/client/operations";
import { Link } from "wasp/client/router";
import { PageLayout } from "../components/PageLayout";
import { Section } from "../components/Section";

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pojam = searchParams.get("q") ?? ""; // "" ako u adresi nema ?q=

  // enabled: query se NE šalje dok pojam nema barem 2 znaka
  const { data, isLoading, error } = useQuery(
    pretrazi,
    { pojam },
    { enabled: pojam.trim().length >= 2 },
  );

  // Polje za pretragu na samoj stranici (na mobitelu Navbar nema polje)
  function posalji(e) {
    e.preventDefault(); // inače bi preglednik ponovno učitao cijelu stranicu
    const novi = new FormData(e.currentTarget).get("q").toString().trim();
    setSearchParams(novi ? { q: novi } : {}); // mijenja adresu u /search?q=novi
  }

  const ukupno = data
    ? data.izvodjaci.length +
      data.albumi.length +
      data.pjesme.length +
      data.mjesta.length
    : 0;

  return (
    <PageLayout title={pojam ? `Results for “${pojam}”` : "Search"}>
      <div className="desktop:px-8 desktop:py-6 flex flex-col gap-5 p-4">
        {/* key={pojam}: kad se adresa promijeni (npr. iz Navbara), polje se osvježi */}
        <form onSubmit={posalji} role="search" className="desktop:hidden">
          <input
            key={pojam}
            name="q"
            type="search"
            defaultValue={pojam}
            placeholder="Search artists, releases, songs, venues"
            aria-label="Search"
            className="border-input-polja bg-bijela focus:ring-akcent min-h-11 w-full rounded-lg border px-3 text-[15px] focus:ring-2 focus:outline-none"
          />
        </form>

        {/* Stanja: prazno, prekratko, učitavanje, greška, nema rezultata, rezultati */}
        {pojam.trim().length === 0 && (
          <p className="text-tekst-druga">
            Type an artist, album, song or venue.
          </p>
        )}
        {pojam.trim().length === 1 && (
          <p className="text-tekst-druga">Type at least 2 characters.</p>
        )}
        {isLoading && pojam.trim().length >= 2 && (
          <p className="text-tekst-druga">Searching…</p>
        )}
        {error && (
          <p className="text-status-crveni">Search failed. Try again.</p>
        )}

        {data && ukupno === 0 && (
          <div className="border-rubovi-1 bg-bijela rounded-xl border p-4">
            <h2 className="font-bold">No results for “{pojam}”</h2>
            <p className="text-tekst-druga text-sm">
              Check the spelling or try a shorter term.
            </p>
          </div>
        )}

        {data && ukupno > 0 && (
          <div className="desktop:grid-cols-2 grid grid-cols-1 items-start gap-6">
            <div className="flex flex-col gap-5">
              {data.izvodjaci.length > 0 && (
                <Section title="Artists">
                  <Popis>
                    {data.izvodjaci.map((i) => (
                      <Link
                        key={i.id}
                        to="/artists/:id"
                        params={{ id: i.id }}
                        className={RED}
                      >
                        <span className="font-semibold">{i.naziv}</span>
                      </Link>
                    ))}
                  </Popis>
                </Section>
              )}
              {data.pjesme.length > 0 && (
                <Section title="Songs">
                  <Popis>
                    {data.pjesme.map((p) => (
                      <div key={p.id} className={RED}>
                        <span className="font-semibold">{p.naziv}</span>
                        <span className="text-tekst-druga text-[13px]">
                          {p.izvodjac}
                        </span>
                      </div>
                    ))}
                  </Popis>
                </Section>
              )}
            </div>
            <div className="flex flex-col gap-5">
              {data.albumi.length > 0 && (
                <Section title="Releases">
                  <Popis>
                    {data.albumi.map((a) => (
                      <div key={a.id} className={RED}>
                        <span className="font-semibold">{a.naziv}</span>
                        <span className="text-tekst-druga text-[13px]">
                          {a.izvodjac}
                          {a.godina ? ` · ${a.godina}` : ""}
                        </span>
                      </div>
                    ))}
                  </Popis>
                </Section>
              )}
              {data.mjesta.length > 0 && (
                <Section title="Venues">
                  <Popis>
                    {data.mjesta.map((m) => (
                      <div key={m.id} className={RED}>
                        <span className="font-semibold">{m.naziv}</span>
                        <span className="text-tekst-druga text-[13px]">
                          {m.adresa}
                        </span>
                      </div>
                    ))}
                  </Popis>
                </Section>
              )}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

// Bijela kutija s redovima odvojenima crtom (kao "list" u dizajnu)
function Popis({ children }) {
  return (
    <div className="border-rubovi-1 bg-bijela divide-rubovi-2 divide-y overflow-hidden rounded-xl border">
      {children}
    </div>
  );
}
const RED = "flex flex-col px-3.5 py-2.5 hover:bg-pozadinska";

export default SearchPage;
