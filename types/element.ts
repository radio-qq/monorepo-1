import type { FormValidateCallback as ElFormValidateCallback, FormItemProp as ElFormItemProp } from 'element-plus';

declare global {
  namespace ElPlus {
    type FormValidateCallback = ElFormValidateCallback;
    type FormItemProp = ElFormItemProp;
    // 其他你常用的类型
  }
}
