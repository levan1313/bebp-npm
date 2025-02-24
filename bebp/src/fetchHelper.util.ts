import { EndpointInfoI, ParamsType, FetchEndpointI } from "endpoint-interface";
import { generateDummyData } from "./generateDummyData";

export const fetchEndpoint = async <T, Q extends ParamsType>(
  endpointInfo: EndpointInfoI<T, Q>,
  params?: ParamsType
) => {
  
    if (!endpointInfo.schema) {
      throw new Error("Schema is missing for dummy data generation");
    }

    try {
      const parsedSchema =
        typeof endpointInfo.schema === "string"
          ? JSON.parse(endpointInfo.schema)
          : endpointInfo.schema;

      return generateDummyData<T>(parsedSchema, parsedSchema, 8);
    } catch (error) {
      console.error("Error parsing schema:", error);
      throw new Error("Invalid schema format");
    }
};