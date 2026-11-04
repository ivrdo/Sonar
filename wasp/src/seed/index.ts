import type { DbSeedFn } from "wasp/server";
import { katalog } from "./data/katalog.js";

export const seedProba: DbSeedFn = async (prisma) => {
  const mjesto =
    (await prisma.mjesto.findFirst({ where: { nazMjesto: "Zagreb" } })) ??
    (await prisma.mjesto.create({
      data: { nazMjesto: "Zagreb", koordinate: "45.8150,15.9819" },
    }));

  await prisma.izvodjac.upsert({
    where: { mbid: "test-izvodjac-0001" },
    update: {},
    create: { mbid: "test-izvodjac-0001", nazIzvodjaca: "Probni izvođač" },
  });

  console.log(`Seed OK, sifMjesto=${mjesto.sifMjesto}`);
};

export const pregledBaze: DbSeedFn = async (prisma) => {
  console.log("Mjesto:", await prisma.mjesto.findMany());
  console.log(
    "Izvodjac (prvih 10):",
    await prisma.izvodjac.findMany({ take: 10 }),
  );
  console.log("Brojevi redaka:", {
    korisnik: await prisma.korisnik.count(),
    izvodjac: await prisma.izvodjac.count(),
    album: await prisma.album.count(),
    pjesma: await prisma.pjesma.count(),
    mjestoKoncerta: await prisma.mjestoKoncerta.count(),
    koncert: await prisma.koncert.count(),
    mjesto: await prisma.mjesto.count(),
  });
};

export const seedKatalogProba: DbSeedFn = async () => {
  console.log(
    "izvođača:",
    katalog.izvodjaci.length,
    "| mjesta:",
    katalog.mjestaKoncerta.length,
  );
};