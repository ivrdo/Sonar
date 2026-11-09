/*
    Stranica s pojedinostima koncerta. Do nje se dolazi klikom na ConcertCard
    (ruta /concerts/:id, definirana u main.wasp.ts). Id koncerta čita se iz URL-a
    pomoću useParams.

    NAPOMENA: ovo je PRIVREMENA stranica. Napravljena je samo da ruta
    /concerts/:id postoji i da klik na ConcertCard ima kamo voditi.


*/
import { SubpageHeader } from "../components/SubpageHeader";
import { useParams } from "react-router";

export function ConcertDetailPage() {
    const { id } = useParams();

    return (
      <div className="bg-pozadinska min-h-screen">
        <SubpageHeader title="Concert">
          {/* Ikona dijeljenja (samo mobitel). Funkcija se dodaje kasnije */}
          <button
            type="button"
            aria-label="Share"
            className="hover:bg-pozadinska focus-visible:ring-akcent desktop:hidden flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:ring-2 focus-visible:outline-none"
          >
            <img src="/dizajn/ikone/share.svg" alt="" className="h-5 w-5" />
          </button>
        </SubpageHeader>

        {/* Privremeno dok se ne složi ostatak stranice */}
        <main className="p-4">
          <p className="text-tekst-druga">Koncert {id}</p>
        </main>
      </div>
    );
}

export default ConcertDetailPage;