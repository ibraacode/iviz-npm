#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

function getBinaryPath() {
  const isWindows = process.platform === "win32";
  const binaryName = isWindows ? "iviz.exe" : "iviz";
  const binaryPath = path.join(__dirname, binaryName);

  if (!fs.existsSync(binaryPath)) {
    console.error(`❌ Binary tidak ditemukan: ${binaryPath}`);
    console.error("   Coba reinstall: npm install -g @iviz/cli");
    process.exit(1);
  }

  return binaryPath;
}

function main() {
  const binaryPath = getBinaryPath();
  const args = process.argv.slice(2);

  const child = spawn(binaryPath, args, { stdio: "inherit" });

  child.on("error", (err) => {
    console.error("❌ Gagal menjalankan iviz:", err.message);
    process.exit(1);
  });

  child.on("exit", (code) => {
    process.exit(code || 0);
  });
}

main();
