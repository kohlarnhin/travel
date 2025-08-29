import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginForm, RegisterForm, LoginResponse } from '@/types'

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const isLoading = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const fullName = computed(() => {
    if (!user.value) return ''
    return user.value.firstName && user.value.lastName 
      ? `${user.value.firstName} ${user.value.lastName}`
      : user.value.username
  })

  // Actions
  const login = async (loginForm: LoginForm): Promise<{ success: boolean; message: string }> => {
    isLoading.value = true
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // 模拟登录验证
      if (loginForm.username === 'admin' && loginForm.password === '123456') {
        const mockResponse: LoginResponse = {
          user: {
            id: '1',
            username: loginForm.username,
            email: 'admin@example.com',
            firstName: '管理员',
            lastName: '用户',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          token: 'mock-jwt-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now()
        }

        user.value = mockResponse.user
        token.value = mockResponse.token
        refreshToken.value = mockResponse.refreshToken

        // 存储到localStorage
        localStorage.setItem('user', JSON.stringify(mockResponse.user))
        localStorage.setItem('token', mockResponse.token)
        localStorage.setItem('refreshToken', mockResponse.refreshToken)

        return { success: true, message: '登录成功' }
      } else {
        return { success: false, message: '用户名或密码错误' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: '登录失败，请重试' }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (registerForm: RegisterForm): Promise<{ success: boolean; message: string }> => {
    isLoading.value = true
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 模拟注册逻辑
      const mockUser: User = {
        id: 'user-' + Date.now(),
        username: registerForm.username,
        email: registerForm.email,
        firstName: '',
        lastName: '',
        avatar: `https://ui-avatars.com/api/?name=${registerForm.username}&background=0ea5e9&color=fff&size=150`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      const mockResponse: LoginResponse = {
        user: mockUser,
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now()
      }

      user.value = mockResponse.user
      token.value = mockResponse.token
      refreshToken.value = mockResponse.refreshToken

      // 存储到localStorage
      localStorage.setItem('user', JSON.stringify(mockResponse.user))
      localStorage.setItem('token', mockResponse.token)
      localStorage.setItem('refreshToken', mockResponse.refreshToken)

      return { success: true, message: '注册成功' }
    } catch (error) {
      console.error('Register error:', error)
      return { success: false, message: '注册失败，请重试' }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    refreshToken.value = null
    
    // 清除localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  }

  const checkAuth = () => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')
    const storedRefreshToken = localStorage.getItem('refreshToken')

    if (storedUser && storedToken) {
      try {
        user.value = JSON.parse(storedUser)
        token.value = storedToken
        refreshToken.value = storedRefreshToken
      } catch (error) {
        console.error('Failed to parse stored user data:', error)
        logout()
      }
    }
  }

  const updateProfile = async (userData: Partial<User>): Promise<{ success: boolean; message: string }> => {
    if (!user.value) {
      return { success: false, message: '用户未登录' }
    }

    isLoading.value = true
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 更新用户信息
      user.value = { ...user.value, ...userData, updatedAt: new Date().toISOString() }
      
      // 更新localStorage
      localStorage.setItem('user', JSON.stringify(user.value))
      
      return { success: true, message: '资料更新成功' }
    } catch (error) {
      console.error('Update profile error:', error)
      return { success: false, message: '更新失败，请重试' }
    } finally {
      isLoading.value = false
    }
  }

  return {
    // State
    user,
    token,
    refreshToken,
    isLoading,
    
    // Getters
    isAuthenticated,
    fullName,
    
    // Actions
    login,
    register,
    logout,
    checkAuth,
    updateProfile
  }
})
