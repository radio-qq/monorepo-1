export interface BasicRenderProps {
  callbackValue?: unknown;
  customFieldProps?: PlusColumn["fieldProps"] | PlusColumn["formItemProps"];
  render?: PlusColumn["renderField"] | ((...arg: any[]) => void);
  params?: Partial<PlusColumn>;
  handleChange?: (...arg: any[]) => void;
}
