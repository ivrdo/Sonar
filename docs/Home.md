# Sonar — Projektna dokumentacija

**Kolegij:** [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz), Fakultet elektrotehnike i računarstva Sveučilišta u Zagrebu  
**Akademska godina:** 2026./2027.  
**Tim:** [Oznaka i naziv tima]  
**Nositelji:** prof. dr. sc. Alan Jović, prof. dr. sc. Vlado Sruk<br>
**Asistent:** Saša Kendjel, univ. mag. ing.<br>
**Demonstrator:** Mirko Bušić<br>

## Pregled projekta

**Cilj:** Omogućiti čitatelju koji prvi put vidi projekt da u dvije ili tri rečenice prepozna aplikaciju, njezine ciljane korisnike i glavnu svrhu.

Sonar je web aplikacija koja na jednom mjestu povezuje slušatelje, izvođače i mjesta održavanja koncerata. Slušatelji ocjenjuju glazbu, prate izvođače i prijavljuju se na koncerte u svojoj blizini, izvođači predlažu koncerte i vide gdje imaju publiku, a upravitelji mjesta potvrđuju koncerte i evidentiraju dolaske.

**Aplikacija i osnovno postavljanje:** [6.2 Lokalna instalacija i konfiguracija](6-Postavljanje-instalacija-i-konfiguracija.md#62-lokalna-instalacija-i-konfiguracija)  
**Javno dostupna aplikacija:** <https://sonar-client.onrender.com/>

## Članovi tima i uloge

Ažurirani popis članova, njihovih GitHub profila i glavnih uloga ili doprinosa nalazi se u [README-u repozitoriju](../README.md#team-members).

## Kazalo dokumentacije

| Stranica | Svrha |
| --- | --- |
| [1. Opseg projekta](1-Projekt.md) | Problem, cilj i granice projekta |
| [2. Analiza zahtjeva](2-Analiza-zahtjeva.md) | Zahtjevi, ograničenja i sljedivost |
| [3. Obrasci uporabe](3-Obrasci-uporabe.md) | Akteri i reprezentativne interakcije korisnika |
| [4. Arhitektura i oblikovanje](4-Arhitektura-i-oblikovanje.md) | Glavne odluke oblikovanja, struktura, podaci i ponašanje |
| [5. Ispitivanje](5-Ispitivanje.md) | Pristup ispitivanju, stvarni rezultati i poznati nedostaci |
| [6. Postavljanje, instalacija i konfiguracija](6-Postavljanje-instalacija-i-konfiguracija.md) | Lokalna instalacija, konfiguracija, javno postavljanje i administracija |
| [7. Zaključak i budući rad](7-Zakljucak-i-buduci-rad.md) | Zaključak i moguća daljnja poboljšanja |
| [A. Pregled aktivnosti grupe](A-Pregled-aktivnosti-grupe.md) | Aktivnosti tima, doprinosi i izazovi |

## Ključne točke projekta

| Kontrolna točka | Demonstracija | Video |
| --- | --- | --- |
| Iteracija 1 | <https://sonar-client.onrender.com/> | [Poveznica na video Demo 1, ako je snimljen] |
| Završni pregled | [Poveznica na završnu inačicu projekta] | [Poveznica na video završne demonstracije, ako je snimljen] |

Dokumentacija se kontinuirano ažurira kako se aplikacija razvija.

## Organizacija projekta i razvojni proces

**Način rada:** dvotjedni sprintovi. Zadaci su GitHub Issues raspoređeni po sprintovima na ploči GitHub Projects.  
**Praćenje trenutačnih zadataka i nedostataka:** [GitHub Issues](https://github.com/ivrdo/Sonar/issues)

| Sprint | Razdoblje | Cilj |
| --- | --- | --- |
| 1 | 6.–19. 10. | Tim, tema, razvojno okruženje, prvi ER model |
| 2 | 20. 10.–2. 11. | Wasp okruženje, dokumentacija 1–3, Prisma i prve React stranice |
| 3 | 3.–16. 11. | Model podataka, katalog, stranice i queryji, deploy na Render |
| 4 | 17.–20. 11. | Povezivanje frontenda, dokumentacija, CI, predaja prvog ciklusa (skraćen do roka) |

**Definicija gotovog (engl. Definition of Done):** zadatak je gotov kada je

- spojen u `master` kroz PR s barem dva odobrenja,
- CI provjera prošla,
- promjena radi na javnoj adresi,
- dokumentacija ažurirana ako se ponašanje promijenilo.

## Pravila dokumentacije

Dokumentacija se sastoji od međusobno povezanih Markdown stranica. Obavezni UML dijagrami izrađuju se u PlantUML-u, uz PlantUML izvor u dokumentaciji sačuvajte i čitljivu sliku.

## Akademski integritet, ponašanje i licenciranje

README repozitorija sadrži projektnu [izjavu o uporabi umjetne inteligencije](../README.md#ai-usage), [informacije o kodeksu ponašanja i podršci](../README.md#code-of-conduct-and-support) te [status licence ili ponovne uporabe](../README.md#license). Pristupni podaci i druge tajne nikada se ne objavljuju u dokumentaciji niti dijele u običnim porukama.

## Izjava o uporabi umjetne inteligencije

<!-- UPUTA: Ovo je detaljan zapis uporabe umjetne inteligencije; README sadrži kratak sažetak i poveznicu na ovaj odjeljak. Unesite samo ono što se stvarno dogodilo i uklonite neupotrijebljene retke. Ako nije korišten nijedan alat generativne umjetne inteligencije, zamijenite cijeli odjeljak jednom rečenicom koja to jasno navodi. Svaki redak mora upućivati na stranicu, datoteku, zahtjev za uključivanje promjena (PR) ili zadatak. Nikada ne unosite pristupne podatke, osobne podatke ni tuđi zaštićeni sadržaj u alate umjetne inteligencije. -->

Kratak sažetak: [README – Uporaba umjetne inteligencije](../README.md#ai-usage). Ovaj odjeljak bilježi koji su alati korišteni, za koju dokumentaciju ili kod te kako je tim provjerio rezultat. Slijedi FER-ova [pravila o primjerenoj uporabi umjetne inteligencije](https://www.fer.unizg.hr/_download/repository/Policy%20on%20the%20appropriate%20use%20of%20artificial%20intelligence%20at%20the%20faculty%20of%20electrical%20engineering%20and%20computing%5B1%5D.pdf).

### Korišteni alati

| Alat | Inačica ili model | Koristio/la | Glavna svrha |
| --- | --- | --- | --- |
| Claude Code | Claude Opus 5.5, razina razmišljanja xhigh | @ivrdo | izrada UI mockupova (demoa) izgleda sučelja; pomoć pri dokumentaciji |
| OpenCode | Qwen3.6-35B-A3B, pokrenut lokalno | @ivrdo | izdvajanje podataka o aktivnostima tima iz izvezene povijesti razgovora; pomoć pri dokumentaciji |
| Claude | Claude Sonnet 5.5, web aplikacija (claude.ai) | @valdr333 | pomoć pri oblikovanju i uređivanju dokumentacije (stranice 1, 2 i 3); provjera ispravnosti koda; pomoć pri razumijevanju koda; pomoć pri optimizaciji koda |

### Opseg doprinosa umjetne inteligencije

| Stranica, datoteka ili artefakt | Vrsta pomoći | Što je alat proizveo | Što je tim zadao i promijenio | Lokacija |
| --- | --- | --- | --- | --- |
| UI mockupovi: `jednostavan.html` i `stiliziran.html` | Izrada nacrta, u više krugova | Dva statična HTML demoa izgleda sučelja | @ivrdo je u više iterativnih krugova davao stilski input na temelju iskustva sa stvarnim web stranicama (Bandcamp, Discogs, Metal Archives, Artcore) i dorađivao demoe prema rezultatu prethodnog kruga. Demoi služe isključivo vizualnom pregledu i orijentaciji, a kod i stilizacija aplikacije pišu se ručno. Uporaba je navedena i u zadatku #15. | Grana `frontend-prijedlozi`; [jednostavan.html](https://ivrdo.github.io/Sonar/jednostavan.html), [stiliziran.html](https://ivrdo.github.io/Sonar/stiliziran.html); [#15](https://github.com/ivrdo/Sonar/issues/15) |
| [A. Pregled aktivnosti grupe](A-Pregled-aktivnosti-grupe.md) | Izdvajanje i sažimanje podataka | Podaci o aktivnostima tima izdvojeni iz izvezene povijesti razgovora | Analiza je provedena uz odobrenje članova tima. Model je pokrenut lokalno, pa povijest razgovora nije poslana nijednoj vanjskoj usluzi, čime je očuvana privatnost članova tima. Izdvojeni podaci uneseni su u tablice dodatka A. | `docs/A-Pregled-aktivnosti-grupe.md` |
| Dokumentacija (`docs/`, `README.md`) | Popunjavanje tablica, premještanje datoteka, provjera točnosti, oblikovanje | Nacrti unosa u tablice, premještene datoteke, popisi uočenih netočnosti, oblikovani tekst | Korišteni su Claude Code (Claude Opus 5.5) i OpenCode s lokalno pokrenutim modelom Qwen3.6-35B-A3B. Tim je zadavao sadržaj i činjenice. | `docs/`, `README.md` |
| [1. Opseg projekta](https://github.com/ivrdo/Sonar/blob/master/docs/1-Projekt.md), [2. Analiza zahtjeva](https://github.com/ivrdo/Sonar/blob/master/docs/2-Analiza-zahtjeva.md), [3. Obrasci uporabe](https://github.com/ivrdo/Sonar/blob/master/docs/3-Obrasci-uporabe.md) | Pomoć pri oblikovanju i uređivanju | Prijedlozi oblikovanja i jezičnog ispravljanja teksta, prijedlozi strukture tablica i popisa, uočene nedosljednosti u nazivima i oznakama | Tim je zadavao sadržaj, zahtjeve i činjenice prema projektnom zadatku. Alat nije samostalno određivao zahtjeve ni obrasce uporabe. Prijedloge alata tim je pregledao, prihvatio ili odbacio te uskladio s projektnim zadatkom. | `docs/1-Projekt.md`, `docs/2-Analiza-zahtjeva.md`, `docs/3-Obrasci-uporabe.md` |
| Unos podataka u bazu (`scripts/importKatalog.ts`) | Provjera ispravnosti, savjeti i pomoć pri razumijevanju API-jeva | Prijedlozi ispravaka i korištenih podataka | Kod je pisao tim. Alat je korišten za traženje mogućih pogrešaka, provjeru ponašanja i savjet izbora podataka. Prijedlozi su ručno pregledani i ispitani prije nego što su ušli u kod. | [#20](https://github.com/ivrdo/Sonar/pull/20) |
| Rad na kodu (`wasp/src/landing`, `wasp/src/components`) | Pomoć pri analizi kodova i zadataka | Prijedlozi ispravaka i analiza koda | Kod je pisao tim. Alat je korišten za traženje mogućih pogrešaka, provjeru ponašanja i analizu tuđih kodova. Prijedlozi su ručno pregledani i ispitani prije nego što su ušli u kod. | [#19](https://github.com/ivrdo/Sonar/issues/19) |

Stranice i artefakti koji nisu navedeni iznad izrađeni su bez pomoći generativne umjetne inteligencije. [Po želji: kao dodatne retke navedite kod ili ispitivanja izrađena uz pomoć umjetne inteligencije.]

### Provjera generiranog sadržaja

| Provjera | Kako je provedena | Dokaz |
| --- | --- | --- |
| Činjenična točnost | [Svaka tvrdnja o funkcionalnostima, ponašanju ili arhitekturi uspoređena je s pokrenutom aplikacijom i kodom] | [Imena pregledavatelja; poveznice na zahtjev za uključivanje promjena (PR) ili zadatak] |
| Nema tvrdnji o neostvarenim funkcionalnostima | [Provjereno je da opisane funkcionalnosti, ispitivanja i rezultati stvarno postoje; planirani rad označen je kao planiran] | [Usporedba s odjeljkom 5.4 (Ispitivanje) i odjeljkom 7.1 (Zaključak)] |
| Dosljednost s drugim stranicama | [Nazivi, ID-ovi i dijagrami provjereni su prema Analizi zahtjeva, Obrascima uporabe, Arhitekturi i oblikovanju te Ispitivanju] | [Kontrolni popis ili bilješka pregleda] |
| Izvori dijagrama | [Generirani PlantUML je iscrtan, ispravljen i odgovara implementiranom sustavu] | [`.puml` datoteka i izrađena slika] |
| Povjerljivi sadržaj | U alate umjetne inteligencije ne unose se tajne (ključevi, lozinke, adrese baza), osobni podaci ni tuđi zaštićeni sadržaj. Tajne se drže samo u lokalnim datotekama okruženja i postavkama Rendera, izvan repozitorija. Osobni podaci članova tima obrađivani su samo lokalno pokrenutim modelom, uz njihovo odobrenje. | `.env` i `wasp/.env.server` u `.gitignore`; dokumentacija navodi samo javne adrese (6.3) |
| Slike i ikone iz mockupova | Provjereno je da su SVG ikone i privremene slike preuzete iz prijedloga dizajna izvorne, da ne kopiraju tuđe logotipe ni naslovnice te da su u kodu označene kao privremene. | `wasp/public/dizajn/`; commit `70abaf5`; `wasp/src/landing/slike.ts` |
| Usklađenost PlantUML izvora i slike | Svaka `.puml` datoteka i pripadna `.svg` slika commitane su zajedno, pa slika odgovara izvoru. | `docs/puml/`, `docs/assets/diagrams/`; commitovi `495f014`, `8b18612`, `8926698`, `c534bd3` |
| Upućivanja na kod | Za datoteke, funkcije, okidače i rute navedene u dokumentaciji provjereno je da postoje u kodu pod tim imenom. | Tablica 2.6; `docs/QUERY-I-AKCIJE.md`; `wasp/src/operations/`; `wasp/migrations/` |
| Rezultati ispitivanja | Rezultati automatiziranih testova preuzeti su iz stvarnog ispisa naredbe, a ručni slučajevi sadrže konkretne vrijednosti iz baze. | `docs/ispitivanje-dokazi/vitest-ispis.txt`; poglavlje 5.2 i 5.3 |
| Upute za instalaciju | Upute za lokalnu instalaciju isprobane su od čiste kopije repozitorija u dev containeru. | Poglavlje 6.2; `scripts/okruzenje.sh`, `scripts/baza.sh`; [ime, datum] |
| Konfiguracija postavljanja | Opis postavljanja uspoređen je s konfiguracijskim datotekama. | Poglavlje 6.3; `render.yaml`; `.github/workflows/ci.yml` |
| Uklonjeni primjeri iz predloška | Provjereno je da primjeri iz predloška kolegija (CrisisMap) nisu predstavljeni kao dio Sonara. | Poglavlje 4; [PR] |
| Podaci o aktivnostima tima | Podatke koje je model izdvojio iz povijesti razgovora članovi tima usporedili su sa stvarnim događajima, commitovima i PR-ovima. | Dodatak A; GitHub Insights → Contributors |
| Komentari u kodu | Komentari koji opisuju ponašanje komponenti i operacija provjereni su prema samom kodu. | `wasp/src/` |

### Pogreške pronađene u izlazu umjetne inteligencije

| Problem | Kako je pronađen | Rješenje |
| --- | --- | --- |
| [Netočna, izmišljena ili iz predloška preuzeta tvrdnja] | [Pregled, ispitivanje ili usporedba s aplikacijom] | [Ispravak s poveznicom] |

<!-- UPUTA: Zabilježite stvarne ispravke ili napišite „Nisu utvrđene”. Općenita tvrdnja poput „sav tekst je pregledan” nije dokaz; dokaz su prethodne tablice. Tim mora moći objasniti svaku rečenicu koju objavi. -->

