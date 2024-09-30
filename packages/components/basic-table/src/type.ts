import type { TableProps, PaginationProps, TableColumnCtx } from "element-plus";

import type { BasicFormProps, FormSchema } from "@center/components";
import type { Page } from "@center/components";

export type PageMap = {
  [K in keyof Pick<Page, "pageSize" | "currentPage">]: string;
};

export interface BasicTableProps {
  schemas: TableSchema[];
  tableDatas?: Array<Recordable>;
  request?: (params: Recordable) => Promise<{
    data: {
      records: Array<Recordable>;
      total: number;
    };
  }>;
  pageMap?: PageMap;
  extraParams?: Recordable;
  paramsFormatter?: (params: Recordable) => Recordable;
  dataFormatter?: (tableDatas: Array<Recordable>) => Array<Recordable>;
  immediate?: boolean;
  loading?: boolean;
  ellipsis?: boolean;

  searchProps?: Partial<BasicFormProps>;
  tableProps?: Partial<TableProps<unknown>>;
  paginationProps?: Partial<PaginationProps>;

  hasSelection: boolean;
  selectionColumnProps: Recordable;

  hasIndex: boolean;
  indexColumnProps: Recordable;

  hasExpand: boolean;
  expandColumnProps: Recordable;
}

export interface BasicTableEmits {
  (e: "search", params: Recordable): void;
  (e: "reset", params: Recordable): void;
  (e: "pagination-change", page: Page): void;
  (e: "request-error", error: unknown): void;
  (e: "request-complete", tableDatas: Array<Recordable>): void;
}

export type BasicTableBodyProps = Pick<
  BasicTableProps,
  | "schemas"
  | "dataFormatter"
  | "tableProps"
  | "hasSelection"
  | "selectionColumnProps"
  | "hasIndex"
  | "indexColumnProps"
  | "hasExpand"
  | "expandColumnProps"
>;

export type RenderType = string | VNode | JSX.Element | Component;

export type DisplayType =
  | "img"
  | "link"
  | "tag"
  | "progress"
  | "copy"
  | "status";

export interface TableColumn extends TableColumnCtx<any> {}

export interface TableSchema {
  prop: string;
  label: string;
  width?: string | number;
  visible?: boolean;
  tooltip?: string;
  formatter?: (params: {
    row: Recordable;
    column: TableColumn;
    columnIndex: number;
    schema: TableSchema;
  }) => string;

  searchable?: boolean;
  searchConfig?: FormSchema;

  columnProps?: Recordable;
  columnSlots?: Recordable;

  renderHeader?: (label: string, props: TableSchema) => RenderType;
  slotHeader?: string;

  render?: (
    value: any,
    data: { row: Recordable; column: TableSchema; index: number }
  ) => RenderType;
  slot?: string;

  displayType?: DisplayType;
  displayProps?: Recordable;
}
