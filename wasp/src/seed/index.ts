import type { DbSeedFn } from "wasp/server";

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
