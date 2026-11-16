// KOMPONENTA: ConcertCard

/*
    Kartica koncerta prikazana na landing pageu u sekciji "Upcoming concerts".
    Prikazuje sliku (zasad placeholder), naslov, datum, vrijeme i mjesto održavanja
    te strelicu koja označava da je kartica klikabilna.

    Cijela kartica je poveznica (Link) na stranicu s pojedinostima koncerta
    (ruta /concerts/:id, definirana u main.wasp.ts, stranica ConcertDetailPage).
    Koristi se Waspov Link iz "wasp/client/router": u "to" se piše putanja s :id,
    a stvarna vrijednost id-a šalje se kroz "params".

    Props (podaci koje komponenta prima od roditelja):
        - id: jedinstveni broj koncerta, koristi se za poveznicu na /concerts/<id>
        - title: naziv koncerta
        - date: datum (npr. "Fri 20 Nov")
        - time: vrijeme (npr. "20:00")
        - venue: mjesto održavanja (npr. "Dom kulture, Zagreb")
        - image: putanja do slike izvođača (npr. "/dizajn/izvodjaci/orbita.svg").

    Responzivnost (mobile-first):
        Klase bez prefiksa vrijede za mobitel, a prefiks desktop: vrijedi od 64rem
        prema gore (definirano u App.css). Na mobitelu su slika i tekst krupniji,
        a na desktopu manji i gušći, kao u dizajnu.

    Raspored kartica (1 kolona na mobitelu, 2 na desktopu) NE radi sama kartica,
    nego roditelj koji ih slaže:
        <div className="grid grid-cols-1 gap-3 desktop:grid-cols-2">

    Koriste se Tailwind klase:
        - flex items-center: slika, tekst i strelica u jednom redu, vertikalno centrirani
        - w-full: kartica zauzima cijelu širinu svog stupca
        - gap-3: razmak od 12px između slike, teksta i strelice
        - rounded-xl: zaobljenje rubova kartice (12px)
        - border border-rubovi-1: rub debljine 1px u boji definiranoj u App.css
        - bg-bijela: bijela pozadina kartice
        - p-2.5: unutarnji razmak od 10px
        - transition: glatka promjena boje pri hoveru
        - hover:bg-akcent-blijedi: kartica se blago oboji kad se pređe mišem
        - focus-visible:ring-2 focus-visible:ring-akcent focus-visible:outline-none:
          vidljiv tirkizni okvir kad se do kartice dođe tipkovnicom (Tab)
        - h-12 w-12: slika je 48px na mobitelu, desktop:h-10 desktop:w-10 smanjuje je na 40px
        - shrink-0: sprječava stiskanje slike (i strelice) kad je tekst dug
        - rounded-lg: zaobljenje slike (8px)
        - object-cover: slika popunjava cijeli kvadrat bez izobličenja
        - bg-akcent-mekani: svijetla tirkizna boja placeholdera kad nema slike
        - min-w-0 flex-1: tekst zauzima preostali prostor. min-w-0 je NUŽAN da truncate
          radi unutar flex kontejnera, bez njega dugi tekst razvuče karticu
        - truncate: predugi tekst završava s tri točkice (...) umjesto da se prelomi u novi red
        - text-[15px] / text-sm / text-xs: veličine teksta (15px / 14px / 12px)
        - font-semibold: poluboldan naslov
        - h-5 w-5 opacity-60: strelica (ikona chev iz dizajna), posvijetljena da bude siva


*/

import { Link } from "wasp/client/router";

export function ConcertCard({ id, image, title, date, time, venue }) {
    return (
      <Link
        to="/concerts/:id"
        params={{ id }}
        className="border-rubovi-1 bg-bijela hover:bg-akcent-blijedi focus-visible:ring-akcent flex w-full items-center gap-3 rounded-xl border p-2.5 transition focus-visible:ring-2 focus-visible:outline-none"
      >
        {/* Slika izvođača. naslov je odmah pored */}
        {image ? (
          <img
            src={image}
            className="desktop:h-10 desktop:w-10 h-12 w-12 shrink-0 rounded-lg object-cover"
          />
        ) : (
          <div className="bg-akcent-mekani desktop:h-10 desktop:w-10 h-12 w-12 shrink-0 rounded-lg" />
        )}

        <div className="min-w-0 flex-1">
          <p className="text-tekst-prva desktop:text-sm truncate text-[15px] font-semibold">
            {title}
          </p>
          <p className="text-tekst-druga desktop:text-xs truncate text-sm">
            {date} · {time} · {venue}
          </p>
        </div>

        {/* Strelica udesno (ikona chev iz dizajna): oznaka da kartica vodi na pojedinosti */}
        <img
          src="/dizajn/ikone/chev.svg"
          className="h-5 w-5 shrink-0 opacity-60"
        />
      </Link>
    );
}

export default ConcertCard;