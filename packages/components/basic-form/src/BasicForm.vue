<template>
  <el-form
    ref="formInstance"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :label-suffix="labelSuffix"
    :model="formModel"
  >
    {{ formModel }} ??
    <el-row v-bind="rowProps">
      <template v-for="schemaItem in formSchema">
        <template v-if="schemaItem.component === 'sub-title'">
          <el-col :key="schemaItem.prop" class="mb-3 ml-8 font-bold text-lg">
            {{ schemaItem.label }}
          </el-col>
        </template>
        <template v-else>
          <el-col
            v-if="getVIf(schemaItem)"
            v-bind="getColProps(schemaItem)"
            :key="schemaItem.prop"
          >
            <el-form-item
              v-bind="schemaItem.formItemProps"
              :label="getLabel(schemaItem)"
              :prop="schemaItem.prop"
              :rules="schemaItem.rules"
            >
              <slot
                v-if="schemaItem.slot"
                :name="schemaItem.slot"
                :model="formModel"
                style="width: 100%"
              />
              <component
                :is="getComponent(schemaItem.component)"
                v-else
                v-bind="schemaItem.componentProps"
                v-model="formModel[schemaItem.prop]"
                style="width: 100%"
                @change="(...v: unknown[]) => onChange(v, schemaItem)"
              />
              <div v-if="getVIfMax(schemaItem)" style="text-align: right">
                {{ getMaxLimitText(schemaItem) }}
              </div>
            </el-form-item>
          </el-col>
        </template>
      </template>
    </el-row>
    <el-form-item v-if="hasFooter">
      <slot name="footer" v-bind="{ handleReset, handleSubmit }">
        <el-button v-if="hasReset" @click="handleReset">
          {{ resetText }}
        </el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit">
          {{ submitText }}
        </el-button>
      </slot>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import type {
  BasicFormProps,
  BasicFormEmits,
  FormSchema,
  FormAction,
} from "./type";
import type { FormInstance } from "element-plus";

import { getComponent } from "./tools/component";
import { isFunction, isUndefined } from "@center/utils";
import { merge } from "lodash-es";

defineOptions({
  name: "BasicForm",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<BasicFormProps>(), {
  model: () => ({}),
  schemas: () => [],
  loading: false,

  rowProps: () => ({}),
  colProps: () => ({ span: 13 }),
  formItemProps: () => ({}),

  hasLabel: true,
  labelSuffix: ":",
  labelWidth: "80px",
  labelPosition: "left",

  hasFooter: true,
  hasReset: true,
  resetText: "重置",
  submitText: "提交111",

  hasErrorTip: true,
});

const emits = defineEmits<BasicFormEmits>();

const formInstance = ref<FormInstance>();
const formProps = ref<Partial<BasicFormProps>>();
const formSchema = ref<FormSchema[]>([]);
const formModel = ref<Recordable>({});
const defaultFormModel = ref<Recordable>({});

const getProps = computed(() => {
  return { ...props, ...unref(formProps) } as BasicFormProps;
});

watchEffect(() => {
  formSchema.value = getProps.value.schemas;
  formModel.value = getProps.value.model || {};
  defaultFormModel.value = setDefaultFormModel(getProps.value.schemas);
});

function setProps(props: Partial<BasicFormProps>) {
  formProps.value = merge(unref(formProps) || {}, props);
}

function setDefaultFormModel(schemas: FormSchema[]) {
  return schemas.reduce(
    (acc, cur) =>
      cur.defaultValue
        ? {
            ...acc,
            [cur.prop]: [cur.defaultValue],
          }
        : acc,
    {}
  );
}

function getVIf(schemaItem: FormSchema) {
  const { vIf } = schemaItem;

  if (isUndefined(vIf)) {
    return true;
  }

  if (isFunction(vIf)) {
    return vIf(formModel.value, schemaItem);
  }
}

function getColProps(schemaItem: FormSchema) {
  return schemaItem.colProps || props.colProps;
}

function getLabel(schemaItem: FormSchema) {
  const hasLabel = isUndefined(schemaItem.hasLabel)
    ? props.hasLabel
    : schemaItem.hasLabel;
  return hasLabel ? schemaItem.label : "";
}

function getVIfMax(schemaItem: FormSchema) {
  return (
    (schemaItem.component === "input" || schemaItem.component === "textarea") &&
    schemaItem.max
  );
}

function getMaxLimitText(schemaItem: FormSchema) {
  return (
    ((formModel.value[schemaItem.prop] as string)?.length || 0) +
    "/" +
    schemaItem.max
  );
}

const onChange = (e: unknown, schemaItem: FormSchema) => {
  emits("change", e, schemaItem);
};

const handleReset = () => {
  formInstance.value?.clearValidate();
};

const handleSubmit = async () => {
  try {
    const valid = await formInstance.value?.validate();
    if (valid) {
      emits("submit", formModel.value);
    }
  } catch (error: unknown) {
    console.error("表单提交错误", error);
  }
  return false;
};

const formActionType: FormAction = {
  setProps,
};

defineExpose({
  ...formActionType,
});

onMounted(() => {
  emits("register", formActionType);
});
</script>
