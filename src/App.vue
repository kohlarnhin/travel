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
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 暗色模式滚动条 */
.dark ::-webkit-scrollbar-track {
  background: #374151;
}

.dark ::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* 选择文本颜色 */
::selection {
  background-color: #0ea5e9;
  color: white;
}

/* 焦点样式 */
:focus-visible {
  outline: 2px solid #0ea5e9;
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
