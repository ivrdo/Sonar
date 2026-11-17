//STRANICA: ConcertDetailPage

/*
    Stranica s pojedinostima koncerta. Do nje se dolazi klikom na ConcertCard
    (ruta /concerts/:id, definirana u main.wasp.ts). Id koncerta čita se iz URL-a
    pomoću useParams, a podatke dohvaća query dohvatiKoncert (useQuery).

    Stranica se slaže od vrha prema dolje: slika koncerta, ConcertInfo (datum, naslov, mjesto),
    ApplyBox (gumb za prijavu), Lineup (popis izvođača), AboutConcert (opis koncerta),
    VenueFacts (podaci o mjestu). Ljuska (SubpageHeader sa strelicom natrag, Sidebar,
    BottomTabs) je u App.tsx.

    Tri stanja stranice:
        - isLoading: podaci se još dohvaćaju, piše "Loading concert..."
        - error: koncert ne postoji (404 ili neispravan id 400) ili je došlo do greške
        - inače: crta se stranica

    Query vraća podatke u obliku iz baze (datumVrijeme, mjesto, izvodjaci...), a komponente
    očekuju jednostavne tekstove. Zato se na početku funkcije složi objekt "podaci"
    s istim poljima kao nekadašnji probni objekt.

    Koriste se Tailwind klase:
        - aspect-video: slika je omjera 16:9 na mobitelu, desktop:aspect-[4/1] je široka i niska na desktopu
        - w-full rounded-xl object-cover: puna širina, zaobljeni rubovi, slika popunjava okvir bez izobličenja
        - p-4 desktop:p-6: unutarnji razmak sadržaja
        - mt-4: razmak između slike i sadržaja ispod nje
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

import { useParams } from "react-router";
import { useQuery, dohvatiKoncert, prijaviNaKoncert } from "wasp/client/operations";
import { ConcertInfo } from "../components/ConcertInfo";
import { ApplyBox } from "../components/ApplyBox";
import { Lineup } from "../components/Lineup";
import { AboutConcert } from "../components/AboutConcert";
import { VenueFacts } from "../components/VenueFacts";

// Datum kao "Fri 20 Nov 2026" (vrijeme Europe/Zagreb, neovisno o računalu korisnika)
function datumTekst(datumVrijeme) {
  return new Date(datumVrijeme)
      .toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "Europe/Zagreb",
      })
      .replace(",", "");
}

// Vrijeme kao "20:00"
function vrijemeTekst(datumVrijeme) {
  return new Date(datumVrijeme).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Zagreb",
  });
}

export function ConcertDetailPage() {
  const { id } = useParams();
  // Backend sam pretvara id iz teksta u broj
  const { data: koncert, isLoading, error } = useQuery(dohvatiKoncert, { id });

  if (isLoading) {
    return (
      <p className="text-tekst-druga desktop:p-6 p-4">Loading concert...</p>
    );
  }

  if (error || !koncert) {
    return (
      <p className="text-tekst-druga desktop:p-6 p-4">
        {error?.statusCode === 404 || error?.statusCode === 400
          ? "Concert not found."
          : "Something went wrong. Please try again."}
      </p>
    );
  }

  if (error || !koncert) {
    return (
      <p className="text-tekst-druga desktop:p-6 p-4">
        {error?.statusCode === 404 || error?.statusCode === 400
          ? "Concert not found."
          : "Something went wrong. Please try again."}
      </p>
    );
  }

  // Klik na "Apply": poziva action prijaviNaKoncert. Kad uspije, Wasp sam ponovno
  // dohvati koncert (action i query dijele entitete), pa gumb postane "Show ticket"
  async function prijavi() {
    try {
      await prijaviNaKoncert({ sifKoncert: koncert.sifKoncert });
    } catch (e) {
      console.error(e); // PRIVREMENO: poruku korisniku dodajemo poslije
    }
  }

  // Jedan sat prije početka (PRIVREMENO: pravi podatak o vratima i roku za
  // otkazivanje query ne vraća)
  const satPrije = new Date(
    new Date(koncert.datumVrijeme).getTime() - 60 * 60 * 1000,
  );

  // Podaci
  const podaci = {
    date: datumTekst(koncert.datumVrijeme),
    time: vrijemeTekst(koncert.datumVrijeme),
    doors: vrijemeTekst(satPrije), // PRIVREMENO
    // Naslov: imena izvođača, najpopularniji prvi (npr. "Orbita + Kiša u Svibnju")
    title: koncert.izvodjaci.map((i) => i.nazIzvodjaca).join(" + "),
    venue: `${koncert.mjesto?.nazMjestoKoncerta}, ${koncert.mjesto?.mjesto?.nazMjesto}`,
    address: koncert.mjesto?.adresaMjestoKoncerta,
    distance: "2.4 km", // ?????????
    price: "free",
    cancelUntil: vrijemeTekst(satPrije), // PRIVREMENO
    // Prvi (najpopularniji) je headliner, ostali support. Slika, žanr i vrijeme nastupa nisu u querysu
    lineup: koncert.izvodjaci.map((i, index) => ({
      id: i.mbid,
      name: i.nazIzvodjaca,
      image: "/dizajn/izvodjaci/orbita.svg",
      genre: "Indie rock",
      role: index === 0 ? "headliner" : "support",
      time: "20:00",
      following: false,
    })),
    description: `${koncert.izvodjaci.map((i) => i.nazIzvodjaca).join(" and ")} live at ${koncert.mjesto?.nazMjestoKoncerta}, ${koncert.mjesto?.mjesto?.nazMjesto}.\nApply to reserve your spot, your QR ticket will appear in Tickets.`,
    venueName: koncert.mjesto?.nazMjestoKoncerta,
    city: koncert.mjesto?.mjesto?.nazMjesto,
    capacity: koncert.mjesto?.kapacitet,
  };

  return (
    <div className="desktop:p-6 p-4">
      {/* Slika*/}
      <img
        src="/dizajn/izvodjaci/orbita-160.svg"
        className="desktop:aspect-[4/1] aspect-video w-full rounded-xl object-cover"
      />

      {/* Mobitel: jedan stupac. Desktop: dva stupca (lijevi širi, desni fiksne širine 20rem) */}
      <div className="desktop:grid desktop:grid-cols-[1fr_20rem] desktop:items-start mt-4 flex flex-col gap-6">
        {/* Lijevi stupac. contents: na mobitelu omotač "ne postoji", a na desktopu je stupac */}
        <div className="desktop:flex desktop:flex-col desktop:gap-6 contents">
          <div className="order-1">
            <ConcertInfo {...podaci} />
          </div>
          <div className="order-3">
            <Lineup artists={podaci.lineup} />
          </div>
          <div className="order-4">
            <AboutConcert description={podaci.description} />
          </div>
        </div>

        {/* Desni stupac */}
        <div className="desktop:flex desktop:flex-col desktop:gap-6 contents">
          <div className="order-2">
            <ApplyBox
              stanje={koncert.stanjeGumba}
              price={podaci.price}
              cancelUntil={podaci.cancelUntil}
              slobodnaMjesta={koncert.slobodnaMjesta}
              onApply={prijavi}
            />
          </div>
          <div className="order-6">
            <VenueFacts
              venue={podaci.venueName}
              address={`${podaci.address}, ${podaci.city}`}
              capacity={podaci.capacity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConcertDetailPage;
