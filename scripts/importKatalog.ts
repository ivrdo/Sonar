import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";

// ---------------------------------------------------------------------------
// KONSTANTE
// ---------------------------------------------------------------------------

const LIMIT_IZVODJACA = 20;
const LIMIT_ZAGREB = 20;

const POP_DNO = 0;
const POP_VRH = 1;

const MB = "https://musicbrainz.org/ws/2/";
const LFM = "https://ws.audioscrobbler.com/2.0/";
const ua = process.env.MB_USER_AGENT ?? "";
const key = process.env.LASTFM_API_KEY ?? "";

if (!ua || !key) {
    console.error("Nedostaje MB_USER_AGENT ili LASTFM_API_KEY u wasp/.env.server");
    process.exit(1);
}

const GRADOVI = [
    { nazMjesto: "Zagreb", koordinate: "45.8150,15.9819" },
    { nazMjesto: "Split", koordinate: "43.5081,16.4402" },
    { nazMjesto: "Pula", koordinate: "44.8683,13.8481"},
];
const DOZVOLJENI_TIPOVI = new Set(["Venue", "Club", "Indoor arena", "Stadium", "Festival stage", "Amphitheatre"]);
const DODATNO_UKLJUCI = new Set(["Zagrebački hipodrom"]);

// ---------------------------------------------------------------------------
// TIPOVI
// ---------------------------------------------------------------------------

type MjestoKoncerta = {
    mbid: string;
    naziv: string;
    adresa: string;
    koordinate: string;
    grad: string;
};

type Izvodjac = {
    mbid: string;
    naziv: string;
    slusatelji: number;
    popularnost: number;
    oznake: { naziv: string; tezina: number }[];
};

type KatalogIzvodjac = {
    mbid: string;
    naziv: string;
    popularnost: number;
    oznake: { naziv: string; tezina: number }[];
};

type Katalog = {
    gradovi: { nazMjesto: string; koordinate: string }[];
    mjestaKoncerta: MjestoKoncerta[];
    oznake: { naziv: string; tip: "zanr" | "raspolozenje" }[];
    izvodjaci: KatalogIzvodjac[];
};

// ---------------------------------------------------------------------------
// STANJE
// ---------------------------------------------------------------------------

const svaMjesta: MjestoKoncerta[] = [];
const izvodjaci = new Map<string, Izvodjac>();
let preskoceno = 0;

// ---------------------------------------------------------------------------
// POMOĆNE FUNKCIJE
// ---------------------------------------------------------------------------

const pauza = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function mb(path: string) {
    let res: Response | undefined;
    for (let attempt = 0; attempt < 4; attempt++) {
        await pauza(1100 * (2**attempt));
        res = await fetch(`${MB}${path}`, {
            headers:{ "User-Agent": ua, Accept: "application/json" },
        });
        if (res.status !== 503) break;
    }
    if (!res || !res.ok) throw new Error(`MusicBrainz ${res?.status} za ${path}`);
    return res.json();
}

async function lfm(params: Record<string, string>) {
    const qs = new URLSearchParams({ ...params, api_key: key, format: "json" });
    const res = await fetch(`${LFM}?${qs}`);
    await pauza(250);
    if (!res.ok) throw new Error(`Last.fm ${res.status}`);
    const data = await res.json();
    if (data.error) throw new Error(`Last.fm ${data.message}`);
    return data;
}

async function cached<T>(kljuc: string, poziv: () => Promise<T>): Promise<T> {
    let ime = kljuc.replace(/[^a-zA-Z0-9]/g, "_");
    let mapa = join(import.meta.dirname, "cache");
    await mkdir(mapa, { recursive: true });
    try {
        const file = await readFile(join(mapa, `${ime}.json`), 'utf8');
        return JSON.parse(file);
    } catch {
    }

    const rez = await poziv();
    await writeFile(join(mapa, `${ime}.json`), JSON.stringify(rez), 'utf8');
    return rez;
}

// ---------------------------------------------------------------------------
// FAZE
// ---------------------------------------------------------------------------

async function dohvatiMjesta(grad: string): Promise<{ ukupno: number; mjesta: MjestoKoncerta[] }> {
    const upit = `place?query=${encodeURIComponent(`area:${grad}`)}&limit=100&fmt=json`;
    const rez = await cached(`places_${grad}_0`, () => mb(upit));
    const ukupno = rez.count;
    let mjesta = rez.places ?? [];
    mjesta = mjesta.filter((element: any) => {
        return (element?.coordinates &&
            element?.coordinates?.latitude &&
            element?.coordinates?.longitude &&
            (DOZVOLJENI_TIPOVI.has(element.type) || DODATNO_UKLJUCI.has(element.name))
        );
    }).map((element: any) => ({
        mbid: element.id,
        naziv: element.name,
        adresa: element?.address || grad,
        koordinate: `${element?.coordinates.latitude},${element?.coordinates.longitude}`,
        grad: grad
    }));
    return { ukupno, mjesta };
}

function dodaj(niz: any[]) {
    for (const element of niz) {
        if (!element.mbid) {
            preskoceno++;
            continue;
        } else if (izvodjaci.has(element.mbid)) {
            continue;
        }
        izvodjaci.set(element.mbid, {
            mbid: element.mbid,
            naziv: element.name,
            slusatelji: Number(element.listeners),
            popularnost: 0,
            oznake: [],
        });
    }
}

async function dohvatiTopIzvodjace(): Promise<void> {
    let geoIzvodjaci = await cached(`geo-artists-${LIMIT_IZVODJACA}`, () => lfm({ method: "geo.gettopartists", country: "croatia", limit: String(LIMIT_IZVODJACA) }));
    let chartIzvodjaci = await cached(`chart-artists-${LIMIT_IZVODJACA}`, () => lfm({ method: "chart.gettopartists", limit: String(LIMIT_IZVODJACA) }));
    geoIzvodjaci = geoIzvodjaci.topartists.artist;
    chartIzvodjaci = chartIzvodjaci.artists.artist;
    dodaj(geoIzvodjaci);
    dodaj(chartIzvodjaci);
}

async function dohvatiOznake(): Promise<void> {
    let miss: string[] = [];
    for (const izv of izvodjaci.values()) {
        try {
            const tags = await cached(`lfm-tags-${izv.mbid}`, () => lfm({method: "artist.gettoptags", mbid: izv.mbid})) ?? [];
            const info = await cached(`lfm-info-${izv.mbid}`, () => lfm({method: "artist.getinfo", mbid: izv.mbid}));
            izv.slusatelji = Number(info.artist.stats.listeners);
            izv.oznake = tags.toptags.tag.map((element: any) => ({
                naziv: element.name.toLowerCase().trim(),
                tezina: Number(element.count) / 100,
            }));
        } catch (e) {
            console.log(e.message);
            miss.push(izv.naziv);
            izvodjaci.delete(izv.mbid);
        }
    }
    console.log("oznake: preskočeno", miss.length);
}

async function dohvatiZagrebackeIzvodjace(): Promise<void> {
    const upit = `artist?query=${encodeURIComponent(`area:Zagreb`)}&limit=100&fmt=json`;
    const rez = await cached(`artists_Zagreb_0`, () => mb(upit));
    let miss: string[] = [];
    let izv: { naziv: string; mbid: string; slusatelji: number }[] = [];
    for (const a of rez.artists ?? []) {
        try {
            const info = await cached(`lfm-info-${a.id}`, () => lfm({method: "artist.getinfo", mbid: a.id}));
            izv.push({ naziv: a.name, mbid: a.id, slusatelji: Number(info.artist.stats.listeners) });
        } catch (e) {
            miss.push(a.name);
        }
    }
    const najpopularniji = izv.sort((a, b) => b.slusatelji - a.slusatelji).slice(0, LIMIT_ZAGREB);
    let dodano = 0;
    for (const k of najpopularniji) {
        if (izvodjaci.has(k.mbid)) continue;
        izvodjaci.set(k.mbid, { ...k, popularnost: 0, oznake: [], });
        dodano++;
    }
    console.log(`Zagreb: ${miss.length} nepoznato Last.fmu, ${dodano} dodano u katalog`);
}

async function dohvatiSvaMjesta(): Promise<void> {
    for (const i of GRADOVI) {
        const { ukupno, mjesta } = await dohvatiMjesta(i.nazMjesto);
        svaMjesta.push(...mjesta);
        console.log(`${i.nazMjesto} | ${ukupno} | ${mjesta.length}`);
    }

    console.log(svaMjesta.length);
}

function normalizirajPopularnost(): void {
    const lista = [...izvodjaci.values()];

    for (const i of lista) {
        if (!Number.isFinite(i.slusatelji) || i.slusatelji <= 0) {
            throw new Error(`Neispravan broj slušatelja za ${i.naziv}: ${i.slusatelji}`);
        }
    }

    const sviSlusatelji = lista.map(i => i.slusatelji);
    const min = Math.min(...sviSlusatelji), max = Math.max(...sviSlusatelji);
    if (min === max) {
        throw new Error("Svi izvođači imaju isti broj slušatelja, normalizacija nije moguća");
    }

    const lnMin = Math.log(min), lnMax = Math.log(max);
    for (const i of lista) {
        const x = (Math.log(i.slusatelji) - lnMin) / (lnMax - lnMin);
        const p = POP_DNO + (POP_VRH - POP_DNO) * x;
        if (!Number.isFinite(p)) {
            throw new Error(`Popularnost nije broj za ${i.naziv}`);
        }
        i.popularnost = p;
    }
}

function provjere(): void {
    const greske: string[] = [];

    const vidjeni = new Set<string>();
    for (const m of svaMjesta) {
        if (vidjeni.has(m.mbid)) {
            greske.push(`Duplikat MBID-a mjesta: ${m.naziv} (${m.mbid})`);
        }
        vidjeni.add(m.mbid);
    }

    for (const i of izvodjaci.values()) {
        if (!Number.isFinite(i.popularnost) || i.popularnost < 0 || i.popularnost > 1) {
            greske.push(`Neispravna popularnost za ${i.naziv}: ${i.popularnost}`);
        }
        if (!Number.isFinite(i.slusatelji) || i.slusatelji <= 0) {
            greske.push(`Neispravni slusatelji za ${i.naziv}: ${i.slusatelji}`);
        }
        const duplikat = new Set<string>();
        for (const j of i.oznake) {
            if (duplikat.has(j.naziv)) {
                greske.push(`Duplikat naziva oznake: ${i.naziv} (${j.naziv})`);
            }
            duplikat.add(j.naziv);
            if (!Number.isFinite(j.tezina) || j.tezina < 0 || j.tezina > 1) {
                greske.push(`Neispravna težina za ${i.naziv} za oznaku ${j.naziv}: ${j.tezina}`);
            }
        }
    }

    if (greske.length > 0) {
        throw new Error("Provjere nisu prošle:\n" + greske.join("\n"));
    }
}

async function zapisiKatalog(): Promise<void> {
    const nazivi = new Set<string>();
    for (const izv of izvodjaci.values()) {
        for (const o of izv.oznake) {
            nazivi.add(o.naziv);
        }
    }
    const oznake = [...nazivi].sort().map(naziv => ({ naziv, tip: "zanr" as const }));

    const izv: KatalogIzvodjac[] = [...izvodjaci.values()]
        .map(el => ({
            mbid: el.mbid,
            naziv: el.naziv,
            popularnost: el.popularnost,
            oznake: el.oznake,
        }))
        .sort((a, b) => (a.mbid < b.mbid ? -1 : 1));

    const katalog: Katalog = {
        gradovi: GRADOVI,
        mjestaKoncerta: [...svaMjesta].sort((a, b) => (a.mbid < b.mbid ? -1 : 1)),
        oznake,
        izvodjaci: izv,
    };

    const putanja = join(import.meta.dirname, "..", "wasp", "src", "seed", "data", "katalog.ts");
    await mkdir(dirname(putanja), { recursive: true });
    const sadrzaj =
        "// GENERIRANO skriptom scripts/importKatalog.ts, ne uređivati ručno.\n" +
        `export const katalog = ${JSON.stringify(katalog, null, 2)};\n`;
    await writeFile(putanja, sadrzaj, "utf8");

    console.log(`katalog.json: ${katalog.gradovi.length} gradova, ${katalog.mjestaKoncerta.length} mjesta, ${katalog.oznake.length} oznaka, ${katalog.izvodjaci.length} izvođača`);
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------

async function main() {
    await dohvatiSvaMjesta();

    await dohvatiTopIzvodjace();
    console.log("izvođača u Mapi:", izvodjaci.size, "| bez MBID-a:", preskoceno);

    await dohvatiZagrebackeIzvodjace();
    await dohvatiOznake();
    normalizirajPopularnost();
    provjere();

    await zapisiKatalog();

    const poPop = [...izvodjaci.values()].sort((a, b) => b.popularnost - a.popularnost);
    console.log("najpopularniji:", poPop[0].naziv, poPop[0].popularnost.toFixed(3));
    console.log("najmanje popularan:", poPop[poPop.length - 1].naziv, poPop[poPop.length - 1].popularnost.toFixed(3));

    const sl = [...izvodjaci.values()].map(i => i.slusatelji);
    console.log("izvođača:", izvodjaci.size, "| min:", Math.min(...sl), "| max:", Math.max(...sl));
}

await main();