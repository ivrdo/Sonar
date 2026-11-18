# 6. Postavljanje, instalacija i konfiguracija

**Javno dostupna aplikacija:** <https://sonar-client.onrender.com>

---

## 6.1 Prikaz razmještaja

![UML dijagram razmještaja sustava Sonar](./assets/diagrams/6-1-sonar-DD.svg)

**Slika 6.1. UML dijagram razmještaja sustava Sonar**

**PlantUML izvor:** [izvor](./puml/6-1-sonar-DD.puml)

**Analiza razmještaja:**

* **Korisnički uređaj:** Web-preglednik preuzima statičke datoteke klijenta (React, Vite) i izvršava ih. Sve podatke klijent dohvaća s poslužitelja putem HTTPS-a: Waspove upite i akcije te rute za prijavu (`/auth/...`).
* **Statičko web-mjesto (`sonar-client`):** Render poslužuje izgrađeni klijent. Sve putanje preusmjeravaju se na `200.html`, pa klijentsko usmjeravanje radi i kad se adresa poput `/concerts/5` otvori izravno.
* **Web-usluga (`sonar-server`):** Jedan Node.js proces s Wasp poslužiteljem (Express, Prisma) obrađuje upite i akcije, prijavu putem Googlea i sesije. Pri svakom pokretanju primjenjuje migracije baze.
* **Baza podataka (`sonar-db`):** PostgreSQL 18 u istoj Render regiji (Frankfurt). Na bazu se spaja samo poslužitelj, internom mrežom; preglednik nikada izravno.
* **Vanjska usluga:** Google (OAuth 2.0 / OpenID Connect). Preglednik se preusmjerava na Googleovu stranicu za prijavu, a poslužitelj s Googleom zamjenjuje dobiveni kod za token i dohvaća profil (ime i e-pošta).
* MusicBrainz i Last.fm nisu na dijagramu: katalog se iz njih uvozi jednokratno, skriptom za početne podatke, a postavljena aplikacija s njima ne komunicira.

---

## 6.2 Lokalna instalacija i konfiguracija

Upute za instalaciju alata po operacijskim sustavima (IntelliJ IDEA, Docker, Git) nalaze se u [README-u](../README.md). Ovdje je cijeli postupak od čiste kopije repozitorija do pokrenute aplikacije.

### 1. Preduvjeti i preuzimanje izvornog koda

Postoje dva načina rada:

* **Dev container (preporučeno):** potrebni su Docker (s Composeom) i IntelliJ IDEA. Container već sadrži Node.js 24 i pri izradi sam instalira Wasp CLI 0.26.1.
* **Bez containera:** Node.js 24.22.1 ili noviji, Wasp CLI 0.26.1, Docker s Composeom (samo za bazu) i Bash. Na Windowsu se radi u WSL2 jer Wasp CLI postoji samo za Linux i macOS.

Svi koriste istu verziju Waspa (0.26.1). Različite verzije stvaraju različit `package-lock.json`.

```bash
git clone https://github.com/ivrdo/Sonar.git
cd Sonar
```

Stabilna inačica je na grani `master`, a razvoj se odvija na grani `frontend-prototipiranje`.

**Dev container:** u IntelliJ IDEA otvoriti `.devcontainer/devcontainer.json`, kliknuti ikonu containera uz vrh datoteke i odabrati **Create Dev Container and Mount Sources**. Repozitorij se tada ne kopira, nego se montira u container (`/workspace`), pa su sve promjene odmah i na disku. Uz container se pokreće i baza (servis `db` iz `compose.yaml`, container `baza`).

**Bez containera:** bazu pokrenuti iz korijena repozitorija naredbom `docker compose up -d db`.

### 2. Ovisnosti i konfiguracijske varijable

Iz korijena repozitorija:

```bash
./setup.sh
```

Skripta provjeri verziju Node.js-a, instalira Wasp CLI 0.26.1 (i obriše stare ovisnosti ako se verzija promijenila), napravi `wasp/.env.server` iz `wasp/.env.server.example` ako ne postoji, pokrene `wasp install` te primijeni migracije i napuni praznu bazu početnim podacima. Može se pokretati više puta. Dev container je pokreće sam pri izradi, ali bez terminala, pa tada preskoči migracije i početne podatke. Nakon prvog otvaranja treba je pokrenuti još jednom u terminalu.

Varijable u `wasp/.env.server` (datoteka se ne commita):

| Varijabla | Uloga | Vrijednost |
| --- | --- | --- |
| `DATABASE_URL` | veza poslužitelja s lokalnom bazom | iz primjera: `postgresql://postgres:dev@localhost:5432/sonar`. Lokalna razvojna lozinka nije tajna. |
| `GOOGLE_CLIENT_ID` | identifikator OAuth klijenta za prijavu putem Googlea | dobiva se privatno od održavatelja Google Cloud projekta |
| `GOOGLE_CLIENT_SECRET` | tajni ključ OAuth klijenta | dobiva se privatno; **nikada se ne commita niti objavljuje** |

Neobavezna datoteka `.env` u korijenu repozitorija može promijeniti lozinku lokalne baze (`DB_PASSWORD`, zadano `dev`). Tada ista lozinka mora biti i u `DATABASE_URL`.

Dok je Google OAuth klijent u testnom načinu rada, prijaviti se mogu samo Google računi koje je održavatelj dodao kao testne korisnike. Za lokalni rad u klijentu je dopuštena povratna adresa `http://localhost:3001/auth/google/callback` i ishodište `http://localhost:3000`.

### 3. Inicijalizacija baze podataka i migracije

* **Shema:** verzionirane migracije su u `wasp/migrations/`. Primjenjuje ih `wasp db migrate-dev` (skripta `setup.sh` to radi kad se pokrene u terminalu). Kad netko commita nove migracije, prije `wasp start` treba pokrenuti `wasp db migrate-dev`.
* **Početni podaci:** `wasp db seed seedSve` učitava katalog (izvođači, albumi, pjesme, mjesta i oznake iz MusicBrainza i Last.fma, spremljeni u `wasp/src/seed/data`) i generira podatke koji inače nastaju korištenjem aplikacije (korisnici, koncerti, prijave, ocjene). Skripta nije predviđena za ponovno pokretanje, pa je `setup.sh` pokreće samo kad je tablica `Korisnik` prazna. Za potpuno novu bazu: `wasp db reset`, zatim `wasp db seed seedSve`.
* **Promjena sheme:** zaustaviti `wasp start` (Wasp ne dopušta dvije naredbe nad istim projektom istovremeno), pokrenuti `wasp db migrate-dev --name <naziv>` i commitati novu mapu u `wasp/migrations/` zajedno s promjenom `schema.prisma`.

### 4. Pokretanje i verifikacija

```bash
cd wasp
wasp start
```

* klijent: <http://localhost:3000>
* poslužitelj: <http://localhost:3001>

**Provjera rada:**

1. Početna stranica prikazuje nadolazeće koncerte, popularne izvođače i mjesta iz baze (podaci iz početne skripte, a ne iz koda).
2. Prijava putem Googlea na `/login` vraća korisnika u aplikaciju.
3. `wasp db studio` u tablici `Korisnik` prikazuje novi redak s imenom i e-poštom Google računa, čime je potvrđeno trajno spremanje.

**Gdje tražiti pogreške:** izlaz naredbe `wasp start` (zapisi s oznakama `[ Server ]` i `[ Client ]`), konzola i kartica Network u alatima za razvoj preglednika te `wasp db studio` za pregled baze.

**Česti problemi:**

* *„Your Node.js version is not supported”*: Node.js je stariji od 24.22.1. U dev containeru treba povući novu sliku (`docker pull mcr.microsoft.com/devcontainers/javascript-node:24-bookworm`), obrisati JetBrainsovu sliku `jb-…-uid` (`docker image ls | grep jb-`) i ponovno napraviti container. JetBrains inače koristi staru, spremljenu sliku.
* *`package-lock.json` se mijenja nakon svakog `wasp start`*: instalirana je druga verzija Waspa. Provjeriti `wasp version` (mora biti 0.26.1).
* *IntelliJ crveno označava `*.wasp.ts` datoteke*: lažne pogreške IDE-a koji ne razumije Waspove tipove. Mjerodavan je `wasp start`.

---

## 6.3 Javno postavljanje i administracija

Aplikacija je postavljena na [Render](https://render.com). Konfiguracija je zapisana u [`render.yaml`](https://github.com/ivrdo/Sonar/blob/deploy-test/render.yaml) (Render Blueprint) na grani `deploy-test`. Render sam instalira Wasp CLI i izgrađuje aplikaciju iz izvornog koda.

| **Postavljeni podsustav** | **Infrastruktura i izvor koda** | **Naredbe izgradnje i pokretanja** | **Konfiguracija i varijable okruženja** |
| --- | --- | --- | --- |
| **Klijentski dio** | Render Static Site `sonar-client`; grana `deploy-test`; mapa `wasp/` | instalacija Wasp CLI 0.26.1, `wasp install`, `wasp build`, `npx vite build`; direktorij objave `.wasp/out/web-app/build`; preusmjeravanje `/*` → `/200.html` | `REACT_APP_API_URL`: javna adresa poslužitelja. Vidljiva je pregledniku i nije tajna; ugrađuje se pri izgradnji. |
| **Poslužiteljski dio** | Render Web Service `sonar-server` (Node.js 24.22.3); grana `deploy-test`; mapa `wasp/` | izgradnja: instalacija Wasp CLI 0.26.1, `wasp build`, zatim u `.wasp/out/server`: `npm install`, `npx prisma generate`, `npm run bundle`; pokretanje: `npm run start-production` | `DATABASE_URL` (interni URL baze, Render ga povezuje sam), `JWT_SECRET` (generira Render), `WASP_SERVER_URL`, `WASP_WEB_CLIENT_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`. Tajne vrijednosti unose se samo u nadzornoj ploči Rendera. |
| **Baza podataka** | Render PostgreSQL 18 `sonar-db`; regija Frankfurt; besplatni plan | migracije iz `wasp/migrations/` primjenjuje poslužitelj pri svakom pokretanju (`prisma migrate deploy`) | pristupni podaci baze vidljivi su samo u nadzornoj ploči Rendera |

Varijable označene u `render.yaml` sa `sync: false` nemaju vrijednost u repozitoriju; održavatelj ih unosi u nadzornoj ploči (*Environment* pojedine usluge). Vrijednosti za Google dobiva iz Google Cloud projekta.

**CI i CD:** Render automatski pokreće izgradnju pri svakom pushu na granu `deploy-test`. Prije postavljanja ne izvode se automatizirane provjere, pa to nije kontinuirano postavljanje. Na `deploy-test` se spaja samo lokalno provjereno stanje radne grane. Kontinuirana integracija (provjera izgradnje na GitHubu) još nije postavljena.

### Postupak postavljanja

1. **Infrastruktura baze podataka:** U nadzornoj ploči Rendera odabrati **New → Blueprint**, repozitorij `ivrdo/Sonar` i granu `deploy-test`. Render iz `render.yaml` stvara bazu, poslužitelj i klijent. Shemu stvaraju migracije pri prvom pokretanju poslužitelja. Početni podaci učitavaju se jednom, iz pouzdanog terminala u mapi `wasp/`:

   ```bash
   DATABASE_URL='<External Database URL>' wasp db seed seedSve
   ```

   Vanjski URL baze nalazi se u Renderu pod `sonar-db` → **Connect** → **External**. Sadrži lozinku, pa se nikada ne kopira u repozitorij ni u dokumentaciju. Učitavanje preko interneta traje desetak minuta. Skriptu ne treba prekidati ni pokretati na bazi koja već ima podatke.
2. **Postavljanje poslužiteljskog dijela:** U `sonar-server` → **Environment** postaviti `WASP_SERVER_URL` na javnu adresu poslužitelja (`https://sonar-server-a7uh.onrender.com`), `WASP_WEB_CLIENT_URL` na javnu adresu klijenta (`https://sonar-client.onrender.com`) te `GOOGLE_CLIENT_ID` i `GOOGLE_CLIENT_SECRET`, zatim odabrati **Save and deploy**. U zapisima poslužitelja vidi se primjena migracija i pokretanje poslužitelja.
3. **Izgradnja i objava klijentskog dijela:** U `sonar-client` → **Environment** postaviti `REACT_APP_API_URL` na javnu adresu **poslužitelja** (ne klijenta) i odabrati **Save, rebuild, and deploy**. Bez te varijable izgradnja klijenta namjerno ne uspije.
4. **Završno povezivanje:** Poslužitelj dopušta zahtjeve (CORS) samo s ishodišta iz `WASP_WEB_CLIENT_URL`. U Google Cloud Consoleu, u postavkama OAuth klijenta, dodana je povratna adresa `https://sonar-server-a7uh.onrender.com/auth/google/callback` i ishodište `https://sonar-client.onrender.com`. Provjera: na javnoj adresi klijenta početna stranica prikazuje podatke iz baze, a prijava putem Googlea vraća korisnika u aplikaciju.

### Pristup i administracija

- **Nadzor rada i zapisi pogrešaka:** Zapisi su u nadzornoj ploči Rendera, u kartici **Logs** pojedine usluge. Poslužitelj prikazuje primjenu migracija i pogreške aplikacije, a `sonar-db` zapise baze. Pristup ima održavatelj Render radnog prostora.
- **Upravljanje administratorskim ovlastima:** Uloga korisnika zapisana je u stupcu `uloga` tablice `Korisnik`; novi korisnik dobiva ulogu slušatelja. Administratorsko sučelje još ne postoji. Uloge za sada mijenja održavatelj izravno u bazi (npr. `DATABASE_URL='<External Database URL>' wasp db studio`).
- **Postupak ažuriranja:** Provjerena radna grana spaja se u `deploy-test` (`git merge frontend-prototipiranje`, zatim `git push`). Render tada ponovno izgrađuje obje usluge, što na besplatnom planu traje 10 do 15 minuta. Nove migracije primijene se same pri pokretanju poslužitelja.
- **Ograničenja besplatnog plana:** Poslužitelj se uspavljuje nakon razdoblja neaktivnosti, pa prvi zahtjev nakon toga traje oko minute. Besplatna baza istječe 30 dana nakon stvaranja i nema sigurnosnih kopija, pa je prije završne predaje treba prebaciti na plaćeni plan ili ponovno stvoriti i napuniti početnim podacima.
- **Prijava na javnoj adresi:** Dok je Google OAuth klijent u testnom načinu rada, prijaviti se mogu samo dodani testni korisnici. Prije javne demonstracije klijent se prebacuje u produkcijski način rada (**Publish app**).
