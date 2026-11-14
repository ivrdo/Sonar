#!/usr/bin/env bash

set -euo pipefail

NODE_MIN="24.22.1"
WASP_VERSION="0.26.1"

cd "$(dirname "$0")/wasp"

if ! command -v node >/dev/null; then
  echo "Node nije instaliran. Potreban je Node $NODE_MIN ili noviji." >&2
  exit 1
fi
node_version="$(node -p process.versions.node)"

if ! printf '%s\n' "$NODE_MIN" "$node_version" | sort -V -C; then
  echo "Node $node_version je prestar. Potreban je Node $NODE_MIN ili noviji." >&2
  exit 1
fi

installed="$(wasp version 2>/dev/null || true)"
wasp_promijenjen=false
if ! grep -qx "$WASP_VERSION" <<< "$installed"; then
  echo "Instaliram Wasp $WASP_VERSION..."
  npm i -g "@wasp.sh/wasp-cli@$WASP_VERSION" --allow-scripts=@wasp.sh/wasp-cli
  wasp_promijenjen=true
fi

if [ ! -f .env.server ]; then
  cp .env.server.example .env.server
  echo "Napravljen wasp/.env.server. Upiši GOOGLE_CLIENT_ID i GOOGLE_CLIENT_SECRET."
fi

if [ "$wasp_promijenjen" = true ]; then
  wasp clean
fi
wasp install

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
