# sonar (Wasp)

## Prvo pokretanje

Iz korijena repozitorija:

```sh
./setup.sh
cd wasp
wasp start
```

`setup.sh` provjeri Node (24.22.1 ili noviji), instalira Wasp 0.26.1 (i obriše
stare ovisnosti ako se verzija promijenila), napravi `.env.server` iz primjera
ako ga nema, pokrene `wasp install`, primijeni migracije i napuni praznu bazu
probnim podacima. Može se pokretati više puta. Dev container ga pokreće sam,
ali bez migracija i probnih podataka, pa nakon prvog otvaranja treba još jednom
pokrenuti `./setup.sh` u terminalu.

U `.env.server` upisati `GOOGLE_CLIENT_ID` i `GOOGLE_CLIENT_SECRET` (dobivaju se
privatno, ne commitati ih).

- klijent: http://localhost:3000
- server: http://localhost:3001

## Migracije

Kad netko commita nove migracije, prije `wasp start` pokrenuti `wasp db migrate-dev`.

## Nakon promjene `schema.prisma`

1. Zaustaviti `wasp start`. Wasp ne dopušta dvije naredbe nad istim projektom
   istovremeno.
2. `wasp db migrate-dev`
3. Commitati novu mapu u `migrations/` zajedno s promjenom sheme.

## Baza

- lozinka je `dev`, osim ako je u `../.env` postavljen `DB_PASSWORD`. Lozinka u
  `DATABASE_URL` u `.env.server` mora biti ista.
