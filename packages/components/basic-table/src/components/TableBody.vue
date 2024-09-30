<template>
  <div>
    <el-table
      v-bind="$attrs"
      :data="tableDatas"
      :border="true"
      highlight-current-row
      scrollbar-always-on
    >
      <template #default>
        <slot name="default">
          <!-- 选择栏 -->
          <el-table-column
            v-if="hasSelection"
            key="selection"
            type="selection"
            v-bind="selectionColumnProps"
          />

          <!-- 序号栏 -->
          <el-table-column
            v-if="hasIndex"
            key="index"
            type="index"
            v-bind="indexColumnProps"
          />

          <!-- 展开栏 -->
          <el-table-column
            v-if="hasExpand"
            key="expand"
            type="expand"
            v-bind="expandColumnProps"
          >
            <template #default="scoped">
              <div>
                <slot name="expand" :index="scoped.$index" v-bind="scoped" />
              </div>
            </template>
          </el-table-column>

          <!--数据渲染栏  -->
          <template v-for="column in columns" :key="column.prop">
            <TableColumn :column="column" />
          </template>
        </slot>
      </template>

      <template #append>
        <slot name="append" />
      </template>

      <template #empty>
        <slot name="empty" />
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import type { BasicTableBodyProps, TableSchema } from "../type";

import TableColumn from "./TableColumn.vue";

defineOptions({
  name: "TableBody",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<BasicTableBodyProps>(), {
  data: () => [],
  selectionColumnProps: () => ({}),
  indexColumnProps: () => ({}),
  expandColumnProps: () => ({}),
});

const columns = ref<TableSchema[]>([]);
const tableDatas = ref<TableSchema[]>([]);

watchEffect(() => {
  columns.value = props.schemas.filter((s) => s.visible === true);
  tableDatas.value = props.data;
});
</script>
