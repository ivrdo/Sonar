import { type Pretrazi } from "wasp/server/operations";

export type SearchResults = {
  izvodjaci: { id: string; naziv: string }[];
  albumi: { id: number; naziv: string; izvodjac: string; godina: number | null }[];
  pjesme: { id: number; naziv: string; izvodjac: string }[];
  mjesta: { id: number; naziv: string; adresa: string }[];
};

const PRAZNO: SearchResults = { izvodjaci: [], albumi: [], pjesme: [], mjesta: [] };

export const pretrazi: Pretrazi<{ pojam: string }, SearchResults> = async (
  { pojam },
  context,
) => {
  const q = pojam.trim();
  if (q.length < 2) return PRAZNO; // 1 slovo bi vratilo pola baze

  // contains + insensitive: "mjes" pronalazi "Mjesečeva Strana" (bez obzira na velika slova)
  const sadrzi = { contains: q, mode: "insensitive" as const };

  // Promise.all: sva četiri upita idu u bazu istodobno, ne jedan za drugim
  const [izv, alb, pje, mje] = await Promise.all([
    context.entities.Izvodjac.findMany({
      where: { nazIzvodjaca: sadrzi },
      orderBy: { popularnost: "desc" },
      take: 10,
    }),
    context.entities.Album.findMany({
      where: { nazAlbum: sadrzi },
      include: { izvodjac: true },
      take: 10,
    }),
    context.entities.Pjesma.findMany({
      where: { nazPjesma: sadrzi },
      include: { izvodjac: true },
      take: 10,
    }),
    context.entities.MjestoKoncerta.findMany({
      where: { nazMjestoKoncerta: sadrzi },
      take: 10,
    }),
  ]);

  return {
    izvodjaci: izv.map((i) => ({ id: i.mbid, naziv: i.nazIzvodjaca })),
    albumi: alb.map((a) => ({
      id: a.sifAlbum,
      naziv: a.nazAlbum,
      izvodjac: a.izvodjac.nazIzvodjaca,
      godina: a.godinaIzdanja,
    })),
    pjesme: pje.map((p) => ({ id: p.sifPjesma, naziv: p.nazPjesma, izvodjac: p.izvodjac.nazIzvodjaca })),
    mjesta: mje.map((m) => ({ id: m.sifMjestoKoncerta, naziv: m.nazMjestoKoncerta, adresa: m.adresaMjestoKoncerta })),
  };
};