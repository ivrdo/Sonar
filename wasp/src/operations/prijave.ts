//AKCIJE: prijava na koncert

import { HttpError,prisma } from "wasp/server";
import type { PrijaviNaKoncert } from "wasp/server/operations";

type PrijaviNaKoncertArgs = { sifKoncert:number };

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

  const koncert = await tx.koncer.findUnique({
    where: {sifKoncert},
    select: { stanje:true, brojMjesta:true, datumVrijeme: true},
  });
  if(!koncert) {
    throw new HttpError(404, "Koncert nije pronađen.");
  }

  //pravilo6: prijava je dopuštena samo kad je stanje otvorenih prijava
  if(koncert.stanje !== "OTVORENE_PRIJAVE") {
    throw new HttpError(409, "Prijave za ovaj koncert nisu otvorene.");
  }
  //nema smisla da koncert koji je počeo prima prijave
  if(koncert.stanje <= new Date()) {
    throw new HttpError(409, "Koncert je već počeo.");
  }

  return prisma.$transaction(async (tx) => {
    //zaključavamo redak koncerta do kraja transakcije
    await tx.$queryRaw`
      SELECT "sifKoncert" FROM "Koncert"
      WHERE "sifKoncert" = ${sifKoncert}
      FOR UPDATE 
    `;

    return { sifKorisnik, sifKoncert };
  });
};