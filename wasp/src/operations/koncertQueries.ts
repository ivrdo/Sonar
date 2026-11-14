import { HttpError } from "wasp/server";
import type { DohvatiKoncert } from "wasp/server/operations";

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
  });

  if(!koncert) {
    throw new HttpError(404, "Koncert nije pronađen");
  }

  return koncert;
};