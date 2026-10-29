# 2. Analiza zahtjeva

## 2.1 Funkcijski zahtjevi

| ID | Opis | Prioritet | Izvor | Kriteriji prihvaćanja |
| --- | --- | --- | --- | --- |
| F-001 | Neregistrirani korisnik može pregledati kartu mjesta održavanja i najavljenih koncerata te javni prikaz popularnih izvođača. Mjesta održavanja i koncerti prikazuju se na karti (vanjska usluga za kartu). | Visok | Odobreni zadatak | Neprijavljeni korisnik na početnoj stranici vidi kartu s oznakama mjesta i najavljenih koncerata te popis popularnih izvođača, bez zahtjeva za prijavom. |
| F-002 | Korisnik se registrira i prijavljuje putem vanjskog pružatelja identiteta (Google) uz OpenID Connect / OAuth 2.0, a adresa e-pošte preuzima se od pružatelja identiteta. | Visok | Odobreni zadatak | Neprijavljeni korisnik odabirom prijave odlazi na stranicu Googlea.<br>- nakon uspješne prijave vraća se u aplikaciju kao prijavljen i ima pristup radnjama za prijavljene korisnike<br>- adresa e-pošte preuzeta je od Googlea<br>- ako odustane od prijave, ostaje neprijavljen i te su mu radnje nedostupne |
| F-003 | Slušatelj uređuje profil (ime ili nadimak, mjesto stanovanja, kratki opis) te odabire način primanja obavijesti (e-pošta, obavijesti unutar aplikacije) i najveću udaljenost od svoje lokacije za obavijesti o koncertima. | Visok | Odobreni zadatak | Slušatelj može pregledati i izmijeniti ime ili nadimak, mjesto stanovanja i opis, način primanja obavijesti (e-pošta, obavijesti unutar aplikacije) te najveću udaljenost za obavijesti o koncertima. Nakon spremanja promjene su vidljive na profilu. |
| F-004 | Pri registraciji slušatelj odabire nekoliko omiljenih žanrova i izvođača. | Visok | Odobreni zadatak | Pri prvoj prijavi novi korisnik može odabrati omiljene žanrove i izvođače iz kataloga. Odabir se sprema i koristi kao polazište za preporuke (F-019). |
| F-005 | Profil izvođača sadrži biografiju i vezu na izvođača iz kataloga. | Visok | Odobreni zadatak | Na profilu izvođača vidljiva je njegova biografija i veza na zapise u katalogu o tom izvođaču.  |
| F-006 | Profil mjesta održavanja sadrži naziv, adresu s lokacijom na karti i kapacitet koji unosi upravitelj mjesta. | Visok | Odobreni zadatak | Na profilu mjesta održavanja vidljivi su naziv, adresa i lokacija mjesta na karti te maksimalni kapacitet tog mjesta. |
| F-007 | Sustav vodi vlastiti katalog (izvođači, albumi, pjesme, mjesta) popunjen jednokratnim uvozom iz MusicBrainza i Last.fma, a pri radu čita samo iz vlastite baze. | Visok | Odobreni zadatak | Nakon uvoza baza sadrži izvođače, albume, pjesme i mjesta iz odabranih gradova (mjesta s koordinatama). Pretraga i stranice kataloga rade i kada su MusicBrainz i Last.fm nedostupni. |
| F-008 | Slušatelj može pretraživati katalog i pregledavati stranice izvođača, albuma, pjesama i mjesta. | Visok | Odobreni zadatak | Slušatelj upisom pojma u pretragu dobiva popis izvođača, albuma, pjesama i mjesta iz kataloga koji odgovaraju pojmu, a odabirom rezultata otvara se njegova stranica s osnovnim podacima. Za pojam bez rezultata prikazuje se poruka da ništa nije pronađeno. |
| F-009 | Korisnik može zatražiti dodavanje izvođača kojeg nema u katalogu, a sustav ga dohvaća u pozadini. | Srednji | Odobreni zadatak | Korisnik može zatražiti dodavanje izvođača kojeg nema u katalogu.<br>- do završetka dohvata izvođač je u stanju „u obradi“ i ne pojavljuje se u preporukama<br>- nakon uspješnog dohvata dostupan je u katalogu s oznakama (stanje „dohvaćen“)<br>- ako već postoji (isti MusicBrainz identifikator), ne dohvaća se ponovno i prikazuje se postojeći zapis<br>- nakon ograničenog broja neuspjelih pokušaja stanje je „neuspjelo“ i korisnik vidi poruku da izvođača još nema u katalogu |
| F-010 | Izvori podataka (MusicBrainz, Last.fm) navode se u aplikaciji. | Visok | Odobreni zadatak | U aplikaciji je vidljiv navod da podaci o katalogu dolaze iz MusicBrainza, a oznake i popularnost iz Last.fma. |
| F-011 | Slušatelj prati izvođače i druge korisnike. | Visok | Odobreni zadatak | Nakon što slušatelj počne pratiti izvođača ili korisnika, njihove se aktivnosti i novosti pojavljuju u njegovu feedu (F-016), a nakon prestanka praćenja više ne. Slušatelj ne može pratiti samog sebe. |
| F-012 | Slušatelj ocjenjuje izvođače, albume i pjesme ocjenom od 1 do 5 i označava ih oznakom „sviđa mi se“. | Visok | Odobreni zadatak | Slušatelj može ocijeniti izvođača, album ili pjesmu ocjenom od 1 do 5 i neovisno označiti „sviđa mi se“. Ocjena izvan raspona od 1 do 5 se odbija. Ponovna ocjena iste stavke mijenja prethodnu umjesto da doda novu. |
| F-013 | Slušatelj piše recenzije izvođača, albuma i pjesama. | Visok | Odobreni zadatak | Slušatelj može napisati recenziju izvođača, albuma ili pjesme, a ona je vidljiva ostalim korisnicima na stranici te stavke uz ime autora. Prazna recenzija se ne sprema. |
| F-014 | Verificirani izvođač javno službeno odgovara na recenzije svojih izdanja. | Srednji | Povratna informacija asistenta | Verificirani izvođač može na recenziju svojih izdanja dodati javni službeni odgovor koji se prikazuje uz recenziju i označen je kao odgovor izvođača. Korisnik bez uloge izvođača, ili izvođač na recenziju tuđeg izdanja, nema tu mogućnost. |
| F-015 | Slušatelj izrađuje liste pjesama (npr. omiljenih). | Srednji | Odobreni zadatak | Slušatelj može izraditi listu pjesama s nazivom, dodavati i uklanjati pjesme te vidjeti listu s pjesmama u zadanom redoslijedu. |
| F-016 | Feed prikazuje aktivnosti korisnika koje slušatelj prati te novosti izvođača koje prati, primjerice najavljene koncerte. | Visok | Odobreni zadatak | Feed slušatelja prikazuje aktivnosti korisnika koje prati (npr. ocjene, recenzije) i novosti izvođača koje prati (npr. najavljene koncerte), od najnovijeg prema starijem. Aktivnosti korisnika i izvođača koje ne prati ne pojavljuju se. |
| F-017 | Sustav preporučuje slušatelju izvođače koje još ne prati, prema oznakama izvođača koje prati, visoko ocjenjuje ili označi „sviđa mi se“, uz popularnost kao dodatni kriterij. | Visok | Odobreni zadatak | Slušatelj dobiva popis preporučenih izvođača koji ne sadrži izvođače koje već prati. Izvođači čije su oznake bliže onima koje slušatelj voli nalaze se ispred slabije podudarnih, a uz jednako podudaranje popularniji izvođač je ispred. Uz svaku preporuku prikazan je razlog (F-020). |
| F-018 | Sustav preporučuje nadolazeće koncerte izvođača koje slušatelj voli, u stanju otvorenih prijava i unutar njegova radijusa, a bliži su ispred. | Visok | Odobreni zadatak | Preporučeni koncerti su samo oni u stanju otvorenih prijava, na kojima nastupa izvođač kojeg slušatelj voli i koji se održavaju unutar radijusa koji je slušatelj odabrao. Od dva koncerta istog izvođača bliži je ispred. Koncert izvan radijusa ili bez otvorenih prijava ne preporučuje se. |
| F-019 | Novi korisnik bez povijesti polazi od žanrova i izvođača odabranih pri registraciji te od popularnosti. | Visok | Odobreni zadatak | Korisnik bez ocjena i praćenja dobiva preporuke izvedene iz žanrova i izvođača odabranih pri registraciji te iz popularnosti, a ne prazan popis. |
| F-020 | Preporuke se računaju unaprijed, jednom na sat, i spremaju s razlogom, a novi izračun zamjenjuje stare. | Visok | Odobreni zadatak | Nakon svakog satnog izračuna svaki korisnik ima spremljen popis preporuka, a uz svaku je prikazan razlog (npr. „jer voliš izvođača X“). Novi izračun zamjenjuje prethodne preporuke korisnika, pa broj spremljenih preporuka po korisniku ne raste s vremenom. |
| F-021 | Verificirani izvođač predlaže koncert (mjesto, datum i vrijeme, izvođači, broj mjesta), a broj mjesta ne smije prelaziti kapacitet mjesta. | Visok | Odobreni zadatak | Verificirani izvođač može predložiti koncert odabirom mjesta iz kataloga te unosom datuma i vremena, izvođača koji nastupaju i broja mjesta.<br>- prijedlog dobiva stanje „predložen“<br>- broj mjesta veći od kapaciteta ili mjesto bez unesenog kapaciteta: prijedlog se odbija uz objašnjenje<br>- korisnik bez uloge izvođača ne može predložiti koncert |
| F-022 | Upravitelj mjesta prihvaća ili odbija prijedlog koncerta (odbijanje traži razlog), a neobrađen prijedlog istječe. | Visok | Odobreni zadatak | Upravitelj mjesta na prijedlogu za svoje mjesto može odabrati prihvaćanje ili odbijanje.<br>- prihvaćanje: koncert postaje potvrđen i dobiva otvorene prijave<br>- odbijanje: uz obavezan razlog (stanje „odbijen“)<br>- prijedlog neobrađen u zadanom roku prelazi u stanje „istekao“<br>- upravitelj ne može obraditi prijedlog za tuđe mjesto |
| F-023 | Potvrđeni koncert mogu otkazati izvođač ili upravitelj mjesta. | Visok | Odobreni zadatak | Izvođač koji je predložio koncert ili upravitelj njegova mjesta može otkazati potvrđeni koncert, koji tada prelazi u stanje „otkazan“ i više ne prima prijave. Koncert koji nije potvrđen ne može se otkazati. |
| F-024 | Slušatelj se prijavljuje na koncert u stanju otvorenih prijava, a sustav dopušta prijavu samo dok ima slobodnih mjesta. Svaka prijava dobiva QR kod (ulaznicu). | Visok | Odobreni zadatak | Slušatelj na koncertu u stanju otvorenih prijava odabire prijavu.<br>- nastaje prijava u stanju „prijavljen“ s QR kodom, a broj slobodnih mjesta smanjuje se za jedan<br>- nema slobodnih mjesta ili koncert nije u stanju otvorenih prijava: prijava se odbija uz poruku i ništa se ne sprema<br>- isti slušatelj ne može imati dvije aktivne prijave na isti koncert |
| F-025 | Slušatelj može otkazati prijavu najkasnije sat vremena prije početka koncerta. | Visok | Odobreni zadatak | Slušatelj može otkazati prijavu najkasnije sat vremena prije početka koncerta: prijava prelazi u stanje „otkazan“ i slobodno se mjesto vraća. Nakon tog roka otkazivanje se odbija uz poruku. |
| F-026 | Upravitelj mjesta skenira QR ulaznicu pri ulasku i prijava prelazi u „došao“, a neskenirane prijave nakon koncerta postaju „nije došao“. | Visok | Odobreni zadatak | Upravitelj mjesta skeniranjem valjane QR ulaznice za koncert na svom mjestu prebacuje prijavu u stanje „došao“. Nevaljan, već iskorišten ili QR kod za drugi koncert odbija se uz poruku. Prijave koje do kraja koncerta nisu skenirane prelaze u stanje „nije došao“. |
| F-027 | Prijavljeni koncert dodaje se u kalendar slušatelja (datoteka .ics, po želji i Google Kalendar). | Srednji | Odobreni zadatak | Nakon prijave slušatelj može preuzeti datoteku .ics s podacima o koncertu (naziv, mjesto, datum i vrijeme) koju kalendar uspješno uveze. Po želji se događaj dodaje u Google Kalendar. |
| F-028 | Skeniranje QR ulaznice obavlja se kamerom mobilnog uređaja. | Srednji | Odobreni zadatak | Upravitelj mjesta na mobilnom uređaju kamerom skenira QR kod s ulaznice slušatelja, a aplikacija ga prepoznaje bez ručnog upisa. |
| F-029 | Korisnik može prijaviti neprimjeren sadržaj, primjerice recenziju ili profil. Prijava prolazi stanja: prijavljeno, u obradi, uklonjeno ili odbačeno. | Visok | Odobreni zadatak | Korisnik uz recenziju ili profil može odabrati prijavu neprimjerenog sadržaja; prijava se sprema u stanju „prijavljeno“ i postaje vidljiva moderatoru. Prijava prelazi u stanje „u obradi“ kad je moderator preuzme, a završava kao „uklonjeno“ ili „odbačeno“. |
| F-030 | Moderator obrađuje prijave i pri odluci navodi razlog. | Visok | Odobreni zadatak | Moderator vidi popis prijava i za svaku donosi odluku uklanjanja ili odbacivanja uz obavezan razlog. Bez razloga se odluka ne sprema. Uklonjen sadržaj više nije vidljiv ostalim korisnicima. |
| F-031 | Kada korisniku bude uklonjen zadani broj sadržaja (zadano tri), sustav mu privremeno suspendira račun. | Visok | Odobreni zadatak | Nakon što moderator ukloni treći sadržaj istog korisnika (zadani broj), račun korisnika je suspendiran i prijava se odbija do isteka zadanog trajanja suspenzije. Nakon uklanjanja dva sadržaja račun ostaje aktivan, a nakon isteka suspenzije korisnik se ponovno može prijaviti. |
| F-032 | Sve radnje moderatora bilježe se u zapisnik. | Visok | Odobreni zadatak | Za svaku moderatorsku odluku (uklanjanje ili odbacivanje sadržaja, potvrda ili odbijanje zahtjeva za ulogu) u zapisniku postoji zapis s moderatorom, radnjom, ciljem i vremenom. Zapisi se kroz aplikaciju ne mogu mijenjati ni brisati. |
| F-033 | Korisnik može zatražiti ulogu izvođača ili upravitelja mjesta, navodi službenu stranicu ili profil i dobiva jedinstveni kod koji mora objaviti na njoj. | Visok | Odobreni zadatak | Korisnik u zahtjevu za ulogu odabire izvođača ili mjesto iz kataloga (ili traži njegovo dodavanje) i navodi poveznicu na službenu stranicu ili profil.<br>- sustav izdaje jedinstveni kod koji korisnik treba objaviti na toj stranici<br>- zahtjev je u stanju „zahtjev“<br>- dva zahtjeva nikada ne dobiju isti kod |
| F-034 | Moderator provjerava kod i pripadnost stranice te zahtjev za ulogu potvrđuje, odbija uz razlog ili vraća na dopunu. | Visok | Odobreni zadatak | Moderator otvara zahtjev i provjerava je li kod vidljiv na navedenoj stranici i pripada li stranica izvođaču odnosno mjestu.<br>- potvrda: korisnik dobiva ulogu<br>- odbijanje: uz razlog<br>- dopuna: stanje „potrebna dopuna“, a nakon dopune zahtjev se vraća u stanje „provjera“<br>- korisnik bez dodijeljene uloge ne može koristiti funkcije izvođača ili upravitelja |
| F-035 | Kada izvođač kojeg slušatelj prati objavi potvrđeni koncert na mjestu unutar radijusa koji je slušatelj odabrao, sustav ga obavještava i šalje poveznicu na koncert. | Visok | Odobreni zadatak | Kada izvođač kojeg slušatelj prati objavi potvrđeni koncert na mjestu unutar radijusa slušatelja, slušatelj dobiva obavijest s poveznicom na koncert. Slušatelj koji izvođača ne prati ili je izvan radijusa ne dobiva obavijest. |
| F-036 | Slušatelj dan prije koncerta za koji se prijavio dobiva podsjetnik, a u slučaju otkazivanja koncerta obavještavaju se svi prijavljeni slušatelji. | Visok | Odobreni zadatak | Dan prije koncerta slušatelj s aktivnom prijavom dobiva podsjetnik. Ako se koncert otkaže, svi slušatelji s aktivnom prijavom dobivaju obavijest o otkazivanju. |
| F-037 | Korisnici se obavještavaju o ishodu svojih zahtjeva za ulogu te o odlukama o sadržaju koji su objavili ili prijavili. | Visok | Odobreni zadatak | Korisnik dobiva obavijest kad moderator odluči o njegovu zahtjevu za ulogu te kad odluči o sadržaju koji je objavio ili prijavio. Obavijest sadrži ishod i razlog odluke. |
| F-038 | Obavijesti se šalju e-poštom i prikazuju unutar aplikacije, prema izboru korisnika. | Visok | Odobreni zadatak | Obavijest se isporučuje kanalima koje je korisnik odabrao: e-poštom, unutar aplikacije ili oboje. Korisnik koji je odabrao samo obavijesti unutar aplikacije ne prima e-poštu. |
| F-039 | Izvođač vidi statistiku svojih koncerata (prijave, dolasci, nedolasci), ocjene izdanja i zbirni broj pratitelja u blizini mjesta, bez lokacije pojedinih slušatelja. | Visok | Odobreni zadatak; povratna informacija asistenta | Izvođač za svaki svoj koncert vidi broj prijava, dolazaka i nedolazaka, prosječne ocjene svojih pjesama i albuma te broj pratitelja u blizini pojedinih mjesta.<br>- pratitelji se prikazuju samo zbirno: vrijednost ispod praga (npr. deset) ne prikazuje se<br>- lokacija pojedinog slušatelja ne prikazuje se nikada<br>- izvođač ne vidi statistiku tuđih koncerata |
| F-040 | Izvođač može izvesti podatke statistike u CSV formatu. | Srednji | Odobreni zadatak | Izvođač može preuzeti statistiku kao CSV datoteku koja se otvara u uređivaču tablica i sadrži iste podatke kao prikaz, bez lokacije pojedinih slušatelja. |
| F-041 | Upravitelj mjesta vidi broj prijava, dolazaka i nedolazaka za koncerte na svom mjestu. | Srednji | Odobreni zadatak | Upravitelj mjesta za koncerte na svom mjestu vidi broj prijava, dolazaka i nedolazaka, a za koncerte na drugim mjestima ne vidi ništa. |
| F-042 | Administrator vidi statistiku sustava: broj korisnika po ulogama, broj koncerata po stanjima i odaziv (omjer dolazaka i prijava). | Visok | Povratna informacija asistenta | Administrator vidi broj korisnika po ulogama, broj koncerata po stanjima i odaziv izračunat kao omjer dolazaka i prijava. Na ispitnim podacima prikazane brojke odgovaraju brojevima u bazi. |
| F-043 | Administrator upravlja korisnicima i ulogama, uključujući oduzimanje uloge izvođača ili upravitelja mjesta u slučaju zlouporabe. | Visok | Odobreni zadatak | Administrator vidi popis korisnika, može promijeniti ulogu korisnika i oduzeti ulogu izvođača ili upravitelja mjesta, nakon čega korisnik više nema pripadne ovlasti. Korisnik bez uloge administratora te radnje ne može izvršiti. |
| F-044 | Administrator podešava pravilo suspenzije: broj uklonjenih sadržaja do suspenzije i trajanje suspenzije. | Srednji | Odobreni zadatak | Administrator može promijeniti broj uklonjenih sadržaja do suspenzije i trajanje suspenzije, a nova vrijednost vrijedi za sljedeće suspenzije bez ponovnog pokretanja aplikacije. |
| F-045 | U slučaju zlouporabe administrator može deaktivirati korisnički račun. | Visok | Odobreni zadatak | Administrator može deaktivirati račun korisnika, nakon čega se korisnik ne može prijaviti. |
| F-046 | Slušatelj može preuzeti sve svoje podatke. | Visok | Odobreni zadatak | Slušatelj može zatražiti i preuzeti datoteku sa svim svojim podacima (profil, ocjene, recenzije, liste, prijave na koncerte) u strojno čitljivom obliku (npr. JSON). |
| F-047 | Slušatelj može zatražiti brisanje korisničkog računa, pri čemu se njegove recenzije i evidencija prijava na koncerte anonimiziraju, a zapisnik moderatorskih radnji ostaje sačuvan. | Visok | Odobreni zadatak | Nakon potvrde brisanja korisnik se ne može prijaviti starim računom, u bazi više nema njegove e-pošte, imena, opisa ni lokacije, a njegove recenzije i prijave na koncerte ostaju bez veze na osobu. Zapisnik moderatorskih radnji ostaje nepromijenjen. |

---

## 2.2 Nefunkcijski zahtjevi

| ID | Opis | Prioritet | Izvor | Način provjere |
| --- | --- | --- | --- | --- |
| NF-01 | Lokacija slušatelja osjetljiv je osobni podatak. Izvođačima i upraviteljima mjesta prikazuje se isključivo u zbirnom obliku i nikada na razini pojedinog slušatelja. Vrijednosti ispod propisanog minimuma (npr. deset slušatelja) ne prikazuju se. | Visok | Odobreni zadatak | Nijedan odgovor sučelja namijenjen izvođaču ili upravitelju ne sadrži lokaciju pojedinog slušatelja. Test s manje od deset pratitelja ne vraća broj. |
| NF-02 | Pristup funkcionalnostima ovisi o ulozi korisnika. Neregistrirani korisnik ima samo pregled karte i popularnih izvođača, a sve ostalo traži prijavu. | Visok | Odobreni zadatak | Svaka zaštićena ruta provjerava ulogu. Test: neprijavljeni korisnik i korisnik s neodgovarajućom ulogom dobivaju odbijenicu. |
| NF-03 | Autorizacija unutar aplikacije provodi se protokolom OAuth 2.0 koristeći tokene. | Visok | Odobreni zadatak | Zaštićene rute odbijaju zahtjeve bez valjanog tokena. |
| NF-04 | Aplikacija ostaje upotrebljiva kada je neki vanjski servis nedostupan. Ne mogu se samo dodavati novi izvođači. | Visok | Odobreni zadatak | Uz isključen pristup MusicBrainzu i Last.fmu sve funkcionalnosti osim dodavanja izvođača rade nad postojećim katalogom. |
| NF-05 | Prikaz stranica i preporuka ne ovisi o trajanju dohvata podataka ni izračuna preporuka. Preporuke se računaju unaprijed. | Visok | Odobreni zadatak | Prikaz preporuka čita gotove zapise iz baze i ne pokreće izračun ni poziv vanjskog servisa. |
| NF-06 | Pozivi prema vanjskim servisima odvijaju se u pozadini uz ograničenje broja zahtjeva i poštujući uvjete korištenja MusicBrainza i Last.fma (MusicBrainz dopušta otprilike jedan zahtjev u sekundi). | Visok | Odobreni zadatak; uvjeti korištenja servisa | Pozadinski posao ne šalje više zahtjeva nego što dopuštaju uvjeti korištenja. Pozivi ne usporavaju prikaz stranica. |
| NF-07 | Prijava na koncert ne smije premašiti kapacitet pri istodobnim prijavama. | Visok | Odobreni zadatak | Test: više istodobnih prijava na koncert s jednim slobodnim mjestom uspijeva samo jedna. |
| NF-08 | Feed, obavijesti i broj slobodnih mjesta na koncertu osvježavaju se u stvarnom vremenu, bez ručnog osvježavanja stranice. | Visok | Povratna informacija asistenta; dogovor tima (vrijednost) | Promjena je vidljiva korisniku u roku od nekoliko sekundi (npr. 10 s) bez ponovnog učitavanja stranice. Dopušteno je ostvarenje periodičnim dohvaćanjem. |
| NF-09 | Aplikacija je web aplikacija prilagođena (responzivna) mobilnim uređajima, što uključuje skeniranje QR ulaznica pri ulazu na koncert. | Visok | Povratna informacija asistenta | Prijava, pregled kataloga, prijava na koncert i skeniranje QR-a mogu se obaviti na zaslonu mobitela (širina oko 360 do 400 px) bez vodoravnog pomicanja stranice. |

---

## 2.3 Dionici i akteri

| ID uloge ili aktera | Odnos prema sustavu | Relevantni zahtjevi |
| --- | --- | --- |
| A-01 Neregistrirani korisnik | Pregledava javnu kartu mjesta održavanja i koncerata te popularne izvođače. Za sve ostalo mora se prijaviti. | F-001, F-002 |
| A-02 Slušatelj | Središnji korisnik: uređuje profil, ocjenjuje, recenzira, prati, prijavljuje se na koncerte i prima preporuke. Uključuje svakog prijavljenog korisnika (zahtjevi označeni općenito kao korisnik). | F-003 – F-004, F-008, F-009, F-011 – F-013, F-015 – F-018, F-024, F-025, F-027, F-029, F-033, F-035 – F-038, F-046, F-047 |
| A-03 Verificirani izvođač | Uz mogućnosti slušatelja predlaže koncerte, službeno odgovara na recenzije i vidi statistiku. Ulogu dobiva nakon provjere moderatora. | F-005, F-014, F-021, F-023, F-039, F-040 |
| A-04 Verificirani upravitelj mjesta | Zastupa jedno mjesto, unosi kapacitet, obrađuje prijedloge koncerata i skenira QR ulaznice. Ulogu dobiva nakon provjere moderatora. | F-006, F-022, F-023, F-026, F-028, F-041 |
| A-05 Moderator | Obrađuje prijave neprimjerenog sadržaja i zahtjeve za verifikaciju uloga; radnje se bilježe u zapisnik. | F-030, F-034 |
| A-06 Administrator | Upravlja korisnicima i ulogama, podešava pravilo suspenzije i pregledava statistiku sustava. | F-042 – F-045 |
| A-07 Google (vanjski pružatelj identiteta) | Sekundarni akter: provodi autentikaciju u obrascu prijave (OpenID Connect / OAuth 2.0). | F-002 |
| A-08 MusicBrainz i Last.fm (vanjski izvori podataka) | Sekundarni akteri: iz njih se u pozadini popunjava katalog (uvoz i dohvat na zahtjev). | F-007, F-009 |

---

## 2.4 Ograničenja i pretpostavke

| ID | Tip | Opis ograničenja ili pretpostavke | Izvor | Inženjerska posljedica / Provjera |
| --- | --- | --- | --- | --- |
| C-01 | Ograničenje | Prijava korisnika provodi se putem vanjskog pružatelja identiteta (Google) uz OpenID Connect / OAuth 2.0. | Odobreni zadatak | Prijavu i autorizaciju projektirati oko Googlea. Provjeriti autorizirane i neautorizirane zahtjeve. |
| C-02 | Ograničenje | Katalog se puni iz MusicBrainza i Last.fma uz ograničenje broja zahtjeva i poštivanje uvjeta korištenja (MusicBrainz dopušta otprilike jedan zahtjev u sekundi). | Odobreni zadatak; uvjeti korištenja servisa | Dohvat u pozadini uz ograničenje brzine i ponovne pokušaje, aplikacija čita samo iz vlastite baze. |
| C-03 | Ograničenje | Aplikacija je web aplikacija postavljena na javno dostupan poslužitelj. | Upute projekta | Deploy od prve inačice. Provjeriti dostupnost javnog URL-a i prijavu. |
| C-04 | Ograničenje | Sustav je objektno orijentirano oblikovan i implementiran. | Upute projekta | Dijagram razreda odgovara kodu. Za preporuke koristiti zamjenjivu strategiju (sučelje s više implementacija). |
| C-05 | Ograničenje | Implementirane funkcionalnosti moraju biti ispitane. | Upute projekta | Jedinični i integracijski testovi za ključne obrasce uporabe, rezultati u dokumentaciji. |
| C-06 | Ograničenje | Dokumentacija se kontinuirano usklađuje s razvijenim rješenjem u direktoriju /docs, a PDF inačice predaja nalaze se u /docs/deliverables. | Upute projekta | Svaka promjena ponašanja ide u istom pull requestu kao i promjena dokumenata. |
| C-07 | Ograničenje | Katalog dolazi iz stvarnih izvora, a podaci koji nastaju tek korištenjem aplikacije (korisnici, praćenja, ocjene, koncerti, prijave, kapaciteti mjesta) generiraju se inicijalnom skriptom za razvoj i demonstraciju. | Odobreni zadatak | Skripta se može ponovno pokrenuti na praznoj bazi i daje dovoljno podataka za demonstraciju svih obrazaca uporabe. |
| AS-01 | Pretpostavka | Mjesta održavanja iz MusicBrainza za odabrane gradove imaju uporabive koordinate. | Procjena tima | Prije uvoza provjeriti na uzorku. Mjesta bez koordinata izostaviti iz uvoza. |
| AS-02 | Pretpostavka | Last.fm vraća oznake i popularnost za većinu uvezenih izvođača. | Procjena tima | Provjeriti na uzorku. Izvođač bez oznaka oslanja se na popularnost u preporukama. |
| AS-03 | Pretpostavka | Broj korisnika tijekom razvoja i demonstracije je malen (stotine), pa satni izračun preporuka i jedna baza podataka dovoljno brzo rade. | Procjena tima | Izmjeriti trajanje izračuna preporuka na podacima iz inicijalne skripte. |

---

## 2.5 Značajne promjene zahtjeva

| Datum | ID zahtjeva | Promjena i razlog | Dogovoreno s / dokaz |
| --- | --- | --- | --- |
| 14.10.2026. | F-014, F-021 – F-028, F-039, F-042, NF-08, NF-09 | Prijedlog teme dorađen prema povratnoj informaciji asistenta: dodan središnji proces u domeni (koncerti i prijave na koncert sa stanjima), razrađena uloga izvođača (službeni odgovor, statistika ocjena), preporuke ostaju jednostavne, dodani statistika administratora, rad u stvarnom vremenu i prilagodba mobilnim uređajima. | Asistent (e-pošta), 14.10.2026. |

---

## 2.6 Sljedivost zahtjeva

| ID zahtjeva | Obrazac uporabe / modul | Arhitekturna realizacija | Ispitivanje ili provjera |
| --- | --- | --- | --- |
| F-001 | UC-001 Javni pregled i prijava putem Googlea | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-002 | UC-001 Javni pregled i prijava putem Googlea | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-003 | UC-002 Upravljanje profilom i računom | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-004 | UC-002 Upravljanje profilom i računom | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-005 | UC-002 Upravljanje profilom i računom | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-006 | UC-002 Upravljanje profilom i računom | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-007 | UC-003 Pretraga kataloga i zahtjev za dodavanje izvođača | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-008 | UC-003 Pretraga kataloga i zahtjev za dodavanje izvođača | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-009 | UC-003 Pretraga kataloga i zahtjev za dodavanje izvođača | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-010 | UC-003 Pretraga kataloga i zahtjev za dodavanje izvođača | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-011 | UC-005 Praćenje, feed, preporuke i obavijesti | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-012 | UC-004 Ocjenjivanje, recenziranje i liste | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-013 | UC-004 Ocjenjivanje, recenziranje i liste | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-014 | UC-004 Ocjenjivanje, recenziranje i liste | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-015 | UC-004 Ocjenjivanje, recenziranje i liste | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-016 | UC-005 Praćenje, feed, preporuke i obavijesti | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-017 | UC-005 Praćenje, feed, preporuke i obavijesti | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-018 | UC-005 Praćenje, feed, preporuke i obavijesti | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-019 | UC-005 Praćenje, feed, preporuke i obavijesti | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-020 | UC-005 Praćenje, feed, preporuke i obavijesti | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-021 | UC-006 Predlaganje koncerta | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-022 | UC-007 Obrada prijedloga koncerta | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-023 | UC-007 Obrada prijedloga koncerta | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-024 | UC-008 Prijava na koncert i otkazivanje prijave | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-025 | UC-008 Prijava na koncert i otkazivanje prijave | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-026 | UC-009 Skeniranje QR ulaznice | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-027 | UC-008 Prijava na koncert i otkazivanje prijave | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-028 | UC-009 Skeniranje QR ulaznice | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-029 | UC-010 Prijava sadržaja i moderacija | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-030 | UC-010 Prijava sadržaja i moderacija | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-031 | UC-010 Prijava sadržaja i moderacija | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-032 | UC-010 Prijava sadržaja i moderacija; UC-011 Zahtjev za ulogu i verifikacija | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-033 | UC-011 Zahtjev za ulogu i verifikacija | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-034 | UC-011 Zahtjev za ulogu i verifikacija | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-035 | UC-005 Praćenje, feed, preporuke i obavijesti | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-036 | UC-005 Praćenje, feed, preporuke i obavijesti | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-037 | UC-005 Praćenje, feed, preporuke i obavijesti | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-038 | UC-005 Praćenje, feed, preporuke i obavijesti | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-039 | UC-012 Statistika izvođača i upravitelja mjesta | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-040 | UC-012 Statistika izvođača i upravitelja mjesta | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-041 | UC-012 Statistika izvođača i upravitelja mjesta | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-042 | UC-013 Administracija | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-043 | UC-013 Administracija | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-044 | UC-013 Administracija | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-045 | UC-013 Administracija | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-046 | UC-002 Upravljanje profilom i računom | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| F-047 | UC-002 Upravljanje profilom i računom | na čekanju: arhitektura se oblikuje u 5. tjednu | na čekanju: ispitni slučajevi se pišu uz implementaciju |
| NF-01 | cijeli sustav | na čekanju | na čekanju |
| NF-02 | cijeli sustav | na čekanju | na čekanju |
| NF-03 | cijeli sustav | na čekanju | na čekanju |
| NF-04 | cijeli sustav | na čekanju | na čekanju |
| NF-05 | cijeli sustav | na čekanju | na čekanju |
| NF-06 | cijeli sustav | na čekanju | na čekanju |
| NF-07 | cijeli sustav | na čekanju | na čekanju |
| NF-08 | cijeli sustav | na čekanju | na čekanju |
| NF-09 | cijeli sustav | na čekanju | na čekanju |

---

## 2.7 Pregled zahtjeva

| Kontrolna točka | Povratna informacija ili nalaz | Odluka o zahtjevu ili opsegu |
| --- | --- | --- |
| Iteracija 1 | Još nije održano | Nema odluka za upis |
| Demo 2 | Još nije održano | Nema odluka za upis |
| Završni pregled | Još nije održano | Nema odluka za upis |
