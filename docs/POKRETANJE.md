# Pokretanje aplikacije

Upute za pokretanje Sonara na vlastitom računalu: baza, varijable okoline,
Google prijava, migracije i probni podaci (seed).

Instalacija alata (Docker, IntelliJ, dev container) opisana je u
[poglavlju 6.2](./6-Postavljanje-instalacija-i-konfiguracija.md#62-lokalna-instalacija-i-konfiguracija).
Ove upute pretpostavljaju da je to gotovo.

## Sadržaj

1. [Preduvjeti](#1-preduvjeti)
2. [Brzi start](#2-brzi-start)
3. [Varijable okoline](#3-varijable-okoline)
4. [Google prijava](#4-google-prijava)
5. [Baza, migracije i probni podaci](#5-baza-migracije-i-probni-podaci)
6. [Svakodnevni rad](#6-svakodnevni-rad)
7. [Česti problemi](#7-česti-problemi)

## 1. Preduvjeti

| Alat | Verzija | Napomena |
|---|---|---|
| Node.js | 24.22.1 ili noviji | u dev containeru je već instaliran |
| Wasp | 0.26.1 | `setup.sh` ga instalira sam |
| Docker (s Compose) | | za bazu PostgreSQL 18 |

Preporučeno je raditi u **dev containeru** (vidi 6.2): on sam pokreće bazu
i instalira Node i Wasp.

## 2. Brzi start

Iz **korijena repozitorija**, u terminalu:

```sh
./setup.sh
cd wasp
wasp start
```

Nakon toga:

- klijent (stranice): http://localhost:3000
- server (API): http://localhost:3001

### Što radi `setup.sh`

1. Provjeri je li Node dovoljno nov.
2. Instalira Wasp 0.26.1 ako ga nema ili je druga verzija (tada i obriše stare
   ovisnosti s `wasp clean`).
3. Ako ne postoji `wasp/.env.server`, napravi ga kopiranjem iz
   `wasp/.env.server.example`.
4. Pokrene `wasp install`.
5. Primijeni migracije (`wasp db migrate-dev`).
6. Ako je baza prazna (nema nijednog korisnika), napuni je probnim podacima
   (`wasp db seed seedSve`).

Skripta se smije pokretati više puta.

> **Dev container:** pri prvom otvaranju skripta se pokrene sama, ali **bez
> terminala**, pa preskoči korake 5 i 6 (migracije i probne podatke). Nakon
> prvog otvaranja zato još jednom pokreni `./setup.sh` u terminalu.

Prije prvog `wasp start` upiši ključeve za Google prijavu
(vidi [4. Google prijava](#4-google-prijava)), inače se server neće pokrenuti.

## 3. Varijable okoline

Server čita varijable iz datoteke **`wasp/.env.server`**.

| Datoteka | Čemu služi | Ide u git? |
|---|---|---|
| `wasp/.env.server.example` | **predložak**: popis varijabli, bez tajnih vrijednosti | da |
| `wasp/.env.server` | **prave vrijednosti** za tvoje računalo; ovu datoteku Wasp čita | **ne** |

> ⚠️ Ključeve upisuj **samo u `wasp/.env.server`**. Wasp ne čita
> `.env.server.example`, a ta datoteka ide u git, pa bi tajni ključ završio na
> GitHubu.

Ako `wasp/.env.server` ne postoji, napravi ga iz predloška:

```sh
cd wasp
cp .env.server.example .env.server
```

### Varijable u `wasp/.env.server`

| Varijabla | Primjer | Opis |
|---|---|---|
| `DATABASE_URL` | `postgresql://postgres:dev@localhost:5432/sonar` | adresa baze; lozinka (`dev`) mora biti ista kao `DB_PASSWORD` |
| `GOOGLE_CLIENT_ID` | `1234…apps.googleusercontent.com` | ID Google OAuth klijenta |
| `GOOGLE_CLIENT_SECRET` | `GOCSPX-…` | tajni ključ Google OAuth klijenta |

### Lozinka baze (`.env` u korijenu)

Za razvoj datoteka `.env` u korijenu repozitorija **nije potrebna**. Zadana
lozinka baze je `dev`.

Ako želiš drugu lozinku, napravi `.env` u korijenu (predložak je `.env.example`)
s `DB_PASSWORD=<lozinka>` i istu lozinku upiši u `DATABASE_URL` u
`wasp/.env.server`. Ako baza već postoji, obriši njezin stari volumen jer
lozinka ostaje stara:

```sh
docker compose down -v   # briše SVE podatke iz baze
```

## 4. Google prijava

Aplikacija koristi **samo prijavu preko Googlea**. Bez `GOOGLE_CLIENT_ID` i
`GOOGLE_CLIENT_SECRET` server se ne pokreće.

### Ako ključeve dobivaš od tima

Ključeve tim dijeli **privatno** (ne preko gita, issuea ni javnih kanala).
Upiši ih u `wasp/.env.server`:

```
GOOGLE_CLIENT_ID=<tvoj client id>
GOOGLE_CLIENT_SECRET=<tvoj client secret>
```

Zatim ponovno pokreni `wasp start`.

### Ako radiš vlastite ključeve

1. Otvori [Google Cloud Console](https://console.cloud.google.com/) i napravi
   projekt (ili odaberi postojeći).
2. **APIs & Services → OAuth consent screen**: tip *External*, upiši naziv
   aplikacije i svoj email. Dok je aplikacija u načinu *Testing*, pod
   *Test users* dodaj emailove koji se smiju prijaviti.
3. **APIs & Services → Credentials → Create credentials → OAuth client ID**,
   tip **Web application**.
4. Upiši:
   - **Authorized JavaScript origins:** `http://localhost:3000`
   - **Authorized redirect URIs:** `http://localhost:3001/auth/google/callback`
5. Spremi i kopiraj *Client ID* i *Client secret* u `wasp/.env.server`.

> **Odakle `/auth/google/callback`?** Tu rutu na serveru (port 3001)
> **generira Wasp sam** čim je u `main.wasp.ts` uključena Google prijava
> (`auth.methods.google`). Zato je nema u `src/`, nego samo u generiranom kodu
> u `wasp/.wasp/out/`. Na tu adresu Google vraća korisnika nakon prijave, pa
> mora biti upisana u Google Cloud Consoleu.

### Kako prijava radi

1. Gumb "Sign in with Google" vodi na `/login`, a gumb "Continue with Google"
   na `http://localhost:3001/auth/google/login` (Waspova ruta).
2. Server preusmjeri korisnika na Googleovu stranicu za prijavu.
3. Google ga nakon prijave vrati na `http://localhost:3001/auth/google/callback`.
4. Server pronađe ili napravi korisnika i vrati ga na klijent, na početnu
   stranicu (`/`).

Uz to:

- Pri **prvoj** prijavi Wasp napravi novog korisnika (tablica `Korisnik`).
  Ime (`nazKorisnik`) i email preuzimaju se iz Google profila
  (`src/auth/google.ts`).
- Računi koji nisu aktivni (suspendirani, deaktivirani, obrisani) ne mogu se
  prijaviti (`src/auth/provjeraRacuna.ts`).

## 5. Baza, migracije i probni podaci

### Baza

Baza je PostgreSQL 18 u Dockeru (servis `db` u `compose.yaml`), dostupna na
`localhost:5432`, baza `sonar`, korisnik `postgres`.

- **Dev container:** baza se pokreće sama.
- **Bez dev containera:** iz korijena repozitorija pokreni:

  ```sh
  docker compose up -d db
  ```

### Migracije

Migracije su u `wasp/migrations/`. Kad netko commita novu migraciju, prije
`wasp start` pokreni:

```sh
cd wasp
wasp db migrate-dev
```

Nakon promjene `schema.prisma`:

1. zaustavi `wasp start` (Wasp ne dopušta dvije naredbe nad istim projektom
   istodobno),
2. `wasp db migrate-dev` (pita za ime migracije),
3. commitaj novu mapu u `migrations/` zajedno s promjenom sheme.

### Probni podaci (seed)

Seed funkcije su u `wasp/src/seed/`, a registrirane u `main.wasp.ts`.
Pokreću se iz mape `wasp` s imenom seeda:

```sh
wasp db seed <ime>
```

| Seed | Što radi | Smije li se ponoviti? |
|---|---|---|
| `seedSve` | `seedKatalog` + generirani podaci (vidi ispod) | ne; generirani dio se preskače ako u bazi već ima korisnika |
| `seedKatalog` | glazbeni katalog iz `src/seed/data/katalog.ts`: gradovi, mjesta koncerata, oznake, izvođači, albumi i pjesme | da; preskače ono što već postoji |
| `pregledBaze` | ne mijenja ništa, samo ispiše broj redaka u tablicama | da |

**Generirani podaci** (`src/seed/generirano.ts`) uvijek su isti (fiksni
"seed" slučajnih brojeva):

- administrator, 2 moderatora, računi domaćih izvođača i upravitelji mjesta,
- 150 slušatelja (prvi je probni račun `slusatelj@sonar.test`),
- praćenja izvođača i korisnika, ocjene i "sviđa mi se",
- koncerti u svim stanjima (otvorene prijave, popunjen, održan, otkazan…) i
  prijave na njih.

> **Napomena:** generirani računi (npr. `slusatelj@sonar.test`,
> `admin@sonar.test`) **ne mogu se prijaviti**, jer aplikacija ima samo Google
> prijavu. Služe kao podaci za prikaz (pratitelji, ocjene, prijave na
> koncerte).

### Čisti početak

Briše cijelu bazu, ponovno primjenjuje migracije i puni probne podatke:

```sh
cd wasp
wasp db reset
wasp db seed seedSve
```

## 6. Svakodnevni rad

```sh
git pull
cd wasp
wasp db migrate-dev   # samo ako su stigle nove migracije
wasp start
```

Korisne naredbe (iz mape `wasp`):

| Naredba | Opis |
|---|---|
| `wasp start` | pokreće klijent (:3000) i server (:3001) |
| `wasp db studio` | grafički pregled i uređivanje baze u pregledniku |
| `wasp db seed pregledBaze` | brzi pregled koliko čega ima u bazi |
| `wasp clean` | briše generirani kod (`.wasp/`) i `node_modules`; nakon toga `wasp install` |

## 7. Česti problemi

**Server se ne pokreće, javlja grešku o `GOOGLE_CLIENT_ID` ili `GOOGLE_CLIENT_SECRET`.**
Ključevi nisu upisani ili su upisani u krivu datoteku. Moraju biti u
`wasp/.env.server`, ne u `.env.server.example`
(vidi [3. Varijable okoline](#3-varijable-okoline)).

**Google javlja `redirect_uri_mismatch`.**
U Google Cloud Consoleu pod *Authorized redirect URIs* mora točno pisati
`http://localhost:3001/auth/google/callback`.

**Google javlja "Access blocked" ili "app is in testing".**
Tvoj email nije dodan pod *Test users* na OAuth consent screenu.

**Greška pri spajanju na bazu (`P1001`, "Can't reach database server").**
Baza ne radi. Pokreni `docker compose up -d db` iz korijena repozitorija
(ili ponovno otvori dev container).

**Greška s lozinkom baze (`P1000`, "Authentication failed").**
Lozinka u `DATABASE_URL` nije ista kao `DB_PASSWORD`, ili je volumen baze
napravljen sa starom lozinkom (vidi [Lozinka baze](#lozinka-baze-env-u-korijenu)).

**Na stranici se ispisuje "Loading…", "Could not load…" ili "No … yet".**
Server ne radi ili je baza prazna. Pokreni probne podatke:
`wasp db seed seedSve`.

**`wasp db migrate-dev` javlja da je projekt zauzet.**
Prvo zaustavi `wasp start` (Ctrl + C).
