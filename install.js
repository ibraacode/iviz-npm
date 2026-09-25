#!/usr/bin/env node

/**
 * install.js — dipanggil otomatis saat `npm install`.
 */

const fs = require("fs");
const path = require("path");

const BIN_DIR = path.join(__dirname, "bin");

function detectBinary() {
  const platform = process.platform;
  const arch = process.arch;

  const platformMap = {
    darwin: "darwin",
    linux: "linux",
    android: "linux",
    win32: "windows",
  };

  const archMap = {
    x64: "amd64",
    arm64: "arm64",
  };

  const osName = platformMap[platform];
  const archName = archMap[arch];

  if (!osName || !archName) {
    throw new Error(
      `Platform tidak didukung: ${platform}/${arch}\n` +
      `iviz mendukung: Linux, macOS, Windows, Android/Termux (x64/arm64)`
    );
  }

  const ext = platform === "win32" ? ".exe" : "";
  const binaryName = `iviz-${osName}-${archName}${ext}`;
  const binaryPath = path.join(BIN_DIR, binaryName);

  if (!fs.existsSync(binaryPath)) {
    throw new Error(
      `Binary tidak ditemukan: ${binaryName}\n` +
      `Cek folder: ${BIN_DIR}`
    );
  }

  return { binaryName, binaryPath, isWindows: platform === "win32" };
}

function main() {
  console.log("📦 iviz: memilih binary...");

  try {
    const { binaryName, binaryPath, isWindows } = detectBinary();
    console.log(`   → ${binaryName}`);

    const targetName = isWindows ? "iviz.exe" : "iviz";
    const targetPath = path.join(BIN_DIR, targetName);

    fs.copyFileSync(binaryPath, targetPath);

    if (!isWindows) {
      fs.chmodSync(targetPath, 0o755);
    }

    console.log(`   ✓ Siap: ${targetName}`);
    console.log();
    console.log("✅ iviz berhasil diinstall!");
    console.log();
    console.log("Langkah selanjutnya:");
    console.log("  1. iviz setup      → install runtime Next.js");
    console.log("  2. mkdir my-app && cd my-app");
    console.log("  3. iviz init       → buat project baru");
    console.log("  4. iviz dev        → jalankan dev server");
    console.log();
  } catch (err) {
    console.error();
    console.error("❌ Install gagal:", err.message);
    console.error();
    process.exit(1);
  }
}

main();
