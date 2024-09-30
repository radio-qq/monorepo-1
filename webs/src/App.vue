<template>
  <el-config-provider>
    <BaseHeader />
    <div class="text-red text-[28px] bold">
      <div></div>
    </div>
    <div class="flex main-container">
      <BaseSide />
      <!-- <MyButton /> -->
      <BasicStatus
        :list="[
          {
            content: '数组-1',
            type: 'primary',
          },
          {
            content: '数组-2',
            type: 'success',
          },
          {
            content: '数组-3',
            color: '#f0e291',
          },
        ]"
      />
      <div w="full" m="1.5" bg-white>
        <!-- <BasicStatus>示例-2</BasicStatus> -->
        <!-- <BasicForm
          v-model="formModel"
          @register="registerForm"
          @change="handleChange"
          @submit="handleSubmit"
          @reset="handleReset"
        /> -->
        <!-- ???
        <BasicForm
          @register="registerFormTwo"
          @change="handleChange"
          @submit="handleSubmit"
          @reset="handleReset"
        /> -->
        <!-- <BasicRender :schemas="schemasTable" /> -->
      </div>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
// import { FormSchema, useForm } from "@/components/basic-form";
// import { TableSchema } from "@/components/basic-table";
// import { BasicRender } from "@/components/basic-render";
import { BasicStatus } from "@center/components";

const formModel = ref({
  status: "0",
  name: "",
  rate: 2,
  progress: 100,
  switch: true,
  time: new Date().toString(),
  endTime: [],
  img: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
});

const schemas: FormSchema[] = [
  {
    label: "名称",
    prop: "name",
    component: "input",
    rules: [
      {
        required: true,
        message: "请输入名称111",
      },
    ],
  },
  {
    label: "标题",
    prop: "nameee",
    component: "sub-title",
  },
  {
    label: "名称",
    prop: "nameeeee",
    component: "input",
    hasLabel: false,
    rules: [
      {
        required: true,
        message: "请输入名称111",
      },
    ],
  },
  {
    label: "√状态select",
    prop: "tag",
    component: "select",
    rules: [
      {
        required: true,
        message: "请输入标签",
      },
    ],
    componentProps: {
      options: [
        {
          label: "未解决",
          value: "0",
          color: "red",
        },
        {
          label: "已解决",
          value: "1",
          color: "blue",
        },
        {
          label: "解决中",
          value: "2",
          color: "yellow",
        },
        {
          label: "失败",
          value: "3",
          color: "red",
        },
      ],
    },
  },
  {
    label: "评分",
    prop: "rate",
    component: "rate",
  },
  {
    label: "是否显示",
    prop: "switch",
    component: "switch",
  },
  {
    label: "时间",
    prop: "time",
    component: "date-picker",
  },
  {
    label: "数量",
    prop: "number",
    component: "input-number",
  },
  {
    label: "√要求",
    prop: "demand",
    component: "checkbox",
    componentProps: {
      options: [
        {
          label: "四六级",
          value: "0",
        },
        {
          label: "计算机二级证书",
          value: "1",
        },
        {
          label: "普通话证书",
          value: "2",
        },
      ],
    },
  },
  {
    label: "梦想",
    prop: "gift",
    component: "radio",
    componentProps: {
      options: [
        {
          label: "诗",
          value: "0",
        },
        {
          label: "远方",
          value: "1",
        },
        {
          label: "美食",
          value: "2",
        },
      ],
    },
  },
  {
    label: "到期时间",
    prop: "endTime",
    component: "date-picker",
    componentProps: {
      type: "datetimerange",
      startPlaceholder: "请选择开始时间",
      endPlaceholder: "请选择结束时间",
    },
  },
  {
    label: "说明",
    prop: "desc",
    component: "textarea",
    componentProps: {
      maxlength: 10,
      showWordLimit: true,
      autosize: { minRows: 2, maxRows: 4 },
    },
  },
];

// const [registerForm] = useForm({
//   schemas,
// });

const schema2: FormSchema[] = [
  {
    label: "说明-1",
    prop: "desc1",
    component: "textarea",
    rules: [
      {
        required: true,
        message: "请输入标签",
      },
    ],
  },
  {
    label: "说明-2",
    prop: "desc22",
    component: "textarea",
  },
];

// const [registerFormTwo] = useForm({
//   schemas: schema2,
// });

// console.log('methods:', methods)

const handleChange = (values: Recordable) => {
  console.log("值改变 change", values);
};

const handleSubmit = (values: Recordable) => {
  console.log("表单提交", values);
};

const handleReset = () => {
  console.log("重置表单", "handleReset");
};

const schemasTable: TableSchema[] = [
  {
    label: "测试-link",
    prop: "link",
  },
  {
    label: "测试-tag",
    prop: "tag",
  },
  {
    label: "测试-progress",
    prop: "progress",
  },
  {
    label: "searchable",
    prop: "justinput",
    searchable: true,
  },
  {
    label: "searchConfig-select作为搜索",
    prop: "select",
    searchConfig: {
      label: "测试-select作为搜索",
      prop: "select",
      component: "select",
      componentProps: {
        options: [
          {
            label: "诗",
            value: "0",
          },
          {
            label: "远方",
            value: "1",
          },
          {
            label: "美食",
            value: "2",
          },
        ],
      },
    },
  },
  {
    label: "操作列",
    prop: "action",
    slot: "action",
  },
];
</script>

<style>
#app {
  color: var(--ep-text-color-primary);
  background: #f0f2f5;
}

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 3px);
}

::-webkit-scrollbar-track-piece {
  background-color: transparent;
}
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: hsla(220, 4%, 58%, 0.3);
}
</style>
