//POMOCNE FUNKCIJe za koncerte (dijele ih dohvatiKoncert i prijaviNaKoncert)
import type { Prisma } from "@prisma/client";

/*Uvjet za zauzeto mjesto je da svaka prijava koja nije Otkazana
  (PRIJAVLJEN, DOSAO i NIJE_DOSAO). Isto pravilo koristi i unique indeks uq_aktivna_prijava u bazi,
  pa su broj mjesta i jedinstvenost prijave usklađeni.
 */
export function zauzetoWhere(
  sifKoncert: number,
): Prisma.PrijavaNaKoncertWhereInput {
  return { sifKoncert, stanje: { not: "OTKAZAN"} };
}

//stanje buttona na stranici koncerta (ApplyBox)
export type StanjeButton =
  | "APPLY"  //more se prijaviti: "Apply  free"
  | "PRIJAVLJEN"  //već prijavljen: "Show ticket"
  | "POPUNJENO"  //nema slobodnih mjesta: "Sold out"
  | "ZATVORENO";  //stanje koncerta nije u stanju otvoreni prijva ili je već počeo

export function izracunajStanjeButton(opcije: {
  koncertStanje: string;
  datumVrijeme: Date;
  slobodnaMjesta: number;
  imaPrijavu: boolean;
}): StanjeButton {
  //prijavljeni korisnik uvijek vidi svoju ulaznicu, i nakon koncerta
  if (opcije.imaPrijavu) return "PRIJAVLJEN";
  if(
    opcije.koncertStanje !== "OTVORENE_PRIJAVE" || opcije.datumVrijeme <= new Date()
  ) { return "ZATVORENO"; }
  if(opcije.slobodnaMjesta <= 0) return "POPUNJENO";
  return "APPLY";
}