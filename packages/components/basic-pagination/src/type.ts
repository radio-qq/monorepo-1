import type { PaginationProps } from "element-plus";

export interface BasicPaginationProps extends PaginationProps {
  modelValue?: Page;
}

export interface BasicPaginationEmits {
  (e: "update:modelValue", pageInfo: Page): void;
  (e: "change", pageInfo: Page): void;
  (e: "current-change", value: number): void;
  (e: "size-change", value: number): void;
}

export interface Page {
  currentPage: number;
  pageSize: number;
  total: number;
}
