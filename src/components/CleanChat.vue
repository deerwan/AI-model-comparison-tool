<template>
  <div class="card h-[500px] flex flex-col">
    <!-- 极简头部 -->
    <div class="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
      <h3 class="font-medium text-gray-800">{{ title }}</h3>
      <StatusDot :status="status" />
    </div>
    
    <!-- 对话区域 -->
    <div class="flex-1 overflow-hidden">
      <div 
        ref="chatContainer"
        class="h-full overflow-y-auto scrollbar-thin space-y-3"
      >
        <!-- 未配置提示 -->
        <div v-if="messages.length === 0 && !isConfigured" class="flex items-center justify-center h-full text-gray-400">
          <div class="text-center space-y-3 max-w-xs">
            <div class="text-3xl">⚙️</div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">{{ title }} 未配置</p>
              <p class="text-xs text-gray-500 leading-relaxed">
                请先在上方配置面板中：<br>
                1. 选择API服务商<br>
                2. 选择或输入模型名称<br>
                3. 输入API密钥<br>
                4. 点击测试验证连接
              </p>
            </div>
            <button 
              @click="scrollToConfig"
              class="btn-primary text-xs px-3 py-1"
            >
              去配置
            </button>
          </div>
        </div>
        
        <!-- 已配置但无对话 -->
        <div v-else-if="messages.length === 0 && isConfigured" class="flex items-center justify-center h-full text-gray-400">
          <div class="text-center">
            <div class="text-2xl mb-1">💭</div>
            <p class="text-sm">{{ title }} 已就绪，等待对话...</p>
          </div>
        </div>
        
        <!-- 对话消息 -->
        <div v-for="(message, index) in messages" :key="index" class="space-y-2">
          <div class="text-xs text-gray-500 font-medium">
            {{ message.role === 'user' ? '用户' : title }}
          </div>
          <div 
            class="p-3 rounded-lg cursor-pointer transition-colors"
            :class="message.role === 'user' ? 'bg-blue-50 text-blue-900' : 'bg-gray-50'"
            @click="copyMessage(message.content)"
          >
            <div class="text-sm leading-relaxed whitespace-pre-wrap">{{ message.content }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 元数据 -->
    <div v-if="meta.time || meta.tokens" class="flex justify-between items-center pt-2 mt-2 border-t border-gray-100">
      <span v-if="meta.time" class="text-xs text-gray-500">{{ meta.time }}</span>
      <span v-if="meta.tokens" class="text-xs text-gray-500">{{ meta.tokens }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch, computed } from 'vue'
import { copyToClipboard } from '../utils/api'
import { useUIStore } from '../stores/ui'
import { useConfigStore } from '../stores/config'
import StatusDot from './StatusDot.vue'

const props = defineProps({
  modelKey: String,
  title: String,
  messages: Array,
  status: String,
  meta: Object
})

const uiStore = useUIStore()
const configStore = useConfigStore()
const chatContainer = ref(null)

// 检查模型是否已配置
const isConfigured = computed(() => {
  const model = props.modelKey === 'A' ? configStore.modelA : configStore.modelB
  return configStore.validateModel(model)
})

const copyMessage = async (content) => {
  const success = await copyToClipboard(content)
  if (success) {
    uiStore.showNotification('已复制')
  }
}

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

const scrollToConfig = () => {
  // 展开配置面板
  uiStore.showConfig = true
  
  // 滚动到页面顶部
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
  
  uiStore.showNotification('请完成模型配置')
}

watch(() => props.messages.length, scrollToBottom)
</script>