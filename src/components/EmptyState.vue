<template>
  <div class="empty-state">
    <div class="empty-icon">
      {{ icon }}
    </div>
    <h3 class="empty-title">{{ title }}</h3>
    <p v-if="description" class="empty-description">{{ description }}</p>
    <div v-if="$slots.actions" class="empty-actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: '📭'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.empty-state {
  @apply flex flex-col items-center justify-center text-center py-12 px-4;
}

.empty-icon {
  @apply text-6xl mb-4 opacity-60;
}

.empty-title {
  @apply text-lg font-medium text-gray-900 mb-2;
}

.empty-description {
  @apply text-sm text-gray-500 max-w-sm leading-relaxed mb-6;
}

.empty-actions {
  @apply flex flex-col sm:flex-row gap-3;
}
</style>