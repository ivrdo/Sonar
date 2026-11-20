# Sonar

Sonar je web aplikacija koja na jednom mjestu povezuje slušatelje, izvođače i mjesta održavanja koncerata.

**Pristupi aplikaciji ovdje 👉** <https://sonar-client.onrender.com/>

Projekt na kolegiju [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz), FER, Sveučilište u Zagrebu.

## Opis aplikacije

Slušatelji ocjenjuju glazbu, prate izvođače i prijavljuju se na koncerte, izvođači predlažu koncerte, a upravitelji mjesta potvrđuju koncerte i evidentiraju dolaske.

- pregled i pretraga koncerata, izvođača i mjesta
- stranica izvođača s diskografijom
- prijava putem Googlea i prijava na koncert

Cijela dokumentacija: [docs](docs/Home.md).

<a id="deployment"></a>
## Postavljanje (engl. deployment)

**Javno dostupna aplikacija:** <https://sonar-client.onrender.com/>

**Isprobajte:** otvoriti koncert s početne stranice, prijaviti se Googleom i prijaviti se na koncert.

**Demonstracija:** pregled ne traži račun. Za prijavu na koncert treba Google račun dodan kao testni korisnik.

**Ograničenja:** poslužitelj se na besplatnom planu uspavljuje, pa prvi zahtjev traje oko minute. Detalji u [poglavlju 6](docs/6-Postavljanje-instalacija-i-konfiguracija.md).

<a id="quick-start"></a>
## Brzi početak / instalacija

Upute za instalaciju i pokretanje: [6.2 Lokalna instalacija i konfiguracija](docs/6-Postavljanje-instalacija-i-konfiguracija.md#62-lokalna-instalacija-i-konfiguracija).

## Tehnologije

| Tehnologija | Uloga | Razlog ili ograničenje |
| --- | --- | --- |
| Wasp | klijent, poslužitelj i autentikacija iz jedne konfiguracije | brže prototipiranje; svi koriste verziju 0.26.1 |
| React | korisničko sučelje | Wasp generira React klijent |
| Prisma, PostgreSQL | baza i migracije | relacijski podaci; dio pravila provode okidači |
| Google OAuth | jedini način prijave | u testnom načinu samo dodani korisnici |
| MusicBrainz, Last.fm | izvori kataloga | uvoz jednokratno, aplikacija ne ovisi o njima |
| Render | javno postavljanje | besplatni plan: uspavljivanje, baza istječe za 30 dana |

<a id="team-members"></a>
## Članovi tima

| Član | Glavna uloga ili doprinos |
| --- | --- |
| Ivor Vrdoljak ([@ivrdo](https://github.com/ivrdo)) | voditelj tima, okruženje, deploy, dokumentacija |
| Val Dragašević ([@valdr333](https://github.com/valdr333)) | dokumentacija, katalog i početni podaci, ispitivanje |
| Josip Rudež ([@jrudez](https://github.com/jrudez)) | model podataka, backend, arhitektura |
| Lea Mrkonjić ([@lea5665](https://github.com/lea5665)) | frontend: izvođači i koncerti |
| Filip Juračić ([@GingerCRO](https://github.com/GingerCRO)) | frontend: početna stranica, ljuska, prijava |
| Samuel Sobočan ([@Samuel-faks](https://github.com/Samuel-faks)) | frontend: mobilni prikaz, karta, pretraga |

## Doprinos projektu

Zadaci u [GitHub Issues](https://github.com/ivrdo/Sonar/issues); PR prema `master` traži dva odobrenja (`CODEOWNERS`).

<a id="license"></a>

**Status licence:** sva prava pridržana, vidi [LICENSE.md](LICENSE.md).

Predložak dokumentacije kolegija licenciran je pod CC BY-NC-SA 4.0, što ne određuje licencu aplikacije.

<a id="ai-usage"></a>
## Uporaba umjetne inteligencije

Projekt slijedi FER-ova [pravila o uporabi umjetne inteligencije](https://www.fer.unizg.hr/_download/repository/Policy%20on%20the%20appropriate%20use%20of%20artificial%20intelligence%20at%20the%20faculty%20of%20electrical%20engineering%20and%20computing%5B1%5D.pdf).

**Izjava:** [Kratak sažetak.]

Detaljan zapis: [docs](docs/Home.md#izjava-o-uporabi-umjetne-inteligencije).

<a id="code-of-conduct-and-support"></a>
## Kodeks ponašanja i podrška

Vrijede Kodeks ponašanja studenata FER-a, pravila timskog rada na kolegiju i [Etički kodeks IEEE-a](https://www.ieee.org/about/corporate/governance/p7-8.html).

---

Struktura dokumentacije prema predlošku kolegija autora [Vlade Sruka](https://www.fer.unizg.hr/vlado.sruk), [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
