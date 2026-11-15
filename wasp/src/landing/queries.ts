import {
  type DohvatiMjesta,
  type DohvatiPopularneIzvodjace,
} from "wasp/server/operations";
import type { PopularArtist, VenueSummary } from "./types";

// Oznake koje nisu žanr (nacionalnosti i sl.); preskačemo ih pri odabiru žanra
const NIJE_ZANR = new Set([
  "croatian",
  "croatia",
  "hrvatska",
  "zagreb",
  "american",
  "british",
  "irish",
  "canadian",
  "australian",
  "female vocalists",
  "seen live",
  "all",
]);

export const dohvatiPopularneIzvodjace: DohvatiPopularneIzvodjace<
  void,
  PopularArtist[]
> = async (_args, context) => {
  const izv = await context.entities.Izvodjac.findMany({
    orderBy: [{ popularnost: "desc" }, { mbid: "asc" }],
    take: 6,
    include: {
      oznake: { orderBy: { tezina: "desc" }, take: 8, include: { oznaka: true } },
    },
  });
  return izv.map((i) => ({
    id: i.mbid,
    name: i.nazIzvodjaca,
    genre: i.oznake.find((o) => !NIJE_ZANR.has(o.oznaka.nazOznaka))?.oznaka.nazOznaka ?? "",
  }));
};

export const dohvatiMjesta: DohvatiMjesta<void, VenueSummary[]> = async (
  _args,
  context,
) => {
  const mj = await context.entities.MjestoKoncerta.findMany({include: { mjesto: true, _count: { select: { koncerti: { where: { stanje: "OTVORENE_PRIJAVE", datumVrijeme: { gte: new Date() } } } } } } });
  return mj
    .map((m) => ({
      id: m.sifMjestoKoncerta,
      name: m.nazMjestoKoncerta,
      city: m.mjesto.nazMjesto,
      upcoming: m._count.koncerti,
    }))
    .sort((a, b) => b.upcoming - a.upcoming || a.name.localeCompare(b.name))
    .slice(0, 8);
};
