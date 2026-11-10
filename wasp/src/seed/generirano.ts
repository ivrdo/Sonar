import type { DbSeedFn } from "wasp/server";
import { napraviRandom, cijeli, izaberi, uzorak } from "./random.js";
import type { Izvodjac } from "wasp/entities";
import type { KoncertStanje, Prisma } from "@prisma/client";

// POSTAVKE

const SEED = 42; // isti seed => isti korisnici, praćenja, ocjene, koncerti
const BROJ_SLUSATELJA = 150; // prvi je fiksni probni račun
const DAN = 24 * 60 * 60 * 1000;

// Domaći izvođači koji dobivaju korisnički račun (uloga IZVODJAC)
const IZVODJACI_KORISNICI = [
  "Felon", "Flare", "Radikal Dub Kolektiv", "KUKU$", "Miach", "Brkovi",
  "She Loves Pablo", "Porto Morto", "Antenat", "Neon Lies", "Plastika", "High5",
];

// Mjesta koja dobivaju upravitelja i fiksni kapacitet
const MJESTA_UPRAVITELJA = [
  { naziv: "KSET", kapacitet: 800 },
  { naziv: "Klub Močvara", kapacitet: 1000 },
  { naziv: "Kulušić", kapacitet: 400 },
  { naziv: "Arena Zagreb", kapacitet: 15000 },
  { naziv: "Koncertna dvorana Vatroslava Lisinskog", kapacitet: 1800 },
  { naziv: "Spaladium Arena", kapacitet: 12000 },
  { naziv: "Stadion Poljud", kapacitet: 30000 },
  { naziv: "Pula Arena", kapacitet: 5000 },
];

const KAPACITETI = [150, 300, 500, 800, 1200, 2000, 5000]; // ostala mjesta
const RADIJUSI = [10, 25, 50, 100, 300];
const OCJENE_VOLIM = [3, 4, 4, 5, 5];
const OCJENE_SVE = [1, 2, 3, 3, 4, 4, 5];

const MUSKA_IMENA = [
  "Ivan", "Marko", "Luka", "Josip", "Ante", "Matej", "Filip", "Petar", "Dario", "Tomislav",
  "Nikola", "Karlo", "Mario", "Stjepan", "Vedran", "Domagoj", "Hrvoje", "Davor", "Zvonimir", "Borna",
];
const ZENSKA_IMENA = [
  "Ana", "Marija", "Ivana", "Petra", "Lea", "Maja", "Katarina", "Nina", "Sara", "Ema",
  "Tea", "Lana", "Mia", "Dora", "Iva", "Martina", "Karla", "Nika", "Paula", "Antonija",
];
const PREZIMENA = [
  "Horvat", "Kovačević", "Babić", "Marić", "Novak", "Jurić", "Knežević", "Vuković", "Matić", "Tomić",
  "Kovač", "Pavlović", "Božić", "Blažević", "Grgić", "Pavić", "Radić", "Perić", "Šarić", "Lovrić",
  "Vidović", "Perković", "Popović", "Bošnjak", "Jukić", "Barišić", "Marušić", "Petrović", "Filipović",
  "Mikulić", "Đurić", "Žagar", "Cvitković", "Šimunić", "Zorić",
];
const OPISI = [
  "Volim koncerte u malim klubovima.",
  "Slušam sve od punka do jazza.",
  "Skupljam ploče i idem na festivale.",
  "Najviše slušam indie i elektroniku.",
  "Uvijek tražim nove izvođače.",
  "Fan domaće scene.",
  "Vikendom na koncertima, radnim danom sa slušalicama.",
];
const RAZLOZI_ODBIJANJA = [
  "Termin je već zauzet.",
  "Mjesto je u tom terminu rezervirano za privatni događaj.",
  "Tehnički zahtjevi izvođača nisu ispunjeni.",
  "Premalo vremena za organizaciju.",
];

type Stanje = KoncertStanje;
type Popunjenost = "puno" | "jedno_slobodno" | "visoka" | "niska" | "odrzan" | "nema";
type Spec = { stanje: Stanje; n: number; prijave: Popunjenost; brojMjesta?: number };

// Koncerti po stanjima
const SPECIFIKACIJE: Spec[] = [
  { stanje: "OTVORENE_PRIJAVE", n: 1, prijave: "puno", brojMjesta: 25 }, // stanje "popunjeno"
  { stanje: "OTVORENE_PRIJAVE", n: 1, prijave: "jedno_slobodno", brojMjesta: 30 }, // zadnje slobodno mjesto
  { stanje: "OTVORENE_PRIJAVE", n: 4, prijave: "visoka" },
  { stanje: "OTVORENE_PRIJAVE", n: 14, prijave: "niska" },
  { stanje: "POTVRDEN", n: 3, prijave: "nema" },
  { stanje: "PREDLOZEN", n: 4, prijave: "nema" },
  { stanje: "ODRZAN", n: 8, prijave: "odrzan" },
  { stanje: "ODBIJEN", n: 2, prijave: "nema" },
  { stanje: "ISTEKAO", n: 2, prijave: "nema" },
  { stanje: "OTKAZAN", n: 2, prijave: "nema" },
];

// POMOĆNE FUNKCIJE

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "");
}

function osoba(r: () => number): { ime: string; prezime: string } {
  const ime = izaberi(r, r() < 0.5 ? MUSKA_IMENA : ZENSKA_IMENA);
  return { ime, prezime: izaberi(r, PREZIMENA) };
}

// koncerti počinju u 20:00, pomaknuti za zadani broj dana od danas
function termin(danaOdSada: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + danaOdSada);
  d.setHours(20, 0, 0, 0);
  return d;
}

function qr(r: () => number, koncert: number, korisnik: number): string {
  const hex = Math.floor(r() * 0xffffffff).toString(16).padStart(8, "0");
  return `SONAR-${koncert}-${korisnik}-${hex}`;
}

async function upisi<T>(niz: T[], f: (dio: T[]) => Promise<unknown>): Promise<void> {
  for (let i = 0; i < niz.length; i += 1000) {
    await f(niz.slice(i, i + 1000));
  }
}

function danaDoKoncerta(stanje: Stanje, r: () => number): number {
  switch (stanje) {
    case "OTVORENE_PRIJAVE": return cijeli(r, 3, 60);
    case "POTVRDEN": return cijeli(r, 10, 40);
    case "PREDLOZEN": return cijeli(r, 20, 60);
    case "ODRZAN": return -cijeli(r, 3, 60);
    case "ODBIJEN": return cijeli(r, 15, 60);
    case "ISTEKAO": return cijeli(r, 20, 60);
    case "OTKAZAN": return cijeli(r, 5, 40);
  }
}

type Izv = Pick<
  Izvodjac,
  "mbid" | "nazIzvodjaca" | "popularnost" | "sifStavka"
>;

// SEED

export const seedGenerirano: DbSeedFn = async (prisma) => {
  if ((await prisma.korisnik.count()) > 0) {
    console.log("Generirani podaci: preskočeno, tablica Korisnik nije prazna (za čisti start: wasp db reset).");
    return;
  }
  const r = napraviRandom(SEED);

  // 1. Što već postoji u bazi (katalog)
  const gradovi = await prisma.mjesto.findMany({ orderBy: { sifMjesto: "asc" } });
  const sifGrada = new Map<string, number>(gradovi.map((g) => [g.nazMjesto, g.sifMjesto]));
  const zagreb = sifGrada.get("Zagreb");
  const split = sifGrada.get("Split");
  const pula = sifGrada.get("Pula");
  if (zagreb === undefined || split === undefined || pula === undefined) {
    throw new Error("Nedostaju gradovi iz kataloga. Prvo pokreni seedKatalog.");
  }

  const izvodjaci: Izv[] = await prisma.izvodjac.findMany({
    orderBy: { mbid: "asc" },
    select: { mbid: true, nazIzvodjaca: true, popularnost: true, sifStavka: true },
  });
  if (izvodjaci.length === 0) throw new Error("Katalog je prazan. Prvo pokreni seedKatalog.");

  const poImenu = new Map<string, Izv>(izvodjaci.map((i) => [i.nazIzvodjaca, i]));
  const zastupani: Izv[] = [];
  for (const ime of IZVODJACI_KORISNICI) {
    const izv = poImenu.get(ime);
    if (izv) zastupani.push(izv);
    else console.warn(`Izvođač "${ime}" nije u katalogu, preskačem.`);
  }
  if (zastupani.length === 0) throw new Error("Nijedan od zadanih izvođača nije u katalogu.");

  const oznake = await prisma.oznaka.findMany({
    orderBy: { sifOznaka: "asc" },
    select: { sifOznaka: true, _count: { select: { izvodjaci: true } } },
  });
  const popularneOznake = [...oznake]
    .sort((a, b) => b._count.izvodjaci - a._count.izvodjaci || a.sifOznaka - b.sifOznaka)
    .slice(0, 40)
    .map((o) => o.sifOznaka);

  const stavkeAlbuma = (
    await prisma.album.findMany({ orderBy: { sifStavka: "asc" }, select: { sifStavka: true } })
  ).map((a) => a.sifStavka);
  const stavkePjesama = (
    await prisma.pjesma.findMany({ orderBy: { sifStavka: "asc" }, select: { sifStavka: true } })
  ).map((p) => p.sifStavka);
  const stavkaIzvodjaca = new Map<string, number>(izvodjaci.map((i) => [i.mbid, i.sifStavka]));
  const sviMbid = izvodjaci.map((i) => i.mbid);

  // izvođači koje korisnici biraju pri registraciji: 60 najpopularnijih + domaći
  const najpopularniji = [...izvodjaci]
    .sort((a, b) => b.popularnost - a.popularnost || (a.mbid < b.mbid ? -1 : 1))
    .slice(0, 60)
    .map((i) => i.mbid);
  const bazenIzvodjaca = [...new Set([...najpopularniji, ...zastupani.map((z) => z.mbid)])];

  const mjestaKoncerta = await prisma.mjestoKoncerta.findMany({
    orderBy: { sifMjestoKoncerta: "asc" },
    select: { sifMjestoKoncerta: true, nazMjestoKoncerta: true, sifMjesto: true },
  });
  const upravljana: { sifMjestoKoncerta: number; nazMjestoKoncerta: string; sifMjesto: number; kapacitet: number }[] = [];
  for (const m of MJESTA_UPRAVITELJA) {
    const nadjeno = mjestaKoncerta.find((x) => x.nazMjestoKoncerta === m.naziv);
    if (nadjeno) upravljana.push({ ...nadjeno, kapacitet: m.kapacitet });
    else console.warn(`Mjesto "${m.naziv}" nije u katalogu, preskačem.`);
  }
  if (upravljana.length === 0) throw new Error("Nijedno od zadanih mjesta nije u katalogu.");

  // 2. Kapaciteti svih mjesta (bez kapaciteta se koncert ne može predložiti)
  const fiksni = new Map<number, number>(upravljana.map((m) => [m.sifMjestoKoncerta, m.kapacitet]));
  for (const m of mjestaKoncerta) {
    const kapacitet = fiksni.get(m.sifMjestoKoncerta) ?? izaberi(r, KAPACITETI);
    await prisma.mjestoKoncerta.update({
      where: { sifMjestoKoncerta: m.sifMjestoKoncerta },
      data: { kapacitet },
    });
  }

  // 3. Korisnici: administrator, moderatori, izvođači, upravitelji
  const admin = await prisma.korisnik.create({
    data: { nazKorisnik: "Administrator", email: "admin@sonar.test", uloga: "ADMINISTRATOR", sifMjesto: zagreb },
  });
  for (const i of [1, 2]) {
    await prisma.korisnik.create({
      data: { nazKorisnik: `Moderator ${i}`, email: `moderator${i}@sonar.test`, uloga: "MODERATOR", sifMjesto: zagreb },
    });
  }
  for (const izv of zastupani) {
    await prisma.korisnik.create({
      data: {
        nazKorisnik: izv.nazIzvodjaca,
        email: `${slug(izv.nazIzvodjaca)}@sonar.test`,
        opis: `Službeni profil izvođača ${izv.nazIzvodjaca}.`,
        uloga: "IZVODJAC",
        zastupaMbid: izv.mbid,
        sifMjesto: zagreb,
      },
    });
  }
  for (const m of upravljana) {
    const { ime, prezime } = osoba(r);
    await prisma.korisnik.create({
      data: {
        nazKorisnik: `${ime} ${prezime}`,
        email: `upravitelj.${slug(m.nazMjestoKoncerta)}@sonar.test`,
        opis: `Upravitelj mjesta ${m.nazMjestoKoncerta}.`,
        uloga: "UPRAVITELJ_MJESTA",
        upravljaSifMjestoKoncerta: m.sifMjestoKoncerta,
        sifMjesto: m.sifMjesto,
      },
    });
  }

  // 4. Slušatelji
  const sluSif: number[] = [];
  const registracija = new Map<number, string[]>(); // slušatelj -> izvođači odabrani pri registraciji
  for (let i = 0; i < BROJ_SLUSATELJA; i++) {
    const test = i === 0;
    const { ime, prezime } = osoba(r);
    const bacanje = cijeli(r, 1, 100);
    const sifMjesto = test || bacanje <= 70 ? zagreb : bacanje <= 90 ? split : pula;
    const radijus = izaberi(r, RADIJUSI);
    const imaOpis = r() < 0.5;
    const opis = izaberi(r, OPISI);
    const oz = uzorak(r, popularneOznake, cijeli(r, 3, 5));
    const iz = uzorak(r, bazenIzvodjaca, cijeli(r, 3, 5));
    const k = await prisma.korisnik.create({
      data: {
        nazKorisnik: test ? "Test Slušatelj" : `${ime} ${prezime}`,
        email: test ? "slusatelj@sonar.test" : `${slug(ime)}.${slug(prezime)}${i}@sonar.test`,
        opis: test ? "Probni račun za razvoj i demonstraciju." : imaOpis ? opis : undefined,
        maxUdaljenostKm: test ? 300 : radijus,
        sifMjesto,
        odabraneOznake: { connect: oz.map((sifOznaka) => ({ sifOznaka })) },
        odabraniIzvodjaci: { connect: iz.map((mbid) => ({ mbid })) },
      },
    });
    sluSif.push(k.sifKorisnik);
    registracija.set(k.sifKorisnik, iz);
  }
  const testSif = sluSif[0];

  // 5. Pravilo suspenzije
  await prisma.praviloSustava.create({
    data: {
      brojUklonjenihDoSuspenzije: 3,
      trajanjeSuspenzijeDana: 7,
      administratori: { connect: { sifKorisnik: admin.sifKorisnik } },
    },
  });

  // 6. Praćenja izvođača i korisnika
  const prIzv: { sifKorisnik: number; mbid: string }[] = [];
  const pracen = new Map<number, string[]>();
  for (const [sif, reg] of registracija) {
    const dodatno = uzorak(r, bazenIzvodjaca, cijeli(r, 0, 5));
    const svi = [...new Set([...reg, ...dodatno])];
    pracen.set(sif, svi);
    for (const mbid of svi) prIzv.push({ sifKorisnik: sif, mbid });
  }
  const prKor: { sifPratitelj: number; sifPraceni: number }[] = [];
  const parovi = new Set<string>();
  for (const sif of sluSif) {
    const n = cijeli(r, 0, 6);
    for (let j = 0; j < n; j++) {
      const drugi = izaberi(r, sluSif);
      if (drugi === sif || parovi.has(`${sif}-${drugi}`)) continue;
      parovi.add(`${sif}-${drugi}`);
      prKor.push({ sifPratitelj: sif, sifPraceni: drugi });
    }
  }
  await upisi(prIzv, (d) => prisma.pracenjeIzvodjaca.createMany({ data: d, skipDuplicates: true }));
  await upisi(prKor, (d) => prisma.pracenjeKorisnika.createMany({ data: d, skipDuplicates: true }));

  // 7. Ocjene i "sviđa mi se" (samo izvođači, albumi i pjesme, nikad koncerti: okidač u bazi)
  const ocjene: { sifKorisnik: number; sifStavka: number; ocjena: number }[] = [];
  const svidjanja: { sifKorisnik: number; sifStavka: number }[] = [];
  for (const sif of sluSif) {
    const pratim = pracen.get(sif) ?? [];
    const pratimSet = new Set(pratim);
    const kandidati = [...new Set([...pratim, ...uzorak(r, sviMbid, 10)])];
    for (const mbid of uzorak(r, kandidati, cijeli(r, 5, 12))) {
      const stavka = stavkaIzvodjaca.get(mbid);
      if (stavka === undefined) continue;
      ocjene.push({
        sifKorisnik: sif,
        sifStavka: stavka,
        ocjena: pratimSet.has(mbid) ? izaberi(r, OCJENE_VOLIM) : izaberi(r, OCJENE_SVE),
      });
    }
    for (const s of uzorak(r, stavkeAlbuma, cijeli(r, 3, 8))) {
      ocjene.push({ sifKorisnik: sif, sifStavka: s, ocjena: izaberi(r, OCJENE_SVE) });
    }
    for (const s of uzorak(r, stavkePjesama, cijeli(r, 3, 10))) {
      ocjene.push({ sifKorisnik: sif, sifStavka: s, ocjena: izaberi(r, OCJENE_SVE) });
    }
    for (const mbid of uzorak(r, pratim, cijeli(r, 2, 6))) {
      const stavka = stavkaIzvodjaca.get(mbid);
      if (stavka !== undefined) svidjanja.push({ sifKorisnik: sif, sifStavka: stavka });
    }
    for (const s of uzorak(r, stavkeAlbuma, cijeli(r, 2, 6))) svidjanja.push({ sifKorisnik: sif, sifStavka: s });
    for (const s of uzorak(r, stavkePjesama, cijeli(r, 3, 10))) svidjanja.push({ sifKorisnik: sif, sifStavka: s });
  }
  await upisi(ocjene, (d) => prisma.ocjena.createMany({ data: d, skipDuplicates: true }));
  await upisi(svidjanja, (d) => prisma.svidja.createMany({ data: d, skipDuplicates: true }));

  // 8. Koncerti i prijave
  type Prijava = Prisma.PrijavaNaKoncertCreateManyInput;
  const prijave: Prijava[] = [];
  const ostaliSlusatelji = sluSif.filter((s) => s !== testSif);
  const sada = Date.now();
  let testOtvoreni = 0;
  let testOdrzan = 0;
  let brojKoncerata = 0;

  for (const spec of SPECIFIKACIJE) {
    for (let n = 0; n < spec.n; n++) {
      const predlagac = izaberi(r, zastupani);
      const ostali = uzorak(r, zastupani.filter((z) => z.mbid !== predlagac.mbid), cijeli(r, 0, 2));
      const mjesto = izaberi(r, upravljana);
      const brojMjesta = spec.brojMjesta ?? cijeli(r, 20, 120);
      const dana = danaDoKoncerta(spec.stanje, r);
      const datum = termin(dana);
      const rok =
        spec.stanje === "PREDLOZEN" ? termin(cijeli(r, 2, 10))
        : spec.stanje === "ISTEKAO" ? termin(-cijeli(r, 1, 20))
        : termin(dana - 14);
      const razlog = spec.stanje === "ODBIJEN" ? izaberi(r, RAZLOZI_ODBIJANJA) : undefined;

      if (brojMjesta > mjesto.kapacitet) throw new Error(`Koncert ima više mjesta od kapaciteta: ${mjesto.nazMjestoKoncerta}`);

      const koncert = await prisma.koncert.create({
        data: {
          datumVrijeme: datum,
          brojMjesta,
          stanje: spec.stanje,
          rokZaPotvrdu: rok,
          razlogOdbijanja: razlog,
          stavka: { create: { tip: "KONCERT" } },
          mjesto: { connect: { sifMjestoKoncerta: mjesto.sifMjestoKoncerta } },
          predlozio: { connect: { mbid: predlagac.mbid } },
          izvodjaci: { connect: [predlagac, ...ostali].map((i) => ({ mbid: i.mbid })) },
        },
      });
      brojKoncerata++;

      // koliko aktivnih prijava
      let aktivne = 0;
      switch (spec.prijave) {
        case "puno": aktivne = brojMjesta; break;
        case "jedno_slobodno": aktivne = brojMjesta - 1; break;
        case "visoka": aktivne = Math.min(brojMjesta - 2, Math.floor(brojMjesta * (0.7 + r() * 0.25))); break;
        case "niska": aktivne = Math.max(1, Math.floor(brojMjesta * r() * 0.5)); break;
        case "odrzan": aktivne = Math.max(1, Math.floor(brojMjesta * (0.4 + r() * 0.55))); break;
        case "nema": aktivne = 0; break;
      }
      if (aktivne === 0) continue;

      // probni slušatelj je prijavljen na prva dva "niska" koncerta i na prvi održani
      const ukljuciTest =
        (spec.prijave === "niska" && testOtvoreni < 2) || (spec.prijave === "odrzan" && testOdrzan < 1);
      if (spec.prijave === "niska" && testOtvoreni < 2) testOtvoreni++;
      if (spec.prijave === "odrzan" && testOdrzan < 1) testOdrzan++;

      const sudionici = ukljuciTest
        ? [testSif, ...uzorak(r, ostaliSlusatelji, aktivne - 1)]
        : uzorak(r, ostaliSlusatelji, aktivne);
      const sudioniciSet = new Set(sudionici);

      for (const sif of sudionici) {
        let stanje: Prijava["stanje"] = "PRIJAVLJEN";
        let skeniranje: Date | undefined;
        if (spec.stanje === "ODRZAN") {
          if (r() < 0.8) {
            stanje = "DOSAO";
            skeniranje = new Date(datum.getTime() - cijeli(r, 0, 45) * 60000);
          } else {
            stanje = "NIJE_DOSAO";
          }
        }
        const datumPrijave =
          spec.stanje === "ODRZAN"
            ? new Date(datum.getTime() - cijeli(r, 5, 30) * DAN)
            : new Date(sada - cijeli(r, 0, 20) * DAN);
        prijave.push({
          sifKorisnik: sif,
          sifKoncert: koncert.sifKoncert,
          stanje,
          qrKod: qr(r, koncert.sifKoncert, sif),
          datumPrijave,
          vrijemeSkeniranja: skeniranje,
        });
      }
      // nekoliko otkazanih prijava (ne zauzimaju mjesta)
      const otkazani = uzorak(r, ostaliSlusatelji.filter((s) => !sudioniciSet.has(s)), cijeli(r, 0, 3));
      for (const sif of otkazani) {
        prijave.push({
          sifKorisnik: sif,
          sifKoncert: koncert.sifKoncert,
          stanje: "OTKAZAN",
          qrKod: qr(r, koncert.sifKoncert, sif),
          datumPrijave: new Date(sada - cijeli(r, 1, 25) * DAN),
        });
      }
    }
  }
  await upisi(prijave, (d) => prisma.prijavaNaKoncert.createMany({ data: d }));

  console.log(
    "Generirano:",
    "Korisnik:", await prisma.korisnik.count(),
    "| PracenjeIzvodjaca:", await prisma.pracenjeIzvodjaca.count(),
    "| PracenjeKorisnika:", await prisma.pracenjeKorisnika.count(),
    "| Ocjena:", await prisma.ocjena.count(),
    "| Svidja:", await prisma.svidja.count(),
    "| Koncert:", await prisma.koncert.count(), `(očekivano ${brojKoncerata})`,
    "| PrijavaNaKoncert:", await prisma.prijavaNaKoncert.count(), `(očekivano ${prijave.length})`,
  );
};
