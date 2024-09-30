import type { FormSchema } from "../type";
import type { FormItemRule } from "element-plus";

import { getPrefix } from "./component-prefix";
import { isArray } from "@center/utils";

const TRIGGER = ["change", "blur"];

function getRequiredRule(formItem: FormSchema): FormItemRule {
  return {
    required: true,
    message: getPrefix(formItem.component) + formItem.label,
  };
}

function getNoWhitespaceRule(formItem: FormSchema): FormItemRule {
  return {
    trigger: TRIGGER,
    whitespace: true,
    message: getPrefix(formItem.component) + formItem.label,
  };
}

function getMinWordRule(formItem: FormSchema): FormItemRule {
  return {
    trigger: TRIGGER,
    min: formItem.min,
    message: `请至少输入${formItem.min}个文字`,
  };
}

function getMaxWordRule(formItem: FormSchema): FormItemRule {
  return {
    trigger: TRIGGER,
    max: formItem.max,
    message: `最多可输入${formItem.max}个文字`,
  };
}

function getMinNumberRule(formItem: FormSchema): FormItemRule {
  return {
    trigger: TRIGGER,
    validator: (_rule, value, callback) => {
      if (
        formItem.min !== undefined &&
        value !== undefined &&
        value <= formItem.min
      ) {
        callback(`数值需大于${formItem.min}`);
      } else {
        callback();
      }
    },
  };
}

function getMaxNumberRule(formItem: FormSchema): FormItemRule {
  return {
    trigger: TRIGGER,
    validator: (_rule, value, callback) => {
      if (
        formItem.max !== undefined &&
        value !== undefined &&
        value >= formItem.max
      ) {
        callback(`数值需小于${formItem.max}`);
      } else {
        callback();
      }
    },
  };
}

function normalizeRule(formItem: FormSchema) {
  const { component, required, noWhitespace, min, max } = formItem;

  const rules = isArray(formItem.rules) ? formItem.rules : [];

  if (required) {
    rules.push(getRequiredRule(formItem));
  }

  if (noWhitespace) {
    rules.push(getNoWhitespaceRule(formItem));
  }

  if (component === "input" || component === "textarea") {
    if (min) {
      rules.push(getMinWordRule(formItem));
    }

    if (max) {
      rules.push(getMaxWordRule(formItem));
    }
  }

  if (component === "input-number") {
    if (min) {
      rules.push(getMinNumberRule(formItem));
    }

    if (max) {
      rules.push(getMaxNumberRule(formItem));
    }
  }

  return {
    ...formItem,
    rules,
  };
}

export { normalizeRule };
