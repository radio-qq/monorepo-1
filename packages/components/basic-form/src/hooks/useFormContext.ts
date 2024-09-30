import type { FormInstance, FormValidateCallback } from 'element-plus'

export function useFormContext(formInstance: FormInstance) {
  function getForm() {
    const form = unref(formInstance)
    if (!form) {
      throw new Error(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation'
      )
    }
    return form
  }

  function validate(callback?: FormValidateCallback) {
    return getForm().validate(callback)
  }

  function clearValidate(prop?: Arrayable<string>) {
    getForm().clearValidate(prop)
  }

  function resetFields(prop?: Arrayable<string>) {
    getForm().clearValidate(prop)
  }

  function scrollToField(prop: Arrayable<string>) {
    getForm().scrollToField(prop)
  }

  return {
    validate,
    clearValidate,
    resetFields,
    scrollToField,
  }
}
