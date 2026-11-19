# A. Pregled aktivnosti grupe

**Tim:** Ginger i patuljci &nbsp;|&nbsp; **Projekt:** Sonar &nbsp;|&nbsp; **Grupa:** G10

**Cilj:** Prikazati kako je tim organizirao projekt, raspodijelio rad, reagirao na važne probleme i pridonio rezultatu. Zapisi trebaju opisivati ishode, a ne samo navoditi da je sastanak održan ili da se o nekoj temi raspravljalo.

## A.1 Evidencija sastanaka

> **Kratice:** Filip = Filip Juračić; Ivor = Ivor Vrdoljak; Val = Val Dragašević; Samuel = Samuel Sobočan; Lea = Lea Mrkonjić; Josip = Josip Rudež; Patrik = Patrik Ivanetić.

| Datum i sudionici | Glavna tema | Donesena odluka ili zadatak | Poveznica na zadatak ili rezultat |
|---|---|---|---|
| 6. 10.; Filip, Ivor | Postavljanje komunikacijskih kanala | Filip otvara GitHub repozitorij, Ivor organizira Discord server i HackMD tim za dokumentaciju. | [HackMD](https://hackmd.io/team/fer-progi-team-best); [GitHub](https://github.com/ivrdo/Sonar) (prije `SWE-Project-FER-2026`) |
| 8. 10.; Filip, Ivor, Val | Prijedlog teme i ime projekta | Tema: društvena mreža za pjesme i izvođače s ML preporukama. Ime projekta: **Sonar**. Ime tima: **Ginger i patuljci**. Val šalje službeni prijedlog asistentu. | Mail na `progi@fer.hr` 8. 10., 14:27 |
| 8. 10.; cijeli tim | Registracija tima | Tim se upisuje u Teams tablicu G10.2. Dogovoreno proširenje tima na 7 članova (Lea, Josip, Patrik se pridružuju). | — |
| 8.–10. 10.; cijeli tim | Proširenje opsega teme | Patrik predlaže da projekt pokriva sve funkcionalnosti iz zadane teme (koncerti, prostori, check-in). Dodaje se koncertni modul i prošireni sustav preporuka. | [HackMD specifikacija](https://hackmd.io/@fer-progi-team-best/BJfHklNsMl) |
| 10. 10.; tim | Rok za prijavu teme | Prijedlog teme dostavljen. Rok za konačnu odluku: 16. 10. | — |
| 12. 10., 21:30; Filip, Ivor, Lea, Josip | Discord poziv: tehnički pregled | Patrik odsutan. Rasprava o tehnologijama i planu. | — |
| 16. 10.; Filip, Ivor, Val, Lea, Josip, Samuel | Discord poziv: razvojno okruženje | **Odluka:** IntelliJ IDEA i Docker; za poslužitelj se Django i Spring uspoređuju kratkim demo projektima. **Odluka:** ne koristiti profesorski predložak koda. Filip prepušta ulogu voditelja tima Ivoru. | [Issue #2](https://github.com/ivrdo/Sonar/issues/2) |
| 17. 10.; Ivor | Postavljanje razvojnih okruženja | Ivor otvara issue za instalaciju IntelliJ IDEA Ultimate i Docker Desktopa te demo projekte, i issue za orijentaciju u podatkovnom modelu. | [Issue #2](https://github.com/ivrdo/Sonar/issues/2); [Issue #4](https://github.com/ivrdo/Sonar/issues/4) |
| 19. 10.; Val, Patrik | ER dijagram baze | Val i Patrik izrađuju ER dijagram za Sonar. | [PR #5](https://github.com/ivrdo/Sonar/pull/5) |
| 20.–21. 10.; cijeli tim | Pregled koda i pravila za PR-ove | Ivor postavlja pravilo: svaki PR prema `master` zahtijeva barem 2 odobrenja. Pregledi se raspodjeljuju po području (ER model, Wasp, baza) i zapisuju u CODEOWNERS. | [PR #13 — CODEOWNERS](https://github.com/ivrdo/Sonar/pull/13) |
| 21.–26. 10.; Ivor, pregled: Filip, Josip, Lea, Val | Odluka o tehnologijama | **Odluka:** Wasp (TypeScript, React, Prisma, PostgreSQL) umjesto Djanga i Springa. Ivor postavlja Wasp radno okruženje. | [PR #12 — Wasp radno okruženje](https://github.com/ivrdo/Sonar/pull/12) |
| 27. 10., FER; Ivor, Lea, Josip, Samuel | Mob programming: početak frontenda | Dogovoren zajednički početak razvoja frontenda. Lea uči React, Ivor prezentira UI dizajn. | [Issue #15](https://github.com/ivrdo/Sonar/issues/15) |
| 6. 11.; Discord; Filip, Ivor, Samuel, Lea | Mob programming: način rada na frontendu | Dogovoreno: mali zadaci, česti commiti, dokumentacija komentarima. Filip radi landing, Ivor standardizira Tailwind boje. | [Commit 72f6044](https://github.com/ivrdo/Sonar/commit/72f60446dbcb51526aedce74a5903e3068bb2595) |
| 11. 11.; Patrik | Patrik napušta projekt | Patrik Ivanetić zbog privatnih razloga napušta semestar. Lea preuzima dio 3.3 dokumentacije. | — |
| 14. 11.; Ivor, Josip | Prvi merge konflikt | Ivor i Josip slučajno radili na istoj grani. Konflikt riješen, Ivor preuzima dio Josipova zadatka. Uvedeno pravilo: svatko se javi što radi. | — |
| 15. 11.; Ivor | Deploy na Render | Ivor postavlja klijent i poslužitelj na Render s varijablama okruženja za Google OAuth. | [PR #26](https://github.com/ivrdo/Sonar/pull/26); <https://sonar-client.onrender.com> |
| 17. 11.; cijeli tim | Priprema za labos | Lea i Filip povezuju frontend s queryjima. Ivor usklađuje granu `frontend-prototipiranje` s `deploy-test`. | — |
| 19. 11., FER (A109); Filip, Samuel, Ivor, Val, Lea, Josip | Završni pregled pred labos | Popis preostalih zadataka: obrasci uporabe, sekvencijski dijagram, arhitektura (pogl. 4), README, definicija sprinta. | [PR #32 — arhitektura](https://github.com/ivrdo/Sonar/pull/32) |

## A.2 Plan rada

**Trenutačni plan:** zadaci se vode u [GitHub Issues](https://github.com/ivrdo/Sonar/issues), a plan do predaje prvog ciklusa u [issueu #19](https://github.com/ivrdo/Sonar/issues/19). Odgovornost za ažurnost: Ivor.

| Razdoblje | Glavni planirani rad | Odgovorni članovi | Poveznica na zadatke |
|---|---|---|---|
| Tjedan 1 (6.–12. 10.) | Formiranje tima, odabir teme, registracija, slanje prijedloga | Svi | Mail na `progi@fer.hr`; HackMD specifikacija |
| Tjedan 2 (13.–19. 10.) | Razvojno okruženje, demo projekti, orijentacija u podatkovnom modelu, prvi ER dijagram | Ivor (okruženje), Val i Patrik (ER) | [#2](https://github.com/ivrdo/Sonar/issues/2); [#4](https://github.com/ivrdo/Sonar/issues/4); [PR #5](https://github.com/ivrdo/Sonar/pull/5) |
| Tjedan 3 (20.–26. 10.) | Wasp radno okruženje, CODEOWNERS, dokumentacija 1 i 2, početak dokumentacije 3 | Ivor (Wasp), Val (dokumentacija) | [PR #12](https://github.com/ivrdo/Sonar/pull/12); [PR #13](https://github.com/ivrdo/Sonar/pull/13); [PR #6](https://github.com/ivrdo/Sonar/pull/6); [PR #9](https://github.com/ivrdo/Sonar/pull/9); [PR #11](https://github.com/ivrdo/Sonar/pull/11) |
| Tjedan 4 (27. 10.–2. 11.) | Prisma i Wasp integracija, prve React stranice i odabir dizajna, tokovi u dokumentaciji 3 | Ivor (integracija), Lea i Filip (frontend), Val (dokumentacija), Josip (Prisma shema) | [#14](https://github.com/ivrdo/Sonar/issues/14); [#15](https://github.com/ivrdo/Sonar/issues/15) |
| Tjedan 5 (3.–9. 11.) | Prisma shema s ograničenjima, Tailwind boje, stranice frontenda, Map stranica | Josip (shema), Ivor (boje, dokumentacija modela), Filip i Lea (stranice), Samuel (Map) | [PR #17](https://github.com/ivrdo/Sonar/pull/17); [PR #18](https://github.com/ivrdo/Sonar/pull/18) |
| Tjedan 6 (10.–16. 11.) | Uvoz kataloga i generirani podaci, mobilni layout, backend queryji i QR kod, dev container i `setup.sh`, deploy na Render | Val (katalog, seed), Samuel (mobilni layout), Josip (queryji), Ivor (okruženje, deploy) | [PR #20](https://github.com/ivrdo/Sonar/pull/20); [PR #21](https://github.com/ivrdo/Sonar/pull/21); [PR #24](https://github.com/ivrdo/Sonar/pull/24); [PR #25](https://github.com/ivrdo/Sonar/pull/25); [PR #26](https://github.com/ivrdo/Sonar/pull/26) |
| Tjedan 7 (17.–23. 11.) | Povezivanje frontenda s queryjima, dokumentacija 2.5, 2.6, 4, 5 i 6, CI, završni pregled i predaja | Lea i Filip (frontend), Ivor (2.5, 2.6, 6, CI), Josip (4), Val (5) | [PR #27](https://github.com/ivrdo/Sonar/pull/27); [PR #29](https://github.com/ivrdo/Sonar/pull/29); [PR #31](https://github.com/ivrdo/Sonar/pull/31); [PR #32](https://github.com/ivrdo/Sonar/pull/32); [PR #33](https://github.com/ivrdo/Sonar/pull/33) |

## A.3 Aktivnosti i doprinosi članova

> **Napomena o satima:** Tim nije bilježio utrošene sate, pa je stupac prazan. Broj commitova po članu nalazi se u A.4.

| Aktivnost ili rezultat | Član | Prijavljeni sati | Reprezentativni rezultat ili poveznica |
|---|---|---|---|
| Razvojno okruženje: Wasp, Docker Compose (PostgreSQL), dev container, skripte za postavljanje | Ivor | — | [Issue #2](https://github.com/ivrdo/Sonar/issues/2); [PR #12](https://github.com/ivrdo/Sonar/pull/12); [PR #24](https://github.com/ivrdo/Sonar/pull/24); [PR #25](https://github.com/ivrdo/Sonar/pull/25); [PR #30](https://github.com/ivrdo/Sonar/pull/30) |
| Prijava putem Googlea, deploy na Render, CI provjera builda | Ivor | — | Commit `52c91d0`; [PR #26](https://github.com/ivrdo/Sonar/pull/26); [PR #31](https://github.com/ivrdo/Sonar/pull/31) |
| Koordinacija tima, pravila pregleda (barem 2 odobrenja), CODEOWNERS, upravljanje zadacima | Ivor | — | [PR #13](https://github.com/ivrdo/Sonar/pull/13); [PR #28](https://github.com/ivrdo/Sonar/pull/28); [Issue #19](https://github.com/ivrdo/Sonar/issues/19) |
| Dokumentacija: 2.5, 2.6 i poglavlje 6; Tailwind boje i UI demoi | Ivor | — | [PR #27](https://github.com/ivrdo/Sonar/pull/27); [PR #29](https://github.com/ivrdo/Sonar/pull/29); commit `72f6044`; [Issue #15](https://github.com/ivrdo/Sonar/issues/15) |
| Službeni prijedlog teme, HackMD specifikacija, dokumentacija: poglavlja 1, 2 i 3 | Val | — | Mail na `progi@fer.hr`; [PR #6](https://github.com/ivrdo/Sonar/pull/6); [PR #9](https://github.com/ivrdo/Sonar/pull/9); [PR #11](https://github.com/ivrdo/Sonar/pull/11); [PR #16](https://github.com/ivrdo/Sonar/pull/16) |
| ER dijagram (v1, s Patrikom) | Val | — | [PR #5](https://github.com/ivrdo/Sonar/pull/5) |
| Uvoz kataloga (MusicBrainz, Last.fm), generirani podaci, landing queryji i komponente (PopularArtists, VenuesSection, Tile, Section) | Val | — | [PR #20](https://github.com/ivrdo/Sonar/pull/20); [PR #21](https://github.com/ivrdo/Sonar/pull/21) |
| Ispitivanje: Vitest testovi i poglavlje 5 | Val | — | [PR #33](https://github.com/ivrdo/Sonar/pull/33) |
| Implementacija cijelog Prisma modela (ER v2): korisnici, katalog, koncerti, moderacija, preporuke i CHECK ograničenja | Josip | — | [PR #17](https://github.com/ivrdo/Sonar/pull/17) |
| Backend queryji i akcije: dohvatiIzvodjaca, dohvatiKoncert, prijaviNaKoncert (transakcija, zaključavanje), QR kod, okidači kapaciteta | Josip | — | Commit `fc78398`; commit `c9d6bf4` |
| Opis `onBeforeLogin` hooka i seed skripte; dokumentacija: 4.1 i 4.3 | Josip | — | Commit `094aa03`; [PR #32](https://github.com/ivrdo/Sonar/pull/32) |
| Stranice ArtistPage i ConcertDetailPage s komponentama (ArtistProfileCard, Discography, PopularSongs, AboutArtist, VenueFacts, Lineup, ApplyBox, SubpageHeader), UpcomingConcerts, povezivanje s queryjima | Lea | — | [Issue #15](https://github.com/ivrdo/Sonar/issues/15); commit `fc02b42` |
| Landing stranica (hero banner, filteri, sekcije), Sidebar, navbar, ljuska u `App.tsx`, stranica `/login` | Filip | — | [Issue #15](https://github.com/ivrdo/Sonar/issues/15); commit `37b0594`; commit `9b90d9c`; commit `9cbb9dc` |
| Demo projekt u Springu | Filip | — | [Issue #2](https://github.com/ivrdo/Sonar/issues/2); commit `64c17b7` |
| Mobilni layout (BottomTabs, skrivanje sidebara), Map stranica, pretraga (`/search?q=`, i na mobitelu), stranica za nepostojeće adrese, podnožje s izvorima podataka | Samuel | — | Commit `be405eb`; commit `bfddda4`; commit `df48bd7`; commit `eb5f5d8` |
| ER dijagram (v1, s Valom); napustio projekt 11. 11. i predao dotadašnji rad | Patrik | — | [PR #5](https://github.com/ivrdo/Sonar/pull/5) |

## A.4 Pregled promjena u repozitoriju

**Prikaz aktivnosti repozitorija:** [Contributors prikaz](https://github.com/ivrdo/Sonar/graphs/contributors) na [`ivrdo/Sonar`](https://github.com/ivrdo/Sonar). Razdoblje: 6. 10. 2026. – 19. 11. 2026.

> *Graf može pokazati kada su zapisi promjena napravljeni i tko ih je napravio, ali ne prikazuje sav rad na oblikovanju, ispitivanju, integraciji, pregledu ili dokumentaciji.*

| Korisnik | Kontribucije (commitovi) |
|---|---|
| **ivrdo** (Ivor Vrdoljak) | **75** |
| **valdr333** (Val Dragašević) | **56** |
| **jrudez** (Josip Rudež) | **46** |
| **lea5665** (Lea Mrkonjić) | **42** |
| **GingerCRO** (Filip Juračić) | **35** |
| **Samuel-faks** (Samuel Sobočan) | **10** |

Ukupno na grani `master` (19. 11.): **264** commita, **25** pull requestova i **3** otvorena issuea.

Tim je koristio **GitHub Issues** kao jedinstveni registar zadataka i **pull requestove** s obaveznim pregledom. PR prema grani `master` zahtijeva barem 2 odobrenja (npr. PR #25 — setup.sh: 4 odobrenja; PR #26 — deploy: 3 odobrenja). PR #33 spojen je bez odobrenja u granu `frontend-prototipiranje`, koja nije zaštićena. Glavne grane su `frontend-prototipiranje` (razvoj), `deploy-test` i `master`. Prvi merge konflikt (Ivor i Josip, 14. 11.) riješen je dogovorom.

## A.5 Ključni inženjerski izazovi i rješenja

| Izazov | Poduzeta radnja | Ishod ili preostalo ograničenje |
|---|---|---|
| **Odabir tehnologija:** Django ili Spring naspram Waspa | Tim uspoređuje Django i Spring kratkim demo projektima (issue #2). Ivor predstavlja Wasp (React, Prisma, Express, hrvatski tim). Filip uspoređuje prednosti Jave i Springa s manama (puno ponavljajućeg koda). Tim odabire Wasp radi brzine prototipiranja. | Cijeli projekt razvijen je u Waspu ([PR #12](https://github.com/ivrdo/Sonar/pull/12)). PR #24 fiksira verziju Waspa u `devcontainer.json` radi ponovljivosti. |
| **Pregled Prisma sheme (PR #17)** | Ivor u pregledu PR-a #17 predlaže preinake: bez kopija entiteta i sa standardiziranim nazivima. Na temelju pregleda Ivor u PR-u #18 ažurira dokumentaciju podatkovnog modela. | Shema je spojena 9. 11. s 2 odobrenja. Ivor u pregledu bilježi: *„Hrpu stvari je tu izborno, ali mislim da bi nam neke preinake olakšale život.”* |
| **Prvi merge konflikt: Ivor i Josip radili na istoj grani** | Konflikt na grani `frontend-prototipiranje` (14. 11.) riješen je, a Ivor preuzima dio Josipova zadatka. | Dogovor iz 6. 11. (mali zadaci, česti commiti) dopunjen je pravilom da se svatko javi što radi. |
| **Patrik napušta projekt (11. 11.)** | Patrik Ivanetić zbog privatnih razloga napušta semestar. Lea preuzima dio 3.3 dokumentacije koji je trebala raditi s Patrikom. Val i Josip preuzimaju preostale zadatke. Preraspodjela 14. 11. | Rad na bazi i backendu nastavljen je bez prekida (PR #17 spojen 9. 11., Josipovi queryji 14.–15. 11.). |
| **Uvoz vanjskog kataloga (MusicBrainz, Last.fm)** | Val razvija `scripts/importKatalog.ts`, koji rezultat sprema u `katalog.ts`, a odgovore API-ja u lokalnu predmemoriju. PR #20: 21 commit, 3 odobrenja (Filip, Ivor, Josip). | Katalog sadrži 125 izvođača, 298 albuma, 2957 pjesama i 68 mjesta u 7 gradova u 5 država. Ivor u pregledu bilježi: *„jedan veliki problem kod ovoga je manjak dokumentacije funkcionalnosti”*. |
| **Deploy na Render: klijent i poslužitelj na različitim domenama** | Ivor konfigurira `REACT_APP_API_URL`, `WASP_SERVER_URL`, `WASP_WEB_CLIENT_URL` i Google OAuth redirect URI na Renderu. PR #26: `deploy-test` u `master`. CI provjera builda u GitHub Actionsu (`.github/workflows/ci.yml`). | Klijent na `sonar-client.onrender.com`, poslužitelj na `sonar-server-a7uh.onrender.com`. Prilagodba za mobitel još nije dovršena (17. 11.). |
