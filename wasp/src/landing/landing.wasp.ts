import { type Spec, query } from "@wasp.sh/spec";
import {
  dohvatiMjesta,
  dohvatiPopularneIzvodjace,
} from "./queries" with { type: "ref" };

export const landingSpec: Spec = [
  query(dohvatiPopularneIzvodjace, {
    entities: ["Izvodjac", "Oznaka", "IzvodjacOznaka"],
  }),
  query(dohvatiMjesta, { entities: ["MjestoKoncerta", "Mjesto", "Koncert"] }),
];
