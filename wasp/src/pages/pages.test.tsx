import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router";

// Landing sam traži podatke preko useQuery. Umjesto poslužitelja vraćamo gotove podatke.
vi.mock("wasp/client/operations", () => ({
  dohvatiNadolazeceKoncerte: "dohvatiNadolazeceKoncerte",
  dohvatiPopularneIzvodjace: "dohvatiPopularneIzvodjace",
  useQuery: (query: string) =>
    query === "dohvatiNadolazeceKoncerte"
      ? {
        data: [
          {
            id: 11,
            title: "Orbita + Kiša u Svibnju",
            startsAt: new Date("2026-11-20T20:00:00"),
            venue: "Dom kulture, Zagreb",
          },
        ],
        isLoading: false,
      }
      : { data: [{ id: "a", name: "Plavi sat", genre: "acoustic" }], isLoading: false },
}));

// Waspov Link zamijenimo običnim <a>
vi.mock("wasp/client/router", () => ({
  Link: ({ to, params, children, ...rest }: any) => (
    <a href={to.replace(":id", String(params?.id))} {...rest}>{children}</a>
),
}));

import { LandingPage } from "./LandingPage";
import { ConcertDetailPage } from "./ConcertDetailPage";
import { ArtistPage } from "./ArtistPage";

describe("LandingPage", () => {
  it("prikazuje koncert i popularnog izvođača iz querya", () => {
    const html = renderToStaticMarkup(
      <StaticRouter location="/">
        <LandingPage />
      </StaticRouter>,
    );

    expect(html).toContain("Orbita + Kiša u Svibnju");
    expect(html).toContain("Fri 20 Nov · 20:00 · Dom kulture, Zagreb");
    expect(html).toContain("Plavi sat");
  });
});

describe("ConcertDetailPage", () => {
  it("prikazuje naslov koncerta i gumb Apply", () => {
    const html = renderToStaticMarkup(
      <StaticRouter location="/concerts/5">
        <ConcertDetailPage />
      </StaticRouter>,
    );

    expect(html).toContain("Orbita + Kiša u Svibnju");
    expect(html).toContain("Apply");
  });
});

describe("ArtistPage", () => {
  it("prikazuje ime izvođača i diskografiju", () => {
    const html = renderToStaticMarkup(
      <StaticRouter location="/artists/abc">
        <ArtistPage />
      </StaticRouter>,
    );

    expect(html).toContain("Orbita");
    expect(html).toContain("Valovi");
  });
});