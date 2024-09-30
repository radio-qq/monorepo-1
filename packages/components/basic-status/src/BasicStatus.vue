<template>
  <span
    :class="ns.b()"
    v-for="({ type, color, content }, index) in getContents"
    :key="index"
  >
    <div
      :class="[ns.e('circle'), ns.em('circle', type)]"
      :style="{
        backgroundColor: color,
      }"
    />
    <span :class="ns.e('text')">
      <slot>{{ content }}</slot>
    </span>
  </span>
</template>

<script lang="ts" setup>
import { BasicStatusProps } from "./type";
import { computed } from "vue";

import { useBasicNamespace } from "@center/utils";

defineOptions({
  name: "BasicStatus",
});

const props = withDefaults(defineProps<BasicStatusProps>(), {
  content: "",
  type: "primary",
});

const ns = useBasicNamespace("status");

const getContents = computed(() =>
  Array.isArray(props.contents)
    ? props.contents
    : [{ content: props.content, type: props.type, color: props.color }]
);
</script>

<style lang="scss" scoped>
@use "./style.scss";
</style>
