<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 极简头部 -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-6xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-semibold text-gray-900">AI对比</h1>
          <div class="flex items-center gap-2">
            <button @click="uiStore.toggleConfig" class="btn-ghost text-sm">
              {{ uiStore.showConfig ? '收起配置' : '展开配置' }}
            </button>
            <button @click="uiStore.showSettings = true" class="btn-ghost text-sm">
              设置
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <!-- 极简配置面板 -->
      <SimpleConfig v-show="uiStore.showConfig" />
      
      <!-- 极简对话区域 -->
      <div class="grid lg:grid-cols-2 gap-4">
        <CleanChat 
          :model-key="'A'" 
          :title="configStore.getDisplayName('A')"
          :messages="conversationStore.historyA"
          :status="conversationStore.statusA"
          :meta="conversationStore.metaA"
        />
        <CleanChat 
          :model-key="'B'" 
          :title="configStore.getDisplayName('B')"
          :messages="conversationStore.historyB"
          :status="conversationStore.statusB"
          :meta="conversationStore.metaB"
        />
      </div>

      <!-- 极简输入区域 -->
      <MinimalInput />
    </div>

    <!-- 设置抽屉 -->
    <QuickSettings />
    
    <!-- 通知 -->
    <Toast />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useConfigStore } from './stores/config'
import { useConversationStore } from './stores/conversation'
import { useUIStore } from './stores/ui'
import SimpleConfig from './components/SimpleConfig.vue'
import CleanChat from './components/CleanChat.vue'
import MinimalInput from './components/MinimalInput.vue'
import QuickSettings from './components/QuickSettings.vue'
import Toast from './components/Toast.vue'

const configStore = useConfigStore()
const conversationStore = useConversationStore()
const uiStore = useUIStore()

onMounted(() => {
  // 默认收起配置面板，保持界面简洁
  uiStore.showConfig = false
})
</script>