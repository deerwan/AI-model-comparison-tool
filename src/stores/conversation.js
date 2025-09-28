import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useConversationStore = defineStore('conversation', () => {
  // 对话历史
  const historyA = ref([])
  const historyB = ref([])
  
  // 状态管理
  const statusA = ref('ready')
  const statusB = ref('ready')
  
  // 元数据
  const metaA = reactive({ time: '', tokens: '' })
  const metaB = reactive({ time: '', tokens: '' })
  
  // 当前输入
  const userInput = ref('')
  const useSharedInput = ref(true)
  const userInputA = ref('')
  const userInputB = ref('')
  
  // 添加消息到历史
  const addMessage = (modelKey, role, content) => {
    const history = modelKey === 'A' ? historyA : historyB
    history.value.push({
      role,
      content,
      timestamp: Date.now()
    })
  }
  
  // 更新状态
  const updateStatus = (modelKey, status) => {
    if (modelKey === 'A') {
      statusA.value = status
    } else {
      statusB.value = status
    }
  }
  
  // 更新元数据
  const updateMeta = (modelKey, time, tokens) => {
    const meta = modelKey === 'A' ? metaA : metaB
    meta.time = time
    meta.tokens = tokens
  }
  
  // 清空对话
  const clearHistory = (modelKey = 'both') => {
    if (modelKey === 'both' || modelKey === 'A') {
      historyA.value = []
      metaA.time = ''
      metaA.tokens = ''
      statusA.value = 'ready'
    }
    if (modelKey === 'both' || modelKey === 'B') {
      historyB.value = []
      metaB.time = ''
      metaB.tokens = ''
      statusB.value = 'ready'
    }
  }
  
  // 获取用户输入
  const getUserInput = (modelKey) => {
    if (useSharedInput.value) {
      return userInput.value
    }
    return modelKey === 'A' ? userInputA.value : userInputB.value
  }
  
  // 清空输入
  const clearInput = (modelKey = 'both') => {
    if (useSharedInput.value || modelKey === 'both') {
      userInput.value = ''
      userInputA.value = ''
      userInputB.value = ''
    } else if (modelKey === 'A') {
      userInputA.value = ''
    } else if (modelKey === 'B') {
      userInputB.value = ''
    }
  }
  
  return {
    historyA,
    historyB,
    statusA,
    statusB,
    metaA,
    metaB,
    userInput,
    useSharedInput,
    userInputA,
    userInputB,
    addMessage,
    updateStatus,
    updateMeta,
    clearHistory,
    getUserInput,
    clearInput
  }
})