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
