import { EndpointInfoI } from "endpoint-interface";

declare global {
  interface Window {
    fetchEndpoint: <T>(endpointInfo: EndpointInfoI<T>) => () => Promise<T>;
    globalConfig: GlobalI; // Ensure this property exists
  }
}

 interface GlobalI {
  mode: "builder" | "production";
  designTimeBaseUrl: string;
  runtimeBaseUrl: string;
}
