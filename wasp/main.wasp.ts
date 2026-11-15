import { app, page, query, route } from "@wasp.sh/spec";
import { App } from "./src/App" with { type: "ref" };
import { LoginPage } from "./src/auth/email/LoginPage" with { type: "ref" };
import { MapPage } from "./src/pages/MapPage" with { type: "ref" };
import {
  pregledBaze,
  seedKatalog,
  seedSve,
} from "./src/seed/index" with { type: "ref" };
import { landingSpec } from "./src/landing/landing.wasp";
import { LandingPage } from "./src/pages/LandingPage" with { type: "ref" };
import { ConcertDetailPage } from "./src/pages/ConcertDetailPage" with { type: "ref" };
import {
  getConfig,
  userSignupFields,
} from "./src/auth/google" with { type: "ref" };
import { ArtistPage } from "./src/pages/ArtistPage" with { type: "ref" };
import { dohvatiIzvodjaca } from "./src/operations/izvodjacQueries" with { type: "ref" };
import { dohvatiKoncert } from "./src/operations/koncertQueries" with { type: "ref" };

export default app({
  name: "sonar",
  wasp: { version: "^0.26.0" },
  title: "sonar",
  head: ["<link rel='icon' href='/favicon.ico' />"],
  auth: {
    userEntity: "Korisnik",
    methods: {
      google: {
        configFn: getConfig,
        userSignupFields,
      },
    },
    onAuthSucceededRedirectTo: "/",
    onAuthFailedRedirectTo: "/login",
  },
  db: {
    seeds: [pregledBaze, seedKatalog, seedSve],
  },
  client: {
    rootComponent: App,
  },
  spec: [
    query(dohvatiIzvodjaca, {
      entities: ["Izvodjac", "Album", "Pjesma"],
    }),
    query(dohvatiKoncert, {
      entities: ["Koncert", "MjestoKoncerta", "Izvodjac", "PrijavaNaKoncert"],
      auth: false, //koncerte vidi i neprijavljen korisnik
    }),
    route("ConcertDetailRoute", "/concerts/:id", page(ConcertDetailPage)),
    route("HomeRoute", "/", page(LandingPage)),
    route("LoginRoute", "/login", page(LoginPage)),
    route("MapRoute", "/map", page(MapPage)),
    route("ArtistRoute", "/artists/:id", page(ArtistPage)),
    landingSpec,
  ],
});
