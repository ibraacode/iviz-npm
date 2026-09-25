#!/bin/bash
set -e

VERSION=${1:-}
if [ -z "$VERSION" ]; then
  echo "Usage: $0 <version>"
  echo "Contoh: $0 v0.3.1"
  exit 1
fi

REPO="ibraacode/iviz"
BIN_DIR="bin"

mkdir -p "$BIN_DIR"

echo "📦 Download binary $VERSION dari $REPO..."
echo

BINARIES=(
  "iviz-linux-amd64"
  "iviz-linux-arm64"
  "iviz-darwin-amd64"
  "iviz-darwin-arm64"
  "iviz-windows-amd64.exe"
  "iviz-windows-arm64.exe"
)

for bin in "${BINARIES[@]}"; do
  echo "   → $bin"
  if ! gh release download "$VERSION" \
      --repo "$REPO" \
      --pattern "$bin" \
      --dir "$BIN_DIR" \
      --clobber 2>/dev/null; then
    echo "     ⚠️  Gagal download $bin (skip)"
  else
    chmod +x "$BIN_DIR/$bin" 2>/dev/null || true
  fi
done

echo
echo "✅ Binary siap di: $BIN_DIR/"
echo
echo "Update versi di package.json:"
echo "   \"version\": \"${VERSION#v}\""
