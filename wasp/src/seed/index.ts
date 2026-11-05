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

export const seedKatalog: DbSeedFn = async (prisma) => {
  let nazToSifMj = new Map<string, number>();
  for (const grad of katalog.gradovi) {
    const g =
      (await prisma.mjesto.findFirst({
        where: { nazMjesto: grad.nazMjesto },
      })) ??
      (await prisma.mjesto.create({
        data: { nazMjesto: grad.nazMjesto, koordinate: grad.koordinate },
      }));
    nazToSifMj.set(g.nazMjesto, g.sifMjesto);
  }

  const o = await prisma.oznaka.createMany({
    data: katalog.oznake.map((el) => {
      const tip: "ZANR" | "RASPOLOZENJE" =
        el.tip === "zanr" ? "ZANR" : "RASPOLOZENJE";
      return { nazOznaka: el.naziv, tip };
    }),
    skipDuplicates: true,
  });

  const i = await prisma.izvodjac.createMany({
    data: katalog.izvodjaci.map((el) => {
      return { mbid: el.mbid, nazIzvodjaca: el.naziv, popularnost: el.popularnost, stanjeDohvata: "DOHVACEN" as const };
    }),
    skipDuplicates: true,
  });

  const oz = await prisma.oznaka.findMany();
  let nazToSifOzn = new Map<string, number>();
  for (const ozi of oz) {
    nazToSifOzn.set(ozi.nazOznaka, ozi.sifOznaka);
  }

  let veze = [];
  for (const izvi1 of katalog.izvodjaci) {
    for (const izvi2 of izvi1.oznake) {
      const sifOznaka = nazToSifOzn.get(izvi2.naziv);
      if (sifOznaka === undefined) {
        throw new Error(`Izv: ${izvi1.naziv} | Ozn: ${izvi2.naziv}`);
      }
      veze.push({
        mbid: izvi1.mbid,
        sifOznaka,
        tezina: izvi2.tezina,
      });
    }
  }
  const io = await prisma.izvodjacOznaka.createMany({
    data: veze,
    skipDuplicates: true,
  });

  console.log(
    "Mjesto:",
    await prisma.mjesto.count(),
    "| Oznaka:",
    await prisma.oznaka.count(),
  );
  console.log(
    "Izvodjac:",
    await prisma.izvodjac.count(),
    "| IzvodjacOznaka:",
    await prisma.izvodjacOznaka.count(),
    "| očekivano veza:",
    katalog.izvodjaci.reduce((s1, s2) => s1 + s2.oznake.length, 0),
  );
};