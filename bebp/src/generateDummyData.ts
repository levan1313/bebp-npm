export function generateDummyData<T>(schema: any, rootSchema: any, arraySize = 5): T|null {

    if (!schema || typeof schema !== "object") return null;

    const generateValue = (property: any) => {
        if (property["$ref"]) {
            property = resolveReference(property["$ref"], rootSchema);
        }

        if (property.type === "string") return "example_string";
        if (property.type === "number") return Math.floor(Math.random() * 100);
        if (property.type === "boolean") return Math.random() > 0.5;

        if (property.type === "array") {
            let itemSchema = property.items;
            if (itemSchema["$ref"]) {
                itemSchema = resolveReference(itemSchema["$ref"], rootSchema);
            }

            // 🔹 Fix: Pass the resolved schema instead of `property`
            return Array.from({ length: arraySize }, () => generateDummyData(itemSchema, rootSchema, arraySize));
        }

        if (property.type === "object") {
            // 🔹 Fix: Use resolved schema to generate object properties correctly
            return generateDummyData(property, rootSchema, arraySize);
        }

        return null;
    };

    const data: any = {};
    if (schema.properties) {
        Object.keys(schema.properties).forEach((key) => {
            let property = schema.properties[key];

            if (property["$ref"]) {
                property = resolveReference(property["$ref"], rootSchema);
            }

            data[key] = generateValue(property);
        });
    }

    return data;
}

// ✅ Properly resolve `$ref` references
function resolveReference(ref: any, rootSchema: any): any {
    if (typeof ref === "string" && ref.startsWith("#/definitions/")) {
        const refKey = ref.replace("#/definitions/", "");
        return rootSchema.definitions?.[refKey] || {};
    }
    return ref;
}
