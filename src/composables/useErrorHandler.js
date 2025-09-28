import { ref } from 'vue'
import { useUIStore } from '../stores/ui'

export function useErrorHandler() {
  const uiStore = useUIStore()
  const isLoading = ref(false)
  const error = ref(null)
  
  const handleAsync = async (asyncFn, options = {}) => {
    const {
      loadingMessage = '处理中...',
      successMessage = '操作成功',
      showSuccess = false,
      retries = 0,
      retryDelay = 1000
    } = options
    
    isLoading.value = true
    error.value = null
    
    if (loadingMessage) {
      uiStore.showInfo(loadingMessage)
    }
    
    let attempt = 0
    
    while (attempt <= retries) {
      try {
        const result = await asyncFn()
        
        if (showSuccess && successMessage) {
          uiStore.showNotification(successMessage)
        }
        
        return result
        
      } catch (err) {
        attempt++
        error.value = err
        
        if (attempt <= retries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay))
          continue
        }
        
        // 处理不同类型的错误
        let errorMessage = '操作失败'
        
        if (err.message?.includes('fetch')) {
          errorMessage = '网络连接失败，请检查网络设置'
        } else if (err.message?.includes('timeout')) {
          errorMessage = '请求超时，请稍后重试'
        } else if (err.message?.includes('401')) {
          errorMessage = 'API密钥无效，请检查配置'
        } else if (err.message?.includes('429')) {
          errorMessage = '请求过于频繁，请稍后重试'
        } else if (err.message?.includes('500')) {
          errorMessage = '服务器错误，请稍后重试'
        } else if (err.message) {
          errorMessage = err.message
        }
        
        uiStore.showError(errorMessage)
        throw err
        
      } finally {
        isLoading.value = false
      }
    }
  }
  
  const clearError = () => {
    error.value = null
  }
  
  return {
    isLoading,
    error,
    handleAsync,
    clearError
  }
}