#!/usr/bin/env node

import fs from "fs";
import path from "path";

const packageJsonPath = path.join(process.cwd(), "package.json");

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

const versionParts = packageJson.version.split(".");
versionParts[2] = (parseInt(versionParts[2]) + 1).toString(); // Increment patch version
packageJson.version = versionParts.join(".");

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");

console.log(`✅ Version updated to ${packageJson.version}`);