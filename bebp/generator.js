const path = require("path");
const fs = require("fs");
const ts = require("typescript");

// Define source and destination paths
const SRC_TEMPLATE = path.join(__dirname, "src/template");
const DEST_ELEMENT = path.join(__dirname, "src/Element");

// Ensure the destination directory exists
if (!fs.existsSync(DEST_ELEMENT)) {
  fs.mkdirSync(DEST_ELEMENT, { recursive: true });
}

/**
 * Global variable to store imports removed from settings.ts.
 * These imports will later be prepended to script.js.
 */
let builderSettingsImports = "";

/**
 * Inline external imports.
 *
 * For settings.ts, any import/require for "builder-settings-types" is removed
 * and saved into a global variable. For other files, we inline external modules normally.
 *
 * @param {string} code The transpiled code.
 * @param {string} srcFileName The source file name.
 * @returns {string} The processed code.
 */
function inlineImports(code, srcFileName) {
  if (srcFileName === "settings.ts") {
    // Capture ES module style imports for builder-settings-types
    const importRegex = /import\s+.*?['"]builder-settings-types['"];?\n?/g;
    let match;
    while ((match = importRegex.exec(code)) !== null) {
      builderSettingsImports += match[0];
    }
    code = code.replace(importRegex, "");

    // Capture CommonJS require statements for builder-settings-types
    const requireRegex = /const\s+.*?=\s*require\(['"]builder-settings-types['"]\);?\n?/g;
    while ((match = requireRegex.exec(code)) !== null) {
      builderSettingsImports += match[0];
    }
    code = code.replace(requireRegex, "");

    return code;
  }

  // Otherwise, inline external modules normally.

  // Inline ES module style imports:
  code = code.replace(
    /import\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"];/g,
    function (_, importedNames, modulePath) {
      return inlineModule(modulePath, importedNames);
    }
  );

  // Inline CommonJS require style imports:
  code = code.replace(
    /const\s+([a-zA-Z0-9_]+)\s*=\s*require\(['"]([^'"]+)['"]\);/g,
    function (_, varName, modulePath) {
      return inlineModule(modulePath, varName, true);
    }
  );

  return code;
}

/**
 * Inlines a module by requiring it and converting its requested exports into constant definitions.
 *
 * This routine works well for modules exporting literal values.
 *
 * @param {string} modulePath The module specifier (e.g. "onaim-endpoints").
 * @param {string} importNames A comma‑separated list of names (or a single variable name for CJS).
 * @param {boolean} inlineAll When true, inline all keys from the module.
 * @returns {string} The inlined code.
 */
function inlineModule(modulePath, importNames, inlineAll) {
  let mod;
  try {
    mod = require(modulePath);
  } catch (e) {
    console.warn(`⚠️ Could not require module: ${modulePath}`);
    return `// ⚠️ Module ${modulePath} not inlined (could not require)\n`;
  }
  let result = "";
  if (inlineAll) {
    result += `const ${importNames} = {};\n`;
    Object.keys(mod).forEach((key) => {
      try {
        result += `${importNames}.${key} = ${JSON.stringify(mod[key])};\n`;
      } catch (err) {
        result += `// ⚠️ Could not inline property ${key} from ${modulePath}\n`;
      }
    });
  } else {
    const names = importNames.split(",").map((n) => n.trim());
    names.forEach((name) => {
      if (mod[name] === undefined) {
        result += `// ⚠️ Could not find export ${name} in module ${modulePath}\n`;
      } else {
        try {
          result += `const ${name} = ${JSON.stringify(mod[name])};\n`;
        } catch (err) {
          result += `// ⚠️ Could not inline export ${name} from module ${modulePath}\n`;
        }
      }
    });
  }
  return result;
}

/**
 * Inlines a package (the “real code”) from node_modules.
 *
 * This function now reads the package’s main file, transpiles its content to CommonJS
 * (thereby converting any "export" syntax), removes boilerplate such as "use strict" and
 * the __esModule definition, and then wraps it in an IIFE that assigns its module.exports
 * to the given variable name.
 *
 * @param {string} packageName The package name (e.g. "builder-settings-types").
 * @param {string} varName The variable name to assign the exports to.
 * @returns {string} The inlined package code.
 */
function inlinePackageAsVar(packageName, varName) {
  let moduleFile;
  try {
    moduleFile = require.resolve(packageName);
  } catch (e) {
    console.warn(`⚠️ Could not resolve package: ${packageName}`);
    return `// ⚠️ Package ${packageName} not inlined (could not resolve)\n`;
  }
  if (!fs.existsSync(moduleFile)) {
    console.warn(`⚠️ Module file not found: ${moduleFile}`);
    return `// ⚠️ Package ${packageName} not inlined (file not found)\n`;
  }
  let moduleContent = fs.readFileSync(moduleFile, "utf-8");

  // Transpile the package code to CommonJS so that export statements are converted.
  let transpiled = ts.transpileModule(moduleContent, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES5 },
  }).outputText;

  // Remove boilerplate from the transpiled code.
  transpiled = transpiled.replace(/"use strict";\s*/g, "");
  transpiled = transpiled.replace(/Object\.defineProperty\(exports,\s*["']__esModule["'],\s*{ value: true }\);\s*/g, "");

  // Wrap the transpiled code in an IIFE that returns module.exports.
  let wrapped =
    `var ${varName} = (function(){\n` +
    `  var module = { exports: {} };\n` +
    transpiled +
    `\n  return module.exports;\n` +
    `})();\n`;
  return wrapped;
}

/**
 * Processes the transpiled code from settings.ts to remove boilerplate.
 *
 * It removes "use strict", the __esModule definition, and strips out the "exports.default ="
 * wrapper, leaving just the object literal.
 *
 * @param {string} code The transpiled code.
 * @returns {string} The processed code.
 */
function processSettingsOutput(code) {
  code = code.replace(/"use strict";\s*/, "");
  code = code.replace(/Object\.defineProperty\(exports,\s*["']__esModule["'],\s*{ value: true }\);\s*/, "");
  const match = code.match(/exports\.default\s*=\s*([\s\S]*);?/);
  if (match && match[1]) {
    return match[1].trim();
  }
  return code;
}

/**
 * Transpiles a TypeScript file and inlines its external dependencies.
 *
 * For settings.ts, it removes any import/require for "builder-settings-types" and then
 * processes the output to remove boilerplate.
 *
 * For script.ts, it prepends the fully inlined code for "builder-settings-types".
 *
 * @param {string} srcFileName The source TypeScript file name.
 * @param {string} destFileName The destination JavaScript file name.
 */
function transpileFile(srcFileName, destFileName) {
  const srcPath = path.join(SRC_TEMPLATE, srcFileName);
  const destPath = path.join(DEST_ELEMENT, destFileName);

  if (!fs.existsSync(srcPath)) {
    console.warn(`⚠️ ${srcFileName} not found!`);
    return;
  }

  const fileContent = fs.readFileSync(srcPath, "utf-8");

  let transpiled = ts.transpileModule(fileContent, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ESNext,
      removeComments: true,
      esModuleInterop: true,
      strict: true,
    },
  }).outputText;

  let finalCode = inlineImports(transpiled, srcFileName);

  if (srcFileName === "settings.ts") {
    finalCode = processSettingsOutput(finalCode);
  }

  // For script.ts, prepend the inlined "builder-settings-types" code.
  if (srcFileName === "script.ts") {
    let inlinedPackage = inlinePackageAsVar("builder-settings-types", "builder_settings_types_1");
    finalCode = inlinedPackage + "\n" + finalCode;
  }

  fs.writeFileSync(destPath, finalCode);
  console.log(`✅ Transpiled ${srcFileName} to ${destFileName}`);
}

/**
 * Copies a static file (HTML, CSS, etc.) from the source to destination.
 *
 * @param {string} fileName The file name.
 */
function copyFile(fileName) {
  const srcPath = path.join(SRC_TEMPLATE, fileName);
  const destPath = path.join(DEST_ELEMENT, fileName);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✅ Copied: ${fileName}`);
  } else {
    console.warn(`⚠️ Missing file: ${fileName}`);
  }
}

/* ───── Execute Build Operations ───── */

// Process settings.ts first (so its output is independent)
transpileFile("settings.ts", "settings.js");
// Then process script.ts, which will have the inlined builder-settings-types code prepended.
transpileFile("script.ts", "script.js");

// Copy static files
copyFile("index.html");
copyFile("style.css");

console.log("🎉 Build completed! Files moved to /src/Element");
