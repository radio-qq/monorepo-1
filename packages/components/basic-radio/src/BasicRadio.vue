<template>
  <template v-if="isSingleRadio">
    <el-radio
      v-model="stateLabel"
      v-bind="$attrs"
      :label="props.label"
      :disabled="props.disabled"
      @click.native.prevent="toggle(props.label)"
    />
  </template>
  <template v-else>
    <el-radio-group v-bind="$attrs" v-model="stateLabel">
      <template v-if="isButton">
        <el-radio-button
          v-for="(item, index) in stateOptions"
          v-bind="item"
          :key="index"
          @click.native.prevent="handleClick(index)"
        />
      </template>
      <template v-else>
        <template v-for="(item, index) in stateOptions" :key="index">
          <template v-if="item.customRender">
            <el-radio
              v-bind="item.customProps"
              :label="item.label"
              :value="item.value"
              @click.native.prevent="handleClick(index)"
            >
              <component :is="item.customRender"></component> </el-radio
          ></template>
          <template v-else>
            <el-radio
              v-bind="item.customProps"
              :label="item.label"
              :value="item.value"
              @click.native.prevent="handleClick(index)"
            >
              <component :is="item.customRender"></component>
            </el-radio>
          </template>
        </template>
      </template>
    </el-radio-group>
  </template>
</template>

<script lang="ts" setup>
import { BasicRadioProps, BasicRadioEmits, Value, SingleRadio } from "./type";

import { computed, onMounted, ref, watch } from "vue";

import {
  isFunction,
  isArray,
  getValue,
  mapObjectArrayFields,
} from "@center/utils";

defineOptions({
  name: "BasicRadio",
});

const props = withDefaults(defineProps<BasicRadioProps>(), {});

const emit = defineEmits<BasicRadioEmits>();

const stateLabel = ref<string>();
const stateValue = ref<Value>();
const stateOptions = ref<SingleRadio[]>([]);

watch(
  () => props.modelValue,
  () => {
    stateValue.value = props.modelValue;

    const label = stateOptions.value.find(
      (s) => s.value === props.modelValue
    )?.label;
    stateLabel.value = label;
  }
);

const init = () => {
  if (isArray(props.options)) {
    stateOptions.value = props.options;
    return;
  }

  if (!isArray(props.options) && props.label) {
    stateOptions.value = [
      {
        label: props.label,
        value: props.value || props.label,
      },
    ];
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
    const datas = props.resultField
      ? getValue(result, props.resultField)
      : result;

    stateOptions.value = handleResult(datas);
  } catch (error) {
    console.error("BasicRadio query error:", error);
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

  return options;
};

const handleClick = (index: number) => {
  const option = stateOptions.value[index];

  const { label, value, customProps: { disabled } = {} } = option;

  if (disabled === true) {
    return;
  }

  const flag = stateLabel.value === label;

  stateLabel.value = flag ? undefined : label;
  stateValue.value = flag ? "" : value;

  emit("update:modelValue", stateValue.value);
  emit("change", {
    label,
    value,
    option: flag ? {} : option,
  });
};

const isSingleRadio = computed(() => {
  return props.label;
});

const toggle = (label) => {
  console.log("props.disabled:", props.disabled);

  if (props.disabled === true) {
    return;
  }

  const flag = stateLabel.value === label;

  stateLabel.value = flag ? undefined : label;
  stateValue.value = flag ? "" : props.value || props.label;

  emit("update:modelValue", stateValue.value);
  emit("change", {
    label,
    value: props.value || props.label,
  });
};
</script>
