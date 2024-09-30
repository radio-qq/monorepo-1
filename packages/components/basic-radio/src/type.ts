export type Value = string | number | boolean | undefined;

export interface SingleRadio {
  label?: string;
  value?: Value;

  customProps?: Recordable;
  customSlot?: Recordable;
  customRender?: Recordable;

  disabled?: boolean;
}

export interface BasicRadioProps extends SingleRadio {
  modelValue?: Value;
  options?: SingleRadio[];
  api?: () => Promise<unknown>;
  resultField?: string;
  labelField?: string;
  valueField?: string;

  isButton?: boolean;
}

export interface BasicRadioEmits {
  (e: "update:modelValue", value: Value): void;
  (
    e: "change",
    value: {
      label: string | undefined;
      value: Value;
      option?: SingleRadio;
    }
  ): void;
}
