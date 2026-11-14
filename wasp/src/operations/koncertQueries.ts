import { HttpError } from "wasp/server";
import type { DohvatiKoncert } from "wasp/server/operations";
import { zauzetoWhere } from "./pomocno";

//id iz URL (/concerts/:id), pa ga klijent moze poslati kao string
type DohvatiKoncertArgs = {id: number | string};

export const dohvatiKoncert: DohvatiKoncert<DohvatiKoncertArgs> = async (
  args,
  context,
) => {
  const sifKoncert = Number(args?.id);

  //id mora biti poz cijeli broj
  if(!Number.isInteger(sifKoncert) || sifKoncert<=0) {
    throw new HttpError(400, "Neispravan id koncerta.");
  }

  const koncert = await context.entites.Koncert.findUnique({
    where: {sifKoncert},
    select: {
      sifKoncert: true,
      sifStavka: true,
      datumVrijeme: true,
      brojMjesta: true,
      stanje: true,
      //Mjesto odrzavanja i grad u kojem se nalazi
      mjesto: {
        select: {
          sifMjestoKoncerta: true,
          mbid: true,
          nazMjestoKoncerta: true,
          adresaMjestoKoncerta: true,
          koordinate: true,
          kapacitet: true,
          mjesto: { select: {sifMjesto: true, nazMjesto: true } },
        },
      },
      izvodjaci: {
        select: {mbid: true, nazIzvodjaca: true, popularnost: true},
        orderBy: {popularnost: "desc"},
      },
    },
  });

  if(!koncert) {
    throw new HttpError(404, "Koncert nije pronađen");
  }

  //slobodna mjesta = ukupan broj mjesta - aktivne prijave (ne ide ispod 0)
  const zauzeto = await context.entities.PrijavaNaKoncert.count({
    where: zauzetoWhere(sifKoncert),
  });
  const slobodnaMjesta = Math.max(0, koncert.brojMjesta - zauzeto);

  //prijava trenutnog korisnika (ako je prijavljen i ima aktivnu prijavu)
  //context.user je undefined za neprijavljene jer je query registriran sa auth: false
  const mojaPrijava = context.user
    ? await context.entities.PrijavaNaKoncert.findFirst({
        where: {sifKorisnik: context.user.id, ...zauzetoWhere(sifKoncert)},
        //QR kod vracamo samo vlasniku prijave, nikad tuđe
        select: { sifPrijavaNa: true, stanje: true, qrKod: true },
    })
    : null;

  return { ...koncert, slobodnaMjesta, mojaPrijava };
};