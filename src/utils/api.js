// API调用工具函数
export class APIClient {
  // 获取服务商类型
  static getProviderType(apiUrl) {
    if (apiUrl.includes('api.openai.com')) return 'openai'
    if (apiUrl.includes('api.anthropic.com')) return 'anthropic'
    if (apiUrl.includes('generativelanguage.googleapis.com')) return 'google'
    if (apiUrl.includes('openrouter.ai')) return 'openrouter'
    if (apiUrl.includes('api.together.xyz')) return 'together'
    if (apiUrl.includes('api.groq.com')) return 'groq'
    if (apiUrl.includes('api.perplexity.ai')) return 'perplexity'
    if (apiUrl.includes('api.fireworks.ai')) return 'fireworks'
    if (apiUrl.includes('api.cohere.ai')) return 'cohere'
    if (apiUrl.includes('aip.baidubce.com')) return 'baidu'
    if (apiUrl.includes('dashscope.aliyuncs.com')) return 'alibaba'
    if (apiUrl.includes('open.bigmodel.cn')) return 'zhipu'
    if (apiUrl.includes('api.moonshot.cn')) return 'moonshot'
    if (apiUrl.includes('api.deepseek.com')) return 'deepseek'
    if (apiUrl.includes('api.minimax.chat')) return 'minimax'
    if (apiUrl.includes('spark-api-open.xf-yun.com')) return 'xunfei'
    if (apiUrl.includes('hunyuan.tencentcloudapi.com')) return 'tencent'
    if (apiUrl.includes('api.sensenova.cn')) return 'sensetime'
    if (apiUrl.includes('ark.cn-beijing.volces.com')) return 'bytedance'
    if (apiUrl.includes('localhost:11434')) return 'ollama'
    return 'openai' // 默认使用OpenAI格式
  }

  // 构建请求头
  static buildHeaders(config, providerType) {
    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'AI-Model-Comparison-Tool/1.0'
    }

    switch (providerType) {
      case 'anthropic':
        headers['x-api-key'] = config.apiKey
        headers['anthropic-version'] = '2023-06-01'
        break
      case 'google':
        headers['Authorization'] = `Bearer ${config.apiKey}`
        break
      case 'cohere':
        headers['Authorization'] = `Bearer ${config.apiKey}`
        break
      case 'baidu':
        // 百度需要特殊处理，这里简化
        headers['Authorization'] = `Bearer ${config.apiKey}`
        break
      case 'alibaba':
        headers['Authorization'] = `Bearer ${config.apiKey}`
        headers['X-DashScope-SSE'] = 'disable'
        break
      case 'zhipu':
        headers['Authorization'] = `Bearer ${config.apiKey}`
        break
      default:
        headers['Authorization'] = `Bearer ${config.apiKey}`
    }

    return headers
  }

  // 构建请求体
  static buildRequestBody(config, messages, providerType) {
    const baseBody = {
      model: config.modelName,
      messages,
      max_tokens: Math.min(config.maxTokens || 2000, 4000),
      temperature: config.temperature || 0.7
    }

    switch (providerType) {
      case 'anthropic':
        // Claude API格式不同
        return {
          model: config.modelName,
          max_tokens: Math.min(config.maxTokens || 2000, 4000),
          temperature: config.temperature || 0.7,
          messages: messages.filter(msg => msg.role !== 'system'),
          system: messages.find(msg => msg.role === 'system')?.content || undefined
        }
      case 'google':
        // Gemini API格式
        return {
          model: config.modelName,
          contents: messages.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
          })),
          generationConfig: {
            maxOutputTokens: Math.min(config.maxTokens || 2000, 4000),
            temperature: config.temperature || 0.7
          }
        }
      case 'cohere':
        // Cohere API格式
        const lastMessage = messages[messages.length - 1]
        return {
          model: config.modelName,
          message: lastMessage.content,
          chat_history: messages.slice(0, -1).map(msg => ({
            role: msg.role === 'assistant' ? 'CHATBOT' : 'USER',
            message: msg.content
          })),
          max_tokens: Math.min(config.maxTokens || 2000, 4000),
          temperature: config.temperature || 0.7
        }
      case 'alibaba':
        // 阿里云格式
        return {
          model: config.modelName,
          input: {
            messages
          },
          parameters: {
            max_tokens: Math.min(config.maxTokens || 2000, 4000),
            temperature: config.temperature || 0.7
          }
        }
      default:
        return baseBody
    }
  }

  // 解析响应
  static parseResponse(data, providerType) {
    switch (providerType) {
      case 'anthropic':
        return {
          content: data.content?.[0]?.text || '无响应内容',
          tokens: data.usage?.input_tokens + data.usage?.output_tokens || 0
        }
      case 'google':
        return {
          content: data.candidates?.[0]?.content?.parts?.[0]?.text || '无响应内容',
          tokens: data.usageMetadata?.totalTokenCount || 0
        }
      case 'cohere':
        return {
          content: data.text || '无响应内容',
          tokens: data.meta?.tokens?.input_tokens + data.meta?.tokens?.output_tokens || 0
        }
      case 'alibaba':
        return {
          content: data.output?.text || '无响应内容',
          tokens: data.usage?.total_tokens || 0
        }
      default:
        return {
          content: data.choices?.[0]?.message?.content || data.choices?.[0]?.text || '无响应内容',
          tokens: data.usage?.total_tokens || 0
        }
    }
  }

  // 解析错误信息
  static parseError(error, response, providerType) {
    // 网络错误
    if (error.name === 'AbortError') {
      return '请求超时 (30秒)，请检查网络连接或API服务状态'
    }
    
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return '网络连接失败，请检查：\n1. 网络连接是否正常\n2. API地址是否正确\n3. 是否存在CORS限制'
    }

    // HTTP状态码错误
    if (response) {
      switch (response.status) {
        case 400:
          return '请求参数错误 (400)，请检查模型名称和请求格式'
        case 401:
          return 'API密钥无效 (401)，请检查密钥是否正确'
        case 403:
          return '访问被拒绝 (403)，请检查API密钥权限或账户余额'
        case 404:
          return 'API地址不存在 (404)，请检查API地址是否正确'
        case 429:
          return '请求频率过高 (429)，请稍后重试'
        case 500:
          return '服务器内部错误 (500)，请稍后重试'
        case 502:
          return '网关错误 (502)，API服务可能暂时不可用'
        case 503:
          return '服务不可用 (503)，API服务可能正在维护'
        default:
          return `HTTP错误 (${response.status}): ${response.statusText}`
      }
    }

    // 返回原始错误信息
    return error.message || '未知错误'
  }

  static async callModel(config, messages) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)
    
    let response = null
    
    try {
      const apiUrl = config.apiUrl === 'custom' ? config.customUrl : config.apiUrl
      const providerType = this.getProviderType(apiUrl)
      
      // 验证必要参数
      if (!apiUrl) {
        throw new Error('API地址不能为空')
      }
      if (!config.apiKey) {
        throw new Error('API密钥不能为空')
      }
      if (!config.modelName) {
        throw new Error('模型名称不能为空')
      }
      if (!messages || messages.length === 0) {
        throw new Error('消息内容不能为空')
      }

      const headers = this.buildHeaders(config, providerType)
      const body = this.buildRequestBody(config, messages, providerType)
      
      response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      // 尝试解析响应体
      let responseData = {}
      const responseText = await response.text()
      
      try {
        responseData = JSON.parse(responseText)
      } catch (parseError) {
        if (!response.ok) {
          throw new Error(`API返回非JSON格式错误: ${responseText.substring(0, 200)}`)
        }
      }
      
      if (!response.ok) {
        // 提取详细错误信息
        let errorMessage = this.parseError(new Error(), response, providerType)
        
        if (responseData.error) {
          if (typeof responseData.error === 'string') {
            errorMessage = responseData.error
          } else if (responseData.error.message) {
            errorMessage = responseData.error.message
          } else if (responseData.error.code) {
            errorMessage = `错误代码: ${responseData.error.code}`
          }
        } else if (responseData.message) {
          errorMessage = responseData.message
        } else if (responseData.detail) {
          errorMessage = responseData.detail
        }
        
        throw new Error(errorMessage)
      }
      
      return this.parseResponse(responseData, providerType)
      
    } catch (error) {
      clearTimeout(timeoutId)
      const errorMessage = this.parseError(error, response, this.getProviderType(config.apiUrl))
      throw new Error(errorMessage)
    }
  }
  
  static async testConnection(config) {
    try {
      const result = await this.callModel(config, [
        { role: 'user', content: 'Hi' }
      ])
      return { 
        success: true, 
        message: '连接成功！API配置正确，模型响应正常。',
        response: result.content.substring(0, 50) + (result.content.length > 50 ? '...' : '')
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message,
        message: `连接失败: ${error.message}`
      }
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