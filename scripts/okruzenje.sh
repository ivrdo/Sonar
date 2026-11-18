#!/usr/bin/env bash
set -euo pipefail

WASP_VERSION="0.26.1"

cd "$(dirname "$0")/../wasp"

if ! wasp version 2>/dev/null | grep -qx "$WASP_VERSION"; then
  npm i -g "@wasp.sh/wasp-cli@$WASP_VERSION" --allow-scripts=@wasp.sh/wasp-cli
  wasp clean
fi

[ -f .env.server ] || cp .env.server.example .env.server

wasp install
