// ==========================================
// KOMPONENTA: LandingPageFilterButtons
// ==========================================
export function LandingPageFilterButtons() {
  return (
    <div className="flex items-center gap-2">
      {/* Aktivni gumb */}
      <button
        type="button"
        className="bg-akcent-mekani border-akcent text-akcent rounded-full border px-4 py-1.5 text-xs font-medium transition"
      >
        Everything
      </button>

      {/* Neaktivni gumbi s brojem stavki */}
      <button
        type="button"
        className="bg-bijela border-rubovi-2 text-tekst-druga hover:border-rubovi-1 hover:text-tekst-prva rounded-full border px-4 py-1.5 text-xs font-medium transition"
      >
        Concerts <span className="text-tekst-treća ml-0.5">24</span>
      </button>

      <button
        type="button"
        className="bg-bijela border-rubovi-2 text-tekst-druga hover:border-rubovi-1 hover:text-tekst-prva rounded-full border px-4 py-1.5 text-xs font-medium transition"
      >
        Artists
      </button>

      <button
        type="button"
        className="bg-bijela border-rubovi-2 text-tekst-druga hover:border-rubovi-1 hover:text-tekst-prva rounded-full border px-4 py-1.5 text-xs font-medium transition"
      >
        Venues <span className="text-tekst-treća ml-0.5">18</span>
      </button>
    </div>
  );
}

export default LandingPageFilterButtons;
