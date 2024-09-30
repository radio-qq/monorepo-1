<template>
  <el-pagination
    v-bind="getAttrs"
    :current-page="page.currentPage"
    :page-size="page.pageSize"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
import type { BasicPaginationProps, BasicPaginationEmits, Page } from "./type";

import { DefaultPaginationSettings } from "../../../settings/index";

defineOptions({
  name: "BasicPagination",
});

const props = withDefaults(defineProps<BasicPaginationProps>(), {
  modelValue: () => ({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  }),
});

const emits = defineEmits<BasicPaginationEmits>();

const getAttrs = computed(() => ({
  ...DefaultPaginationSettings,
  ...(useAttrs() || {}),
}));

const page = ref<Page>({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});

watchEffect(() => {
  page.value = { ...props.modelValue };
});

const handleEmit = () => {
  emits("update:modelValue", page.value);
  emits("change", page.value);
};

const handleCurrentChange = (p: number) => {
  page.value.currentPage = p;
  handleEmit();
  emits("current-change", p);
};

const handleSizeChange = (s: number) => {
  page.value.pageSize = s;
  page.value.currentPage = 1;
  handleEmit();
  emits("size-change", s);
};
</script>
