import { ref } from 'vue'
import { useConfigStore } from '../stores/config'
import { useConversationStore } from '../stores/conversation'
import { APIClient } from '../utils/api'

export function useModelCall() {
  const configStore = useConfigStore()
  const conversationStore = useConversationStore()
  
  const isLoading = ref(false)
  
  const callModel = async (modelKey) => {
    const config = modelKey === 'A' ? configStore.modelA : configStore.modelB
    const history = modelKey === 'A' ? conversationStore.historyA : conversationStore.historyB
    
    // 验证配置
    if (!configStore.validateModel(config)) {
      throw new Error(`请完善模型${modelKey}的配置`)
    }
    
    const startTime = Date.now()
    conversationStore.updateStatus(modelKey, 'loading')
    
    try {
      // 构建消息数组
      const messages = []
      
      // 添加系统提示词（仅在首次对话时）
      if (history.length === 1) {
        const systemPrompt = configStore.getSystemPrompt(modelKey)
        if (systemPrompt.trim()) {
          messages.push({
            role: 'system',
            content: systemPrompt.trim()
          })
        }
      }
      
      // 添加对话历史
      messages.push(...history.map(msg => ({
        role: msg.role,
        content: msg.content
      })))
      
      // 获取实际API地址
      const apiUrl = configStore.getApiUrl(config)
      const modelConfig = {
        ...config,
        apiUrl
      }
      
      // 调用API
      const result = await APIClient.callModel(modelConfig, messages)
      
      // 计算耗时
      const duration = Date.now() - startTime
      
      // 添加助手回复
      conversationStore.addMessage(modelKey, 'assistant', result.content)
      
      // 更新元数据
      conversationStore.updateMeta(modelKey, `${duration}ms`, result.tokens ? `${result.tokens} tokens` : '')
      conversationStore.updateStatus(modelKey, 'success')
      
    } catch (error) {
      const duration = Date.now() - startTime
      const errorMsg = `错误: ${error.message}`
      
      conversationStore.addMessage(modelKey, 'assistant', errorMsg)
      conversationStore.updateMeta(modelKey, `${duration}ms (失败)`, '')
      conversationStore.updateStatus(modelKey, 'error')
      
      throw error
    }
  }
  
  const sendMessage = async (modelKeys = ['A', 'B']) => {
    if (isLoading.value) return
    
    isLoading.value = true
    
    try {
      // 添加用户消息到历史
      const keys = Array.isArray(modelKeys) ? modelKeys : [modelKeys]
      
      for (const key of keys) {
        const userMessage = conversationStore.getUserInput(key)
        if (userMessage.trim()) {
          conversationStore.addMessage(key, 'user', userMessage.trim())
        }
      }
      
      // 清空输入
      if (conversationStore.useSharedInput) {
        conversationStore.userInput = ''
      } else {
        if (keys.includes('A')) conversationStore.userInputA = ''
        if (keys.includes('B')) conversationStore.userInputB = ''
      }
      
      // 并行调用模型
      const promises = keys.map(key => callModel(key))
      await Promise.all(promises)
      
    } finally {
      isLoading.value = false
    }
  }
  
  return {
    isLoading,
    sendMessage
  }
}