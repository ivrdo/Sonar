# sonar (Wasp)

## Prvo pokretanje

Iz korijena repozitorija:

```sh
cd wasp
cp .env.server.example .env.server
wasp install
wasp db migrate-dev
wasp start
```

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
