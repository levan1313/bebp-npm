declare global {
  interface Window {
    myFetch: <T>(endpointInfo: EndpointInfoI<T>) => () => Promise<T>;
    globalConfig: GlobalI; // Ensure this property exists
  }
}

export interface EndpointInfoI<T> {
  endpoint: string;
  queryParams: Record<string, string>;
  requestMethod: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpointType: "RT" | "DT";
  schemaType: T;
  schema?: string | null;
  fetch2?: () => T;
}
 interface GlobalI {
  mode: "builder" | "production";
  designTimeBaseUrl: string;
  runtimeBaseUrl: string;
}
