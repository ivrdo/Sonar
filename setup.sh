#!/usr/bin/env bash
# Postavljanje razvojnog okruženja za Sonar (Wasp).
#
# Pokreće se iz korijena repozitorija: ./setup.sh
# Napravi sve osim wasp start. Može se pokretati više puta, preskače ono što je
# već napravljeno. Dev container ga pokreće sam pri izradi, ali bez terminala,
# pa tada preskoči migracije i probne podatke.
#
# Napisano uz pomoć AI alata (Claude Code).

set -euo pipefail

NODE_MIN="24.22.1"
WASP_VERSION="0.26.1"

cd "$(dirname "$0")/wasp"

# 1. Node: Wasp 0.26.1 ne radi sa starijim od 24.22.1
if ! command -v node >/dev/null; then
  echo "Node nije instaliran. Potreban je Node $NODE_MIN ili noviji." >&2
  exit 1
fi
node_version="$(node -p process.versions.node)"
# sort -V -C uspije samo ako su verzije već poredane, tj. NODE_MIN <= node_version
if ! printf '%s\n' "$NODE_MIN" "$node_version" | sort -V -C; then
  echo "Node $node_version je prestar. Potreban je Node $NODE_MIN ili noviji." >&2
  exit 1
fi

# 2. Wasp CLI točno zadane verzije, da svi imamo isti package-lock.json
installed="$(wasp version 2>/dev/null || true)"
wasp_promijenjen=false
if ! grep -qx "$WASP_VERSION" <<< "$installed"; then
  echo "Instaliram Wasp $WASP_VERSION..."
  npm i -g "@wasp.sh/wasp-cli@$WASP_VERSION" --allow-scripts=@wasp.sh/wasp-cli
  wasp_promijenjen=true
fi

# 3. .env.server samo ako ne postoji, da se ne prepišu tajne
if [ ! -f .env.server ]; then
  cp .env.server.example .env.server
  echo "Napravljen wasp/.env.server. Upiši GOOGLE_CLIENT_ID i GOOGLE_CLIENT_SECRET."
fi

# 4. npm ovisnosti projekta. Ako se verzija Waspa promijenila, stari
#    node_modules i .wasp su od prethodne verzije pa ih prvo brišemo.
if [ "$wasp_promijenjen" = true ]; then
  wasp clean
fi
wasp install

# Broj redaka u tablici Korisnik, preko Prisma klijenta koji Wasp generira.
# U podljusci, da varijable iz .env.server ne ostanu u okruženju skripte.
broj_korisnika() {
  (
    set -a
    . ./.env.server
    set +a
    node -e '
      const { PrismaClient } = require("@prisma/client");
      const prisma = new PrismaClient();
      prisma.korisnik
        .count()
        .then((n) => console.log(n))
        .finally(() => prisma.$disconnect());
    '
  )
}

# 5. Migracije i probni podaci samo u terminalu: migrate-dev zna tražiti ime
#    nove migracije, a bez terminala nema tko odgovoriti pa bi zapeo.
if [ -t 0 ]; then
  wasp db migrate-dev

  # seedSve nije predviđen za ponovno pokretanje, pa samo u praznu bazu
  if korisnika="$(broj_korisnika)"; then
    if [ "$korisnika" = 0 ]; then
      wasp db seed seedSve
    fi
  else
    echo "Ne mogu provjeriti bazu, preskačem probne podatke." >&2
  fi

  echo "Sve spremno. Pokreni: cd wasp && wasp start"
else
  echo "Migracije i probni podaci nisu napravljeni (nema terminala)."
  echo "Pokreni ./setup.sh još jednom u terminalu."
fi
