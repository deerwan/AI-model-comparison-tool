import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  // 界面状态
  const showConfig = ref(false)
  const showSettings = ref(false)
  
  // 通知状态
  const notification = ref({
    show: false,
    message: '',
    type: 'info' // success, error, info
  })
  
  // 切换配置面板
  const toggleConfig = () => {
    showConfig.value = !showConfig.value
  }
  
  // 显示通知
  const showNotification = (message, type = 'success', duration = 3000) => {
    notification.value = {
      show: true,
      message,
      type
    }
    setTimeout(() => {
      notification.value.show = false
    }, duration)
  }
  
  // 显示错误
  const showError = (message) => {
    showNotification(message, 'error', 5000)
  }
  
  // 显示信息
  const showInfo = (message) => {
    showNotification(message, 'info', 3000)
  }
  
  return {
    showConfig,
    showSettings,
    notification,
    toggleConfig,
    showNotification,
    showError,
    showInfo
  }
})