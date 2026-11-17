// ==========================================
// KOMPONENTA: LandingPageFilterButtons
// ==========================================
/*
    Gumbi za filtriranje sadržaja na landing pageu: Everything, Concerts, Artists, Venues.

    Komponenta SAMA ne pamti koji je gumb odabran. To pamti roditelj (LandingPage)
    i šalje kroz propse, jer roditelj prema odabiru odlučuje koje sekcije prikazuje.

    Props:
        - active: vrijednost odabranog gumba ("all", "concerts", "artists" ili "venues")
        - onChange: funkcija koja se poziva klikom, dobiva vrijednost kliknutog gumba

    Koriste se Tailwind klase:
        - flex flex-wrap gap-2: gumbi u redu, na uskom ekranu se prelome u novi red
        - rounded-full border px-4 py-1.5 text-xs: oblik pilule
        - aktivni: bg-akcent-mekani border-akcent text-akcent (svijetlo zelen, tirkizni rub i tekst)
        - neaktivni: bg-bijela border-rubovi-2 text-tekst-druga, hover malo tamniji

    Pristupačnost: aria-pressed javlja čitačima ekrana koji je gumb odabran.
*/

export const FILTERI = [
  { vrijednost: "all", label: "Everything" },
  { vrijednost: "concerts", label: "Concerts" },
  { vrijednost: "artists", label: "Artists" },
  { vrijednost: "venues", label: "Venues" },
];

const AKTIVAN = "bg-akcent-mekani border-akcent text-akcent";
const NEAKTIVAN =
  "bg-bijela border-rubovi-2 text-tekst-druga hover:border-rubovi-1 hover:text-tekst-prva";

export function LandingPageFilterButtons({ active, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {FILTERI.map((f) => (
        <button
          key={f.vrijednost}
          type="button"
          aria-pressed={active === f.vrijednost}
          onClick={() => onChange(f.vrijednost)}
          className={`focus-visible:ring-akcent rounded-full border px-4 py-1.5 text-xs font-medium transition focus-visible:ring-2 focus-visible:outline-none ${
            active === f.vrijednost ? AKTIVAN : NEAKTIVAN
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default LandingPageFilterButtons;
