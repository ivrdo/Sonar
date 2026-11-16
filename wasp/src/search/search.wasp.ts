import { type Spec, page, query, route } from "@wasp.sh/spec";
import { pretrazi } from "./queries" with { type: "ref" };
import { SearchPage } from "../pages/SearchPage" with { type: "ref" };

export const searchSpec: Spec = [
  // Samo "/search": dio iza "?" (q=…) nije dio putanje, čita ga stranica
  route("SearchRoute", "/search", page(SearchPage)),
  query(pretrazi, {
    entities: ["Izvodjac", "Album", "Pjesma", "MjestoKoncerta"],
  }),
];
