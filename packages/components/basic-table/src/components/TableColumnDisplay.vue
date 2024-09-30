<template>
  <div>
    <BasicRender
      v-if="isFunction(schema.render)"
      :render="schema.render"
      v-bind="params"
    />
    <slot
      v-else-if="isString(schema.slot)"
      :name="schema.slot"
      v-bind="params"
    />
    <component
      v-else-if="displayComponent"
      :is="displayComponent"
      v-bind="params"
    />
    <span v-else>
      {{ formattedValue }}
    </span>
    <el-tooltip v-if="schema.tooltip" :content="schema.tooltip" placement="top">
      <el-icon :size="16"><QuestionFilled /></el-icon>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn, TableSchema } from "../type";

import { getComponent } from "../tools/component";
import { isFunction, isString } from "@center/utils";

import { QuestionFilled } from "@element-plus/icons-vue";

defineOptions({
  name: "TableColumnDisplay",
});

interface ColumnDisplayProps {
  type: "header" | "default";
  row?: Recordable;
  column: TableColumn;
  columnIndex: number;
  schema: TableSchema;
}

const props = withDefaults(defineProps<ColumnDisplayProps>(), {
  type: "default",
  schema: () => ({
    prop: "",
    label: "",
  }),
});

const params = computed(() => {
  return {
    row: props.row || {},
    column: props.column,
    columnIndex: props.columnIndex,
    schema: props.schema,
    value:
      props.type === "header" && props.row
        ? props.row[props.schema.prop]
        : props.schema.label,
  };
});

const formattedValue = computed(() => {
  if (isFunction(props.schema.formatter)) {
    return props.schema.formatter(params.value);
  }

  return params.value;
});

const displayComponent = computed(() =>
  props.schema.displayType ? getComponent(props.schema.displayType) : "span"
);
</script>
