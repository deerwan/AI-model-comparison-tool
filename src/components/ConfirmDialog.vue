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
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0">
                  <div 
                    class="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    :class="iconClass"
                  >
                    {{ icon }}
                  </div>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
                  <p v-if="subtitle" class="text-sm text-gray-500 mt-1">{{ subtitle }}</p>
                </div>
              </div>
            </div>
            
            <!-- 内容 -->
            <div class="px-6 py-4">
              <p class="text-gray-700 leading-relaxed">{{ message }}</p>
            </div>
            
            <!-- 底部按钮 -->
            <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button 
                @click="handleCancel"
                class="btn-secondary"
              >
                {{ cancelText }}
              </button>
              <button 
                @click="handleConfirm"
                class="btn-primary"
                :class="confirmButtonClass"
              >
                {{ confirmText }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'warning', 'danger', 'success'].includes(value)
  },
  confirmText: {
    type: String,
    default: '确认'
  },
  cancelText: {
    type: String,
    default: '取消'
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const icon = computed(() => {
  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    danger: '🚨',
    success: '✅'
  }
  return icons[props.type]
})

const iconClass = computed(() => {
  const classes = {
    info: 'bg-blue-100 text-blue-600',
    warning: 'bg-yellow-100 text-yellow-600',
    danger: 'bg-red-100 text-red-600',
    success: 'bg-green-100 text-green-600'
  }
  return classes[props.type]
})

const confirmButtonClass = computed(() => {
  const classes = {
    info: 'bg-blue-600 hover:bg-blue-700',
    warning: 'bg-yellow-600 hover:bg-yellow-700',
    danger: 'bg-red-600 hover:bg-red-700',
    success: 'bg-green-600 hover:bg-green-700'
  }
  return classes[props.type]
})

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}

const handleBackdropClick = (e) => {
  if (e.target === e.currentTarget) {
    handleCancel()
  }
}
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