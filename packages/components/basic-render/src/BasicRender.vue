<template>
  <component :is="renderComponent" v-bind="customFieldProps" />
</template>

<script lang="ts" setup>
import type { BasicRenderProps, PlusColumn } from "./type";
import type { VNode } from "vue";

import { isVNode } from "vue";
import { isString } from "@center/utils";

defineOptions({
  name: "PlusRender",
});

const props = withDefaults(defineProps<BasicRenderProps>(), {
  callbackValue: "",
  customFieldProps: () => ({}),
  params: () => ({}),
});

const state = ref();

watch(
  () => props.callbackValue,
  (val) => {
    state.value = val;
  },
  {
    flush: "post",
    immediate: true,
  }
);

/**
 * 渲染自定义
 */
const renderComponent = () => {
  if (!props.render) return;

  /** params 回调第二个参数值 */
  const params = { ...props.params } as PlusColumn;

  /** dynamicComponent 组件 */
  const dynamicComponent = (props.render as (...arg: any[]) => any)(
    state.value,
    params
  );

  /** VNode / J(T)SX  虚拟dom或者jsx */
  if (isVNode(dynamicComponent)) {
    const payload = {
      ...props.customFieldProps,
      ...dynamicComponent.props,
    };

    return {
      ...dynamicComponent,
      props: payload,
    } as VNode;
  } else if (isString(dynamicComponent)) {
    return dynamicComponent;
  }
};
</script>
