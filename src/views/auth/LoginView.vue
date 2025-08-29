<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <RouterLink to="/" class="inline-flex items-center space-x-2 mb-6">
          <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
            <span class="text-white font-bold">F</span>
          </div>
          <span class="text-2xl font-bold text-gray-900 dark:text-white">FrontApp</span>
        </RouterLink>
        
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
          欢迎回来
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          登录您的账户以继续使用
        </p>
      </div>

      <!-- Login Form -->
      <div class="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-8">
        <el-form
          ref="formRef"
          :model="loginForm"
          :rules="formRules"
          label-position="top"
          size="large"
          class="space-y-6"
          @submit.prevent="handleLogin"
        >
          <!-- Username -->
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              :prefix-icon="UserIcon"
              clearable
              @keyup.enter="handleLogin"
            />
          </el-form-item>

          <!-- Password -->
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="LockClosedIcon"
              show-password
              clearable
              @keyup.enter="handleLogin"
            />
          </el-form-item>

          <!-- Remember & Forgot -->
          <div class="flex items-center justify-between">
            <el-checkbox v-model="loginForm.remember">
              记住我
            </el-checkbox>
            <RouterLink 
              to="/forgot-password"
              class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              忘记密码？
            </RouterLink>
          </div>

          <!-- Submit Button -->
          <el-form-item>
            <el-button
              type="primary"
              size="large"
              :loading="userStore.isLoading"
              class="w-full"
              @click="handleLogin"
            >
              {{ userStore.isLoading ? '登录中...' : '登录' }}
            </el-button>
          </el-form-item>
        </el-form>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              或者
            </span>
          </div>
        </div>

        <!-- Social Login -->
        <div class="grid grid-cols-2 gap-3">
          <el-button class="w-full" @click="handleSocialLogin('github')">
            <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </el-button>
          
          <el-button class="w-full" @click="handleSocialLogin('wechat')">
            <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.111.24-.248 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01.181-.556c1.52-1.186 2.506-2.925 2.506-4.877 0-3.208-2.861-5.895-6.069-5.861zm-2.232 3.436c.414 0 .75.336.75.751 0 .414-.336.75-.75.75s-.75-.336-.75-.75c0-.415.336-.751.75-.751zm4.512 0c.414 0 .75.336.75.751 0 .414-.336.75-.75.75s-.75-.336-.75-.75c0-.415.336-.751.75-.751z"/>
            </svg>
            微信
          </el-button>
        </div>

        <!-- Sign Up Link -->
        <div class="text-center mt-6">
          <span class="text-sm text-gray-600 dark:text-gray-400">
            还没有账户？
          </span>
          <RouterLink 
            to="/register"
            class="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 ml-1"
          >
            立即注册
          </RouterLink>
        </div>
      </div>

      <!-- Demo Account Info -->
      <div class="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
        <div class="flex items-start">
          <InformationCircleIcon class="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-3 flex-shrink-0" />
          <div class="text-sm">
            <p class="text-primary-800 dark:text-primary-200 font-medium mb-1">
              演示账户信息
            </p>
            <p class="text-primary-700 dark:text-primary-300">
              用户名：<code class="bg-primary-100 dark:bg-primary-800 px-1 rounded">admin</code>
              密码：<code class="bg-primary-100 dark:bg-primary-800 px-1 rounded">123456</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { UserIcon, LockClosedIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
import { useUserStore } from '@/stores/user'
import type { LoginForm } from '@/types'

// Store and Router
const userStore = useUserStore()
const router = useRouter()

// Form Reference
const formRef = ref<FormInstance>()

// Form Data
const loginForm = reactive<LoginForm>({
  username: '',
  password: '',
  remember: false
})

// Form Validation Rules
const formRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应在3-20个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少6位', trigger: 'blur' }
  ]
}

// Methods
const handleLogin = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    
    const result = await userStore.login(loginForm)
    
    if (result.success) {
      ElMessage.success(result.message)
      
      // 跳转到首页或之前的页面
      const redirect = router.currentRoute.value.query.redirect as string
      router.push(redirect || '/')
    } else {
      ElMessage.error(result.message)
    }
  } catch (error) {
    console.error('Form validation failed:', error)
  }
}

const handleSocialLogin = (provider: string) => {
  ElMessage.info(`${provider} 登录功能开发中...`)
}

// Auto-fill demo account for convenience
// const fillDemoAccount = () => {
//   loginForm.username = 'admin'
//   loginForm.password = '123456'
// }

// 页面加载时自动填入演示账户（可选）
// fillDemoAccount()
</script>

<style scoped>
/* 自定义样式补充 */
:deep(.el-form-item__label) {
  @apply text-gray-700 dark:text-gray-300 font-medium;
}

:deep(.el-input__wrapper) {
  @apply shadow-sm;
}

:deep(.el-button--primary) {
  @apply bg-primary-600 border-primary-600 hover:bg-primary-700 hover:border-primary-700;
}
</style>
