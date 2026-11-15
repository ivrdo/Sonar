// KOMPONENTA: ArtistProfileCard

/*
    Kartica izvođača na vrhu stranice izvođača: okrugla slika, žanrovi i grad, ime,
    ocjena s brojem ocjena i pratitelja te gumbi Follow i Like.

    Klik na gumbe prebacuje njihovo stanje:
        - Follow postaje "✓ Following" (obrubljeni gumb), a ponovni klik ga vraća
        - Like postaje "Liked" s punim srcem, a ponovni klik ga vraća
        - broj pratitelja se pomakne za 1 kad korisnik počne ili prestane pratiti
    Promjena se zasad pamti samo lokalno u komponenti, pa nestaje pri osvježavanju
    stranice. Kad budu postojale akcije za praćenje i označavanje, pozivaju se u onClick.

    Props (podaci koje komponenta prima od roditelja):
        - image: putanja do slike (npr. "/dizajn/izvodjaci/orbita.svg")
        - name: ime izvođača (npr. "Orbita")
        - tags: popis žanrova i raspoloženja (npr. ["indie rock", "melancholic"])
        - city: grad (npr. "Zagreb"), ispisuje se iza oznaka
        - rating: prosječna ocjena (npr. 4.6)
        - ratingsCount: broj ocjena (npr. 128)
        - followers: broj pratitelja u trenutku učitavanja (npr. 2341),
        - following: POČETNO stanje, true ako korisnica već prati izvođača
        - liked: POČETNO stanje, true ako je izvođač već označen sa "svidja mi se"

    Koriste se Tailwind klase (boje su tokeni iz App.css):
        - rounded-xl border border-rubovi-1 bg-bijela p-4: bijela kartica sa zaobljenim rubom
        - flex items-center gap-4: slika lijevo, tekst desno
        - h-24 w-24 shrink-0 rounded-full object-cover: okrugla slika od 96px koja se ne stišće
        - min-w-0: nužan da dugi tekst ne razvuče karticu
        - text-[15px] text-tekst-druga: sivi redak žanrova i redak ocjene,
          desktop:text-[11px] manji na desktopu
        - text-[26px] leading-tight font-bold tracking-tight: ime izvođača,
          desktop:text-xl manje na desktopu
        - font-bold text-tekst-prva: broj pratitelja je podebljan
        - mt-3 flex gap-2: gumbi u redu ispod slike i teksta
        - h-10 rounded-lg px-4 text-[15px] font-semibold: gumbi, desktop:h-7 desktop:px-3
          desktop:text-[11px] manji na desktopu
        - bg-akcent text-bijela hover:bg-akcent-jaki: tirkizni gumb Follow
        - border border-akcent text-akcent hover:bg-akcent-blijedi: obrubljeni gumb
          (Like i Following)
        - bg-current [mask:url(...)...]: srce je ikona prikazana kao maska, pa preuzima
          tirkiznu boju teksta gumba (ikona učitana kao <img> bila bi crna).
          Prazno srce je heart.svg, a puno heartf.svg
        - focus-visible:ring-2 focus-visible:ring-akcent: okvir pri navigaciji tipkovnicom


*/

import { useState } from "react";

type ArtistProfileCardProps = {
    image: string;
    name: string;
    tags: string[];
    city: string;
    rating: number;
    ratingsCount: number;
    followers: number;
    following: boolean;
    liked: boolean;
};

export function ArtistProfileCard({
                                      image,
                                      name,
                                      tags,
                                      city,
                                      rating,
                                      ratingsCount,
                                      followers,
                                      following,
                                      liked,
                                  }: ArtistProfileCardProps) {
    // Stanja gumba. Početna vrijednost dolazi iz propsa, a klik je prebacuje
    const [isFollowing, setIsFollowing] = useState(following);
    const [isLiked, setIsLiked] = useState(liked);

    // Broj pratitelja se pomakne za 1 kad korisnica počne ili prestane pratiti
    const shownFollowers = followers + (isFollowing ? 1 : 0) - (following ? 1 : 0);

    return (
        <section className="rounded-xl border border-rubovi-1 bg-bijela p-4">
            <div className="flex items-center gap-4">
                {/* Slika izvođača */}
                <img src={image} alt="" className="h-24 w-24 shrink-0 rounded-full object-cover" />

                <div className="min-w-0">
                    {/* Žanrovi i grad, odvojeni točkicom */}
                    <p className="text-[15px] text-tekst-druga desktop:text-[11px]">
                        {[...tags, city].join(" · ")}
                    </p>

                    {/* Ime */}
                    <h2 className="text-[26px] leading-tight font-bold tracking-tight text-tekst-prva desktop:text-xl">
                        {name}
                    </h2>

                    {/* Ocjena, broj ocjena i pratitelja */}
                    <p className="text-[15px] text-tekst-druga desktop:text-[11px]">
                        {rating.toFixed(1)} ★ · {ratingsCount} ratings ·{" "}
                        <span className="font-bold text-tekst-prva">{shownFollowers.toLocaleString("en-US")}</span> followers
                    </p>
                </div>
            </div>

            <div className="mt-3 flex gap-2">
                {/* Follow / Following */}
                <button
                    type="button"
                    aria-pressed={isFollowing}
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`h-10 rounded-lg px-4 text-[15px] font-semibold transition focus-visible:ring-2 focus-visible:ring-akcent focus-visible:outline-none desktop:h-7 desktop:px-3 desktop:text-[11px] ${
                        isFollowing
                            ? "border border-akcent bg-bijela text-akcent hover:bg-akcent-blijedi"
                            : "bg-akcent text-bijela hover:bg-akcent-jaki"
                    }`}
                >
                    {isFollowing ? "✓ Following" : "Follow"}
                </button>

                {/* Like / Liked */}
                <button
                    type="button"
                    aria-pressed={isLiked}
                    onClick={() => setIsLiked(!isLiked)}
                    className="flex h-10 items-center gap-2 rounded-lg border border-akcent bg-bijela px-4 text-[15px] font-semibold text-akcent transition hover:bg-akcent-blijedi focus-visible:ring-2 focus-visible:ring-akcent focus-visible:outline-none desktop:h-7 desktop:px-3 desktop:text-[11px]"
                >
                    {/* Srce kao maska da preuzme boju teksta. Puno kad je označeno, inače prazno */}
                    <span
                        aria-hidden="true"
                        className={`h-4 w-4 bg-current desktop:h-3 desktop:w-3 ${
                            isLiked
                                ? "[mask:url(/dizajn/ikone/heartf.svg)_center/contain_no-repeat]"
                                : "[mask:url(/dizajn/ikone/heart.svg)_center/contain_no-repeat]"
                        }`}
                    />
                    {isLiked ? "Liked" : "Like"}
                </button>
            </div>
        </section>
    );
}

export default ArtistProfileCard;