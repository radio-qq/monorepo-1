import type { BasicFormProps, FormAction, FormSchema } from "../type";
import type { FormValidateCallback, FormItemProp } from "element-plus";

export type Register = (formInstance: FormAction) => void;

type UseFormReturn = [Register, FormAction];

export function useForm(props?: BasicFormProps): UseFormReturn {
  const formRef = ref<Nullable<FormAction>>(null);

  function getForm() {
    const form = unref(formRef);
    if (!form) {
      throw new Error(
        "The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation"
      );
    }
    return form as FormAction;
  }

  function register(instance: FormAction) {
    onUnmounted(() => {
      formRef.value = null;
    });

    formRef.value = instance;

    watch(
      () => props,
      () => {
        const formProps = unref(props);
        if (formProps) {
          getForm().setProps(formProps);
        }
      },
      {
        immediate: true,
        deep: true,
      }
    );
  }

  const methods: FormAction = {
    setProps: (formProps: Partial<BasicFormProps>) => {
      getForm().setProps(formProps);
    },

    updateSchema: (schemas: Partial<FormSchema> | Partial<FormSchema>[]) => {
      getForm().updateSchema(schemas);
    },

    appendSchema: (
      schemas: FormSchema | FormSchema[],
      previousProp?: string
    ) => {
      getForm().appendSchema(schemas, previousProp);
    },

    removeSchema: (fields: string | string[]) => {
      getForm().removeSchema(fields);
    },

    getFieldsValue: () => {
      return getForm().getFieldsValue() || {};
    },

    setFieldsValue: (values: Recordable) => {
      getForm().setFieldsValue(values);
    },

    validate: (callback?: FormValidateCallback) => {
      getForm().validate(callback);
    },

    validateField: (
      props?: Arrayable<FormItemProp>,
      callback?: FormValidateCallback
    ) => {
      getForm().validateField(props, callback);
    },

    resetFields: (props?: Arrayable<FormItemProp>) => {
      getForm().resetFields(props);
    },

    clearValidate: (props?: Arrayable<FormItemProp>) => {
      getForm().clearValidate(props);
    },

    scrollToField: (prop: FormItemProp) => {
      getForm().scrollToField(prop);
    },

    reset: () => {
      getForm().reset();
    },

    submit: () => {
      getForm().submit();
    },
  };

  return [register, methods];
}
