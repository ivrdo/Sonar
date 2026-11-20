import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ConcertCard } from "./ConcertCard";

// Waspov Link zamijenimo običnim <a>
vi.mock("wasp/client/router", () => ({
  Link: ({ to, params, children, ...rest }: any) => (
    <a href={to.replace(":id", String(params.id))} {...rest}>
{children}
</a>
),
}));

const podaci = {
  id: 7,
  title: "Orbita + Kiša u Svibnju",
  date: "Fri 20 Nov",
  time: "20:00",
  venue: "Dom kulture, Zagreb",
  image: "/slika.svg",
};

describe("ConcertCard", () => {
  it("prikazuje naslov, datum, vrijeme i mjesto", () => {
    const html = renderToStaticMarkup(<ConcertCard {...podaci} />);

    expect(html).toContain("Orbita + Kiša u Svibnju");
    expect(html).toContain("Fri 20 Nov · 20:00 · Dom kulture, Zagreb");
  });
  it("vodi na stranicu koncerta", () => {
    const html = renderToStaticMarkup(<ConcertCard {...podaci} />);

    expect(html).toContain('href="/concerts/7"');
  });
});