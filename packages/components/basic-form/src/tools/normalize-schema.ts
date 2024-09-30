import type { FormSchema } from "../type";

import { getPrefix } from "./component-prefix";
import { normalizeRule } from "./normalize-rule";

import { uniqBy, merge } from "@center/utils";
import { isArray, isObject } from "@center/utils";

function getPlaceholder(formItem: FormSchema) {
  return getPrefix(formItem.component) + formItem.label;
}

function addFormItemPlaceholder(formItem: FormSchema) {
  return merge(
    {
      componentProps: {
        placeholder: getPlaceholder(formItem),
      },
    },
    formItem
  );
}

function addFormItemAllowClear(formItem: FormSchema) {
  return merge(
    {
      componentProps: {
        allowClear: true,
      },
    },
    formItem
  );
}

function addFormItemTimeFormat(formItem: FormSchema) {
  if (formItem.component === "date-picker") {
    return merge(
      {
        componentProps: {
          format: formItem?.componentProps?.format || "YYYY-MM-DD",
          valueFormat: formItem?.componentProps?.valueFormat || "YYYY-MM-DD",
        },
      },
      formItem
    );
  }

  return formItem;
}

function filterSchema(schema: FormSchema[]) {
  return schema.filter((schemaItem) => schemaItem.prop);
}

function sortSchema(schema: FormSchema[]) {
  return schema.sort((a, b) => (a.sort || 0) - (b.sort || 0));
}

function normalizeSchemaItem(schemaItem: FormSchema) {
  return [
    addFormItemPlaceholder,
    addFormItemAllowClear,
    addFormItemTimeFormat,
    normalizeRule,
  ].reduce((acc, func) => func(acc), schemaItem);
}

function normalizeSchema(schema: FormSchema[]) {
  return filterSchema(sortSchema(schema)).map(normalizeSchemaItem);
}

function processSchemas<T extends Required<Pick<FormSchema, "prop">>>(
  schemas: Arrayable<T>
): T[] {
  let processedSchemas: T[] = [];

  if (isObject(schemas)) {
    processedSchemas.push(schemas as T);
  }

  if (isArray(schemas)) {
    processedSchemas = [...schemas];
  }

  processedSchemas = processedSchemas.filter((item) => item.prop);

  return uniqBy(processedSchemas, "prop");
}

export { normalizeSchema, normalizeSchemaItem, processSchemas };
