export interface GlobalI {
    mode: "builder" | "production";
    designTimeBaseUrl: string;
    runtimeBaseUrl: string;
  }
  

export const globals: GlobalI = {
    mode: "builder",
    designTimeBaseUrl: "http://127.0.0.1:4000",
    runtimeBaseUrl: "http://127.0.0.1:4000",
  };
  
  // Attach the global config to the window object with explicit assertion
  (window as any).globalConfig = globals;
  