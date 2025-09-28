<template>
  <div class="export-panel">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-medium text-gray-800">导出对话</h3>
      <button @click="$emit('close')" class="btn-ghost">
        ✕
      </button>
    </div>
    
    <div class="space-y-4">
      <!-- 导出格式选择 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">导出格式</label>
        <div class="grid grid-cols-2 gap-2">
          <button 
            v-for="format in formats" 
            :key="format.key"
            @click="selectedFormat = format.key"
            class="btn text-left p-3"
            :class="selectedFormat === format.key ? 'btn-primary' : 'btn-secondary'"
          >
            <div class="flex items-center gap-2">
              <span class="text-lg">{{ format.icon }}</span>
              <div>
                <div class="font-medium">{{ format.name }}</div>
                <div class="text-xs opacity-75">{{ format.description }}</div>
              </div>
            </div>
          </button>
        </div>
      </div>
      
      <!-- 导出选项 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">导出内容</label>
        <div class="space-y-2">
          <label class="flex items-center gap-2">
            <input v-model="includeSystemPrompt" type="checkbox" class="rounded">
            <span class="text-sm">包含系统提示词</span>
          </label>
          <label class="flex items-center gap-2">
            <input v-model="includeMetadata" type="checkbox" class="rounded">
            <span class="text-sm">包含元数据（时间、Token数等）</span>
          </label>
          <label class="flex items-center gap-2">
            <input v-model="includeModelInfo" type="checkbox" class="rounded">
            <span class="text-sm">包含模型配置信息</span>
          </label>
        </div>
      </div>
      
      <!-- 导出按钮 -->
      <div class="flex gap-2">
        <button @click="handleExport" class="btn-primary flex-1">
          📤 导出
        </button>
        <button @click="handlePreview" class="btn-secondary">
          👁️ 预览
        </button>
      </div>
    </div>
    
    <!-- 预览区域 -->
    <div v-if="showPreview" class="mt-4 p-3 bg-gray-50 rounded-lg">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium text-gray-700">预览</span>
        <button @click="showPreview = false" class="text-gray-400 hover:text-gray-600">
          ✕
        </button>
      </div>
      <pre class="text-xs text-gray-600 whitespace-pre-wrap max-h-40 overflow-y-auto">{{ previewContent }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useConfigStore } from '../stores/config'
import { useConversationStore } from '../stores/conversation'
import { useUIStore } from '../stores/ui'

const props = defineProps({
  modelKey: String
})

const emit = defineEmits(['close'])

const configStore = useConfigStore()
const conversationStore = useConversationStore()
const uiStore = useUIStore()

const selectedFormat = ref('markdown')
const includeSystemPrompt = ref(true)
const includeMetadata = ref(true)
const includeModelInfo = ref(true)
const showPreview = ref(false)
const previewContent = ref('')

const formats = [
  {
    key: 'markdown',
    name: 'Markdown',
    icon: '📝',
    description: '适合文档和笔记'
  },
  {
    key: 'json',
    name: 'JSON',
    icon: '📋',
    description: '结构化数据格式'
  },
  {
    key: 'txt',
    name: '纯文本',
    icon: '📄',
    description: '简单文本格式'
  },
  {
    key: 'html',
    name: 'HTML',
    icon: '🌐',
    description: '网页格式'
  }
]

const messages = computed(() => {
  return props.modelKey === 'A' ? conversationStore.historyA : conversationStore.historyB
})

const modelConfig = computed(() => {
  return props.modelKey === 'A' ? configStore.modelA : configStore.modelB
})

const generateContent = (format) => {
  const timestamp = new Date().toLocaleString('zh-CN')
  const modelName = configStore.getDisplayName(props.modelKey)
  
  let content = ''
  
  switch (format) {
    case 'markdown':
      content = generateMarkdown(timestamp, modelName)
      break
    case 'json':
      content = generateJSON(timestamp, modelName)
      break
    case 'txt':
      content = generateText(timestamp, modelName)
      break
    case 'html':
      content = generateHTML(timestamp, modelName)
      break
  }
  
  return content
}

const generateMarkdown = (timestamp, modelName) => {
  let content = `# AI对话记录\n\n`
  
  if (includeModelInfo.value) {
    content += `**模型**: ${modelName}\n`
    content += `**导出时间**: ${timestamp}\n\n`
  }
  
  if (includeSystemPrompt.value) {
    const systemPrompt = configStore.getSystemPrompt(props.modelKey)
    if (systemPrompt) {
      content += `## 系统提示词\n\n${systemPrompt}\n\n`
    }
  }
  
  content += `## 对话内容\n\n`
  
  messages.value.forEach((msg, index) => {
    const role = msg.role === 'user' ? '👤 用户' : `🤖 ${modelName}`
    content += `### ${role}\n\n${msg.content}\n\n`
    
    if (includeMetadata.value && msg.timestamp) {
      content += `*${new Date(msg.timestamp).toLocaleString('zh-CN')}*\n\n`
    }
  })
  
  return content
}

const generateJSON = (timestamp, modelName) => {
  const data = {
    exportTime: timestamp,
    model: modelName,
    systemPrompt: includeSystemPrompt.value ? configStore.getSystemPrompt(props.modelKey) : null,
    modelConfig: includeModelInfo.value ? modelConfig.value : null,
    messages: messages.value.map(msg => ({
      role: msg.role,
      content: msg.content,
      timestamp: includeMetadata.value ? msg.timestamp : null
    }))
  }
  
  return JSON.stringify(data, null, 2)
}

const generateText = (timestamp, modelName) => {
  let content = `AI对话记录\n${'='.repeat(20)}\n\n`
  
  if (includeModelInfo.value) {
    content += `模型: ${modelName}\n`
    content += `导出时间: ${timestamp}\n\n`
  }
  
  if (includeSystemPrompt.value) {
    const systemPrompt = configStore.getSystemPrompt(props.modelKey)
    if (systemPrompt) {
      content += `系统提示词:\n${systemPrompt}\n\n`
    }
  }
  
  content += `对话内容:\n${'-'.repeat(20)}\n\n`
  
  messages.value.forEach((msg, index) => {
    const role = msg.role === 'user' ? '用户' : modelName
    content += `[${role}]\n${msg.content}\n\n`
    
    if (includeMetadata.value && msg.timestamp) {
      content += `时间: ${new Date(msg.timestamp).toLocaleString('zh-CN')}\n\n`
    }
  })
  
  return content
}

const generateHTML = (timestamp, modelName) => {
  let content = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI对话记录 - ${modelName}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 20px; }
        .message { margin-bottom: 20px; padding: 15px; border-radius: 8px; }
        .user { background-color: #dbeafe; }
        .assistant { background-color: #f3f4f6; }
        .role { font-weight: bold; margin-bottom: 8px; }
        .timestamp { font-size: 12px; color: #6b7280; margin-top: 8px; }
        .system-prompt { background-color: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>AI对话记录</h1>`
  
  if (includeModelInfo.value) {
    content += `
        <p><strong>模型:</strong> ${modelName}</p>
        <p><strong>导出时间:</strong> ${timestamp}</p>`
  }
  
  content += `
    </div>`
  
  if (includeSystemPrompt.value) {
    const systemPrompt = configStore.getSystemPrompt(props.modelKey)
    if (systemPrompt) {
      content += `
    <div class="system-prompt">
        <h3>系统提示词</h3>
        <p>${systemPrompt.replace(/\n/g, '<br>')}</p>
    </div>`
    }
  }
  
  messages.value.forEach((msg, index) => {
    const roleClass = msg.role === 'user' ? 'user' : 'assistant'
    const roleName = msg.role === 'user' ? '👤 用户' : `🤖 ${modelName}`
    
    content += `
    <div class="message ${roleClass}">
        <div class="role">${roleName}</div>
        <div class="content">${msg.content.replace(/\n/g, '<br>')}</div>`
    
    if (includeMetadata.value && msg.timestamp) {
      content += `
        <div class="timestamp">${new Date(msg.timestamp).toLocaleString('zh-CN')}</div>`
    }
    
    content += `
    </div>`
  })
  
  content += `
</body>
</html>`
  
  return content
}

const handlePreview = () => {
  previewContent.value = generateContent(selectedFormat.value)
  showPreview.value = true
}

const handleExport = () => {
  const content = generateContent(selectedFormat.value)
  const timestamp = new Date().toISOString().split('T')[0]
  const modelName = configStore.getDisplayName(props.modelKey)
  
  const extensions = {
    markdown: 'md',
    json: 'json',
    txt: 'txt',
    html: 'html'
  }
  
  const filename = `AI对话-${modelName}-${timestamp}.${extensions[selectedFormat.value]}`
  
  const blob = new Blob([content], { 
    type: selectedFormat.value === 'html' ? 'text/html' : 'text/plain' 
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
  
  uiStore.showNotification('对话已导出')
  emit('close')
}
</script>