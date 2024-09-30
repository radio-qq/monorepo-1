<template>
  <template>
    <!--has slots  -->
    <component
      :is="isTagAndNoValue ? 'span' : displayComponent.component"
      v-if="displayComponent.hasSlots"
      :class="['plus-display-item', displayComponent.class]"
      v-bind="{ ...renderParams, ...displayComponentProps }"
    >
      <template
        v-for="(fieldSlot, key) in column.fieldSlots"
        :key="key"
        #[key]="data"
      >
        <component
          :is="fieldSlot"
          :value="displayValue"
          v-bind="{ ...renderParams, ...data }"
        />
      </template>

      {{ formatterValue }}
    </component>
    <!--no slots  -->
  </template>
</template>

<script lang="ts" setup>
import { cloneDeep } from "lodash-es";

import { isArray, isString } from "@center/utils";

import type { Ref } from "vue";
import { ref, watch, computed } from "vue";
import type {
  PlusColumn,
  RecordType,
  FieldValueType,
  FieldValues,
  OptionsRow,
} from "@plus-pro-components/types";

export interface PlusDisplayItemProps {
  column: PlusColumn;
  row: RecordType;
  index?: number;
  editable?: boolean | "click" | "dblclick";
  rest?: RecordType;
}
export interface PlusTableTableColumnEmits {
  (
    e: "change",
    data: { value: FieldValueType; prop: string; row: RecordType }
  ): void;
}

defineOptions({
  name: "PlusDisplayItem",
});

const props = withDefaults(defineProps<PlusDisplayItemProps>(), {
  column: () => ({ prop: "", label: "" }),
  row: () => ({}),
  index: 0,
  editable: false,
  rest: () => ({}),
});
const emit = defineEmits<PlusTableTableColumnEmits>();

const customFieldProps = ref<RecordType>({});
const formInstance = ref();
// const { customOptions: options } = useGetOptions(props.column);
const { customOptions: options } = { options: [] };

const columns: Ref<PlusColumn[]> = ref([]);
const subRow = ref(cloneDeep(props.row));
const statusValueTypes: (string | undefined)[] = [
  "select",
  "radio",
  "checkbox",
];

watch(
  () => props.row,
  (val) => {
    subRow.value = cloneDeep(val);
  },
  {
    deep: true,
  }
);

/** 多层值支持，原始值 */
const displayValue = computed({
  get() {
    return subRow.value[props.column.prop];
  },
  set(value) {
    // setValue(subRow.value, props.column.prop, value);
  },
});

/** 格式化后的值  */
const formatterValue = computed(() => {
  //  link 支持统一字段
  const value =
    props.column.displayType === "link"
      ? props.column.linkText || displayValue.value
      : displayValue.value;

  // 格式化，不包含状态类型和表单
  if (!statusValueTypes.includes(props.column.displayType)) {
    // formatter 第一优先
    if (props.column.formatter && isFunction(props.column.formatter)) {
      return props.column.formatter(value, renderParams.value);
    }

    // 自身的 format，日期和金钱
    if (
      displayComponent.value.format &&
      isFunction(displayComponent.value.format)
    ) {
      return displayComponent.value.format(
        value,
        customFieldProps.value.format || customFieldProps.value.valueFormat
      );
    }
  }

  return value;
});

/**
 * tag 没有值的时候不渲染
 */
const isTagAndNoValue = computed(
  () =>
    props.column.displayType === "tag" &&
    (displayValue.value === undefined ||
      displayValue.value === null ||
      displayValue.value === "")
);

const renderParams = computed(() => ({
  row: props.row,
  column: props.column,
  columnIndex: props.columnIndex,
  schema: props.schema,
  schema: props.schema,

  rowIndex: props.index,
  fieldProps: customFieldProps.value,
  ...props.rest,
  column: { ...props.rest.column, ...props.column },
}));

const imageUrl = computed(() => {
  const option = formatterValue.value;
  if (option && isString(option)) {
    return { options: [option], url: option };
  }
  if (isArray(option)) {
    return { options: option, url: option[0] };
  }
  return { options: [], url: "" };
});

const getStatus = computed(() => {
  // 自定义
  if (
    props.column?.customGetStatus &&
    isFunction(props.column?.customGetStatus)
  ) {
    const option = props.column?.customGetStatus({
      options: options.value,
      value: displayValue.value,
      row: subRow.value,
    });

    return option;
  }

  if (
    // select 多选
    (props.column.displayType === "select" &&
      customFieldProps.value.multiple === true) ||
    // checkbox
    props.column.displayType === "checkbox"
  ) {
    const option =
      options.value?.filter((i) => displayValue.value?.includes(i.value)) || [];
    return option;
  }

  // 单选
  const option: OptionsRow | OptionsRow[] | undefined = options.value?.find(
    (i) => i.value === displayValue.value
  ) || { label: "", value: "" };

  return option;
});

// const displayComponent = computed(() =>
//   getDisplayComponent(props.column.displayType) || {}
// );
const displayComponent = computed(() => {});

const displayComponentProps = computed<any>(() => {
  return {
    // img
    ...(props.column.displayType === "img"
      ? {
          fit: "cover",
          previewTeleported: true,
          src: imageUrl.value.url,
          previewSrcList:
            props.column.preview !== false ? imageUrl.value.options : [],
        }
      : null),
    // progress
    ...(props.column.displayType === "progress"
      ? {
          percentage: formatterValue.value,
        }
      : null),
    // link
    ...(props.column.displayType === "link"
      ? {
          type: "primary",
        }
      : null),
    // avatar
    ...(props.column.displayType === "avatar"
      ? {
          src: formatterValue.value,
        }
      : null),
    ...customFieldProps.value,
  };
});

watch(
  () => props.column,
  (val) => {
    if (val) {
      columns.value = [val as PlusColumn];
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

watch(
  () => props.column.fieldProps,
  (val) => {
    // getCustomProps(
    //   val,
    //   displayValue.value,
    //   subRow.value,
    //   props.index,
    //   "fieldProps"
    // )
    //   .then((data) => {
    //     customFieldProps.value = data;
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });
  },
  {
    immediate: true,
    deep: true,
  }
);

watch(
  () => props.row,
  (val) => {
    subRow.value = { ...val };
  },
  {
    deep: true,
  }
);

const copy = (data: string) => {
  const url = data;
  const textarea = document.createElement("textarea");
  textarea.readOnly = true;
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  textarea.value = url;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("Copy");
  textarea.remove();
};

const handelClickCopy = (item: PlusColumn, row: RecordType) => {
  copy(row[item.prop]);
  row.isCopy = true;
  setTimeout(() => {
    row.isCopy = false;
  }, 3000);
};
</script>
