//STRANICA: ConcertDetailPage

/*
    Stranica s pojedinostima koncerta. Do nje se dolazi klikom na ConcertCard
    (ruta /concerts/:id, definirana u main.wasp.ts). Id koncerta čita se iz URL-a
    pomoću useParams.

    Stranica se slaže od vrha prema dolje: SubpageHeader (traka sa strelicom natrag),
    slika koncerta, ConcertInfo (datum, naslov, mjesto), ApplyBox (gumb za prijavu), Lineup (popis izvođača),
    AboutConcert (opis koncerta).

    Podaci su zasad PROBNI: objekt "koncert" na vrhu datoteke. Komponente primaju
    podatke samo kroz propse, pa se kasnije mijenja samo taj objekt.

    Koriste se Tailwind klase:
        - bg-pozadinska min-h-screen: pozadina stranice, najmanje visine cijelog ekrana
        - aspect-video: slika je omjera 16:9 na mobitelu, desktop:aspect-[4/1] je široka i niska na desktopu
        - w-full rounded-xl object-cover: puna širina, zaobljeni rubovi, slika popunjava okvir bez izobličenja
        - p-4 desktop:p-6: unutarnji razmak sadržaja
        - mt-4: razmak između slike i sadržaja ispod nje
        - desktop:hidden: ikona dijeljenja vidi se samo na mobitelu
        - flex flex-col gap-6: na mobitelu je sve u jednom stupcu s razmakom između dijelova
        - desktop:grid desktop:grid-cols-[1fr_20rem]: na desktopu su dva stupca, desni je širok 20rem
        - desktop:items-start: stupci se ne razvlače do iste visine
        - contents: na mobitelu omotač stupca nestaje iz rasporeda, pa se dijelovi slažu
          jedan ispod drugog prema order broju. Na desktopu (desktop:flex desktop:flex-col)
          omotač postaje pravi stupac
        - order-1, order-2...: redoslijed na mobitelu (info, Apply, a kasnije lineup, opis,
          mapa, podaci o mjestu). Lijevi stupac na desktopu: info, lineup, opis.
          Desni stupac: Apply, mapa, podaci o mjestu
*/



import { SubpageHeader } from "../components/SubpageHeader";
import { useParams } from "react-router";
import { ConcertInfo } from "../components/ConcertInfo";
import { ApplyBox } from "../components/ApplyBox";
import { Lineup } from "../components/Lineup";
import { AboutConcert } from "../components/AboutConcert";

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
  price: "free",
  cancelUntil: "19:00",
  //testni podatci!
  lineup: [
    {
      id: 1,
      name: "Orbita",
      image: "/dizajn/izvodjaci/orbita.svg",
      genre: "indie rock",
      role: "headliner",
      time: "21:15",
      following: true,
    },
    {
      id: 2,
      name: "Kiša u Svibnju",
      image: "/dizajn/izvodjaci/kisa-u-svibnju.svg",
      genre: "shoegaze",
      role: "support",
      time: "20:15",
      following: false,
    },
  ],
  description:
    "Orbita close their autumn tour at home, playing Valovi front to back for the first time, followed by older songs picked by the audience. Kiša u Svibnju open with their first Zagreb show since Magla came out.\nStanding on the ground floor, seats on the balcony first come first served. No re-entry after 22:00.",
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

          {/* Mobitel: jedan stupac. Desktop: dva stupca (lijevi širi, desni fiksne širine 20rem) */}
          <div className="desktop:grid desktop:grid-cols-[1fr_20rem] desktop:items-start mt-4 flex flex-col gap-6">
            {/* Lijevi stupac. contents: na mobitelu omotač "ne postoji", a na desktopu je stupac */}
            <div className="desktop:flex desktop:flex-col desktop:gap-6 contents">
              <div className="order-1">
                <ConcertInfo {...koncert} />
              </div>
              <div className="order-3">
                <Lineup artists={koncert.lineup} />
              </div>
              <div className="order-4">
                <AboutConcert description={koncert.description} />
              </div>
            </div>

            {/* Desni stupac */}
            <div className="desktop:flex desktop:flex-col desktop:gap-6 contents">
              <div className="order-2">
                <ApplyBox
                  price={koncert.price}
                  cancelUntil={koncert.cancelUntil}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
}

export default ConcertDetailPage;