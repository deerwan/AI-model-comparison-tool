// API调用工具函数
export class APIClient {
  static async callModel(config, messages) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)
    
    try {
      const response = await fetch(config.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'AI Model Comparison Tool'
        },
        body: JSON.stringify({
          model: config.modelName,
          messages,
          max_tokens: 4000,
          temperature: 0.7
        }),
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMsg = errorData.error?.message || 
                        errorData.message || 
                        `HTTP ${response.status}: ${response.statusText}`
        throw new Error(errorMsg)
      }
      
      const data = await response.json()
      return {
        content: data.choices?.[0]?.message?.content || '无响应内容',
        tokens: data.usage?.total_tokens || 0
      }
      
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error.name === 'AbortError') {
        throw new Error('请求超时，请检查网络连接')
      }
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('网络错误，可能是CORS问题或网络不通')
      }
      
      throw error
    }
  }
  
  static async testConnection(config) {
    try {
      const apiUrl = config.apiUrl === 'custom' ? config.customUrl : config.apiUrl
      const testConfig = {
        ...config,
        apiUrl
      }
      await this.callModel(testConfig, [{ role: 'user', content: 'Hello' }])
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}

// 复制到剪贴板
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // 降级方案
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textArea)
    return success
  }
}

// 防抖函数
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}