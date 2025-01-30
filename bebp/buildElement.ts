import fs from "fs";
import path from "path";
import ts from "typescript";

// Define source and destination paths
const SRC_TEMPLATE = path.join(__dirname, "src/template");
const DEST_ELEMENT = path.join(__dirname, "src/Element");

// Ensure the destination directory exists
if (!fs.existsSync(DEST_ELEMENT)) {
  fs.mkdirSync(DEST_ELEMENT, { recursive: true });
}

// Copy function
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

// Convert TypeScript to JavaScript
function transpileScript() {
  const scriptPath = path.join(SRC_TEMPLATE, "script.ts");
  const destScriptPath = path.join(DEST_ELEMENT, "script.js");

  if (fs.existsSync(scriptPath)) {
    const tsContent = fs.readFileSync(scriptPath, "utf-8");
    const jsContent = ts.transpileModule(tsContent, {
      compilerOptions: { module: ts.ModuleKind.ESNext },
    }).outputText;

    fs.writeFileSync(destScriptPath, jsContent);
    console.log("✅ Transpiled script.ts to script.js");
  } else {
    console.warn("⚠️ script.ts not found!");
  }
}

// Execute operations
copyFile("index.html");
copyFile("style.css");
copyFile("settings.json");
transpileScript();

console.log("🎉 Build completed! Files moved to /src/Element");
