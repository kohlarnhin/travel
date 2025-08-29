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
          创建新账户
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          加入我们，开启精彩体验
        </p>
      </div>

      <!-- Register Form -->
      <div class="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-8">
        <el-form
          ref="formRef"
          :model="registerForm"
          :rules="formRules"
          label-position="top"
          size="large"
          class="space-y-6"
          @submit.prevent="handleRegister"
        >
          <!-- Username -->
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="registerForm.username"
              placeholder="请输入用户名"
              :prefix-icon="UserIcon"
              clearable
              @blur="checkUsernameAvailability"
            >
              <template #suffix>
                <CheckIcon 
                  v-if="usernameStatus === 'available'" 
                  class="h-4 w-4 text-success-500"
                />
                <XMarkIcon 
                  v-else-if="usernameStatus === 'taken'" 
                  class="h-4 w-4 text-error-500"
                />
              </template>
            </el-input>
            <div v-if="usernameMessage" class="mt-1 text-xs" :class="usernameMessageClass">
              {{ usernameMessage }}
            </div>
          </el-form-item>

          <!-- Email -->
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="registerForm.email"
              type="email"
              placeholder="请输入邮箱地址"
              :prefix-icon="EnvelopeIcon"
              clearable
            />
          </el-form-item>

          <!-- Password -->
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="registerForm.password"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="LockClosedIcon"
              show-password
              clearable
              @input="checkPasswordStrength"
            />
            <!-- Password Strength Indicator -->
            <div v-if="registerForm.password" class="mt-2">
              <div class="flex items-center space-x-2 mb-1">
                <span class="text-xs text-gray-600 dark:text-gray-400">密码强度：</span>
                <span 
                  class="text-xs font-medium"
                  :class="{
                    'text-error-600': passwordStrength.strength === 'weak',
                    'text-warning-600': passwordStrength.strength === 'medium',
                    'text-success-600': passwordStrength.strength === 'strong'
                  }"
                >
                  {{ passwordStrengthText }}
                </span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div 
                  class="h-1.5 rounded-full transition-all duration-300"
                  :class="{
                    'bg-error-500 w-1/3': passwordStrength.strength === 'weak',
                    'bg-warning-500 w-2/3': passwordStrength.strength === 'medium',
                    'bg-success-500 w-full': passwordStrength.strength === 'strong'
                  }"
                />
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {{ passwordStrength.message }}
              </p>
            </div>
          </el-form-item>

          <!-- Confirm Password -->
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              v-model="registerForm.confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              :prefix-icon="LockClosedIcon"
              show-password
              clearable
            />
          </el-form-item>

          <!-- Agreement -->
          <el-form-item prop="agreement">
            <el-checkbox v-model="registerForm.agreement">
              我已阅读并同意
              <a href="#" class="text-primary-600 hover:text-primary-700 dark:text-primary-400">
                《用户协议》
              </a>
              和
              <a href="#" class="text-primary-600 hover:text-primary-700 dark:text-primary-400">
                《隐私政策》
              </a>
            </el-checkbox>
          </el-form-item>

          <!-- Submit Button -->
          <el-form-item>
            <el-button
              type="primary"
              size="large"
              :loading="userStore.isLoading"
              :disabled="!registerForm.agreement"
              class="w-full"
              @click="handleRegister"
            >
              {{ userStore.isLoading ? '注册中...' : '创建账户' }}
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

        <!-- Social Register -->
        <div class="grid grid-cols-2 gap-3">
          <el-button class="w-full" @click="handleSocialRegister('github')">
            <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </el-button>
          
          <el-button class="w-full" @click="handleSocialRegister('wechat')">
            <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.111.24-.248 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01.181-.556c1.52-1.186 2.506-2.925 2.506-4.877 0-3.208-2.861-5.895-6.069-5.861zm-2.232 3.436c.414 0 .75.336.75.751 0 .414-.336.75-.75.75s-.75-.336-.75-.75c0-.415.336-.751.75-.751zm4.512 0c.414 0 .75.336.75.751 0 .414-.336.75-.75.75s-.75-.336-.75-.75c0-.415.336-.751.75-.751z"/>
            </svg>
            微信
          </el-button>
        </div>

        <!-- Login Link -->
        <div class="text-center mt-6">
          <span class="text-sm text-gray-600 dark:text-gray-400">
            已有账户？
          </span>
          <RouterLink 
            to="/login"
            class="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 ml-1"
          >
            立即登录
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { 
  UserIcon, 
  LockClosedIcon, 
  EnvelopeIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import { useUserStore } from '@/stores/user'
import { validateEmail, validatePassword } from '@/utils'
import type { RegisterForm } from '@/types'

// Store and Router
const userStore = useUserStore()
const router = useRouter()

// Form Reference
const formRef = ref<FormInstance>()

// Form Data
const registerForm = reactive<RegisterForm>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreement: false
})

// Username Availability
const usernameStatus = ref<'checking' | 'available' | 'taken' | null>(null)
const usernameMessage = ref('')

// Password Strength
const passwordStrength = ref({
  isValid: false,
  strength: 'weak' as 'weak' | 'medium' | 'strong',
  message: ''
})

// Computed
const usernameMessageClass = computed(() => ({
  'text-success-600': usernameStatus.value === 'available',
  'text-error-600': usernameStatus.value === 'taken',
  'text-gray-500': usernameStatus.value === 'checking'
}))

const passwordStrengthText = computed(() => {
  switch (passwordStrength.value.strength) {
    case 'weak': return '弱'
    case 'medium': return '中等'
    case 'strong': return '强'
    default: return ''
  }
})

// Custom Validators
const validateUsername = (_rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('请输入用户名'))
  } else if (value.length < 3 || value.length > 20) {
    callback(new Error('用户名长度应在3-20个字符'))
  } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    callback(new Error('用户名只能包含字母、数字和下划线'))
  } else {
    callback()
  }
}

const validateEmailFormat = (_rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('请输入邮箱地址'))
  } else if (!validateEmail(value)) {
    callback(new Error('请输入有效的邮箱地址'))
  } else {
    callback()
  }
}

const validatePasswordStrength = (_rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('请输入密码'))
  } else {
    const result = validatePassword(value)
    if (!result.isValid) {
      callback(new Error(result.message))
    } else {
      callback()
    }
  }
}

const validateConfirmPassword = (_rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerForm.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

const validateAgreement = (_rule: any, value: boolean, callback: any) => {
  if (!value) {
    callback(new Error('请同意用户协议和隐私政策'))
  } else {
    callback()
  }
}

// Form Validation Rules
const formRules: FormRules = {
  username: [
    { validator: validateUsername, trigger: 'blur' }
  ],
  email: [
    { validator: validateEmailFormat, trigger: 'blur' }
  ],
  password: [
    { validator: validatePasswordStrength, trigger: 'blur' }
  ],
  confirmPassword: [
    { validator: validateConfirmPassword, trigger: 'blur' }
  ],
  agreement: [
    { validator: validateAgreement, trigger: 'change' }
  ]
}

// Methods
const checkUsernameAvailability = async () => {
  if (!registerForm.username || registerForm.username.length < 3) {
    usernameStatus.value = null
    usernameMessage.value = ''
    return
  }

  usernameStatus.value = 'checking'
  usernameMessage.value = '检查用户名可用性...'

  // 模拟API检查
  await new Promise(resolve => setTimeout(resolve, 1000))

  // 模拟逻辑：admin、test、user 等常用用户名不可用
  const takenUsernames = ['admin', 'test', 'user', 'root', 'administrator']
  
  if (takenUsernames.includes(registerForm.username.toLowerCase())) {
    usernameStatus.value = 'taken'
    usernameMessage.value = '用户名已被占用，请尝试其他用户名'
  } else {
    usernameStatus.value = 'available'
    usernameMessage.value = '用户名可用'
  }
}

const checkPasswordStrength = () => {
  if (registerForm.password) {
    passwordStrength.value = validatePassword(registerForm.password)
  }
}

const handleRegister = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    
    if (usernameStatus.value === 'taken') {
      ElMessage.error('请选择其他用户名')
      return
    }
    
    const result = await userStore.register(registerForm)
    
    if (result.success) {
      ElMessage.success(result.message)
      router.push('/')
    } else {
      ElMessage.error(result.message)
    }
  } catch (error) {
    console.error('Form validation failed:', error)
  }
}

const handleSocialRegister = (provider: string) => {
  ElMessage.info(`${provider} 注册功能开发中...`)
}
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

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  @apply bg-primary-600 border-primary-600;
}
</style>
