# Arhitektura

# Domene

## Struktura baze podataka

```
KORISNICI
- users: podaci o korisniku, uloga, status (aktivan, suspendiran...), grad, notification settings
- system_settings: podešavanja sustava (npr. pravilo suspenzije)

KATALOG
- artists: izvođači (mbid, naziv, popularnost, stanje dohvata)
- albums, tracks: albumi i pjesme izvođača
- tags, artist_tags: oznake (žanr, raspoloženje) i njihova težina po izvođaču
- venues: mjesta održavanja (adresa, koordinate, kapacitet)
- catalog_requests: zahtjevi korisnika za dodavanje izvođača

DRUŠTVENI DIO
- user_favorite_tags, user_favorite_artists: odabir pri registraciji
- user_follows, artist_follows: praćenje korisnika i izvođača
- ratings, likes: ocjene 1-5 i oznake "sviđa mi se" za izvođače, albume ili pjesme
- reviews, review_replies: recenzije i službeni odgovori izvođača (NE ZNAM JEL TO ŽELIMO OPĆENITO IMATI)
- lists, list_items: liste korisnika i njihove stavke
- activities: aktivnosti za feed

KONCERTI I PRIJAVE
- concerts: koncert (mjesto, vrijeme, broj mjesta, stanje, rok isteka za potvrdu koncerta)
- concert_artists: izvođači koji nastupaju na koncertu
- registrations: prijave na koncert (stanje, QR token, vrijeme skeniranja)

MODERACIJA I ULOGE
- content_reports: prijave sadržaja (stanje)
- moderation_log: zapisnik moderatorskih radnji
- role_requests: zahtjevi za ulogu (poveznica, kod, stanje, napomena moderatora)

OBAVIJESTI I PREPORUKE
- notifications: obavijesti (tip, tekst, poveznica, pročitano)
- artist_recommendations, concert_recommendations: izračunate preporuke s razlogom, prepisuju se svaki sat
```

## Frontend

```
JAVNO (bez prijave)
- Početna: popularni izvođači i najavljeni koncerti
- Karta mjesta i koncerata
- Prijava putem Googlea

SLUŠATELJ
- Onboarding: odabir žanrova i izvođača pri registraciji
- Feed i preporuke: aktivnosti koje pratim, preporučeni izvođači i koncerti s razlogom ("jer voliš X")
- Pretraga i zahtjev za dodavanje izvođača kojeg nema u katalogu
- Stranica izvođača: albumi, pjesme, ocjena, recenzije, nadolazeći koncerti, gumb Prati
- Stranice albuma i pjesme: ocjena, "sviđa mi se", recenzije
- Profil (moj i tuđi) i uređivanje: ime, grad, opis, postavke obavijesti i radijus
- Liste: izrada i pregled
- Stranica koncerta: detalji, popis izvođača, broj slobodnih mjesta (osvježava se uzivo), prijava
- Moje prijave: QR ulaznica, otkazivanje, dodavanje u kalendar (.ics)
- Obavijesti: zvonce uz brojku i popis
- Moji podaci: preuzimanje podataka i brisanje računa
- Zahtjev za ulogu izvođača ili upravitelja mjesta: poveznica, dobiveni kod, stanje zahtjeva
- Prijava neprimjerenog sadržaja

IZVOĐAČ
- Predlaganje koncerta: obrazac (mjesto, datum, izvođači, broj mjesta)
- Moji koncerti: popis sa stanjima
- Statistika: prijave, dolasci, nedolasci, ocjene, pratitelji u blizini mjesta, izvoz CSV?

UPRAVITELJ MJESTA
- Profil mjesta i unos kapaciteta
- Prijedlozi koncerata: prihvati ili odbij
- Skeniranje QR ulaznica (mobitel, kamera) i popis prijavljenih
- Statistika koncerata na mjestu

MODERATOR
- Prijave sadržaja: pregled, uklanjanje ili odbačivanje uz razlog
- Zahtjevi za ulogu: pregled poveznice i koda, odluka, traženje dopune

ADMINISTRATOR
- Korisnici i uloge, deaktivacija računa
- Pravilo suspenzije (broj uklonjenih sadržaja i trajanje)
- Statistika sustava: korisnici po ulogama, koncerti po stanjima, odaziv

ZAJEDNIČKO
- Navigacija koja se mijenja prema ulozi
- Stanja učitavanja, prazna stanja i poruke o greškama
- Osvježavanje bez reloada: feed, obavijesti i broj slobodnih mjesta
- Ista komponenta za QR prikaz i za skeniranje
```

## Backend

```
PRIJAVA I OVLASTI
- Prijava putem Googlea (OpenID Connect / OAuth 2.0), izdavanje tokena
- Provjera ovlasti po ulozi na svakoj zzaštićenoj ruti (slušatelj, izvođač, upravitelj mjesta, moderator, administrator)
- Odbijanje prijave suspendiranih, deaktiviranih i obrisanih računa

GRUPE API-JA
- Korisnici i profili: pregled i uređivanje, postavke obavijesti, radijus
- Katalog: pretraga, detalji izvođača, albuma, pjesama i mjesta, zahtjev za dodavanje izvođača
- Društveni dio: praćenje, ocjene, "sviđa mi se", liste, feed
- Koncerti: predlaganje, odluka upravitelja, otkazivanje, popis i detalji
- Prijave na koncert: prijava, otkazivanje, QR ulaznica, skeniranje, .ics
- Moderacija: prijava sadržaja, odluke, zahtjevi za ulogu (kod, provjera, dopuna), zapisnik
- Obavijesti: popis, označavanje pročitanim, kanal za stvarno vrijeme
- Preporuke: čitanje gotovih preporuka
- Statistika: izvođač, upravitelj, administrator, izvoz CSV?
- Privatnost: izvoz podataka, brisanje (anonimizacija) računa
- Administracija: korisnici, uloge, deaktivacija, pravilo suspenzije

POZADINSKI POSLOVI
- Uvoz i dohvat novih kataloga s MusicBrainza i Last.fma, uz ograničenje broja zahtjeva (MusicBrainz otprilike 1 u sekundi) i ograničen broj ponovnih pokušaja
- Istek prijedloga koncerta koje upravitelj nije obradio
- Prebacivanje prijava u "nije došao" nakon završetka koncerta
- Podsjetnik dan prije koncerta?
- Satni izračun preporuka (stare zamjenjuje novima)

PRAVILA KOJA TREBA IMPLEMENTIRATI
- Broj mjesta koncerta ne smije preći kapacitet mjesta, a mjesto bez kapaciteta ne prima prijedloge
- Prijava na koncert samo u stanju otvorenih prijava i dok ima slobodnih mjesta (transakcija uz zaključavanje)
- Otkazivanje prijave najkasnije sat vremena prije početka
- Privremena suspenzija nakon određenog broja uklonjenih sadržaja (vrijednosti iz system_settings)
- Izvođač i upravitelj dobivaju samo zbirne podatke o pratiteljima, a vrijednosti ispod minimuma (npr. 10) se ne prikazuju
- Svaka moderatorska odluka upisuje se u zapisnik
- Brisanje računa anonimizira korisnika, a ne briše redak

VANJSKI SUSTAVI
- Google (prijava), MusicBrainz i Last.fm (katalog), e-pošta (obavijesti i podsjetnici)
- Ako je vanjski servis nedostupan, aplikacija i dalje radi nad postojećim katalogom
```

# Tehnologije

## Programski jezici

- Python: 
    - Pro: **Vrlo jake numeričke biblioteke** (C/C++ biblioteke kao moduli), dinamično tipiziranje => bolja čitljivost
    - Con: Nije *portable* kao Java, dinamično tipiziranje => interpreter ne detektirati tipske greške, spor nativni kod, *package management* sustav kompliciran (pip + venv, poetry, pdm, conda, _novi_ uv, ...)
- Java:
    - Pro: *Portable*, statično tipiziran => tipske greške detektirane, brzi nativni kod, konsolidiran *package management*
    - Con: **Daleko slabije numeričke biblioteke**, statično tipiziran => lošija čitljivost

## Baze podataka

Postgres je izabran.

## Radna okruženja 

Docker, VSCode, IntelliJ.
