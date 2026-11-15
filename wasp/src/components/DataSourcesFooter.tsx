// KOMPONENTA: DataSourcesFooter

/*
    Podnožje s navodom izvora podataka (zahtjev F-010).
    Prikazuje se na dnu svake stranice ljuske.

    "U aplikaciji je vidljiv navod da podaci o katalogu dolaze iz MusicBrainza,
     a oznake i popularnost iz Last.fma." (docs/2-Analiza-zahtjeva.md)

    Koriste se Tailwind klase:
        - mt-auto: gura podnožje na dno stupca kad je sadržaja malo
          (roditelj mora biti "flex flex-col")
        - border-t border-rubovi-2: tanka crta iznad
        - px-4 py-4 / desktop:px-8: isti razmak sa strane kao sadržaj stranice
        - text-xs text-tekst-treća: mali, neupadljiv tekst (12px, najsvjetlija siva)
        - [&_a]:...: stil za sve <a> unutar podnožja (podcrtano na hover)
*/

const IZVORI = [
  { opis: "Catalog", naziv: "MusicBrainz", url: "https://musicbrainz.org" },
  { opis: "Tags and popularity", naziv: "Last.fm", url: "https://www.last.fm" },
  { opis: "Covers", naziv: "Cover Art Archive", url: "https://coverartarchive.org" },
];

export function DataSourcesFooter() {
  return (
    <footer className="border-rubovi-2 text-tekst-treća desktop:px-8 [&_a]:text-tekst-druga mt-auto border-t px-4 py-4 text-xs [&_a]:font-semibold [&_a]:hover:underline">
      {IZVORI.map((izvor, i) => (
        <span key={izvor.naziv}>
          {i > 0 && " · "}
          {izvor.opis}:{" "}
          {/*
            target="_blank": otvara se u novoj kartici, korisnik ne napušta Sonar
            rel="noopener noreferrer": sigurnosna praksa za vanjske poveznice
          */}
          <a href={izvor.url} target="_blank" rel="noopener noreferrer">
            {izvor.naziv}
          </a>
        </span>
      ))}
    </footer>
  );
}

export default DataSourcesFooter;