<template>
  <div class="basic-table">
    <BasicForm
      v-if="searchSchemas.length"
      v-bind="searchProps"
      v-model="searchParams"
      :schemas="searchSchemas"
      :search-loading="isLoading"
      @search="onSearch"
      @reset="onReset"
    />
    <TableBody
      v-bind="tableProps"
      :schemas="tableSchemas"
      :data="tableDatas"
      :loading="isLoading"
    >
      <template v-for="(_, key) in getSlots" :key="key" #[key]="scope">
        <slot :name="key" v-bind="scope" />
      </template>
    </TableBody>
    <BasicPagination
      v-if="pagination"
      v-bind="paginationProps"
      v-model="page"
      @change="onPageChange"
    />
  </div>
</template>

<script lang="ts" setup>
import type { BasicTableProps, BasicTableEmits } from "./type";
import type { Page } from "@center/components";
import type { Slots } from "vue";

import { DefaultPaginationSettings } from "../../../settings/index";
import { isFunction, isObject } from "@center/utils";
import { cloneDeep } from "@center/utils";

import TableBody from "./components/TableBody.vue";
import { BasicPagination } from "@center/components";

defineOptions({
  name: "BasicTable",
});

const props = withDefaults(defineProps<BasicTableProps>(), {
  schemas: () => [],
  extraParams: () => ({}),
  immediate: true,
  loading: false,
  ellipsis: false,
  pageMap: () => DefaultPaginationSettings.default.pageMap,
  searchProps: () => ({}),
  tableProps: () => ({}),
  paginationProps: () => ({}),
});

const emits = defineEmits<BasicTableEmits>();

const getSlots = useSlots();

const searchSchemas = computed(() => {
  return props.schemas
    .filter((item) => isObject(item.searchConfig))
    .map((item) => item.searchConfig);
});

const searchParams = ref<Recordable>({});

const tableSchemas = computed(() => {
  return props.schemas.filter((item) => item.visible !== false);
});

const tableDatas = ref<Recordable[]>([]);

const isLoading = ref(false);

const page = ref<Page>({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});

const getPageParams = () => ({
  [props.pageMap.currentPage || "currentPage"]: page.value.currentPage,
  [props.pageMap.pageSize || "pageSize"]: page.value.pageSize,
});

const getRequestParams = () => {
  const params = {
    ...props.extraParams,
    ...searchParams.value,
    ...getPageParams(),
  };

  return isFunction(props.paramsFormatter)
    ? props.paramsFormatter(cloneDeep(params))
    : params;
};

const formatResponse = (records: Recordable[]) =>
  isFunction(props.dataFormatter) ? props.dataFormatter(records) : records;

const query = async () => {
  try {
    if (!isFunction(props.request)) {
      return;
    }

    isLoading.value = true;

    const requestParams = getRequestParams();

    const response = await props.request(requestParams);

    tableDatas.value = formatResponse(response?.data?.records);
    page.value.total = response?.data?.total;

    emits("request-complete", tableDatas.value);
  } catch (error: unknown) {
    emits("request-error", error);
  } finally {
    isLoading.value = false;
  }
};

const reQuery = () => {
  page.value.currentPage = 1;
  query();
};

if (props.immediate || isFunction(props.request)) {
  query();
}

const onPageChange = (p: Page) => {
  page.value.currentPage = p.currentPage;
  query();
  emits("pagination-change", p);
};

const onSearch = (params: Recordable) => {
  searchParams.value = params;
  reQuery();
  emits("search", params);
};

const onReset = (params: Recordable) => {
  emits("reset", params);
};
</script>
