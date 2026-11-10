//STRANICA: ConcertDetailPage

/*
    Stranica s pojedinostima koncerta. Do nje se dolazi klikom na ConcertCard
    (ruta /concerts/:id, definirana u main.wasp.ts). Id koncerta čita se iz URL-a
    pomoću useParams.

    Stranica se slaže od vrha prema dolje: SubpageHeader (traka sa strelicom natrag),
    slika koncerta i ConcertInfo (datum, naslov, mjesto).

    Podaci su zasad PROBNI: objekt "koncert" na vrhu datoteke. Komponente primaju
    podatke samo kroz propse, pa se kasnije mijenja samo taj objekt.

    Koriste se Tailwind klase:
        - bg-pozadinska min-h-screen: pozadina stranice, najmanje visine cijelog ekrana
        - aspect-video: slika je omjera 16:9 na mobitelu, desktop:aspect-[4/1] je široka i niska na desktopu
        - w-full rounded-xl object-cover: puna širina, zaobljeni rubovi, slika popunjava okvir bez izobličenja
        - p-4 desktop:p-6: unutarnji razmak sadržaja
        - mt-4: razmak između slike i podataka o koncertu
        - desktop:hidden: ikona dijeljenja vidi se samo na mobitelu
*/



import { SubpageHeader } from "../components/SubpageHeader";
import { useParams } from "react-router";
import { ConcertInfo } from "../components/ConcertInfo";

// PRIVREMENO: probni podaci dok query dohvatiKoncert nije gotov.
// Kad stigne, ovaj objekt se zamjenjuje podacima iz useQuery(dohvatiKoncert, ...).
// Komponente ispod primaju podatke samo kroz propse, pa se one ne mijenjaju.
const koncert = {
    date: "Fri 20 Nov 2026",
    time: "20:00",
    doors: "19:00",
    title: "Orbita + Kiša u Svibnju",
    venue: "Dom kulture, Zagreb",
    address: "Ilica 211",
    distance: "3 km",
};

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

        <main className="desktop:p-6 p-4">
          {/* Slika koncerta.*/}
          <img
            src="/dizajn/izvodjaci/orbita-160.svg"
            className="desktop:aspect-[4/1] aspect-video w-full rounded-xl object-cover"
          />

          <div className="mt-4">
            <ConcertInfo {...koncert} />
          </div>
        </main>
      </div>
    );
}

export default ConcertDetailPage;