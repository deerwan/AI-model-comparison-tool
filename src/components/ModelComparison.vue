<template>
  <div class="comparison-panel">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-medium text-gray-800">模型对比分析</h3>
      <button @click="$emit('close')" class="btn-ghost">
        ✕
      </button>
    </div>
    
    <div class="space-y-6">
      <!-- 基本信息对比 -->
      <div class="comparison-section">
        <h4 class="text-sm font-medium text-gray-700 mb-3">基本信息</h4>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <div class="text-xs text-gray-500">模型 A</div>
            <div class="text-sm font-medium">{{ configStore.getDisplayName('A') }}</div>
            <div class="text-xs text-gray-500">{{ configStore.modelA.apiUrl || '未配置' }}</div>
          </div>
          <div class="space-y-2">
            <div class="text-xs text-gray-500">模型 B</div>
            <div class="text-sm font-medium">{{ configStore.getDisplayName('B') }}</div>
            <div class="text-xs text-gray-500">{{ configStore.modelB.apiUrl || '未配置' }}</div>
          </div>
        </div>
      </div>
      
      <!-- 性能对比 -->
      <div class="comparison-section" v-if="hasPerformanceData">
        <h4 class="text-sm font-medium text-gray-700 mb-3">性能对比</h4>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-500">平均响应时间</span>
              <span class="font-medium">{{ performanceA.avgTime }}ms</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-gray-500">总Token消耗</span>
              <span class="font-medium">{{ performanceA.totalTokens }}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-gray-500">成功率</span>
              <span class="font-medium">{{ performanceA.successRate }}%</span>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-500">平均响应时间</span>
              <span class="font-medium">{{ performanceB.avgTime }}ms</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-gray-500">总Token消耗</span>
              <span class="font-medium">{{ performanceB.totalTokens }}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-gray-500">成功率</span>
              <span class="font-medium">{{ performanceB.successRate }}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 回答质量对比 -->
      <div class="comparison-section" v-if="hasMessages">
        <h4 class="text-sm font-medium text-gray-700 mb-3">回答特点分析</h4>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-500">平均回答长度</span>
              <span class="font-medium">{{ analysisA.avgLength }} 字符</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-gray-500">回答总数</span>
              <span class="font-medium">{{ analysisA.responseCount }}</span>
            </div>
            <div class="text-xs">
              <span class="text-gray-500">回答风格:</span>
              <span class="font-medium ml-1">{{ analysisA.style }}</span>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-500">平均回答长度</span>
              <span class="font-medium">{{ analysisB.avgLength }} 字符</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-gray-500">回答总数</span>
              <span class="font-medium">{{ analysisB.responseCount }}</span>
            </div>
            <div class="text-xs">
              <span class="text-gray-500">回答风格:</span>
              <span class="font-medium ml-1">{{ analysisB.style }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 推荐建议 -->
      <div class="comparison-section" v-if="recommendation">
        <h4 class="text-sm font-medium text-gray-700 mb-3">使用建议</h4>
        <div class="bg-blue-50 p-3 rounded-lg">
          <div class="text-sm text-blue-800">{{ recommendation }}</div>
        </div>
      </div>
      
      <!-- 导出对比报告 -->
      <div class="flex gap-2">
        <button @click="exportComparison" class="btn-primary flex-1">
          📊 导出对比报告
        </button>
        <button @click="resetComparison" class="btn-secondary">
          🔄 重置数据
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../stores/config'
import { useConversationStore } from '../stores/conversation'
import { useUIStore } from '../stores/ui'

const emit = defineEmits(['close'])

const configStore = useConfigStore()
const conversationStore = useConversationStore()
const uiStore = useUIStore()

const hasMessages = computed(() => {
  return conversationStore.historyA.length > 0 || conversationStore.historyB.length > 0
})

const hasPerformanceData = computed(() => {
  return conversationStore.metaA.time || conversationStore.metaB.time
})

// 性能分析
const performanceA = computed(() => {
  const messages = conversationStore.historyA.filter(m => m.role === 'assistant')
  const times = messages.map(m => parseInt(conversationStore.metaA.time) || 0).filter(t => t > 0)
  const tokens = messages.map(m => parseInt(conversationStore.metaA.tokens) || 0).filter(t => t > 0)
  
  return {
    avgTime: times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0,
    totalTokens: tokens.reduce((a, b) => a + b, 0),
    successRate: messages.length ? Math.round((messages.filter(m => !m.content.includes('错误')).length / messages.length) * 100) : 0
  }
})

const performanceB = computed(() => {
  const messages = conversationStore.historyB.filter(m => m.role === 'assistant')
  const times = messages.map(m => parseInt(conversationStore.metaB.time) || 0).filter(t => t > 0)
  const tokens = messages.map(m => parseInt(conversationStore.metaB.tokens) || 0).filter(t => t > 0)
  
  return {
    avgTime: times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0,
    totalTokens: tokens.reduce((a, b) => a + b, 0),
    successRate: messages.length ? Math.round((messages.filter(m => !m.content.includes('错误')).length / messages.length) * 100) : 0
  }
})

// 回答分析
const analysisA = computed(() => {
  const responses = conversationStore.historyA.filter(m => m.role === 'assistant')
  const avgLength = responses.length ? Math.round(responses.reduce((sum, msg) => sum + msg.content.length, 0) / responses.length) : 0
  
  let style = '未知'
  if (avgLength > 500) style = '详细型'
  else if (avgLength > 200) style = '平衡型'
  else style = '简洁型'
  
  return {
    responseCount: responses.length,
    avgLength,
    style
  }
})

const analysisB = computed(() => {
  const responses = conversationStore.historyB.filter(m => m.role === 'assistant')
  const avgLength = responses.length ? Math.round(responses.reduce((sum, msg) => sum + msg.content.length, 0) / responses.length) : 0
  
  let style = '未知'
  if (avgLength > 500) style = '详细型'
  else if (avgLength > 200) style = '平衡型'
  else style = '简洁型'
  
  return {
    responseCount: responses.length,
    avgLength,
    style
  }
})

// 推荐建议
const recommendation = computed(() => {
  if (!hasMessages.value) return null
  
  const perfA = performanceA.value
  const perfB = performanceB.value
  const analA = analysisA.value
  const analB = analysisB.value
  
  let suggestions = []
  
  if (perfA.avgTime < perfB.avgTime && perfA.avgTime > 0) {
    suggestions.push(`模型A响应更快 (${perfA.avgTime}ms vs ${perfB.avgTime}ms)`)
  } else if (perfB.avgTime < perfA.avgTime && perfB.avgTime > 0) {
    suggestions.push(`模型B响应更快 (${perfB.avgTime}ms vs ${perfA.avgTime}ms)`)
  }
  
  if (perfA.successRate > perfB.successRate) {
    suggestions.push(`模型A成功率更高 (${perfA.successRate}% vs ${perfB.successRate}%)`)
  } else if (perfB.successRate > perfA.successRate) {
    suggestions.push(`模型B成功率更高 (${perfB.successRate}% vs ${perfA.successRate}%)`)
  }
  
  if (analA.avgLength > analB.avgLength) {
    suggestions.push('模型A回答更详细，适合需要深入分析的场景')
  } else if (analB.avgLength > analA.avgLength) {
    suggestions.push('模型B回答更详细，适合需要深入分析的场景')
  }
  
  return suggestions.length ? suggestions.join('；') : '两个模型表现相近，可根据具体需求选择'
})

const exportComparison = () => {
  const report = {
    exportTime: new Date().toLocaleString('zh-CN'),
    models: {
      A: {
        name: configStore.getDisplayName('A'),
        url: configStore.modelA.apiUrl,
        performance: performanceA.value,
        analysis: analysisA.value
      },
      B: {
        name: configStore.getDisplayName('B'),
        url: configStore.modelB.apiUrl,
        performance: performanceB.value,
        analysis: analysisB.value
      }
    },
    recommendation: recommendation.value
  }
  
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `模型对比报告-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
  
  uiStore.showNotification('对比报告已导出')
}

const resetComparison = () => {
  conversationStore.clearHistory('both')
  uiStore.showNotification('对比数据已重置')
}
</script>

<style scoped>
.comparison-section {
  @apply border-b border-gray-100 pb-4 last:border-b-0;
}
</style>