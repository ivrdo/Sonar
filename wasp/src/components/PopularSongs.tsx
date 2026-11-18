// KOMPONENTA PopularSongs (dizajn 3.3)
/*
    Popis najpopularnijih pjesama izvođača u bijeloj kartici. Svaki red ima redni
    broj, naslovnicu, naslov, "album · vrsta", ocjenu, trajanje (samo desktop),
    srce (like) i plus.

    Props:
    - songs: popis pjesama (id, title, album, type, cover, rating, duration, liked)

    Srce je u svakom redu zasebno (SongRow ima svoj useState), isto kao Like
    na kartici izvođača. Plus zasad nema funkciju.

    Koriste se Tailwind klase:
    - mb-3 text-lg font-bold text-tekst-prva: naslov dijela (desktop manji)
    - overflow-hidden rounded-xl border border-rubovi-1 bg-bijela: bijela kartica
    - divide-y divide-rubovi-1: tanka crta između redova
    - flex items-center gap-3: red u jednom retku
    - w-5 text-center text-sm text-tekst-treća: redni broj
    - h-11 w-11 rounded-lg object-cover: naslovnica (desktop manja)
    - min-w-0 flex-1 + truncate: naslov se skrati umjesto da razvuče red
    - hidden desktop:inline: trajanje se vidi samo na desktopu
    - h-8 w-8 rounded-lg hover:bg-akcent-blijedi: gumbi srce i plus
    - bg-current + mask: srce se oboji bojom teksta (text-akcent kad je lajkano)
*/

import { useState } from "react";

export type Song = {
    id: number;
    title: string;
    album: string;
    type: "Album" | "EP" | "Single" | "Live";
    cover: string;
    rating: number | null; // null ako pjesma još nema ocjena
    duration: string;
    liked: boolean;
};

type PopularSongsProps = {
    songs: Song[];
};

type SongRowProps = {
    number: number;
    song: Song;
};

// Jedan red popisa. Pamti je li pjesma lajkana.
function SongRow({ number, song }: SongRowProps) {
    const [isLiked, setIsLiked] = useState(song.liked);

    return (
        <li className="flex items-center gap-3 px-4 py-3 desktop:px-3 desktop:py-2">
            <span className="w-5 text-center text-sm text-tekst-treća desktop:text-[10px]">{number}</span>

            <img
                src={song.cover}
                alt=""
                className="h-11 w-11 rounded-lg object-cover desktop:h-8 desktop:w-8"
            />

            <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold text-tekst-prva desktop:text-[11px]">{song.title}</p>
                <p className="truncate text-[13px] text-tekst-druga desktop:text-[10px]">
                    {song.album} · {song.type}
                </p>
            </div>

            {/* Ocjena se prikazuje samo ako postoji (null = pjesma još nema ocjena) */}
            {song.rating !== null && (
                <span className="text-sm text-tekst-druga desktop:text-[10px]">★ {song.rating.toFixed(1)}</span>
            )}
            <span className="hidden text-sm text-tekst-druga desktop:inline desktop:text-[10px]">{song.duration}</span>

            <button
                type="button"
                onClick={() => setIsLiked(!isLiked)}
                aria-pressed={isLiked}
                aria-label={isLiked ? "Remove like" : "Like song"}
                className={
                    "flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-akcent-blijedi focus-visible:ring-2 focus-visible:ring-akcent focus-visible:outline-none " +
                    (isLiked ? "text-akcent" : "text-tekst-prva")
                }
            >
                <span
                    className="h-4 w-4 bg-current"
                    style={{
                        maskImage: `url(${isLiked ? "/dizajn/ikone/heartf.svg" : "/dizajn/ikone/heart.svg"})`,
                        WebkitMaskImage: `url(${isLiked ? "/dizajn/ikone/heartf.svg" : "/dizajn/ikone/heart.svg"})`,
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                    }}
                />
            </button>

            <button
                type="button"
                aria-label="Add song"
                className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-akcent-blijedi focus-visible:ring-2 focus-visible:ring-akcent focus-visible:outline-none"
            >
                <img src="/dizajn/ikone/plus.svg" alt="" className="h-4 w-4" />
            </button>
        </li>
    );
}

export function PopularSongs({ songs }: PopularSongsProps) {
    // Ako nema pjesama, cijeli dio se ne prikazuje
    if (songs.length === 0) {
        return null;
    }

    return (
        <section>
            <h2 className="mb-3 text-lg font-bold text-tekst-prva desktop:mb-2 desktop:text-xs">Popular songs</h2>

            <ul className="divide-y divide-rubovi-1 overflow-hidden rounded-xl border border-rubovi-1 bg-bijela">
                {songs.map((song, index) => (
                    <SongRow key={song.id} number={index + 1} song={song} />
                ))}
            </ul>
        </section>
    );
}

export default PopularSongs;