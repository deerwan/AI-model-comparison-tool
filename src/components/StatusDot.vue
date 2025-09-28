<template>
  <div 
    class="status-dot"
    :class="{
      'status-idle': status === 'idle',
      'status-loading': status === 'loading',
      'status-success': status === 'success',
      'status-error': status === 'error'
    }"
    :title="getTitle()"
  />
</template>

<script setup>
const props = defineProps({
  status: {
    type: String,
    default: 'idle'
  }
})

const getTitle = () => {
  const titles = {
    idle: '未配置',
    loading: '请求中',
    success: '就绪',
    error: '错误'
  }
  return titles[props.status] || '未知'
}
</script>