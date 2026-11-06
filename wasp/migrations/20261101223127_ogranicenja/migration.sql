-- This is an empty migration.
-- Recenzija se odnosi na točno jednu stavku (izvođač, album ili pjesma)
ALTER TABLE "Recenzija" ADD CONSTRAINT chk_recenzija_jedna_stavka
    CHECK (num_nonnulls("izvodjacMbid", "sifAlbum", "sifPjesma") = 1);

-- Ocjena je od 1 do 5
ALTER TABLE "OcjenaIzvodjaca" ADD CONSTRAINT chk_ocjena_izv
    CHECK ("ocjenaIzv" IS NULL OR "ocjenaIzv" BETWEEN 1 AND 5);
ALTER TABLE "OcjenaAlbuma" ADD CONSTRAINT chk_ocjena_alb
    CHECK ("ocjenaAlb" IS NULL OR "ocjenaAlb" BETWEEN 1 AND 5);
ALTER TABLE "OcjenaPjesme" ADD CONSTRAINT chk_ocjena_pjes
    CHECK ("ocjenaPjes" IS NULL OR "ocjenaPjes" BETWEEN 1 AND 5);

-- Korisnik ne može pratiti sam sebe
ALTER TABLE "PracenjeKorisnika" ADD CONSTRAINT chk_ne_prati_sam_sebe
    CHECK ("sifPratitelj" <> "sifPraceni");

-- Jedna aktivna prijava po korisniku i koncertu (otkazane su izuzete)
CREATE UNIQUE INDEX uq_aktivna_prijava
    ON "PrijavaNaKoncert" ("sifKorisnik", "sifKoncert")
    WHERE "stanje" <> 'otkazan';
