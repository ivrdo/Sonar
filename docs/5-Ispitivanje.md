# 5. Ispitivanje

Ovo poglavlje opisuje što se u aplikaciji Sonar ispituje, kako se ispituje i gdje se vide rezultati. Ispitni slučajevi vežu se uz zahtjeve iz [analize zahtjeva](2-Analiza-zahtjeva.md) (F-xxx, NF-xx). Rezultati se u tablicama upisuju tek nakon stvarnog izvođenja slučaja, do tada u stupcima „Stvarni rezultat” i „Ishod” stoji **Nije pokrenuto**.

## 5.1 Pristup ispitivanju

Ispitivanje je podijeljeno na dvije razine: automatizirane testove klijentskog koda i ručno ispitivanje glavnog toka u pokrenutoj aplikaciji.

**Automatizirani testovi (Vitest).** Pokreću se naredbom `wasp test client run` u direktoriju `wasp/`. Testovi su smješteni uz izvorni kod (`*.test.ts` i `*.test.tsx`) i ispituju:

- pravilo gumba „Apply” na stranici koncerta (`izracunajStanjeButton` u `src/operations/pomocno.ts`): stanja `APPLY`, `PRIJAVLJEN`, `POPUNJENO` i `ZATVORENO` te njihov redoslijed;
- komponentu `ConcertCard`: prikaz naslova, datuma, vremena i mjesta te poveznicu na stranicu koncerta;
- sekcije landinga (nadolazeći koncerti, popularni izvođači, mjesta) te stranice koncerta i izvođača.

Stranice se crtaju u običan HTML tekst (`renderToStaticMarkup` iz Reacta), a Waspovi moduli (`useQuery`, `Link`) zamijenjeni su lažnima. Testovi stoga ne trebaju poslužitelj ni bazu: provjerava se kako se prikazuju podaci koje bi vratili queryji. Što točno vraćaju queryji, ovdje se ne ispituje.

Dva dijela još nisu pokrivena, što je u kodu testa označeno komentarom `TODO`: test cijele stranice landinga (čeka da landing prestane koristiti probne podatke) i prikaz popularnih pjesama na stranici izvođača.

**Poslužiteljski kod nije pokriven automatiziranim testovima.** Naredba `wasp test client` izvodi Vitest kroz Waspov dodatak koji odbija svaki uvoz iz `wasp/server`, a Wasp testiranje servera ne podržava. Queryji i akcija `prijaviNaKoncert` zato se ispituju ručno u pokrenutoj aplikaciji (ispitni slučajevi ST-xx u poglavlju 5.2).

**Ručno ispitivanje.** Na javnoj adresi <https://sonar-client.onrender.com> prolazi se glavni tok: prijava, landing, pretraga, stranica izvođača, stranica koncerta i prijava na koncert, na mobitelu (širina 375 px) i na računalu. Istodobne prijave na zadnje slobodno mjesto (NF-07) ispituju se isključivo ručno, jer ovise o zaključavanju retka koncerta u pravoj bazi podataka.

## 5.2 Ispitni slučajevi

Oznaka **CT-xx** označava automatizirani test (poveznica vodi na izvorni kod testa), a **ST-xx** ručni ispitni slučaj na razini sustava.

### Automatizirani testovi

| ID ispitnog slučaja | Scenarij ispitivanja | Ulazni podaci | Očekivani rezultat | Stvarni rezultat | Ishod | Koraci ispitivanja |
| --- | --- | --- | --- | --- | --- | --- |
| CT-01 | Gumb „Apply”: korisnik se može prijaviti (F-024) | Stanje koncerta `OTVORENE_PRIJAVE`, koncert sutra, 10 slobodnih mjesta, korisnik nije prijavljen na koncert. | `APPLY` | Test prošao. | Prošlo | `wasp test client run`; [pomocno.test.ts](../wasp/src/operations/pomocno.test.ts) |
| CT-02 | Gumb „Apply”: nema slobodnih mjesta (F-024) | Kao CT-01, ali 0 slobodnih mjesta. | `POPUNJENO` | Test prošao. | Prošlo | Isto; [pomocno.test.ts](../wasp/src/operations/pomocno.test.ts) |
| CT-03 | Gumb „Apply”: koncert nije u stanju otvorenih prijava (F-024) | Kao CT-01, ali stanje koncerta `ODRZAN`. | `ZATVORENO` | Test prošao. | Prošlo | Isto; [pomocno.test.ts](../wasp/src/operations/pomocno.test.ts) |
| CT-04 | Gumb „Apply”: koncert je već počeo (F-024) | Kao CT-01, ali početak koncerta jučer. | `ZATVORENO` | Test prošao. | Prošlo | Isto; [pomocno.test.ts](../wasp/src/operations/pomocno.test.ts) |
| CT-05 | Gumb „Apply”: korisnik je već prijavljen (F-024) | Kao CT-01, ali korisnik već ima prijavu. | `PRIJAVLJEN` | Test prošao. | Prošlo | Isto; [pomocno.test.ts](../wasp/src/operations/pomocno.test.ts) |
| CT-06 | Redoslijed pravila: prijavljen korisnik i popunjen koncert | Korisnik ima prijavu, 0 slobodnih mjesta. | `PRIJAVLJEN` (prijavljeni korisnik uvijek vidi svoju ulaznicu). | Test prošao. | Prošlo | Isto; [pomocno.test.ts](../wasp/src/operations/pomocno.test.ts) |
| CT-07 | Redoslijed pravila: zatvorene prijave i popunjen koncert | Stanje koncerta `ODRZAN`, 0 slobodnih mjesta. | `ZATVORENO` | Test prošao. | Prošlo | Isto; [pomocno.test.ts](../wasp/src/operations/pomocno.test.ts) |
| CT-08 | `ConcertCard`: prikaz podataka koncerta | Naslov „Orbita + Kiša u Svibnju”, „Fri 20 Nov”, 20:00, „Dom kulture, Zagreb”. | Prikazani su naslov te redak „Fri 20 Nov · 20:00 · Dom kulture, Zagreb”. | Test prošao. | Prošlo | `wasp test client run`; [ConcertCard.test.tsx](../wasp/src/components/ConcertCard.test.tsx) |
| CT-09 | `ConcertCard`: poveznica na koncert | Kartica s id-em koncerta 7. | Kartica vodi na `/concerts/7`. | Test prošao. | Prošlo | Isto; [ConcertCard.test.tsx](../wasp/src/components/ConcertCard.test.tsx) |
| CT-10 | Sekcije landinga: prikaz podataka iz querya (F-001) | Lažni `useQuery` vraća jedan koncert, jednog izvođača i jedno mjesto. | Prikazani su koncert s datumom, vremenom i mjestom, izvođač i mjesto. | Test prošao. | Prošlo | `wasp test client run`; [pages.test.tsx](../wasp/src/pages/pages.test.tsx) |
| CT-11 | `ConcertDetailPage`: prikaz koncerta (F-024) | Lažni `dohvatiKoncert` vraća koncert s izvođačima „Orbita” i „Kiša u Svibnju” i stanjem gumba `APPLY`. | Naslov je „Orbita + Kiša u Svibnju”, a gumb piše „Apply”. | Test prošao. | Prošlo | Isto; [pages.test.tsx](../wasp/src/pages/pages.test.tsx) |
| CT-12 | `ArtistPage`: prikaz izvođača (F-008) | Lažni `dohvatiIzvodjaca` vraća izvođača „Orbita” s albumom „Valovi”. | Prikazani su ime izvođača i album u diskografiji. | Test prošao. | Prošlo | Isto; [pages.test.tsx](../wasp/src/pages/pages.test.tsx) |

### Ručni slučajevi (javna adresa)

Preduvjeti: javna adresa je dostupna i na njoj je najnovija verzija grane, za prijavu je potreban Googleov račun koji je među testnim korisnicima OAuth klijenta, za ST-03 račun sa statusom `SUSPENDIRAN`, za ST-11 i ST-12 koncert u stanju `OTVORENE_PRIJAVE` s 0, odnosno 1 slobodnim mjestom.

| ID ispitnog slučaja | Scenarij ispitivanja | Ulazni podaci | Očekivani rezultat | Stvarni rezultat | Ishod | Koraci ispitivanja |
| --- | --- | --- | --- | --- | --- | --- |
| ST-01 | Javni pregled bez prijave (F-001, F-010) | Neprijavljeni korisnik. | Landing prikazuje nadolazeće koncerte, popularne izvođače i mjesta te navod izvora podataka u podnožju. | Nije pokrenuto | Nije pokrenuto | Otvoriti javnu adresu u anonimnom prozoru; provjeriti sekcije i podnožje. |
| ST-02 | Prijava preko Googlea (F-002) | Valjan Google račun s aktivnim statusom. | Nakon odabira računa korisnik je prijavljen i vraćen u aplikaciju. | Nije pokrenuto | Nije pokrenuto | Otvoriti stranicu za prijavu; odabrati „Continue with Google”; odabrati račun; provjeriti povratak u aplikaciju. |
| ST-03 | Prijava suspendiranog računa (F-002) | Račun sa statusom `SUSPENDIRAN`. | Prijava je odbijena, korisnik nije prijavljen. | Nije pokrenuto | Nije pokrenuto | Postaviti status računa u bazi; pokušati prijavu preko Googlea; provjeriti da korisnik nije prijavljen. |
| ST-04 | Pretraga kataloga (F-008) | Pojam „orbita”; pojam bez rezultata. | Za „orbita” prikazuju se rezultati; za pojam bez rezultata prikazuje se prazno stanje. | Nije pokrenuto | Nije pokrenuto | Upisati pojam u traku za pretragu; potvrditi; provjeriti adresu `/search?q=…` i rezultate. |
| ST-05 | Nepostojeća adresa | Adresa `/nema-me`. | Prikazuje se stranica „nije pronađeno”. | Nije pokrenuto | Nije pokrenuto | Otvoriti adresu; provjeriti stranicu. |
| ST-06 | Stranica izvođača (F-008) | Klik na izvođača iz popularnih. | Otvara se stranica izvođača s njegovim imenom i diskografijom. | Nije pokrenuto | Nije pokrenuto | S landinga kliknuti izvođača; usporediti prikazane podatke s bazom. |
| ST-07 | Stranica koncerta (F-024) | Klik na koncert iz nadolazećih. | Otvara se stranica koncerta s naslovom, datumom, mjestom, popisom izvođača i podacima o mjestu. | Nije pokrenuto | Nije pokrenuto | S landinga kliknuti karticu koncerta; usporediti prikaz s bazom. |
| ST-08 | Prijava na koncert (F-024) | Prijavljeni slušatelj; koncert u stanju `OTVORENE_PRIJAVE` s više slobodnih mjesta. | Nakon klika na „Apply” gumb piše „Show ticket”; u bazi nastaje jedna prijava u stanju `PRIJAVLJEN` s QR kodom; slobodnih mjesta je jedno manje. | Nije pokrenuto | Nije pokrenuto | Prijaviti se; otvoriti koncert; zabilježiti broj slobodnih mjesta; kliknuti „Apply”; osvježiti stranicu; provjeriti prijavu u bazi. |
| ST-09 | Prijava bez prijave u sustav (NF-02) | Neprijavljeni korisnik na stranici koncerta. | Prijava nije moguća; u bazi ne nastaje prijava. | Nije pokrenuto | Nije pokrenuto | Odjaviti se; otvoriti koncert; kliknuti „Apply”; provjeriti ishod i bazu. |
| ST-10 | Dvostruka prijava (F-024) | Korisnik koji je već prijavljen na koncert. | Gumb piše „Show ticket”; broj prijava korisnika na taj koncert ostaje jedan. | Nije pokrenuto | Nije pokrenuto | Nakon ST-08 ponovno otvoriti isti koncert; provjeriti gumb i broj prijava u bazi. |
| ST-11 | Popunjen koncert (F-024) | Koncert bez slobodnih mjesta. | Gumb piše „Sold out” i onemogućen je; prijava nije moguća. | Nije pokrenuto | Nije pokrenuto | Otvoriti popunjen koncert; provjeriti gumb. |
| ST-12 | Istodobne prijave na zadnje mjesto (NF-07) | Koncert s jednim slobodnim mjestom; dva različita računa. | Točno jedna prijava uspijeva; broj aktivnih prijava jednak je broju mjesta. | Nije pokrenuto | Nije pokrenuto | Pripremiti koncert (broj mjesta = broj aktivnih prijava + 1); u dva preglednika prijaviti različite račune; istodobno kliknuti „Apply”; u bazi provjeriti broj aktivnih prijava na koncert (prijave koje nisu `OTKAZAN`). |
| ST-13 | Nepostojeći koncert | Adresa `/concerts/99999`. | Prikazuje se poruka „Concert not found.” | Nije pokrenuto | Nije pokrenuto | Otvoriti adresu; provjeriti poruku. |
| ST-14 | Responzivnost glavnog toka (NF-09) | Širina 375 px i širina računala. | Landing, pretraga, izvođač i koncert čitljivi su bez vodoravnog pomicanja; na mobitelu je vidljiva donja navigacija. | Nije pokrenuto | Nije pokrenuto | U alatima preglednika postaviti širinu 375 px; proći glavni tok; ponoviti na računalu. |

## 5.3 Provedena ispitivanja i rezultati

**Najnovije izvođenje:** automatizirani testovi, 18.11.2026., revizija `41a7584`, lokalno (`wasp test client run`). Ručni slučajevi još nisu izvedeni.

| ID ispitivanja ili izvođenja | Datum i revizija aplikacije | Okruženje | Opaženi rezultat i ishod | Dokaz |
| --- | --- | --- | --- | --- |
| CT-01 do CT-12 | 18.11.2026., revizija `41a7584` | Lokalno, `wasp test client run` | 12 od 12 testova prošlo (3 testne datoteke) | Ispis naredbe `wasp test client run`: [vitest-ispis.txt](ispitivanje-dokazi/vitest-ispis.txt) |
| ST-01 do ST-14 | [UPISATI] | Javna adresa | [UPISATI: po slučaju] | [UPISATI: snimke zaslona; za ST-12 ispis provjere iz baze] |

Slučaj koji ne uspije ili ga nije moguće izvesti (npr. jer funkcionalnost još nije dostupna na javnoj adresi) bilježi se u stvarnom stanju, uz poveznicu na odgovarajući zadatak (Issue). Nakon ispravka slučaj se ponovno izvodi.

## 5.4 Poznati nedostaci i ograničenja ispitivanja

| Problem ili ograničenje | Korisniku vidljiv učinak ili neprovjereno ponašanje | Dokaz ili poveznica na zadatak |
| --- | --- | --- |
| Poslužiteljski kod nije pokriven automatiziranim testovima | Pravila prijave (kapacitet, dvostruka prijava, ovlasti) provjeravaju se samo ručno (ST-08 do ST-13). | Odjeljak 5.1. |
| Istodobne prijave na zadnje mjesto (NF-07) ispituju se samo ručno | Zaključavanje u bazi provjereno je samo ručnim slučajem ST-12. | ST-12. |
