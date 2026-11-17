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

## `dohvatiNadolazeceKoncerte`

---

| | |
| :--- | :--- |
| **Vrsta** | query |
| **Datoteka** | `wasp/src/landing/queries.ts` |
| **Ulaz** | nema |
| **Izlaz** | `ConcertsSummary[]`: `{ id, title, startsAt, venue, image }` |
Vraća najviše 4 koncerta u stanju `POTVRDEN` ili `OTVORENE_PRIJAVE` koji tek dolaze, od najranijeg prema najkasnijem.
`title` je popis izvođača spojen s " + " (npr. "Orbita + Kiša u Svibnju"), a `venue` je oblika "Naziv mjesta, Grad". `image` je privremena slika iz `landing/slike.ts`.

Dohvaća:
- indentifikator koncerta
- izvođače
- datum i vrijeme
- mjesto održavanja
- sliku

## `dohvatiPopularneIzvodjace`

---

| | |
| :--- | :--- | 
| **Vrsta** | query |
| **Datoteka** | `wasp/src/landing/queries.ts` |
| **Ulaz** | nema |
| **Izlaz** | `PopularArtist[]`: `{ id, name, genre, image }` |

Vraća 6 izvođača s najvećom popularnošću (kod izjednačenja po `mbid`). `id` je `mbid` izvođača. `genre` je prva oznaka izvođača
s najvećom težinom koja nije nacionalnost ili slična oznaka (npr. "croatian", "seen live", "female vocalists"). Ako takve oznake nema, `genre` je prazan tekst.

Podaci uključuju:
- MBID izvođača
- naziv
- žanr
- putanju do slike

## `dohvatiMjesta`

---

| | |
| :--- | :--- |
| **Vrsta** | query |
| **Datoteka** | `wasp/src/landings/queries.ts` |
| **Ulaz** | nema |
| **Izlaz** | `VenueSummary[]`: `{ id, name, city, upcoming, image }` |

Dohvaća najviše 8 mjesta održavanja koncerta. `upcoming` je broj koncerata u stanju `OTVORENE_PRIJAVE` koji tek dolaze. Poredak je po `upcoming` silazno, a kod izjednačenja po nazivu.

Za svako mjesto dohvaća:
- naziv mjesta
- grad
- broj nadolazećih koncerata
- putanju do slike

## `pretrazi`

---

| | |
| :--- | :--- |
| **Vrsta** | query |
| **Datoteka** | `wasp/src/search/queries.ts` |
| **Ulaz** | `{ pojam: string }` |
| **Izlaz** | `SearchResults`: `{ izvodjaci, albumi, pjesme, mjesta }` |

Pretražuje katalog Sonara prema unesenom pojmu.

Pretražuje:
- izvođače
- albume
- pjesme
- mjesta koncerata

Koristi pretraživanje koje ne razlikuje velika i mala slova. Pojam kraći od 2 znaka ne pokreće pretraživanje baze. Svaka kategorija vraća najviše 10 rezultata,
a izvođači su poredani po popularnosti.

| Polje izlaza | Oblik jednog elementa |
| :--- | :--- |
| `izvodjaci` | `{ id: string (mbid), naziv }` |
| `albumi` | `{ id: number, naziv, izvodjac, godina: number \| null }` |
| `pjesme` | `{ id: number, naziv, izvodjac }` |
| `mjesta` | `{ id: number, naziv, adresa }` |

## `dohvatiIzvodjaca`

---

| | |
| :--- | :--- |
| **Vrsta** | query |
| **Datoteka** | `wasp/src/operations/izvodjacQueries.ts` |
| **Ulaz** | `{ mbid: string }` |
| **Izlaz** | izvođač s poljima `albumi` (svaki s `pjesme`) i `pjesme` (samo singlovi, pjesme koje nisu dio albuma) |

Dohvaća podatke o izvođaču po njegovom MusicBrainz identifikatoru (MBID).

Dohvaća:
- osnovne podatke izvođača
- albume izvođača
- pjesme izvođača
- pjesme koje nisu povezane s albumom

**Moguće greške:**

| Status | Kada |
| :--- | :--- |
| 400 | `mbid` je prazan ili sadrži samo razmake |
| 404 | izvođač s tim `mbid` ne postoji |

## `dohvatiKoncert`

---

| | |
| :--- | :--- |
| **Vrsta** | query |
| **Datoteka** | `wasp/src/operations/koncertQueries.ts` |
| **Ulaz** | `{ id: number \| string }` (string zato što id dolazi iz URL-a `/concerts/:id`) |
| **Izlaz** | podaci koncerta uz `slobodnaMjesta`, `mojaPrijava` i `stanjeGumba` |

Vraća podatke za stranicu koncerta: datum i vrijeme, broj mjesta, stanje, mjesto održavanja s gradom te izvođače poredane po popularnosti.
Uz to računa:

| Polje | Značenje |
| :--- | :--- |
| `slobodnaMjesta` | `brojMjesta` - broj prijava koje nisu otkazane, nikad manje od 0 |
| `mojaPrijava` | prijava trenutnog korisnika `{ sifPrijavaNa, stanje, qrKod }` ili `null` (neprijavljen ili bez prijave). QR kod vidi samo njegov vlasnik. |
| `stanjeGumba` | `APPLY`, `PRIJAVLJEN`, `POPUNJENO` ili `ZATVORENO` (pomoćna funkcija `izracunajStanjeButton` u `operations/pomocno.ts`) |

Pravila za `stanjeGumba`, redom: korisnik s prijavom uvijek dobiva `PRIJAVLJEN`. Ako koncert nije u stanju `OTVORENE_PRIJAVE` ili je već počeo, to je `ZATVORENO`.
Ako nema slobodnih mjesta, `POPUNJENO`. Inače `APPLY`.

**Moguće greške:**

| Status | Kada |
| :--- | :--- |
| 400 | `id` nije pozitivan cijeli broj |
| 404 | koncert ne postoji |

## `prijaviNaKoncert`

---

| | |
| :--- | :--- |
| **Vrsta** | akcija |
| **Datoteka** | `wasp/src/operations/prijave.ts` |
| **Ulaz** | `{ sifKoncert: number }` |
| **Izlaz** | `{ sifPrijavaNa, stanje, qrKod, slobodnaMjesta }` |

Prijavljuje trenutnog korisnika na koncert (F-024, UC-008). Stanje nove prijave je `PRIJAVLJEN`, a QR kod je oblika
`SONAR-<koncert>-<korisnik>-<16 hex znakova>`. Znakovi su nasumični iz `crypto.randomBytes`, jer je kod "tajna" ulaznice.

Cijela provjera i upis izvode se u jednoj transakciji (`prisma.$transaction`) kako bi se zadovoljio NF-07 (istodobne prijave ne smiju premašiti kapacitet):

1. Redak koncerta zaključava se s `SELECT ... FOR UPDATE`. Druge transakcije za isti koncert čekaju.
2. Provjerava se stanje koncerta i je li već počeo.
3. Broje se prijave koje nisu otkazane. Brojanje se radi tek nakon zaključavanja, pa se vide sve prijave 
transakcija koje su završile prije.
4. Provjerava se ima li korisnik već aktivnu prijavu.
5. Upisuje se prijava.

Unique indeks `uq_aktivna_prijava` u bazi dodatna je zaštita od duplikata.

**Mohuće greške:**

| Status | Kada |
| :--- | :--- |
| 401 | korisnik nije prijavljen |
| 403 | status računa nije `AKTIVAN` (suspendiran, deaktiviran, obrisan) |
| 400 | `sifKoncert` nije pozitivan cijeli broj |
| 404 | koncert ne postoji |
| 409 | koncert nije u stanju `OTVORENE_PRIJAVE`, koncert je već počeo, nema slobodnih mjesta ili korisnik već ima aktivnu prijavu |

**Napomena:** akcija koristi `prisma` uvezen iz `wasp/server` (zbog `$transaction`), a ne `context.entities`. 
Entiteti navedeni u `main.wasp.ts` zato se u transakciji ne koriste, ali ostaju deklarirani.

## `Hook onBeforeLogin`

---

| | |
| :--- | :--- |
|**Vrsta** | hook prijave(nije ni query ni akcija) |
| **Datoteka** | `wasp/src/auth/provjeraRacuna.ts` |
| **Registracija** | `auth.onBeforeLogin` u `main.wasp.ts` |

Wasp ga poziva nakon što Google potvrdi identitet, a prije izdavanja sesije. Hook čita `status` korisnika iz baze i baca 403 ako račun nije `AKTIVAN`. 
Korisnik se vraća na `/login` (`onAuthFailedRedirectTo`), gdje `LoginPage` prikazuje poruku iz adrese (`?error=...`).

| Status računa | Poruka |
| :--- | :--- |
| `SUSPENDIRAN` | Vaš račun je privremeno suspendiran. |
| `DEAKTIVIRAN` | Vaš račun je deaktiviran. |
| `OBRISAN` | Ovaj račun više ne postoji. |

## Skripta za bazu (seed)

---

Pokreću se naredbom `wasp db seed`, a definirane su u `wasp/src/seed/index.ts`.

| Skripta | Opis |
| :--- | :--- |
| `pregledBaze` | Ispisuje gradove, prvih 10 izvođača i brojeve redaka glavnih tablica. Ništa ne mijenja. |
| `seedKatalog` | Upisuje gradove, oznake i katalog izvođača, albuma i pjesama iz `seed/data/katalog.ts`. |
| `seedSve` | Pokreće `seedKatalog`, a zatim generira podatke koji nastaju korištenjem aplikacije (korisnici, koncerti, prijave...) za razvoj i demonstraciju (ograničenje C-07, `seed/generirano.ts`). |
