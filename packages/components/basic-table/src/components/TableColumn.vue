<template>
  <div>
    <el-table-column
      v-if="schema"
      v-bind="schema.columnProps"
      :label="schema.label"
      :prop="schema.prop"
      :width="schema.width"
    >
      <template #header="{ column, $index }">
        <TableColumnDisplay
          type="header"
          v-bind="{ column, columnIndex: $index, schema }"
        />
      </template>
      <template #default="{ row, column, $index }">
        <TableColumnDisplay
          type="default"
          v-bind="{ row, column, columnIndex: $index, schema }"
        />
      </template>
    </el-table-column>
  </div>
</template>

<script lang="ts" setup>
import type { TableSchema } from "../type";

import TableColumnDisplay from "./TableColumnDisplay.vue";

defineOptions({
  name: "TableColumn",
});

interface TableColumnProps {
  schema?: TableSchema;
}

const props = withDefaults(defineProps<TableColumnProps>(), {
  schema: undefined,
});
</script>
