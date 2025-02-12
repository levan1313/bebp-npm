import fs from "fs";
import path from "path";
import ts from "typescript";
import { removeImportStatement } from "./src/utils";

// Define source and destination paths
const SRC_TEMPLATE = path.join(__dirname, "src/template");
const DEST_ELEMENT = path.join(__dirname, "src/Element");

// Ensure the destination directory exists
if (!fs.existsSync(DEST_ELEMENT)) {
  fs.mkdirSync(DEST_ELEMENT, { recursive: true });
}

// Copy function for files that don't require transpiling
function copyFile(fileName: string) {
  const srcPath = path.join(SRC_TEMPLATE, fileName);
  const destPath = path.join(DEST_ELEMENT, fileName);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✅ Copied: ${fileName}`);
  } else {
    console.warn(`⚠️ Missing file: ${fileName}`);
  }
}

// Generic transpile function for TypeScript-like files (e.g., .ts or .bts)
// Transpiles the source file and writes it to the destination with a new file name.
function transpileFile(srcFileName: string, destFileName: string) {
  const srcPath = path.join(SRC_TEMPLATE, srcFileName);
  const destPath = path.join(DEST_ELEMENT, destFileName);

  if (fs.existsSync(srcPath)) {
    const fileContent = fs.readFileSync(srcPath, "utf-8");
    const transpiled = ts.transpileModule(fileContent, {
      compilerOptions: { module: ts.ModuleKind.ESNext },
    }).outputText;
    const parsed = removeImportStatement(transpiled);
    console.log(parsed)
    fs.writeFileSync(destPath, parsed);
    console.log(`✅ Transpiled ${srcFileName} to ${destFileName}`);
  } else {
    console.warn(`⚠️ ${srcFileName} not found!`);
  }
}

// Execute operations:

// Copy static files
copyFile("index.html");
copyFile("style.css");

// Transpile and copy dynamic files
transpileFile("script.ts", "script.js");
transpileFile("settings.ts", "settings.js");

console.log("🎉 Build completed! Files moved to /src/Element");
