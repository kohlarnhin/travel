<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
// 主应用组件，所有路由通过这里渲染
</script>

<style>
/* 全局样式重置和基础样式 */
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  min-height: 100vh;
  font-family: 'Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(135deg, #fef7ed 0%, #fed7aa 100%);
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #fef7ed;
}

::-webkit-scrollbar-thumb {
  background: #f97316;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ea580c;
}

/* 移除暗色模式滚动条，保持明亮风格 */

/* 选择文本颜色 */
::selection {
  background-color: #f97316;
  color: white;
}

/* 焦点样式 */
:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 2px;
}

/* 链接样式重置 */
a {
  color: inherit;
  text-decoration: none;
}

/* 按钮样式重置 */
button {
  border: none;
  background: none;
  cursor: pointer;
}

/* 输入框样式重置 */
input,
textarea {
  border: none;
  outline: none;
  background: none;
}

/* 图片响应式 */
img {
  max-width: 100%;
  height: auto;
}
</style>
