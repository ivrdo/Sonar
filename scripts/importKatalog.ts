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