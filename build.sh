#!/usr/bin/env bash
set -euo pipefail

npm install

rm -f axe.so
rm -rf src/parser.c src/node-types.json build/

npx tree-sitter generate

echo "==> Building shared object axe.so..."
if ! command -v gcc &> /dev/null; then
  echo "ERROR: gcc not found, please install build-essential"
  exit 1
fi

gcc -shared -fPIC -O2 -Wall -o axe.so src/parser.c

echo "==> Build complete. Verifying..."
nm -D axe.so | grep tree_sitter_axe || true

echo "==> Done."
