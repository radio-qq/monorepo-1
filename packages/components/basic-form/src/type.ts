import type {
  RowProps,
  ColProps,
  FormItemProps,
  FormItemRule,
  FormValidateCallback,
  FormItemProp,
  FormValidationResult,
} from "element-plus";

export type ElementPlusComponentType =
  | "input"
  | "input-number"
  | "textarea"
  | "checkbox"
  | "tree-select"
  | "cascader"
  | "transfer"
  | "date-picker"
  | "time-picker"
  | "switch"
  | "rate"
  | "slider"
  | "color-picker";

export type CustomComponentType =
  | "sub-title"
  | "radio"
  | "checkbox"
  | "select"
  | "upload"
  | "textareaddd";

export type ComponentType = ElementPlusComponentType | CustomComponentType;

export interface FormSchema {
  label: string;
  prop: string;
  defaultValue?: string;
  component: ComponentType;
  componentProps?: Recordable<unknown>;
  componentListeners?: Recordable<() => void>;
  slot?: string;

  sort?: number;
  colProps?: Partial<Mutable<ColProps>>;
  formItemProps?: Partial<Mutable<FormItemProps>>;

  required?: boolean;
  min?: number;
  max?: number;
  noWhitespace?: number;
  rules?: FormItemRule[];

  hasLabel?: boolean;
  hidden?: boolean;
  vIf?: (model: Recordable, schemaItem: FormSchema) => boolean;
}

export interface BasicFormProps {
  model?: Recordable;
  schemas: FormSchema[];
  loading?: boolean;

  rowProps?: Partial<Mutable<RowProps>>;
  colProps?: Partial<Mutable<ColProps>>;
  formItemProps?: Partial<Mutable<FormItemProps>>;

  hasLabel?: boolean;
  labelSuffix?: string;
  labelWidth?: string | number;
  labelPosition?: "left" | "right" | "top";

  hasFooter?: boolean;
  hasReset?: boolean;
  resetText?: string;
  submitText?: string;
  footerAlign?: "left" | "right" | "center";

  hasErrorTip?: boolean;

  // interface data -> form model
  modelAdaptee?: (model: Recordable) => Recordable;
  // form model -> interface data
  modelAdapter?: (model: Recordable) => Recordable;
}

export interface BasicFormEmits {
  (e: "register", actions: FormAction): void;
  (e: "update:modelValue", values: Props["model"]): void;
  (e: "change", e: unknown, schemaItem: FormSchema): void;
  (e: "submit", values: Props["model"]): void;
  (e: "reset", values: Props["model"]): void;
}

export interface FormAction {
  setProps: (formProps: Partial<BasicFormProps>) => void;

  updateSchema: (schemas: Partial<FormSchema> | Partial<FormSchema>[]) => void;
  appendSchema: (
    schemas: FormSchema | FormSchema[],
    previousProp: string | undefined
  ) => void;
  removeSchema: (fields: string | string[]) => void;

  getFieldsValue: () => Recordable;
  setFieldsValue: (values: Recordable) => void;

  validate: (callback?: FormValidateCallback) => void;
  validateField: (
    props?: Arrayable<FormItemProp> | undefined,
    callback?: FormValidateCallback | undefined
  ) => FormValidationResult;
  resetFields: (props?: Arrayable<FormItemProp> | undefined) => void;
  clearValidate: (props?: Arrayable<FormItemProp> | undefined) => void;
  scrollToField: (prop: FormItemProp) => void;

  reset: () => void;
  submit: () => void;
}
