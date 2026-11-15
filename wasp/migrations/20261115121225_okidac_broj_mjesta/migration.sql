-- Pravilo 5:broj mjesta koncerta ne smije prelaziti kapacitet mjesta, a na mjesto bez kapaciteta se ne moze predloziti koncert
CREATE OR REPLACE FUNCTION provjeri_broj_mjesta_koncerta() RETURNS trigger AS $$
DECLARE
    kap INTEGER;
BEGIN
    --FOR SHARE zakljuca redak da mu netko istodobno ne smanji kapacitet
    SELECT "kapacitet" INTO kap FROM "MjestoKoncerta"
    WHERE "sifMjestoKoncerta" = NEW."sifMjestoKoncerta" FOR SHARE;

    IF kap IS NULL THEN
        RAISE EXCEPTION 'Mjesto koncerta nema unesen kapacitet, nije moguce predloziti koncert';
    END IF;

    IF NEW."brojMjesta" > kap THEN
       RAISE.EXCEPTION 'Broj mjesta koncerta (%) ne smije prelaziti kapacitet mjesta', NEW."brojMjesta", kap;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- radi pri unosu koncerta te kad se promijeni broj mjesta ili mjesto odrzavanja
CREATE TRIGGER trg_koncert_mjesta
    BEFORE INSERT OR UPDATE OF "brojMjesta", "sifMjestoKoncerta" ON "Koncert"
    FOR EACH ROW EXECUTE FUNCTION provjeri_broj_mjesta_koncerta();