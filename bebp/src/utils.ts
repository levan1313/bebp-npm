import ts from "typescript";

export async function getConvertedJS(): Promise<string> {
    const tsResponse = await fetch('/src/template/script.ts');
    const tsString = await tsResponse.text();
  
    return ts.transpileModule(tsString, {
      compilerOptions: { module: ts.ModuleKind.ESNext }
    }).outputText;
  }
  

  export async function fetchAndAssignSettings(): Promise<void> {
    try {
      const response = await fetch('/src/template/settings.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch settings.json: ${response.statusText}`);
      }
  
      let settings = await response.json();
      return settings;
    } catch (error) {
      console.error("Error fetching settings.json:", error);
    }
  }

  export function replacePlaceholders(template: string, settings: any): string {
    console.log(template)
    return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
      const path = key.trim().split(".");
      let value: any = settings;
  
      for (const segment of path) {
        value = value?.[segment];
        if (value === undefined) return `{{${key}}}`;
      }
  
      return value.default ?? value;
    });
  }
  