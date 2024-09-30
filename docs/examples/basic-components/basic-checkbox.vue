<template>
  <div>
    <el-checkbox v-model="checked1" label="Option 1" size="large" />
    <BasicCheckbox></BasicCheckbox>
    <br />
  </div>
</template>

<script setup lang="ts">
import { BasicCheckbox } from "@center/components";

const checked1 = ref();
</script>
