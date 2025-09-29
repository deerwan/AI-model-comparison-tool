<template>
  <div class="bg-gray-50 rounded-lg p-4 space-y-3">
    <!-- API服务商选择 -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">API服务商</label>
      <select 
        v-model="selectedProvider" 
        @change="onProviderChange"
        class="input w-full"
      >
        <option value="">选择API服务商...</option>
        
        <!-- 国际主流 -->
        <optgroup label="🌍 国际主流">
          <option value="openai">OpenAI</option>
          <option value="anthropic">Anthropic (Claude)</option>
          <option value="google">Google (Gemini)</option>
          <option value="openrouter">OpenRouter</option>
          <option value="together">Together AI</option>
          <option value="replicate">Replicate</option>
          <option value="huggingface">Hugging Face</option>
          <option value="cohere">Cohere</option>
        </optgroup>
        
        <!-- 国内服务商 -->
        <optgroup label="🇨🇳 国内服务商">
          <option value="baidu">百度文心一言</option>
          <option value="alibaba">阿里通义千问</option>
          <option value="tencent">腾讯混元</option>
          <option value="zhipu">智谱AI (GLM)</option>
          <option value="moonshot">月之暗面 (Kimi)</option>
          <option value="deepseek">DeepSeek</option>
          <option value="minimax">MiniMax</option>
          <option value="xunfei">科大讯飞星火</option>
          <option value="sensetime">商汤日日新</option>
          <option value="bytedance">字节豆包</option>
        </optgroup>
        
        <!-- 开源/自部署 -->
        <optgroup label="🔧 开源/自部署">
          <option value="ollama">Ollama (本地)</option>
          <option value="localai">LocalAI</option>
          <option value="vllm">vLLM</option>
          <option value="textgen">Text Generation WebUI</option>
          <option value="llamacpp">llama.cpp</option>
          <option value="custom">自定义API</option>
        </optgroup>
      </select>
    </div>

    <!-- API地址 -->
    <div>
      <div class="flex items-center justify-between mb-1">
        <label class="text-sm font-medium text-gray-700">API地址</label>
        <button 
          v-if="!isCustomUrl && apiUrl" 
          @click="enableCustomUrl"
          class="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          ✏️ 编辑
        </button>
      </div>
      <input 
        v-model="apiUrl"
        :readonly="!isCustomUrl"
        :class="[
          'input w-full',
          !isCustomUrl && apiUrl ? 'bg-gray-100 text-gray-600' : ''
        ]"
        placeholder="请选择API服务商或输入自定义地址"
      />
    </div>

    <!-- 服务商链接 -->
    <div v-if="providerInfo" class="bg-gray-100 p-2.5 rounded-lg text-sm">
      <div class="flex items-center justify-around gap-2">
        <a 
          v-if="providerInfo.docsUrl"
          :href="providerInfo.docsUrl" 
          target="_blank" 
          class="link-item"
        >
          <span class="text-lg">📚</span>
          <span>API文档</span>
        </a>
        <a 
          v-if="providerInfo.apiKeyUrl"
          :href="providerInfo.apiKeyUrl" 
          target="_blank" 
          class="link-item"
        >
          <span class="text-lg">🔑</span>
          <span>获取密钥</span>
        </a>
      </div>
    </div>

    <!-- 模型选择 -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">模型</label>
      <div class="flex gap-2">
        <select 
          v-model="selectedModel" 
          @change="onModelChange"
          class="input flex-1"
        >
          <option value="">选择预设模型...</option>
          <option 
            v-for="model in availableModels" 
            :key="model.id" 
            :value="model.id"
          >
            {{ model.name }} {{ model.description ? `- ${model.description}` : '' }}
          </option>
        </select>
        <button 
          @click="showCustomModel = !showCustomModel"
          class="btn-ghost px-3"
          :class="{ 'bg-blue-50 text-blue-600': showCustomModel }"
        >
          自定义
        </button>
      </div>
      
      <!-- 自定义模型输入 -->
      <div v-if="showCustomModel" class="mt-2">
        <input 
          v-model="customModelName"
          @input="onCustomModelChange"
          class="input w-full"
          placeholder="输入自定义模型名称..."
        />
      </div>
    </div>

    <!-- API密钥 -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">API密钥</label>
      <div class="flex gap-2">
        <input 
          v-model="apiKey"
          :type="showApiKey ? 'text' : 'password'"
          class="input flex-1"
          placeholder="输入API密钥..."
        />
        <button 
          @click="showApiKey = !showApiKey"
          class="btn-ghost px-3"
        >
          {{ showApiKey ? '👁️' : '🙈' }}
        </button>
      </div>
    </div>

    <!-- 高级配置 -->
    <details class="group">
      <summary class="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900 select-none">
        高级配置 <span class="group-open:rotate-90 transition-transform inline-block">▶</span>
      </summary>
      <div class="mt-3 space-y-3 pl-2 border-l-2 border-gray-200">
        <div>
          <label class="block text-sm text-gray-600 mb-1">
            Temperature: {{ temperature }}
          </label>
          <input 
            v-model.number="temperature"
            type="range"
            min="0"
            max="2"
            step="0.1"
            class="w-full"
          />
          <div class="flex justify-between text-xs text-gray-500 mt-1">
            <span>保守 (0)</span>
            <span>平衡 (1)</span>
            <span>创意 (2)</span>
          </div>
        </div>
        
        <div>
          <label class="block text-sm text-gray-600 mb-1">最大Token数</label>
          <input 
            v-model.number="maxTokens"
            type="number"
            min="1"
            max="32000"
            class="input w-full"
            placeholder="如: 2000"
          />
        </div>
      </div>
    </details>

    <!-- 测试和状态 -->
    <div class="flex items-center justify-between pt-2 border-t border-gray-200">
      <div class="flex items-center gap-2">
        <StatusDot :status="connectionStatus" />
        <span class="text-sm text-gray-600">
          {{ getDisplayName() }}
        </span>
      </div>
      
      <button 
        @click="testConnection"
        :disabled="!canTest || isTesting"
        class="btn-primary text-sm"
      >
        {{ isTesting ? '测试中...' : '测试连接' }}
      </button>
    </div>

    <!-- 测试结果 -->
    <div v-if="testResult" class="text-sm p-3 rounded-lg border" :class="testResult.success ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'">
      <div class="flex items-start gap-2">
        <div class="flex-shrink-0 mt-0.5">
          {{ testResult.success ? '✅' : '❌' }}
        </div>
        <div class="flex-1">
          <div class="font-medium mb-1">
            {{ testResult.success ? '连接成功' : '连接失败' }}
          </div>
          <div class="text-xs leading-relaxed whitespace-pre-line">
            {{ testResult.message }}
          </div>
        </div>
      </div>
    </div>

    <!-- 当前配置信息 -->
    <div v-if="isConfigured" class="text-xs text-gray-500 bg-gray-50 p-2 rounded">
      <div><strong>API:</strong> {{ getProviderName() }}</div>
      <div><strong>地址:</strong> {{ apiUrl }}</div>
      <div><strong>模型:</strong> {{ modelName || '未设置' }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useConfigStore } from '../stores/config'
import { useUIStore } from '../stores/ui'
import StatusDot from './StatusDot.vue'
import { APIClient } from '../utils/api'

const props = defineProps({
  modelKey: {
    type: String,
    required: true
  }
})

const configStore = useConfigStore()
const uiStore = useUIStore()

// 响应式数据
const selectedProvider = ref('')
const selectedModel = ref('')
const customModelName = ref('')
const showCustomModel = ref(false)
const showApiKey = ref(false)
const isCustomUrl = ref(false)
const isTesting = ref(false)
const testResult = ref(null)

// 计算属性
const modelConfig = computed(() => {
  return props.modelKey === 'A' ? configStore.modelA : configStore.modelB
})

const apiUrl = computed({
  get: () => modelConfig.value?.apiUrl || '',
  set: (value) => configStore.updateModel(props.modelKey, { apiUrl: value })
})
const modelName = computed({
  get: () => modelConfig.value?.modelName || '',
  set: (value) => configStore.updateModel(props.modelKey, { modelName: value })
})
const apiKey = computed({
  get: () => modelConfig.value?.apiKey || '',
  set: (value) => configStore.updateModel(props.modelKey, { apiKey: value })
})
const temperature = computed({
  get: () => modelConfig.value?.temperature || 1,
  set: (value) => configStore.updateModel(props.modelKey, { temperature: value })
})
const maxTokens = computed({
  get: () => modelConfig.value?.maxTokens || 2000,
  set: (value) => configStore.updateModel(props.modelKey, { maxTokens: value })
})

import { API_PROVIDERS } from '../utils/constants'

// API提供商配置
const providers = API_PROVIDERS

const availableModels = computed(() => {
  if (!selectedProvider.value) return []
  const provider = providers[selectedProvider.value]
  return provider?.models || []
})

const providerInfo = computed(() => {
  if (!selectedProvider.value || selectedProvider.value === 'custom') return null
  return providers[selectedProvider.value]
})

const canTest = computed(() => {
  return apiUrl.value && modelName.value && apiKey.value
})

const isConfigured = computed(() => {
  return configStore.validateModel(modelConfig.value)
})

const connectionStatus = computed(() => {
  if (isTesting.value) return 'testing'
  if (testResult.value?.success) return 'connected'
  if (testResult.value?.success === false) return 'error'
  if (isConfigured.value) return 'ready'
  return 'disconnected'
})

// 方法
const onProviderChange = () => {
  const provider = providers[selectedProvider.value]
  if (provider) {
    // 更新API地址
    apiUrl.value = provider.url
    isCustomUrl.value = false
    
    // 清空模型选择
    selectedModel.value = ''
    customModelName.value = ''
    showCustomModel.value = false
    modelName.value = '' // 清空当前模型名称
    
    // 清空测试结果
    testResult.value = null
  } else if (selectedProvider.value === 'custom') {
    // 自定义API的情况
    apiUrl.value = ''
    isCustomUrl.value = true
    selectedModel.value = ''
    customModelName.value = ''
    showCustomModel.value = false
    modelName.value = ''
    testResult.value = null
  }
}

const onModelChange = () => {
  if (selectedModel.value) {
    modelName.value = selectedModel.value
    showCustomModel.value = false
    customModelName.value = ''
  }
}

const onCustomModelChange = () => {
  if (customModelName.value) {
    modelName.value = customModelName.value
    selectedModel.value = ''
  }
}

const enableCustomUrl = () => {
  isCustomUrl.value = true
}

const getDisplayName = () => {
  if (modelName.value) return modelName.value
  if (selectedProvider.value) return providers[selectedProvider.value]?.name || selectedProvider.value
  return `模型 ${props.modelKey.toUpperCase()}`
}

const getProviderName = () => {
  return selectedProvider.value ? providers[selectedProvider.value]?.name || selectedProvider.value : '未知'
}

const testConnection = async () => {
  if (!canTest.value) return
  
  isTesting.value = true
  testResult.value = null
  
  try {
    const result = await APIClient.testConnection(modelConfig.value)
    
    if (result.success) {
      testResult.value = {
        success: true,
        message: result.message || '连接成功！模型配置正确。'
      }
      uiStore.showNotification('连接测试成功')
    } else {
      testResult.value = {
        success: false,
        message: result.message || result.error || '连接失败，请检查配置。'
      }
      uiStore.showError(`连接测试失败`)
    }
  } catch (error) {
    testResult.value = {
      success: false,
      message: error.message || '连接失败，请检查配置。'
    }
    uiStore.showError(`连接测试失败`)
  } finally {
    isTesting.value = false
  }
}

// 初始化
const initializeFromConfig = () => {
  const config = modelConfig.value
  
  // 重置状态
  selectedProvider.value = ''
  selectedModel.value = ''
  customModelName.value = ''
  showCustomModel.value = false
  isCustomUrl.value = false
  
  if (config.apiUrl) {
    // 尝试匹配已知的提供商
    for (const [key, provider] of Object.entries(providers)) {
      if (config.apiUrl === provider.url) {
        selectedProvider.value = key
        isCustomUrl.value = false
        break
      }
    }
    if (!selectedProvider.value) {
      selectedProvider.value = 'custom'
      isCustomUrl.value = true
    }
  }
  
  if (config.modelName && selectedProvider.value && selectedProvider.value !== 'custom') {
    const models = providers[selectedProvider.value]?.models || []
    const foundModel = models.find(m => m.id === config.modelName)
    if (foundModel) {
      selectedModel.value = config.modelName
    } else {
      showCustomModel.value = true
      customModelName.value = config.modelName
    }
  } else if (config.modelName) {
    // 自定义模型的情况
    showCustomModel.value = true
    customModelName.value = config.modelName
  }
}

// 监听配置变化
watch(() => modelConfig.value, initializeFromConfig, { immediate: true })
</script>

<style scoped>
.link-item {
  @apply flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200;
}
</style>