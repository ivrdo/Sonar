// KOMPONENTA: FilterButton

/*
    Gumb za filtriranje zaobljenih rubova (oblik pilule), npr. "All 14", "Albums 3"
    u diskografiji na stranici izvođača. Aktivni gumb je svijetlo tirkizni s tirkiznim
    rubom, neaktivni su bijeli. Isti oblik gumba dizajn koristi i na landing stranici
    ("Everything", "Concerts 24"...), pa se komponenta može iskoristiti i tamo kad
    filteri budu trebali stvarno filtrirati.

    Komponenta SAMA ne pamti je li aktivna. To odlučuje roditelj preko propsa "active"
    i "onClick", pa roditelj zna koji je filter odabran.

    Props (podaci koje komponenta prima od roditelja):
        - label: tekst gumba (npr. "Albums")
        - count: broj uz tekst (npr. 3). Neobavezno, ako ga nema ne prikazuje se
        - active: true ako je gumb trenutno odabran
        - onClick: funkcija koja se poziva klikom na gumb

    Koriste se Tailwind klase (boje su tokeni iz App.css):
        - flex items-center gap-1.5: tekst i broj u istom redu s malim razmakom
        - rounded-full border: potpuno zaobljeni rubovi s tankim rubom
        - px-3.5 py-1.5 text-sm font-medium: razmak i tekst na mobitelu,
          desktop:px-2.5 desktop:py-0.5 desktop:text-[11px] manje i gušće na desktopu
        - border-akcent bg-akcent-mekani: izgled aktivnog gumba
        - border-rubovi-1 bg-bijela hover:bg-akcent-blijedi: izgled neaktivnog gumba
        - text-xs font-normal text-tekst-druga: broj je sivi i manji od teksta,
          desktop:text-[10px] manji na desktopu
        - focus-visible:ring-2 focus-visible:ring-akcent: okvir pri navigaciji tipkovnicom

    Pristupačnost: aria-pressed javlja čitačima ekrana je li gumb odabran.
*/

type FilterButtonProps = {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
};

export function FilterButton({ label, count, active, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium text-tekst-prva transition focus-visible:ring-2 focus-visible:ring-akcent focus-visible:outline-none desktop:px-2.5 desktop:py-0.5 desktop:text-[11px] ${
        active
          ? "border-akcent bg-akcent-mekani"
          : "border-rubovi-1 bg-bijela hover:bg-akcent-blijedi"
      }`}
    >
      {label}
      {/* Broj se prikazuje samo ako je zadan (count !== undefined, jer 0 je valjana vrijednost) */}
      {count !== undefined && (
        <span className="text-xs font-normal text-tekst-druga desktop:text-[10px]">{count}</span>
      )}
    </button>
  );
}

export default FilterButton;