<template>
  <div class="copy-container">
    <span>{{ content }}</span>

    <!-- 复制图标 -->
    <el-icon @click="copyToClipboard" class="copy-btn"
      ><DocumentCopy
    /></el-icon>
    <!-- 动画提示 -->
    <span v-if="showCopyAnimation" class="copy-animation"> 已复制! </span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { DocumentCopy } from '@element-plus/icons-vue'
// 要复制的内容
const content = ref('复制的文本内容111')

// 控制动画显示的状态
const showCopyAnimation = ref(false)

// 复制内容到剪贴板
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(content.value) // 复制文本
    showCopyAnimation.value = true

    // 2秒后隐藏动画提示
    setTimeout(() => {
      showCopyAnimation.value = false
    }, 2000)
  } catch (error) {
    console.error('复制失败:', error)
  }
}
</script>

<style scoped>
.copy-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.copy-btn {
  cursor: pointer;
  /* background-color: #4caf50; */
  /* border: none;
  padding: 5px 10px;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s; */
}

.copy-animation {
  font-size: 14px;
  color: #4caf50;
  animation: fadeInOut 2s ease-in-out;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  10% {
    opacity: 1;
    transform: translateY(0);
  }
  90% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
