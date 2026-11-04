import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const LIMIT_IZVODJACA = 20;

const MB = "https://musicbrainz.org/ws/2/";
const LFM = "https://ws.audioscrobbler.com/2.0/";
const ua = process.env.MB_USER_AGENT ?? "";
const key = process.env.LASTFM_API_KEY ?? "";

if (!ua || !key) {
    console.error("Nedostaje MB_USER_AGENT ili LASTFM_API_KEY u wasp/.env.server");
    process.exit(1);
}

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
    if (!res.ok) throw new Error(`Last.fm ${res.status}`);
    const data = await res.json();
    if (data.error) throw new Error(`Last.fm ${data.message}`);
    await pauza(250);
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

type MjestoKoncerta = {
    mbid: string;
    naziv: string;
    adresa: string;
    koordinate: string;
    grad: string;
};

const svaMjesta: MjestoKoncerta[] = [];

const GRADOVI = [
    { nazMjesto: "Zagreb", koordinate: "45.8150,15.9819" },
    { nazMjesto: "Split", koordinate: "43.5081,16.4402" },
    { nazMjesto: "Pula", koordinate: "44.8683,13.8481"},
];
const DOZVOLJENI_TIPOVI = new Set(["Venue", "Club", "Indoor arena", "Stadium", "Festival stage", "Amphitheatre"]);
const DODATNO_UKLJUCI = new Set(["Zagrebački hipodrom"]);
const ISKLJUCI = new Set([]);

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

for (const i of GRADOVI) {
    const { ukupno, mjesta } = await dohvatiMjesta(i.nazMjesto);
    svaMjesta.push(...mjesta);
    console.log(`${i.nazMjesto} | ${ukupno} | ${mjesta.length}`);
}

if (new Set(svaMjesta.map(m => m.mbid)).size === svaMjesta.length) {
    console.log(svaMjesta.length);
} else console.log(-1);


type Izvodjac = {
    mbid: string;
    naziv: string;
    slusatelji: number;
    oznake: { naziv: string; tezina: number }[];
};

const izvodjaci = new Map<string, Izvodjac>();
let preskoceno = 0;

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
    console.log(miss, miss.length);
}

await dohvatiTopIzvodjace();
console.log("izvođača u Mapi:", izvodjaci.size, "| bez MBID-a:", preskoceno);

await dohvatiOznake();
const sl = [...izvodjaci.values()].map(i => i.slusatelji);
console.log("izvođača:", izvodjaci.size, "| min:", Math.min(...sl), "| max:", Math.max(...sl));
console.dir([...izvodjaci.values()].slice(0, 2), { depth: null });

const brojac = new Map<string, number>();
for (const izv of izvodjaci.values())
    for (const o of izv.oznake)
        brojac.set(o.naziv, (brojac.get(o.naziv) ?? 0) + 1);
console.log([...brojac.entries()].sort((a, b) => b[1] - a[1]).slice(0, 60));