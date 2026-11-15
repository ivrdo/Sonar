// Privremene slike iz public/dizajn dok nemamo prave slike izvođača i mjesta
const SLIKE_IZVODJACA = [
  "/dizajn/izvodjaci/betonski-vrt.svg",
  "/dizajn/izvodjaci/crveni-signal.svg",
  "/dizajn/izvodjaci/kisa-u-svibnju.svg",
  "/dizajn/izvodjaci/ljetna-smjena.svg",
  "/dizajn/izvodjaci/mali-mjesec.svg",
  "/dizajn/izvodjaci/mjeseceva-strana.svg",
  "/dizajn/izvodjaci/nocni-autobus.svg",
  "/dizajn/izvodjaci/orbita.svg",
  "/dizajn/izvodjaci/plavi-sat.svg",
  "/dizajn/izvodjaci/sidro.svg",
  "/dizajn/izvodjaci/tihi-kvadrat.svg",
  "/dizajn/izvodjaci/zlatna-groznica.svg",
  "/dizajn/izvodjaci/zvjezdana-prasina.svg",
];

const SLIKE_MJESTA = [
  "/dizajn/mjesta/atrij.svg",
  "/dizajn/mjesta/dom-kulture.svg",
  "/dizajn/mjesta/galerija-zvuk.svg",
  "/dizajn/mjesta/klub-mjesecina.svg",
  "/dizajn/mjesta/klub-mlin.svg",
  "/dizajn/mjesta/sjever.svg",
  "/dizajn/mjesta/tvornica-zvuka.svg",
];

export function slikaIzvodjaca(redniBroj: number): string {
  return SLIKE_IZVODJACA[redniBroj % SLIKE_IZVODJACA.length];
}

export function slikaMjesta(redniBroj: number): string {
  return SLIKE_MJESTA[redniBroj % SLIKE_MJESTA.length];
}
