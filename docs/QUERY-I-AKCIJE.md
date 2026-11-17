# Popis queryja i akcija - SONAR

---

Ovaj dokument popisuje sve operacije aplikacije Sonar. Operacije se deklariraju u `wasp/main.wasp.ts` (landing i pretraga u 
`landing/landing.wasp.ts` i `search/search.wasp.ts`), a klijent ih poziva iz `wasp/client/operations`.

## Što su queryji, akcije, entiteti, greške?

- **Query** čita podatke iz baze podataka i ne mijenja ih. Klijent ga poziva kroz `useQuery`.
- **Akcija** služi za izvršavanje operacija koje mijenjaju podatke (upisuje u bazu). Klijent je poziva izravno (`await prijaviNaKoncert({ ... })`).
- **Entiteti** su Prisma modeli kojima operacija smije pristupiti kroz `context.entities`.
- **Greške** se bacaju kao `HttpError(status, poruka)`, a klijent ih dobiva kao grešku zahtjeva.


## Pregled

---

| Operacija | Vrsta | Datoteka | Entiteti | Prijava potrebna | Koristi se na |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `dohvatiNadolazeceKoncerte` | query | `landing/queries.ts`| Koncert | ne | početna stranica |
|`dohvatiPopularneIzvodjace` | query | `landing/queries.ts` | Izvodjac, Oznaka, IzvodjacOznaka | ne | početna stranica |
| `dohvatiMjesta` | query | `landing/queries.ts` | MjestoKoncerta, Mjesto, Koncert | ne | početna stranica (sekcija mjesta) |
| `pretrazi` | query | `search/queries.ts` | Izvodjac, Album, Pjesma | ne | `/search` |
| `dohvatiIzvodjaca` | query | `operations/izvodjacQueries.ts` | Izvodjac, Album, Pjesma | ne | `/artists/:id` |
| `dohvatiKoncert` | query | `operations/koncertQueries.ts` | Koncert, MjestoKoncerta, Izvodjac, PrijavaNaKoncert | ne (prijavljeni dobija i svoju prijavu) | `concerts/:id` |
| `prijaviNaKoncert` | akcija | `operations/prijave.ts` | Koncert, PrijavaNaKoncert, Korisnik | da | `/concerts/:id` (gumb Apply) |

Uz operacije postoji i **hook** onBeforeLogin i **skripte za bazu**.

**O prijavi.** Operacije se ne odbijaju automatski za neprijavljene korisnike: Wasp samo postavi `context.user` kad je token valjan, a inače je on `undefined`. Zato akcija `prijavaNaKoncert sama provjerava `context.user` i baca 401. Queryji su javni (F-001, NF-02).

---

