//AKCIJE: prijava na koncert

import { HttpError,prisma } from "wasp/server";
import type { PrijaviNaKoncert } from "wasp/server/operations";
import { zauzetoWhere } from "./pomocno";
import { randomBytes } from "node:crypto";
import { Prisma } from "@prisma/client";

type PrijaviNaKoncertArgs = { sifKoncert:number };

//isti oblik kao u seedu (SONAR-koncert-korisnik-hex), ali nasumicni iz crypto jer kod je "tajna" ulaznice, a Math.random je predvidljiv
function napraviQrKod(sifKoncert: number, sifKorisnik: number): string {
  return `SONAR-${sifKoncert}-${sifKorisnik}-${randomBytes(8).toString("hex")}`;
}

export const prijaviNaKoncert: PrijaviNaKoncert<PrijaviNaKoncertArgs> = async (
  args,
  context,
) => {
  //prijavu smije napraviti samo prijavljeni korisnik
  if(!context.user) {
    throw new HttpError(401, "Za prijavu na koncert morate biti prijavljeni.");
  }
  //suspendirani, deaktivirani i obrisani računi ne smiju se prijavljivati
  if(context.user.status !== "AKTIVAN") {
    throw new HttpError(403, "Vaš račun nema pravo prijave na koncert.");
  }

  const sifKorisnik = context.user.id;
  const sifKoncert = Number(args?.sifKoncert);
  if(!Number.isInteger(sifKoncert) || sifKoncert <= 0) {
    throw new HttpError(400, "Neispravan id koncerta.");
  }

  try {
    return await prisma.$transaction(async (tx) => {
      //zaključavamo redak koncerta do kraja transakcije
      await tx.$queryRaw`
        SELECT "sifKoncert"
        FROM "Koncert"
        WHERE "sifKoncert" = ${sifKoncert}
          FOR UPDATE
      `;
      const koncert = await tx.koncert.findUnique({
        where: { sifKoncert },
        select: { stanje: true, brojMjesta: true, datumVrijeme: true },
      });
      if (!koncert) {
        throw new HttpError(404, "Koncert nije pronađen.");
      }

      //pravilo6: prijava je dopuštena samo kad je stanje otvorenih prijava
      if (koncert.stanje !== "OTVORENE_PRIJAVE") {
        throw new HttpError(409, "Prijave za ovaj koncert nisu otvorene.");
      }
      //nema smisla da koncert koji je počeo prima prijave
      if (koncert.datumVrijeme <= new Date()) {
        throw new HttpError(409, "Koncert je već počeo.");
      }

      //brojimo tek nakon zaključavanja pa vidimo prijave svih transakcija koje su zavrsile prije nas
      const zauzeto = await tx.prijavaNaKoncert.count({
        where: zauzetoWhere(sifKoncert),
      });
      if (zauzeto >= koncert.brojMjesta) {
        throw new HttpError(409, "Nema slobodnih mjesta, koncert je popunjen.");
      }

      //pravilo 8:jedna aktivna prijava po korisniku i koncertu
      const postojeca = await tx.prijavaNaKoncert.findFirst({
        where: { sifKorisnik, ...zauzetoWhere(sifKoncert) },
        select: { sifPrijavaNa: true },
      });
      if (postojeca) {
        throw new HttpError(409, "Već ste prijavljeni na ovaj koncert.");
      }
      //Upis prijave, stanje po defaultu PRIJAVLJEN
      const prijava = await tx.prijavaNaKoncert.create({
        data: { sifKorisnik, sifKoncert, qrKod: napraviQrKod(sifKoncert, sifKorisnik) },
        select: { sifPrijavaNa: true, stanje: true, qrKod: true },
      });


      return { ...prijava, slobodnaMjesta: koncert.brojMjesta - zauzeto - 1 };  //-1 jer smo upravo zauzeli jedno
    });
  }catch(e) {
    //ako bi unique indeks u bazi odbio dupli unos
    if(e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      throw new HttpError(409, "Već ste prijavljeni na ovaj koncert.");
    }
    throw e;
  }
};
