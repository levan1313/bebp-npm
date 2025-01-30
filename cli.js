#!/usr/bin/env node

import { fileURLToPath } from "url";
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to copy all files and directories recursively
function copyFiles(sourceDir, targetDir) {
  if (!fs.existsSync(sourceDir)) {
    console.error(`❌ Error: Source directory '${sourceDir}' not found.`);
    process.exit(1);
  }

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.readdirSync(sourceDir).forEach(file => {
    const srcFile = path.join(sourceDir, file);
    const destFile = path.join(targetDir, file);

    if (fs.lstatSync(srcFile).isDirectory()) {
      copyFiles(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

// Function to initialize a new project
async function init() {
  console.log("\n🚀 Welcome to the Bebp Template Installer! 🚀\n");

  const projectName = process.argv[2] || "new-bebp-project";
  const projectDir = path.join(process.cwd(), projectName);
  const sourceDir = path.join(__dirname, "bebp"); // Copy the entire bebp directory

  if (fs.existsSync(projectDir)) {
    console.error(`❌ Error: Directory "${projectName}" already exists.`);
    process.exit(1);
  }

  console.log(`\n📂 Creating project: ${projectName}...\n`);
  fs.mkdirSync(projectDir, { recursive: true });

  // Copy the entire `bebp/` directory
  copyFiles(sourceDir, projectDir);
  console.log("✅ Project files copied successfully!\n");

  // Change into project directory
  process.chdir(projectDir);

  // Install dependencies
  console.log("📦 Installing dependencies...");
  execSync("npm install", { stdio: "inherit" });

  console.log("\n🚀 Setup complete! Start your project with:\n");
  console.log(`  cd ${projectName}`);
  console.log("  npm run dev\n");

  process.exit(0);
}

// Run CLI
init();
