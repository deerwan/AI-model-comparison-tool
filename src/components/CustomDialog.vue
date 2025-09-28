<template>
  <Teleport to="body">
    <Transition name="fade">
      <div 
        v-if="show"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        @click="handleBackdropClick"
      >
        <Transition name="scale">
          <div 
            v-if="show"
            class="bg-white rounded-lg shadow-xl max-w-md w-full"
            @click.stop
          >
            <!-- 头部 -->
            <div class="px-6 py-4 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
                <button 
                  @click="handleCancel"
                  class="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- 内容 -->
            <div class="px-6 py-4 space-y-4">
              <div v-for="(field, index) in fields" :key="index">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ field.label }}
                  <span v-if="field.required" class="text-red-500">*</span>
                </label>
                <input 
                  v-model="formData[field.key]"
                  :type="field.type || 'text'"
                  :placeholder="field.placeholder"
                  class="input w-full"
                  :class="{ 'border-red-300': errors[field.key] }"
                  @input="clearError(field.key)"
                />
                <p v-if="errors[field.key]" class="text-red-500 text-xs mt-1">
                  {{ errors[field.key] }}
                </p>
              </div>
            </div>
            
            <!-- 底部按钮 -->
            <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button 
                @click="handleCancel"
                class="btn-secondary"
              >
                取消
              </button>
              <button 
                @click="handleConfirm"
                class="btn-primary"
                :disabled="!isValid"
              >
                确认
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  fields: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const formData = ref({})
const errors = ref({})

// 初始化表单数据
const initFormData = () => {
  const data = {}
  props.fields.forEach(field => {
    data[field.key] = field.default || ''
  })
  formData.value = data
  errors.value = {}
}

// 验证表单
const isValid = computed(() => {
  return props.fields.every(field => {
    if (field.required) {
      return formData.value[field.key]?.trim()
    }
    return true
  })
})

// 清除错误
const clearError = (key) => {
  if (errors.value[key]) {
    delete errors.value[key]
  }
}

// 验证字段
const validateFields = () => {
  const newErrors = {}
  
  props.fields.forEach(field => {
    if (field.required && !formData.value[field.key]?.trim()) {
      newErrors[field.key] = `${field.label}不能为空`
    }
    
    // URL验证
    if (field.type === 'url' && formData.value[field.key]) {
      try {
        new URL(formData.value[field.key])
      } catch {
        newErrors[field.key] = '请输入有效的URL地址'
      }
    }
  })
  
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

// 处理确认
const handleConfirm = () => {
  if (validateFields()) {
    emit('confirm', { ...formData.value })
  }
}

// 处理取消
const handleCancel = () => {
  emit('cancel')
}

// 处理背景点击
const handleBackdropClick = (e) => {
  if (e.target === e.currentTarget) {
    handleCancel()
  }
}

// 监听显示状态变化
watch(() => props.show, (newVal) => {
  if (newVal) {
    initFormData()
  }
})
</script>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>