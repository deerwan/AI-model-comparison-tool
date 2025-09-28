import { defineStore } from 'pinia'
import { ref, reactive, watch, computed } from 'vue'

export const useConfigStore = defineStore('config', () => {
  // 模型配置
  const modelA = reactive({
    apiUrl: '',
    modelName: '',
    apiKey: '',
    customUrl: '',
    temperature: 1,
    maxTokens: 2000
  })
  
  const modelB = reactive({
    apiUrl: '',
    modelName: '',
    apiKey: '',
    customUrl: '',
    temperature: 1,
    maxTokens: 2000
  })
  
  // 系统提示词
  const systemPrompt = ref('')
  const useSharedSystem = ref(true)
  const systemPromptA = ref('')
  const systemPromptB = ref('')
  
  // 动态获取显示名称
  const getDisplayName = (modelKey) => {
    const model = modelKey === 'A' ? modelA : modelB
    
    // 如果有模型名称，显示模型名称
    if (model.modelName) {
      return model.modelName
    }
    
    // 如果有API URL，显示API服务商名称
    if (model.apiUrl) {
      const apiNames = {
        'https://api.openai.com/v1/chat/completions': 'OpenAI',
        'https://openrouter.ai/api/v1/chat/completions': 'OpenRouter',
        'https://api.anthropic.com/v1/messages': 'Claude',
        'custom': '自定义API'
      }
      return apiNames[model.apiUrl] || '未知API'
    }
    
    // 默认显示
    return `模型 ${modelKey}`
  }
  
  // 加载保存的配置
  const loadConfig = () => {
    const saved = localStorage.getItem('ai-comparison-config')
    if (saved) {
      try {
        const config = JSON.parse(saved)
        Object.assign(modelA, config.modelA || {})
        Object.assign(modelB, config.modelB || {})
        systemPrompt.value = config.systemPrompt || ''
        useSharedSystem.value = config.useSharedSystem ?? true
        systemPromptA.value = config.systemPromptA || ''
        systemPromptB.value = config.systemPromptB || ''
      } catch (e) {
        console.error('Failed to load config:', e)
      }
    }
  }
  
  // 保存配置
  const saveConfig = () => {
    const config = {
      modelA,
      modelB,
      systemPrompt: systemPrompt.value,
      useSharedSystem: useSharedSystem.value,
      systemPromptA: systemPromptA.value,
      systemPromptB: systemPromptB.value
    }
    localStorage.setItem('ai-comparison-config', JSON.stringify(config))
  }
  
  // 监听变化自动保存
  watch([modelA, modelB, systemPrompt, useSharedSystem, systemPromptA, systemPromptB], 
    saveConfig, { deep: true })
  
  // 验证配置
  const validateModel = (model) => {
    const apiUrl = model.apiUrl === 'custom' ? model.customUrl : model.apiUrl
    return apiUrl && model.modelName && model.apiKey
  }
  
  // 获取系统提示词
  const getSystemPrompt = (modelKey) => {
    if (useSharedSystem.value) {
      return systemPrompt.value
    }
    return modelKey === 'A' ? systemPromptA.value : systemPromptB.value
  }
  
  // 获取实际API地址
  const getApiUrl = (model) => {
    return model.apiUrl === 'custom' ? model.customUrl : model.apiUrl
  }
  
  // 初始化
  loadConfig()
  
  // 更新模型配置的方法
  const updateModel = (modelKey, updates) => {
    const model = modelKey === 'A' ? modelA : modelB
    Object.assign(model, updates)
  }

  return {
    modelA,
    modelB,
    systemPrompt,
    useSharedSystem,
    systemPromptA,
    systemPromptB,
    validateModel,
    getSystemPrompt,
    getApiUrl,
    getDisplayName,
    updateModel
  }
})