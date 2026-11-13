import type { DbSeedFn } from "wasp/server";
import { katalog } from "./data/katalog.js";
import { seedGenerirano } from "./generirano.js";

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

  const postojeciIzv = new Set(
    (await prisma.izvodjac.findMany({ select: { mbid: true } })).map((x) => x.mbid),
  );
  for (const el of katalog.izvodjaci) {
    if (postojeciIzv.has(el.mbid)) continue;
    await prisma.izvodjac.create({
      data: {
        mbid: el.mbid,
        nazIzvodjaca: el.naziv,
        popularnost: el.popularnost,
        stanjeDohvata: "DOHVACEN",
        stavka: { create: { tip: "IZVODJAC" } },
      },
    });
  }

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

  let mjk = [];
  for (const mjk1 of katalog.mjestaKoncerta) {
    const sifMjesto = nazToSifMj.get(mjk1.grad);
    if (sifMjesto === undefined) {
      throw new Error(`MjKonc: ${mjk1.naziv} | Grad: ${mjk1.grad}`);
    }
    mjk.push({
      mbid: mjk1.mbid,
      nazMjestoKoncerta: mjk1.naziv,
      adresaMjestoKoncerta: mjk1.adresa,
      koordinate: mjk1.koordinate,
      sifMjesto,
    });
  }
  const MjKonc = await prisma.mjestoKoncerta.createMany({
    data: mjk,
    skipDuplicates: true,
  });

  const postojeciAlb = new Set(
    (await prisma.album.findMany({ select: { mbid: true } })).map(
      (x) => x.mbid,
    ),
  );
  for (const a of katalog.albumi) {
    if (postojeciAlb.has(a.mbid)) continue;
    await prisma.album.create({
      data: {
        mbid: a.mbid,
        nazAlbum: a.naziv,
        godinaIzdanja: a.godina,
        izvodjac: { connect: { mbid: a.izvodjacMbid } },
        stavka: { create: { tip: "ALBUM" } },
      },
    });
  }

  const al = await prisma.album.findMany();
  let mbidToSifAlbum = new Map<string, number>();
  for (const ali of al) {
    mbidToSifAlbum.set(ali.mbid, ali.sifAlbum);
  }

  const postojecePj = new Set(
    (await prisma.pjesma.findMany({ select: { mbid: true } })).map(
      (x) => x.mbid,
    ),
  );
  for (const p of katalog.pjesme) {
    if (postojecePj.has(p.mbid)) continue;
    const sifAlbum = mbidToSifAlbum.get(p.albumMbid);
    if (sifAlbum === undefined) {
      throw new Error(`Pjesma: ${p.naziv} | Album: ${p.albumMbid}`);
    }
    await prisma.pjesma.create({
      data: {
        mbid: p.mbid,
        nazPjesma: p.naziv,
        trajanje: p.trajanje,
        album: { connect: { sifAlbum } },
        izvodjac: { connect: { mbid: p.izvodjacMbid } },
        stavka: { create: { tip: "PJESMA" } },
      },
    });
  }

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
  console.log("MjestoKoncerta:", await prisma.mjestoKoncerta.count());
  console.log("Albumi:", await prisma.album.count());
  console.log("Pjesme:", await prisma.pjesma.count());
  console.log(
    "Stavka:",
    await prisma.stavka.count(),
    "| očekivano:",
    katalog.izvodjaci.length + katalog.albumi.length + katalog.pjesme.length,
  );
};

export const seedSve: DbSeedFn = async (prisma) => {
  await seedKatalog(prisma);
  await seedGenerirano(prisma);
};