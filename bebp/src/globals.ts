import { fetchEndpoint } from "./fetchHelper.util";

export interface GlobalI {
    mode: "builder" | "production";
    designTimeBaseUrl: string;
    runtimeBaseUrl: string;
  }
  

export const globals: GlobalI = {
    mode: "builder",
    // designTimeBaseUrl: "http://127.0.0.1:4000",
    // runtimeBaseUrl: "http://127.0.0.1:4000",
    designTimeBaseUrl: "http://192.168.88.138:5003",
    // designTimeBaseUrl: "https://adminapi.onaim.dev.local:30002",
    runtimeBaseUrl: "https://ocelotapigateway.onaim.dev.local:30002"
  };

  
  
  // Attach the global config to the window object with explicit assertion
  (window as any).globalConfig = globals;
  window.fetchEndpoint = fetchEndpoint;
  