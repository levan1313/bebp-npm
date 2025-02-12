import { EndpointInfoI } from "element_interfaces";
import { generateDummyData } from "./generateDummyData";

declare type ParamsType = {
  body: {};
} | {
  query: {};
} | {
  body: {};
  query: {};
} | undefined;

export const test =async (): Promise<number> => {
  return 42; // or any other number
};

export const myFetch = <T, Q extends ParamsType>(endpointInfo: EndpointInfoI<T, Q>): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    if (!endpointInfo.schema) {
      return reject(new Error("Schema is missing for dummy data generation"));
    }

    try {
      const parsedSchema =
        typeof endpointInfo.schema === "string"
          ? JSON.parse(endpointInfo.schema)
          : endpointInfo.schema;

      const data = generateDummyData<T>(parsedSchema, parsedSchema, 8);

      if (data === null) {
        return reject(new Error("Generated dummy data is null"));
      }

      resolve(data);
    } catch (error) {
      console.error("Error parsing schema:", error);
      reject(new Error("Invalid schema format"));
    }
  });
};
