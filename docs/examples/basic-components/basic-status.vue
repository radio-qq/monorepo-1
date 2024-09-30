<template>
  <div>
    <BasicStatus>示例-1</BasicStatus>
    <br />

    <BasicStatus content="示例-2" type="warning" />
    <br />

    <BasicStatus content="示例-3" color="#a54ee4" />
    <br />

    为什么contents 数组形式的话无法展示？？？？
    <br />

    <BasicStatus
      :contents="[
        {
          content: '数组-11111',
          type: 'primary',
        },
        {
          content: '数组-222222',
          type: 'success',
        },
        {
          content: '数组-3',
          color: '#f0e291',
        },
      ]"
    />
    <br />
  </div>
</template>

<script setup lang="ts">
import { BasicStatus } from "@center/components";
</script>
