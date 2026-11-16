// ==========================================
// KOMPONENTA: HeroBanner (Hero sekcija)
// ==========================================
/*
    Ova komponenta služi kao istaknuti uvodni box na vrhu stranice (Discover).
    Sadrži privlačan naslov, opisnu poruku i dva akcijska gumba (CTA).
*/

export function HeroBanner() {
  return (
    /*
        Glavni kontejner (box):
        - bg-bijela: bijela pozadina kartice
        - rounded-2xl: zaobljeni rubovi (veći radijus za moderniji izgled)
        - border border-rubovi-2: tanak rub u našoj boji rubova
        - p-8: unutarnji razmak (padding) sa svih strana
        - shadow-sm: lagana sjena za blagi 3D efekt podizanja
    */
    <div className="border-rubovi-2 bg-bijela rounded-2xl border p-8 shadow-sm">
      {/* Glavni naslov */}
      <h1 className="text-tekst-prva mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
        Live music near you, and the records behind it.
      </h1>

      {/* Podnaslov / opis */}
      <p className="text-tekst-druga mb-6 whitespace-nowrap text-sm">
        Upcoming concerts, artists and venues in one place. Sign in for
        recommendations, ratings and free concert registrations.
      </p>

      {/* Kontejner za gumbe (flex row, na manjim ekranima se slažu vertikalno ili horizontalno) */}
      <div className="flex flex-wrap items-center gap-3">
        {/* 1. Primarni gumb (ispunjen akcent bojom) */}
        <button
          type="button"
          className="bg-akcent text-bijela flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition hover:opacity-90"
        >
          {/* Google ikona unutar gumba */}
          Sign in with Google
        </button>

        {/* 2. Sekundarni gumb (s obrubom i ikonom karte) */}
        <button
          type="button"
          className="border-rubovi-1 bg-bijela text-tekst-prva hover:bg-pozadinska flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition"
        >
          {/* Ikona karte (Map) */}
          <svg
            className="text-akcent h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          Open map
        </button>
      </div>
    </div>
  );
}

// izvor komponente
export default HeroBanner;
