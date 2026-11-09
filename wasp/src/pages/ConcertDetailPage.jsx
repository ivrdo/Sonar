/*
    Stranica s pojedinostima koncerta. Do nje se dolazi klikom na ConcertCard
    (ruta /concerts/:id, definirana u main.wasp.ts). Id koncerta čita se iz URL-a
    pomoću useParams.

    Koriste se Tailwind klase:
        - aspect-video: slika je omjera 16:9 na mobitelu, desktop:aspect-[4/1] je široka i niska na desktopu
        - w-full rounded-xl object-cover: puna širina, zaobljeni rubovi, slika popunjava okvir bez izobličenja
        - p-4 desktop:p-6: unutarnji razmak sadržaja

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

          <main className="p-4 desktop:p-6">
              {/* Slika koncerta.*/}
              <img
                  src="/dizajn/izvodjaci/orbita-160.svg"
                  className="aspect-video w-full rounded-xl object-cover desktop:aspect-[4/1]"
              />

              {/* Privremeno dok se ne složi ostatak stranice */}
              <p className="mt-4 text-tekst-druga">Koncert {id}</p>
          </main>
      </div>
    );
}

export default ConcertDetailPage;