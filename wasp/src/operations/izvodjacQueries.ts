import { HttpError} from "wasp/server";
import type { DohvatiIzvodjaca } from "wasp/server/operations";

export const dohvatiIzvodjaca: DohvatiIzvodjaca<{mbid:string}> = (async (
  { mbid },
  context,
) => {
  //provjera je li mbid poslan
  if(!mbid?.trim()) {
    throw new HttpError(400, "Mbid je obavezan.");
  }

  //trazimo izvodjace i povezane albume i pjesme
  const izvodjac =
    await context.entities.Izvodjac.findUnique({
      where: {mbid},

      include: {
        albumi: {
          include: {
            pjesme: true,
          },
        },

        pjesme: {
          where: { sifAlbum: null }, //ako su singlovi, nije dio albuma
        },
      },
    });

  //ako izvodjac ne postoji, vracamo 404
  if(!izvodjac) {
    throw new HttpError(404, "Izvođač nije pronađen.");
  }

  return izvodjac;
});

