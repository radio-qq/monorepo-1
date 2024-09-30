import type { BasicFormProps, FormSchema } from "../type";

import {
  normalizeSchema,
  normalizeSchemaItem,
  processSchemas,
} from "../tools/normalize-schema";

import { isFunction, isString } from "@center/utils";
import { cloneDeep } from "@center/utils";
import { merge } from "@center/utils";

type UpdateSchemaParams = Partial<FormSchema> &
  Required<Pick<FormSchema, "prop">>;

export function useFormSchema(props: ComputedRef<BasicFormProps>) {
  const schemaRef = ref<FormSchema[]>([]);
  const modelRef = ref<Recordable>({});
  const defaultModelRef = ref<Recordable>({});

  watchEffect(() => {
    const formProps = unref(props);
    if (formProps) {
      initSchema();
      initDefaultModel();
    }
  });

  function initSchema() {
    schemaRef.value = normalizeSchema(props.value.schemas);
  }

  function initDefaultModel() {
    defaultModelRef.value = cloneDeep(
      Object.fromEntries(schemaRef.value.map((s) => [s.prop, s.defaultValue]))
    );
  }

  function updateSchema(schemas: Arrayable<UpdateSchemaParams>) {
    const waitUpdateSchemas = processSchemas(schemas);

    if (!waitUpdateSchemas.length) {
      throw new Error(
        "All schema should have prop or prop should not be empty"
      );
    }

    waitUpdateSchemas.forEach((schema) => {
      const updateIndex = unref(schemaRef).findIndex(
        (item) => schema.prop === item.prop
      );

      if (updateIndex === -1) {
        return;
      }

      const oldSchema = unref(schemaRef)[updateIndex];

      if (oldSchema) {
        const newSchema = merge(oldSchema, schema);
        _updateSchemaItemByIndex(updateIndex, newSchema);
      }
    });
  }

  function _updateSchemaItemByIndex(index: number, schema: FormSchema) {
    schemaRef.value.splice(index, 1, schema);
  }

  function appendSchema(schemas: Arrayable<FormSchema>, previousProp?: string) {
    const waitAppendSchemas = processSchemas(schemas);

    if (!waitAppendSchemas.length) {
      throw new Error(
        "All schema should have prop or prop should not be empty"
      );
    }

    waitAppendSchemas.forEach((schema) => {
      const previousIndex = unref(schemaRef).findIndex(
        (item) => previousProp === item.prop
      );

      _appendSchemaItemByIndex(previousIndex, normalizeSchemaItem(schema));
    });
  }

  function _appendSchemaItemByIndex(index: number, schema: FormSchema) {
    schemaRef.value.splice(index + 1, 0, schema);
  }

  function removeSchema(prop: Arrayable<string>) {
    const propList = (isString(prop) ? [prop] : prop) as string[];

    if (!propList.length) {
      throw new Error(
        "All schema should have prop or prop should not be empty"
      );
    }

    propList.forEach((p) => {
      const removeIndex = unref(schemaRef).findIndex((item) => p === item.prop);

      _removeSchemaItemByIndex(removeIndex);
    });
  }

  function _removeSchemaItemByIndex(index: number) {
    schemaRef.value.splice(index, 1);
  }

  function getFieldsValue() {
    const { modelAdapter } = props.value;
    return isFunction(modelAdapter)
      ? modelAdapter(modelRef.value)
      : modelRef.value;
  }

  function setFieldsValue(values: Recordable) {}

  async function resetFieldsValue() {
    modelRef.value = cloneDeep(defaultModelRef.value);
  }

  return {
    updateSchema,
    removeSchema,
    appendSchema,

    getFieldsValue,
    setFieldsValue,
    resetFieldsValue,
  };
}
