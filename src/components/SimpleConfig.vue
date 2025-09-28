<template>
  <div class="card">
    <!-- 系统提示词 -->
    <div class="mb-4">
      <div class="flex items-center justify-between mb-2">
        <label class="text-sm font-medium text-gray-700">系统提示词</label>
        <div class="flex items-center gap-2">
          <button 
            @click="configStore.useSharedSystem = !configStore.useSharedSystem"
            class="btn-ghost text-xs"
          >
            {{ configStore.useSharedSystem ? '共用' : '分离' }}
          </button>
          <button @click="clearSystem" class="btn-ghost text-xs">清空</button>
        </div>
      </div>
      
      <textarea 
        v-if="configStore.useSharedSystem"
        v-model="configStore.systemPrompt"
        placeholder="设定AI角色和行为..."
        class="textarea"
        rows="2"
      />
      
      <div v-else class="grid md:grid-cols-2 gap-3">
        <textarea 
          v-model="configStore.systemPromptA"
          placeholder="模型A提示词..."
          class="textarea"
          rows="2"
        />
        <textarea 
          v-model="configStore.systemPromptB"
          placeholder="模型B提示词..."
          class="textarea"
          rows="2"
        />
      </div>
    </div>
    
    <!-- 模型配置 -->
    <div class="grid md:grid-cols-2 gap-4">
      <ModelCard 
        :model-key="'A'"
      />
      <ModelCard 
        :model-key="'B'"
      />
    </div>
  </div>
</template>

<script setup>
import { useConfigStore } from '../stores/config'
import ModelCard from './ModelCard.vue'

const configStore = useConfigStore()

const clearSystem = () => {
  if (configStore.useSharedSystem) {
    configStore.systemPrompt = ''
  } else {
    configStore.systemPromptA = ''
    configStore.systemPromptB = ''
  }
}
</script>