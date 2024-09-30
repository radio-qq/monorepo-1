<template>
  <div>
    <el-checkbox-group v-bind="$attrs" v-model="stateValue" @change="onChange">
      <el-checkbox
        v-for="item in stateOptions"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      />
    </el-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";

import { mapObjectArrayFields } from "@center/utils";
import { isFunction, isArray, get } from "lodash";

type Options = {
  label: string;
  value: string;
}[];

type Props = {
  value: string | number | unknown;
  options: Options;
  isFreeze: boolean;
  api: () => Promise<unknown>;
  resultField: string;
  labelField: string;
  valueField: string;
};

const props = withDefaults(defineProps<Props>(), {
  isFreeze: true,
});

type Emits = {
  (e: "update:modelValue", value: unknown): void;
  (e: "change", value: unknown): void;
};

const emits = defineEmits<Emits>();

const stateValue = ref();
const stateOptions = ref<Options>();

watch(
  () => props.value,
  (newVal) => {
    stateValue.value = newVal;
  },
  { immediate: true }
);

const init = () => {
  if (isArray(props.options)) {
    stateOptions.value = props.options;
    return;
  }

  query();
};

onMounted(() => {
  init();
});

const query = async () => {
  try {
    if (!isFunction(props.api)) {
      return;
    }

    const result = await props.api();
    const datas = props.resultField ? get(result, props.resultField) : result;
    stateOptions.value = handleResult(datas);
  } catch (error) {
    console.error("BasicCheckbox query error:", error);
  }
};

const handleResult = (options: unknown[]) => {
  if (!isArray(options)) {
    return [];
  }

  if (props.labelField && props.valueField) {
    return mapObjectArrayFields(options, {
      label: props.labelField,
      value: props.valueField,
    });
  }
};

const onChange = (value: unknown) => {
  emits("update:modelValue", value);
  emits("change", value);
};
</script>
