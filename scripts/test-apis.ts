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
    const res = await fetch(`${MB}${path}`, {
       headers:{ "User-Agent": ua, Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`MusicBrainz ${res.status} za ${path}`);
    return res.json();
}

async function lfm(params: Record<string, string>) {
    const qs = new URLSearchParams({ ...params, api_key: key, format: "json" });
    const res = await fetch(`${LFM}?${qs}`);
    if (!res.ok) throw new Error(`Last.fm ${res.status}`);
    return res.json();
}

// 1) Izvođači iz Zagreba
const izv = await mb(`artist?query=${encodeURIComponent("area:Zagreb")}&limit=5&fmt=json`);
console.log("IZVOĐAČI:");
for (const a of izv.artists) console.log(" -", a.name, "|", a.id, "|", a.area?.name ?? "bez područja");
await pauza(1100);

// 2) Mjesta (klubovi/dvorane) u Zagrebu
const mj = await mb(`place?query=${encodeURIComponent("area:Zagreb AND type:venue")}&limit=50&fmt=json`);
console.log("MJESTA:");
for (const p of mj.places) {
    console.log(" -", p.name, "|", p.id, "|", p.address ?? "bez adrese", "|", JSON.stringify(p.coordinates ?? null));
}
await pauza(1100);

// 3) Last.fm oznake za prvog izvođača
const prvi = izv.artists[0];
const tags = await lfm({ method: "artist.gettoptags", mbid: prvi.id });
console.log("OZNAKE za", prvi.name, ":", (tags.toptags?.tag ?? []).slice(0, 5).map((t: any) => t.name).join(", "));

const info = await lfm({ method: "artist.getinfo", mbid: prvi.id });
console.log("POPULARNOST za", info.artist?.name ?? "no ime", ":", info.artist?.stats ?? "nema");