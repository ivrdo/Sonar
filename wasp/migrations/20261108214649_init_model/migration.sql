-- CreateEnum
CREATE TYPE "KorisnikUloga" AS ENUM ('slusatelj', 'izvodjac', 'upravitelj_mjesta', 'moderator', 'administrator');

-- CreateEnum
CREATE TYPE "KorisnikStatus" AS ENUM ('aktivan', 'suspendiran', 'deaktiviran', 'obrisan');

-- CreateEnum
CREATE TYPE "StanjeDohvata" AS ENUM ('u obradi', 'dohvacen', 'neuspjelo');

-- CreateEnum
CREATE TYPE "OznakaTip" AS ENUM ('zanr', 'raspolozenje');

-- CreateEnum
CREATE TYPE "StavkaTip" AS ENUM ('izvodjac', 'album', 'pjesma', 'koncert');

-- CreateEnum
CREATE TYPE "RecenzijaStanje" AS ENUM ('vidljiva', 'uklonjena');

-- CreateEnum
CREATE TYPE "KoncertStanje" AS ENUM ('predlozen', 'potvrden', 'otvorene_prijave', 'odrzan', 'odbijen', 'istekao', 'otkazan');

-- CreateEnum
CREATE TYPE "PrijavaNaKoncertStanje" AS ENUM ('prijavljen', 'dosao', 'nije_dosao', 'otkazan');

-- CreateEnum
CREATE TYPE "PrijavaSadrzajaStanje" AS ENUM ('prijavljeno', 'u_obradi', 'uklonjeno', 'odbaceno');

-- CreateEnum
CREATE TYPE "ZahtjevZaUloguTip" AS ENUM ('izvodjac', 'upravitelj_mjesta');

-- CreateEnum
CREATE TYPE "ZahtjevZaUloguStanje" AS ENUM ('zahtjev', 'provjera', 'potrebna dopuna', 'potvrdjen', 'odbijen');

-- CreateEnum
CREATE TYPE "ZapisVrstaRadnje" AS ENUM ('uklanjanje_sadrzaja', 'odbacivanje_prijave', 'potvrda_zahtjeva', 'odbijanje_zahtjeva', 'trazenje_dopune');

-- CreateTable
CREATE TABLE "Korisnik" (
    "sifKorisnik" SERIAL NOT NULL,
    "nazKorisnik" TEXT NOT NULL,
    "email" TEXT,
    "opis" TEXT,
    "uloga" "KorisnikUloga" NOT NULL DEFAULT 'slusatelj',
    "status" "KorisnikStatus" NOT NULL DEFAULT 'aktivan',
    "postavkeObavijesti" JSONB NOT NULL DEFAULT '{}',
    "maxUdaljenostKm" DOUBLE PRECISION NOT NULL DEFAULT 50,
    "sifMjesto" INTEGER,
    "zastupaMbid" TEXT,
    "upravljaSifMjestoKoncerta" INTEGER,

    CONSTRAINT "Korisnik_pkey" PRIMARY KEY ("sifKorisnik")
);

-- CreateTable
CREATE TABLE "Zapis" (
    "sifKorisnik" INTEGER NOT NULL,
    "datumVrijemeZapis" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vrstaRadnje" "ZapisVrstaRadnje" NOT NULL,
    "opis" TEXT,

    CONSTRAINT "Zapis_pkey" PRIMARY KEY ("sifKorisnik","datumVrijemeZapis")
);

-- CreateTable
CREATE TABLE "PraviloSustava" (
    "sifPravilo" SERIAL NOT NULL,
    "brojUklonjenihDoSuspenzije" INTEGER NOT NULL,
    "trajanjeSuspenzijeDana" INTEGER NOT NULL,

    CONSTRAINT "PraviloSustava_pkey" PRIMARY KEY ("sifPravilo")
);

-- CreateTable
CREATE TABLE "Stavka" (
    "sifStavka" SERIAL NOT NULL,
    "tip" "StavkaTip" NOT NULL,

    CONSTRAINT "Stavka_pkey" PRIMARY KEY ("sifStavka")
);

-- CreateTable
CREATE TABLE "Izvodjac" (
    "mbid" TEXT NOT NULL,
    "nazIzvodjaca" TEXT NOT NULL,
    "biografija" TEXT,
    "popularnost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "stanjeDohvata" "StanjeDohvata" NOT NULL DEFAULT 'u obradi',
    "sifStavka" INTEGER NOT NULL,

    CONSTRAINT "Izvodjac_pkey" PRIMARY KEY ("mbid")
);

-- CreateTable
CREATE TABLE "Album" (
    "sifAlbum" SERIAL NOT NULL,
    "mbid" TEXT NOT NULL,
    "nazAlbum" TEXT NOT NULL,
    "godinaIzdanja" INTEGER,
    "sifStavka" INTEGER NOT NULL,
    "izvodjacMbid" TEXT NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("sifAlbum")
);

-- CreateTable
CREATE TABLE "Pjesma" (
    "sifPjesma" SERIAL NOT NULL,
    "mbid" TEXT NOT NULL,
    "nazPjesma" TEXT NOT NULL,
    "trajanje" INTEGER,
    "sifStavka" INTEGER NOT NULL,
    "sifAlbum" INTEGER,
    "izvodjacMbid" TEXT NOT NULL,

    CONSTRAINT "Pjesma_pkey" PRIMARY KEY ("sifPjesma")
);

-- CreateTable
CREATE TABLE "Oznaka" (
    "sifOznaka" SERIAL NOT NULL,
    "nazOznaka" TEXT NOT NULL,
    "tip" "OznakaTip" NOT NULL,

    CONSTRAINT "Oznaka_pkey" PRIMARY KEY ("sifOznaka")
);

-- CreateTable
CREATE TABLE "IzvodjacOznaka" (
    "mbid" TEXT NOT NULL,
    "sifOznaka" INTEGER NOT NULL,
    "tezina" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "IzvodjacOznaka_pkey" PRIMARY KEY ("mbid","sifOznaka")
);

-- CreateTable
CREATE TABLE "Mjesto" (
    "sifMjesto" SERIAL NOT NULL,
    "nazMjesto" TEXT NOT NULL,
    "koordinate" TEXT NOT NULL,

    CONSTRAINT "Mjesto_pkey" PRIMARY KEY ("sifMjesto")
);

-- CreateTable
CREATE TABLE "MjestoKoncerta" (
    "sifMjestoKoncerta" SERIAL NOT NULL,
    "mbid" TEXT NOT NULL,
    "nazMjestoKoncerta" TEXT NOT NULL,
    "adresaMjestoKoncerta" TEXT NOT NULL,
    "koordinate" TEXT NOT NULL,
    "kapacitet" INTEGER,
    "sifMjesto" INTEGER NOT NULL,

    CONSTRAINT "MjestoKoncerta_pkey" PRIMARY KEY ("sifMjestoKoncerta")
);

-- CreateTable
CREATE TABLE "Recenzija" (
    "sifRecenzija" SERIAL NOT NULL,
    "tekst" TEXT NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stanje" "RecenzijaStanje" NOT NULL DEFAULT 'vidljiva',
    "odgovorIzvodjaca" TEXT,
    "sifKorisnik" INTEGER NOT NULL,
    "sifStavka" INTEGER NOT NULL,

    CONSTRAINT "Recenzija_pkey" PRIMARY KEY ("sifRecenzija")
);

-- CreateTable
CREATE TABLE "Lista" (
    "sifLista" SERIAL NOT NULL,
    "nazLista" TEXT NOT NULL,
    "sifKorisnik" INTEGER NOT NULL,

    CONSTRAINT "Lista_pkey" PRIMARY KEY ("sifLista")
);

-- CreateTable
CREATE TABLE "ListaStavka" (
    "sifLista" INTEGER NOT NULL,
    "sifStavka" INTEGER NOT NULL,
    "redniBroj" INTEGER NOT NULL,

    CONSTRAINT "ListaStavka_pkey" PRIMARY KEY ("sifLista","sifStavka")
);

-- CreateTable
CREATE TABLE "Ocjena" (
    "sifKorisnik" INTEGER NOT NULL,
    "sifStavka" INTEGER NOT NULL,
    "ocjena" INTEGER NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ocjena_pkey" PRIMARY KEY ("sifKorisnik","sifStavka")
);

-- CreateTable
CREATE TABLE "Svidja" (
    "sifKorisnik" INTEGER NOT NULL,
    "sifStavka" INTEGER NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Svidja_pkey" PRIMARY KEY ("sifKorisnik","sifStavka")
);

-- CreateTable
CREATE TABLE "Koncert" (
    "sifKoncert" SERIAL NOT NULL,
    "datumVrijeme" TIMESTAMP(3) NOT NULL,
    "brojMjesta" INTEGER NOT NULL,
    "stanje" "KoncertStanje" NOT NULL DEFAULT 'predlozen',
    "rokZaPotvrdu" TIMESTAMP(3) NOT NULL,
    "razlogOdbijanja" TEXT,
    "sifStavka" INTEGER NOT NULL,
    "sifMjestoKoncerta" INTEGER NOT NULL,
    "predlozioMbid" TEXT NOT NULL,

    CONSTRAINT "Koncert_pkey" PRIMARY KEY ("sifKoncert")
);

-- CreateTable
CREATE TABLE "PrijavaNaKoncert" (
    "sifPrijavaNa" SERIAL NOT NULL,
    "sifKorisnik" INTEGER NOT NULL,
    "sifKoncert" INTEGER NOT NULL,
    "stanje" "PrijavaNaKoncertStanje" NOT NULL DEFAULT 'prijavljen',
    "qrKod" TEXT NOT NULL,
    "datumPrijave" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vrijemeSkeniranja" TIMESTAMP(3),

    CONSTRAINT "PrijavaNaKoncert_pkey" PRIMARY KEY ("sifPrijavaNa")
);

-- CreateTable
CREATE TABLE "PracenjeIzvodjaca" (
    "sifKorisnik" INTEGER NOT NULL,
    "mbid" TEXT NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PracenjeIzvodjaca_pkey" PRIMARY KEY ("sifKorisnik","mbid")
);

-- CreateTable
CREATE TABLE "PracenjeKorisnika" (
    "sifPratitelj" INTEGER NOT NULL,
    "sifPraceni" INTEGER NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PracenjeKorisnika_pkey" PRIMARY KEY ("sifPratitelj","sifPraceni")
);

-- CreateTable
CREATE TABLE "PrijavaSadrzaja" (
    "sifPrijava" SERIAL NOT NULL,
    "razlog" TEXT NOT NULL,
    "stanje" "PrijavaSadrzajaStanje" NOT NULL DEFAULT 'prijavljeno',
    "datum" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "razlogOdluke" TEXT,
    "sifPodnositelj" INTEGER NOT NULL,
    "sifRecenzija" INTEGER,
    "sifPrijavljeni" INTEGER,

    CONSTRAINT "PrijavaSadrzaja_pkey" PRIMARY KEY ("sifPrijava")
);

-- CreateTable
CREATE TABLE "ZahtjevZaUlogu" (
    "sifZahtjev" SERIAL NOT NULL,
    "tipUloge" "ZahtjevZaUloguTip" NOT NULL,
    "poveznica" TEXT NOT NULL,
    "kod" TEXT NOT NULL,
    "stanje" "ZahtjevZaUloguStanje" NOT NULL DEFAULT 'zahtjev',
    "napomenaModeratora" TEXT,
    "datum" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sifKorisnik" INTEGER NOT NULL,
    "izvodjacMbid" TEXT,
    "sifMjestoKoncerta" INTEGER,

    CONSTRAINT "ZahtjevZaUlogu_pkey" PRIMARY KEY ("sifZahtjev")
);

-- CreateTable
CREATE TABLE "Obavijest" (
    "sifObavijest" SERIAL NOT NULL,
    "tip" TEXT NOT NULL,
    "tekst" TEXT NOT NULL,
    "poveznica" TEXT,
    "procitano" BOOLEAN NOT NULL DEFAULT false,
    "datum" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sifKorisnik" INTEGER NOT NULL,

    CONSTRAINT "Obavijest_pkey" PRIMARY KEY ("sifObavijest")
);

-- CreateTable
CREATE TABLE "Preporuka" (
    "sifPreporuka" SERIAL NOT NULL,
    "razlog" TEXT NOT NULL,
    "bodovi" DOUBLE PRECISION NOT NULL,
    "datumIzracuna" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sifKorisnik" INTEGER NOT NULL,
    "sifStavka" INTEGER NOT NULL,

    CONSTRAINT "Preporuka_pkey" PRIMARY KEY ("sifPreporuka")
);

-- CreateTable
CREATE TABLE "_OdabraoPriRegOznaku" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AdminPodesava" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_OdabraoPriRegIzv" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Nastupa" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Korisnik_email_key" ON "Korisnik"("email");

-- CreateIndex
CREATE INDEX "Korisnik_sifMjesto_idx" ON "Korisnik"("sifMjesto");

-- CreateIndex
CREATE UNIQUE INDEX "Izvodjac_sifStavka_key" ON "Izvodjac"("sifStavka");

-- CreateIndex
CREATE UNIQUE INDEX "Album_mbid_key" ON "Album"("mbid");

-- CreateIndex
CREATE UNIQUE INDEX "Album_sifStavka_key" ON "Album"("sifStavka");

-- CreateIndex
CREATE INDEX "Album_izvodjacMbid_idx" ON "Album"("izvodjacMbid");

-- CreateIndex
CREATE UNIQUE INDEX "Pjesma_mbid_key" ON "Pjesma"("mbid");

-- CreateIndex
CREATE UNIQUE INDEX "Pjesma_sifStavka_key" ON "Pjesma"("sifStavka");

-- CreateIndex
CREATE INDEX "Pjesma_izvodjacMbid_idx" ON "Pjesma"("izvodjacMbid");

-- CreateIndex
CREATE INDEX "Pjesma_sifAlbum_idx" ON "Pjesma"("sifAlbum");

-- CreateIndex
CREATE UNIQUE INDEX "Oznaka_nazOznaka_tip_key" ON "Oznaka"("nazOznaka", "tip");

-- CreateIndex
CREATE UNIQUE INDEX "MjestoKoncerta_mbid_key" ON "MjestoKoncerta"("mbid");

-- CreateIndex
CREATE INDEX "MjestoKoncerta_sifMjesto_idx" ON "MjestoKoncerta"("sifMjesto");

-- CreateIndex
CREATE INDEX "Recenzija_sifKorisnik_idx" ON "Recenzija"("sifKorisnik");

-- CreateIndex
CREATE INDEX "Recenzija_sifStavka_idx" ON "Recenzija"("sifStavka");

-- CreateIndex
CREATE INDEX "Recenzija_datum_idx" ON "Recenzija"("datum");

-- CreateIndex
CREATE INDEX "Lista_sifKorisnik_idx" ON "Lista"("sifKorisnik");

-- CreateIndex
CREATE UNIQUE INDEX "ListaStavka_sifLista_redniBroj_key" ON "ListaStavka"("sifLista", "redniBroj");

-- CreateIndex
CREATE INDEX "Ocjena_sifStavka_idx" ON "Ocjena"("sifStavka");

-- CreateIndex
CREATE INDEX "Svidja_sifStavka_idx" ON "Svidja"("sifStavka");

-- CreateIndex
CREATE UNIQUE INDEX "Koncert_sifStavka_key" ON "Koncert"("sifStavka");

-- CreateIndex
CREATE INDEX "Koncert_sifMjestoKoncerta_idx" ON "Koncert"("sifMjestoKoncerta");

-- CreateIndex
CREATE INDEX "Koncert_predlozioMbid_idx" ON "Koncert"("predlozioMbid");

-- CreateIndex
CREATE INDEX "Koncert_stanje_datumVrijeme_idx" ON "Koncert"("stanje", "datumVrijeme");

-- CreateIndex
CREATE UNIQUE INDEX "PrijavaNaKoncert_qrKod_key" ON "PrijavaNaKoncert"("qrKod");

-- CreateIndex
CREATE INDEX "PrijavaNaKoncert_sifKorisnik_idx" ON "PrijavaNaKoncert"("sifKorisnik");

-- CreateIndex
CREATE INDEX "PrijavaNaKoncert_sifKoncert_stanje_idx" ON "PrijavaNaKoncert"("sifKoncert", "stanje");

-- CreateIndex
CREATE INDEX "PrijavaSadrzaja_sifPodnositelj_idx" ON "PrijavaSadrzaja"("sifPodnositelj");

-- CreateIndex
CREATE INDEX "PrijavaSadrzaja_stanje_idx" ON "PrijavaSadrzaja"("stanje");

-- CreateIndex
CREATE UNIQUE INDEX "ZahtjevZaUlogu_kod_key" ON "ZahtjevZaUlogu"("kod");

-- CreateIndex
CREATE INDEX "ZahtjevZaUlogu_sifKorisnik_idx" ON "ZahtjevZaUlogu"("sifKorisnik");

-- CreateIndex
CREATE INDEX "ZahtjevZaUlogu_stanje_idx" ON "ZahtjevZaUlogu"("stanje");

-- CreateIndex
CREATE INDEX "Obavijest_sifKorisnik_procitano_idx" ON "Obavijest"("sifKorisnik", "procitano");

-- CreateIndex
CREATE INDEX "Preporuka_sifKorisnik_idx" ON "Preporuka"("sifKorisnik");

-- CreateIndex
CREATE UNIQUE INDEX "Preporuka_sifKorisnik_sifStavka_key" ON "Preporuka"("sifKorisnik", "sifStavka");

-- CreateIndex
CREATE UNIQUE INDEX "_OdabraoPriRegOznaku_AB_unique" ON "_OdabraoPriRegOznaku"("A", "B");

-- CreateIndex
CREATE INDEX "_OdabraoPriRegOznaku_B_index" ON "_OdabraoPriRegOznaku"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AdminPodesava_AB_unique" ON "_AdminPodesava"("A", "B");

-- CreateIndex
CREATE INDEX "_AdminPodesava_B_index" ON "_AdminPodesava"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OdabraoPriRegIzv_AB_unique" ON "_OdabraoPriRegIzv"("A", "B");

-- CreateIndex
CREATE INDEX "_OdabraoPriRegIzv_B_index" ON "_OdabraoPriRegIzv"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Nastupa_AB_unique" ON "_Nastupa"("A", "B");

-- CreateIndex
CREATE INDEX "_Nastupa_B_index" ON "_Nastupa"("B");

-- AddForeignKey
ALTER TABLE "Korisnik" ADD CONSTRAINT "Korisnik_sifMjesto_fkey" FOREIGN KEY ("sifMjesto") REFERENCES "Mjesto"("sifMjesto") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Korisnik" ADD CONSTRAINT "Korisnik_zastupaMbid_fkey" FOREIGN KEY ("zastupaMbid") REFERENCES "Izvodjac"("mbid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Korisnik" ADD CONSTRAINT "Korisnik_upravljaSifMjestoKoncerta_fkey" FOREIGN KEY ("upravljaSifMjestoKoncerta") REFERENCES "MjestoKoncerta"("sifMjestoKoncerta") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zapis" ADD CONSTRAINT "Zapis_sifKorisnik_fkey" FOREIGN KEY ("sifKorisnik") REFERENCES "Korisnik"("sifKorisnik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Izvodjac" ADD CONSTRAINT "Izvodjac_sifStavka_fkey" FOREIGN KEY ("sifStavka") REFERENCES "Stavka"("sifStavka") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_sifStavka_fkey" FOREIGN KEY ("sifStavka") REFERENCES "Stavka"("sifStavka") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_izvodjacMbid_fkey" FOREIGN KEY ("izvodjacMbid") REFERENCES "Izvodjac"("mbid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pjesma" ADD CONSTRAINT "Pjesma_sifStavka_fkey" FOREIGN KEY ("sifStavka") REFERENCES "Stavka"("sifStavka") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pjesma" ADD CONSTRAINT "Pjesma_sifAlbum_fkey" FOREIGN KEY ("sifAlbum") REFERENCES "Album"("sifAlbum") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pjesma" ADD CONSTRAINT "Pjesma_izvodjacMbid_fkey" FOREIGN KEY ("izvodjacMbid") REFERENCES "Izvodjac"("mbid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IzvodjacOznaka" ADD CONSTRAINT "IzvodjacOznaka_mbid_fkey" FOREIGN KEY ("mbid") REFERENCES "Izvodjac"("mbid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IzvodjacOznaka" ADD CONSTRAINT "IzvodjacOznaka_sifOznaka_fkey" FOREIGN KEY ("sifOznaka") REFERENCES "Oznaka"("sifOznaka") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MjestoKoncerta" ADD CONSTRAINT "MjestoKoncerta_sifMjesto_fkey" FOREIGN KEY ("sifMjesto") REFERENCES "Mjesto"("sifMjesto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recenzija" ADD CONSTRAINT "Recenzija_sifKorisnik_fkey" FOREIGN KEY ("sifKorisnik") REFERENCES "Korisnik"("sifKorisnik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recenzija" ADD CONSTRAINT "Recenzija_sifStavka_fkey" FOREIGN KEY ("sifStavka") REFERENCES "Stavka"("sifStavka") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lista" ADD CONSTRAINT "Lista_sifKorisnik_fkey" FOREIGN KEY ("sifKorisnik") REFERENCES "Korisnik"("sifKorisnik") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListaStavka" ADD CONSTRAINT "ListaStavka_sifLista_fkey" FOREIGN KEY ("sifLista") REFERENCES "Lista"("sifLista") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListaStavka" ADD CONSTRAINT "ListaStavka_sifStavka_fkey" FOREIGN KEY ("sifStavka") REFERENCES "Stavka"("sifStavka") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ocjena" ADD CONSTRAINT "Ocjena_sifKorisnik_fkey" FOREIGN KEY ("sifKorisnik") REFERENCES "Korisnik"("sifKorisnik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ocjena" ADD CONSTRAINT "Ocjena_sifStavka_fkey" FOREIGN KEY ("sifStavka") REFERENCES "Stavka"("sifStavka") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Svidja" ADD CONSTRAINT "Svidja_sifKorisnik_fkey" FOREIGN KEY ("sifKorisnik") REFERENCES "Korisnik"("sifKorisnik") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Svidja" ADD CONSTRAINT "Svidja_sifStavka_fkey" FOREIGN KEY ("sifStavka") REFERENCES "Stavka"("sifStavka") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Koncert" ADD CONSTRAINT "Koncert_sifStavka_fkey" FOREIGN KEY ("sifStavka") REFERENCES "Stavka"("sifStavka") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Koncert" ADD CONSTRAINT "Koncert_sifMjestoKoncerta_fkey" FOREIGN KEY ("sifMjestoKoncerta") REFERENCES "MjestoKoncerta"("sifMjestoKoncerta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Koncert" ADD CONSTRAINT "Koncert_predlozioMbid_fkey" FOREIGN KEY ("predlozioMbid") REFERENCES "Izvodjac"("mbid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrijavaNaKoncert" ADD CONSTRAINT "PrijavaNaKoncert_sifKorisnik_fkey" FOREIGN KEY ("sifKorisnik") REFERENCES "Korisnik"("sifKorisnik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrijavaNaKoncert" ADD CONSTRAINT "PrijavaNaKoncert_sifKoncert_fkey" FOREIGN KEY ("sifKoncert") REFERENCES "Koncert"("sifKoncert") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracenjeIzvodjaca" ADD CONSTRAINT "PracenjeIzvodjaca_sifKorisnik_fkey" FOREIGN KEY ("sifKorisnik") REFERENCES "Korisnik"("sifKorisnik") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracenjeIzvodjaca" ADD CONSTRAINT "PracenjeIzvodjaca_mbid_fkey" FOREIGN KEY ("mbid") REFERENCES "Izvodjac"("mbid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracenjeKorisnika" ADD CONSTRAINT "PracenjeKorisnika_sifPratitelj_fkey" FOREIGN KEY ("sifPratitelj") REFERENCES "Korisnik"("sifKorisnik") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracenjeKorisnika" ADD CONSTRAINT "PracenjeKorisnika_sifPraceni_fkey" FOREIGN KEY ("sifPraceni") REFERENCES "Korisnik"("sifKorisnik") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrijavaSadrzaja" ADD CONSTRAINT "PrijavaSadrzaja_sifPodnositelj_fkey" FOREIGN KEY ("sifPodnositelj") REFERENCES "Korisnik"("sifKorisnik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrijavaSadrzaja" ADD CONSTRAINT "PrijavaSadrzaja_sifRecenzija_fkey" FOREIGN KEY ("sifRecenzija") REFERENCES "Recenzija"("sifRecenzija") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrijavaSadrzaja" ADD CONSTRAINT "PrijavaSadrzaja_sifPrijavljeni_fkey" FOREIGN KEY ("sifPrijavljeni") REFERENCES "Korisnik"("sifKorisnik") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZahtjevZaUlogu" ADD CONSTRAINT "ZahtjevZaUlogu_sifKorisnik_fkey" FOREIGN KEY ("sifKorisnik") REFERENCES "Korisnik"("sifKorisnik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZahtjevZaUlogu" ADD CONSTRAINT "ZahtjevZaUlogu_izvodjacMbid_fkey" FOREIGN KEY ("izvodjacMbid") REFERENCES "Izvodjac"("mbid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZahtjevZaUlogu" ADD CONSTRAINT "ZahtjevZaUlogu_sifMjestoKoncerta_fkey" FOREIGN KEY ("sifMjestoKoncerta") REFERENCES "MjestoKoncerta"("sifMjestoKoncerta") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Obavijest" ADD CONSTRAINT "Obavijest_sifKorisnik_fkey" FOREIGN KEY ("sifKorisnik") REFERENCES "Korisnik"("sifKorisnik") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preporuka" ADD CONSTRAINT "Preporuka_sifKorisnik_fkey" FOREIGN KEY ("sifKorisnik") REFERENCES "Korisnik"("sifKorisnik") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preporuka" ADD CONSTRAINT "Preporuka_sifStavka_fkey" FOREIGN KEY ("sifStavka") REFERENCES "Stavka"("sifStavka") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OdabraoPriRegOznaku" ADD CONSTRAINT "_OdabraoPriRegOznaku_A_fkey" FOREIGN KEY ("A") REFERENCES "Korisnik"("sifKorisnik") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OdabraoPriRegOznaku" ADD CONSTRAINT "_OdabraoPriRegOznaku_B_fkey" FOREIGN KEY ("B") REFERENCES "Oznaka"("sifOznaka") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminPodesava" ADD CONSTRAINT "_AdminPodesava_A_fkey" FOREIGN KEY ("A") REFERENCES "Korisnik"("sifKorisnik") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminPodesava" ADD CONSTRAINT "_AdminPodesava_B_fkey" FOREIGN KEY ("B") REFERENCES "PraviloSustava"("sifPravilo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OdabraoPriRegIzv" ADD CONSTRAINT "_OdabraoPriRegIzv_A_fkey" FOREIGN KEY ("A") REFERENCES "Izvodjac"("mbid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OdabraoPriRegIzv" ADD CONSTRAINT "_OdabraoPriRegIzv_B_fkey" FOREIGN KEY ("B") REFERENCES "Korisnik"("sifKorisnik") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Nastupa" ADD CONSTRAINT "_Nastupa_A_fkey" FOREIGN KEY ("A") REFERENCES "Izvodjac"("mbid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Nastupa" ADD CONSTRAINT "_Nastupa_B_fkey" FOREIGN KEY ("B") REFERENCES "Koncert"("sifKoncert") ON DELETE CASCADE ON UPDATE CASCADE;

--Ocjena je od 1 do 5
ALTER TABLE "Ocjena" ADD CONSTRAINT chk_ocjena_1_5 CHECK ("ocjena" BETWEEN 1 AND 5);

--Korisnik ne moze pratiti sam sebe
ALTER TABLE "PracenjeKorisnika" ADD CONSTRAINT chk_ne_prati_sam_sebe CHECK("sifPratitelj" <> "sifPraceni");

--Jedna aktivna prijava po koncertu i korisniku (otkazane su izuzete)
CREATE UNIQUE INDEX uq_aktivna_prijava ON "PrijavaNaKoncert" ("sifKorisnik", "sifKoncert") WHERE "stanje" <> 'otkazan';

--Ocjene, svidja mi se i recenzije nisu dostupne za koncerte
CREATE OR REPLACE FUNCTION provjeri_tip_stavke_nije_koncert() RETURNS trigger AS $$
DECLARE
       t "StavkaTip";
BEGIN
    SELECT "tip" INTO t FROM "Stavka" WHERE "sifStavka" = NEW."sifStavka";
    IF t = 'koncert' THEN
       RAISE EXCEPTION 'Ocjene, oznake svidja mi se i recenzije nisu dostupne za koncerte';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_ocjena_tip_stavke
    BEFORE INSERT OR UPDATE ON "Ocjena"
    FOR EACH ROW EXECUTE FUNCTION provjeri_tip_stavke_nije_koncert();

CREATE TRIGGER trg_svidja_tip_stavke
    BEFORE INSERT OR UPDATE ON "Svidja"
    FOR EACH ROW EXECUTE FUNCTION provjeri_tip_stavke_nije_koncert();

CREATE TRIGGER trg_recenzija_tip_stavke
    BEFORE INSERT OR UPDATE ON "Recenzija"
    FOR EACH ROW EXECUTE FUNCTION provjeri_tip_stavke_nije_koncert();