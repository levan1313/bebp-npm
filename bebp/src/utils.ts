import ts from "typescript";

export async function getConvertedJS(): Promise<string> {
    const tsResponse = await fetch('/src/template/script.ts');
    const tsString = await tsResponse.text();
  
    return ts.transpileModule(tsString, {
      compilerOptions: { module: ts.ModuleKind.ESNext }
    }).outputText;
  }
  

  export async function getConvertedSettingsJs(): Promise<any> {
    const tsResponse = await fetch('/src/template/settings.ts');
    const tsString = await tsResponse.text();

    // Transpile TypeScript to JavaScript WITHOUT automatic semicolon insertion
    const transpiledCode = ts.transpileModule(tsString, {
        compilerOptions: {
            module: ts.ModuleKind.ESNext,
            removeComments: true,
            noEmitHelpers: true,
            noImplicitAny: false, // Allow implicit `any` types if needed
            allowJs: true,
        }
    }).outputText;

    console.log("Transpiled Code:", removeImportStatement(transpiledCode)); // Debugging line

    // Ensure settings.bts is evaluated correctly

    // try {
    //     settingsModule = new Function(`"use strict"; ${transpiledCode}; return getSettings();`)();
    // } catch (error) {
    //     console.error("Error evaluating settings script:", error);
    // }
    return ;
}

export function replaceSettingsPlaceholders(inputString: string, settings: any): string {
  return inputString.replace(/\{\{(.*?)\}\}/g, (_, path) => {
      const value = getValueFromPath(settings, path.trim()) ? getValueFromPath(settings, path.trim()).value :  `{{${path}}}`;
      return value !== undefined ? value.toString() : `{{${path}}}`; // Keep original if not found
  });
}

/**
* Retrieves a nested value from the settings object using a dot-separated path.
* 
* @param obj - The settings object.
* @param path - The dot-separated path (e.g., "background.color.value").
* @returns The corresponding value if found, otherwise undefined.
*/
function getValueFromPath(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

  
export function removeImportStatement(code: string) {
  return code
      .replace(/^import .*?;\n?/gm, '') // Removes import statements
      .replace(/export default\s+({[\s\S]*?});?\s*$/m, '$1'); // Captures the object and removes 'export default'
}
