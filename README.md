# @iviz/cli

> **Streamlit for Next.js** — Bikin dashboard data & visualisasi dari file `.iviz` sederhana, tanpa nulis React.

## Install

```bash
npm install -g @iviz/cli
```

## Quick Start

```bash
# 1. Setup runtime Next.js (sekali aja)
iviz setup

# 2. Bikin project baru
mkdir my-dashboard && cd my-dashboard
iviz init

# 3. Jalankan dev server
iviz dev
```

Buka http://localhost:3000

## Fitur

- 📝 **DSL Sederhana** — Tulis dashboard pakai `.iviz`
- ⚡ **Static by Default** — Output static HTML, upload ke mana aja
- 📊 **Multi-Page App** — Banyak `.iviz` = banyak halaman otomatis
- 🔥 **Hot Reload** — Edit `.iviz` atau CSV → auto-refresh
- 🎨 **Theme System** — Dark/light + custom colors
- 📦 **Multi-Format Data** — CSV, TSV, JSON, YAML
- 🧩 **Komponen Kustom** — React component sendiri
- 🤖 **Auto Hub Page** — Menu otomatis ke semua halaman

## Commands

| Command | Fungsi |
|---|---|
| `iviz setup` | Install runtime Next.js (sekali aja) |
| `iviz init` | Buat project baru di folder kosong |
| `iviz dev [file.iviz]` | Dev server + hot reload |
| `iviz build [file.iviz]` | Build production → `./out/` |
| `iviz doctor` | Cek environment & rekomendasi |
| `iviz --version` | Tampilkan versi |

## Sintaks `.iviz`

```
PAGE title="Dashboard Penjualan" theme="dark"

DATA source="data/sales.csv" name="sales"

LAYOUT_BEGIN cols=2
  USE_COMPONENT GrafikKustom warna="merah" title="Sales" data="sales"
  USE_COMPONENT StatCard warna="biru" title="Total" data="sales"
LAYOUT_END

TEXT value="Powered by iviz" size="sm"
```

## Persyaratan

- **Node.js 16+**
- **OS**: Linux, macOS, Windows, Termux/Android

## Dokumentasi Lengkap

Lihat [github.com/ibraacode/iviz](https://github.com/ibraacode/iviz)

## License

MIT
