<template>
  <div class="loading-spinner" :class="sizeClass">
    <div class="spinner" :class="colorClass"></div>
    <span v-if="text" class="loading-text" :class="textSizeClass">{{ text }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  color: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'white'].includes(value)
  },
  text: {
    type: String,
    default: ''
  }
})

const sizeClass = computed(() => {
  const sizes = {
    sm: 'loading-sm',
    md: 'loading-md',
    lg: 'loading-lg'
  }
  return sizes[props.size]
})

const colorClass = computed(() => {
  const colors = {
    primary: 'spinner-primary',
    secondary: 'spinner-secondary',
    white: 'spinner-white'
  }
  return colors[props.color]
})

const textSizeClass = computed(() => {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }
  return sizes[props.size]
})
</script>

<style scoped>
.loading-spinner {
  @apply flex flex-col items-center justify-center gap-2;
}

.spinner {
  @apply rounded-full border-2 border-solid animate-spin;
  border-top-color: transparent;
}

.loading-sm .spinner {
  @apply w-4 h-4;
}

.loading-md .spinner {
  @apply w-6 h-6;
}

.loading-lg .spinner {
  @apply w-8 h-8;
}

.spinner-primary {
  @apply border-blue-600;
}

.spinner-secondary {
  @apply border-gray-600;
}

.spinner-white {
  @apply border-white;
}

.loading-text {
  @apply text-gray-600 font-medium;
}
</style>