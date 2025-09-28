<template>
  <Teleport to="body">
    <Transition name="fade">
      <div 
        v-if="uiStore.notification.show"
        class="fixed top-4 right-4 z-50"
      >
        <div 
          class="px-4 py-2 rounded-lg shadow-lg text-sm font-medium"
          :class="{
            'bg-green-500 text-white': uiStore.notification.type === 'success',
            'bg-red-500 text-white': uiStore.notification.type === 'error',
            'bg-blue-500 text-white': uiStore.notification.type === 'info'
          }"
        >
          {{ uiStore.notification.message }}
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useUIStore } from '../stores/ui'

const uiStore = useUIStore()
</script>