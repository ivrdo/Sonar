// isti seed daje isti niz brojeva (mulberry32)
export function napraviRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// slučajan cijeli broj od min do max (uključeni)
export function cijeli(r: () => number, min: number, max: number): number {
  return Math.floor(r() * (max - min + 1)) + min;
}

// slučajan element niza
export function izaberi<T>(r: () => number, niz: T[]): T {
  return niz[Math.floor(r() * niz.length)];
}

// n različitih elemenata niza (miješanje kopije)
export function uzorak<T>(r: () => number, niz: T[], n: number): T[] {
  const kopija = [...niz];
  for (let i = kopija.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [kopija[i], kopija[j]] = [kopija[j], kopija[i]];
  }
  return kopija.slice(0, n);
}
