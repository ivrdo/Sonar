#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../wasp"

wasp db migrate-dev
wasp db seed seedSve
