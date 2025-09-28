<template>
  <div class="card">
    <div class="flex items-center justify-between mb-3">
      <h3 class="font-medium text-gray-800">输入</h3>
      <div class="flex items-center gap-2">
        <button 
          @click="conversationStore.useSharedInput = !conversationStore.useSharedInput"
          class="btn-ghost text-sm"
        >
          {{ conversationStore.useSharedInput ? '共用' : '分离' }}
        </button>
        <button @click="clearInputs" class="btn-ghost text-sm">清空</button>
        <button @click="newChat" class="btn-ghost text-sm">新对话</button>
      </div>
    </div>
    
    <!-- 预设模板选择器 -->
    <div class="mb-3">
      <div class="relative">
        <select 
          v-model="selectedTemplate" 
          @change="applyTemplate"
          class="input text-sm w-full"
        >
          <option value="">选择预设模板...</option>
          <optgroup label="📝 文本处理">
            <option value="translate">🌐 翻译助手</option>
            <option value="summary">📝 内容总结</option>
            <option value="review">🔍 文本审查</option>
            <option value="explain">📚 概念解释</option>
          </optgroup>
          <optgroup label="💻 编程相关">
            <option value="code">💻 代码助手</option>
            <option value="debug">🐛 代码调试</option>
          </optgroup>
          <optgroup label="🧠 思维工具">
            <option value="analysis">📊 数据分析</option>
            <option value="compare">⚖️ 对比分析</option>
            <option value="brainstorm">💡 头脑风暴</option>
            <option value="plan">📋 制定计划</option>
          </optgroup>
          <optgroup label="🎨 创意写作">
            <option value="creative">✍️ 创意写作</option>
            <option value="qa">❓ 问答助手</option>
          </optgroup>
        </select>
      </div>
    </div>
    
    <!-- 共用输入 -->
    <div v-if="conversationStore.useSharedInput" class="flex gap-3">
      <textarea 
        v-model="conversationStore.userInput"
        placeholder="输入问题..."
        class="textarea flex-1"
        rows="3"
        @keydown.ctrl.enter="sendToAll"
        @keydown.meta.enter="sendToAll"
      />
      <div class="flex flex-col gap-2">
        <button 
          @click="sendToAll"
          :disabled="!canSend || isLoading"
          class="btn-primary px-4"
        >
          {{ isLoading ? '发送中' : '发送' }}
        </button>
      </div>
    </div>
    
    <!-- 分离输入 -->
    <div v-else class="space-y-3">
      <div class="grid md:grid-cols-2 gap-3">
        <div class="flex gap-2">
          <textarea 
            v-model="conversationStore.userInputA"
            placeholder="模型A问题..."
            class="textarea flex-1"
            rows="2"
            @keydown.ctrl.enter="sendToA"
          />
          <button 
            @click="sendToA"
            :disabled="!canSendA || isLoading"
            class="btn-primary px-3"
          >
            A
          </button>
        </div>
        
        <div class="flex gap-2">
          <textarea 
            v-model="conversationStore.userInputB"
            placeholder="模型B问题..."
            class="textarea flex-1"
            rows="2"
            @keydown.ctrl.enter="sendToB"
          />
          <button 
            @click="sendToB"
            :disabled="!canSendB || isLoading"
            class="btn-primary px-3"
          >
            B
          </button>
        </div>
      </div>
      
      <div class="text-center">
        <button 
          @click="sendToBoth"
          :disabled="!canSendBoth || isLoading"
          class="btn-primary bg-green-600 hover:bg-green-700"
        >
          同时发送
        </button>
      </div>
    </div>
    
    <div class="text-center mt-3 text-xs text-gray-500">
      Ctrl+Enter 快速发送 | 点击消息复制内容
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useConfigStore } from '../stores/config'
import { useConversationStore } from '../stores/conversation'
import { useUIStore } from '../stores/ui'
import { useModelCall } from '../composables/useModelCall'

const configStore = useConfigStore()
const conversationStore = useConversationStore()
const uiStore = useUIStore()
const { sendMessage, isLoading } = useModelCall()

const selectedTemplate = ref('')

import { MESSAGE_TEMPLATES } from '../utils/constants'

// 预设模板内容
const templates = MESSAGE_TEMPLATES

const canSend = computed(() => {
  return conversationStore.userInput.trim() && 
         configStore.validateModel(configStore.modelA) && 
         configStore.validateModel(configStore.modelB)
})

const canSendA = computed(() => {
  return conversationStore.userInputA.trim() && configStore.validateModel(configStore.modelA)
})

const canSendB = computed(() => {
  return conversationStore.userInputB.trim() && configStore.validateModel(configStore.modelB)
})

const canSendBoth = computed(() => {
  return conversationStore.userInputA.trim() && 
         conversationStore.userInputB.trim() && 
         configStore.validateModel(configStore.modelA) && 
         configStore.validateModel(configStore.modelB)
})

const sendToAll = async () => {
  try {
    await sendMessage(['A', 'B'])
  } catch (error) {
    uiStore.showError(error.message)
  }
}

const sendToA = async () => {
  try {
    await sendMessage(['A'])
  } catch (error) {
    uiStore.showError(error.message)
  }
}

const sendToB = async () => {
  try {
    await sendMessage(['B'])
  } catch (error) {
    uiStore.showError(error.message)
  }
}

const sendToBoth = async () => {
  try {
    await sendMessage(['A', 'B'])
  } catch (error) {
    uiStore.showError(error.message)
  }
}

const clearInputs = () => {
  conversationStore.clearInput('both')
}

const newChat = () => {
  conversationStore.clearHistory('both')
  conversationStore.clearInput('both')
  uiStore.showNotification('已开始新对话')
}

const applyTemplate = () => {
  if (selectedTemplate.value && templates[selectedTemplate.value]) {
    const template = templates[selectedTemplate.value]
    const templateContent = template.content
    
    if (conversationStore.useSharedInput) {
      conversationStore.userInput = templateContent
    } else {
      conversationStore.userInputA = templateContent
      conversationStore.userInputB = templateContent
    }
    
    // 显示应用成功的提示
    uiStore.showNotification(`已应用"${template.name}"模板`)
    
    // 重置选择器
    selectedTemplate.value = ''
  }
}
</script>