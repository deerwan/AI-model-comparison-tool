<template>
  <!-- 设置抽屉 -->
  <Teleport to="body">
    <Transition name="fade">
      <div 
        v-if="uiStore.showSettings"
        class="fixed inset-0 bg-black bg-opacity-50 z-50"
        @click="uiStore.showSettings = false"
      >
        <Transition name="slide">
          <div 
            v-if="uiStore.showSettings"
            class="fixed right-0 top-0 h-full w-80 bg-white shadow-xl"
            @click.stop
          >
            <div class="p-4 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="font-medium text-gray-900">设置</h3>
                <button @click="uiStore.showSettings = false" class="btn-ghost">
                  ✕
                </button>
              </div>
            </div>
            
            <div class="p-4 space-y-4">
              <!-- API管理 -->
              <div>
                <h4 class="font-medium text-gray-800 mb-2">API管理</h4>
                <div class="space-y-2">
                  <button @click="showAddAPIDialog = true" class="btn-secondary w-full text-left">
                    + 添加自定义API
                  </button>
                  <div v-for="api in customAPIs" :key="api.id" class="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div class="flex-1 min-w-0">
                      <div class="text-sm font-medium text-gray-900 truncate">{{ api.name }}</div>
                      <div class="text-xs text-gray-500 truncate">{{ api.url }}</div>
                    </div>
                    <button @click="removeAPI(api.id)" class="text-red-500 hover:text-red-700 text-sm ml-2">
                      删除
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- 模型管理 -->
              <div>
                <h4 class="font-medium text-gray-800 mb-2">模型管理</h4>
                <div class="space-y-2">
                  <button @click="showAddModelDialog = true" class="btn-secondary w-full text-left">
                    + 添加自定义模型
                  </button>
                  <div v-for="model in customModels" :key="model.id" class="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div class="flex-1 min-w-0">
                      <div class="text-sm font-medium text-gray-900 truncate">{{ model.name }}</div>
                      <div v-if="model.description" class="text-xs text-gray-500 truncate">{{ model.description }}</div>
                    </div>
                    <button @click="removeModel(model.id)" class="text-red-500 hover:text-red-700 text-sm ml-2">
                      删除
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- 数据管理 -->
              <div>
                <h4 class="font-medium text-gray-800 mb-2">数据管理</h4>
                <div class="space-y-2">
                  <button @click="exportData" class="btn-secondary w-full text-left">
                    📤 导出配置
                  </button>
                  <button @click="importData" class="btn-secondary w-full text-left">
                    📥 导入配置
                  </button>
                  <button @click="showClearDataDialog = true" class="btn-secondary w-full text-left text-red-600">
                    🗑️ 清空所有数据
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>

  <!-- 添加API对话框 -->
  <CustomDialog
    :show="showAddAPIDialog"
    title="添加自定义API"
    :fields="apiFields"
    @confirm="handleAddAPI"
    @cancel="showAddAPIDialog = false"
  />

  <!-- 添加模型对话框 -->
  <CustomDialog
    :show="showAddModelDialog"
    title="添加自定义模型"
    :fields="modelFields"
    @confirm="handleAddModel"
    @cancel="showAddModelDialog = false"
  />

  <!-- 清空数据确认对话框 -->
  <CustomDialog
    :show="showClearDataDialog"
    title="确认清空数据"
    :fields="clearDataFields"
    @confirm="handleClearData"
    @cancel="showClearDataDialog = false"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUIStore } from '../stores/ui'
import { useConfigStore } from '../stores/config'
import CustomDialog from './CustomDialog.vue'

const uiStore = useUIStore()
const configStore = useConfigStore()

const customAPIs = ref([])
const customModels = ref([])

// 对话框显示状态
const showAddAPIDialog = ref(false)
const showAddModelDialog = ref(false)
const showClearDataDialog = ref(false)

// API表单字段
const apiFields = [
  {
    key: 'name',
    label: 'API名称',
    placeholder: '例如：我的OpenAI API',
    required: true
  },
  {
    key: 'url',
    label: 'API地址',
    type: 'url',
    placeholder: 'https://api.example.com/v1/chat/completions',
    required: true
  },
  {
    key: 'description',
    label: '描述',
    placeholder: '可选的描述信息'
  }
]

// 模型表单字段
const modelFields = [
  {
    key: 'name',
    label: '模型名称',
    placeholder: '例如：gpt-4-custom',
    required: true
  },
  {
    key: 'displayName',
    label: '显示名称',
    placeholder: '例如：GPT-4 自定义版本'
  },
  {
    key: 'description',
    label: '描述',
    placeholder: '可选的描述信息'
  }
]

// 清空数据确认字段
const clearDataFields = [
  {
    key: 'confirmation',
    label: '请输入 "确认清空" 来确认此操作',
    placeholder: '确认清空',
    required: true
  }
]

// 处理添加API
const handleAddAPI = (data) => {
  customAPIs.value.push({
    id: Date.now(),
    name: data.name,
    url: data.url,
    description: data.description
  })
  showAddAPIDialog.value = false
  saveCustomData()
  uiStore.showNotification('自定义API已添加')
}

// 处理添加模型
const handleAddModel = (data) => {
  customModels.value.push({
    id: Date.now(),
    name: data.name,
    displayName: data.displayName || data.name,
    description: data.description
  })
  showAddModelDialog.value = false
  saveCustomData()
  uiStore.showNotification('自定义模型已添加')
}

// 处理清空数据
const handleClearData = (data) => {
  if (data.confirmation === '确认清空') {
    localStorage.clear()
    showClearDataDialog.value = false
    uiStore.showNotification('数据已清空，页面即将刷新')
    setTimeout(() => {
      location.reload()
    }, 1000)
  } else {
    uiStore.showError('确认文本不正确')
  }
}

const removeAPI = (id) => {
  customAPIs.value = customAPIs.value.filter(api => api.id !== id)
  saveCustomData()
  uiStore.showNotification('API已删除')
}

const removeModel = (id) => {
  customModels.value = customModels.value.filter(model => model.id !== id)
  saveCustomData()
  uiStore.showNotification('模型已删除')
}

// 保存自定义数据
const saveCustomData = () => {
  localStorage.setItem('ai-comparison-custom', JSON.stringify({
    apis: customAPIs.value,
    models: customModels.value
  }))
}

// 加载自定义数据
const loadCustomData = () => {
  const saved = localStorage.getItem('ai-comparison-custom')
  if (saved) {
    try {
      const data = JSON.parse(saved)
      customAPIs.value = data.apis || []
      customModels.value = data.models || []
    } catch (e) {
      console.error('Failed to load custom data:', e)
    }
  }
}

const exportData = () => {
  const data = {
    config: configStore.$state,
    customAPIs: customAPIs.value,
    customModels: customModels.value,
    exportTime: new Date().toISOString()
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `ai-comparison-config-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
  uiStore.showNotification('配置已导出')
}

const importData = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          if (data.config) {
            Object.assign(configStore.$state, data.config)
          }
          if (data.customAPIs) {
            customAPIs.value = data.customAPIs
          }
          if (data.customModels) {
            customModels.value = data.customModels
          }
          saveCustomData()
          uiStore.showNotification('配置已导入')
        } catch (error) {
          uiStore.showError('导入失败：文件格式错误')
        }
      }
      reader.readAsText(file)
    }
  }
  input.click()
}

onMounted(() => {
  loadCustomData()
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>