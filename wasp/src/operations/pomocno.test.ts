import { describe, expect, it } from "vitest";
import { izracunajStanjeButton } from "./pomocno";

const osnovno = {
  koncertStanje: "OTVORENE_PRIJAVE",
  datumVrijeme: new Date(Date.now() + 24 * 60 * 60 * 1000),
  slobodnaMjesta: 10,
  imaPrijavu: false,
};

describe("izracunajStanjeButton", () => {
  it("vraća APPLY kad se korisnik može prijaviti", () => {
    const rezultat = izracunajStanjeButton(osnovno);

    expect(rezultat).toBe("APPLY");
  });
  it("vraća POPUNJENO kad nema slobodnih mjesta", () => {
    const rezultat = izracunajStanjeButton({ ...osnovno, slobodnaMjesta: 0 });

    expect(rezultat).toBe("POPUNJENO");
  });
  it("vraća ZATVORENO kad koncert nije u stanju otvorenih prijava", () => {
    expect(izracunajStanjeButton({ ...osnovno, koncertStanje: "ODRZAN" })).toBe(
      "ZATVORENO",
    );
  });

  it("vraća ZATVORENO kad je koncert već počeo", () => {
    expect(
      izracunajStanjeButton({
        ...osnovno,
        datumVrijeme: new Date(Date.now() - 24 * 60 * 60 * 1000),
      }),
    ).toBe("ZATVORENO");
  });
  it("vraća PRIJAVLJEN kad je korisnik već prijavljen", () => {
    const rezultat = izracunajStanjeButton({ ...osnovno, imaPrijavu: true });

    expect(rezultat).toBe("PRIJAVLJEN");
  });
  // Testiranje redoslijeda
  it("vraća PRIJAVLJEN kad je korisnik prijavljen, a koncert je popunjen", () => {
    const rezultat = izracunajStanjeButton({
      ...osnovno,
      imaPrijavu: true,
      slobodnaMjesta: 0,
    });

    expect(rezultat).toBe("PRIJAVLJEN");
  });
  it("vraća ZATVORENO kad su prijave zatvorene, a ujedno nema ni mjesta", () => {
    const rezultat = izracunajStanjeButton({
      ...osnovno,
      koncertStanje: "ODRZAN",
      slobodnaMjesta: 0,
    });

    expect(rezultat).toBe("ZATVORENO");
  });
});
