import { ref, watch } from 'vue'

export function useDebounce(value, delay = 300) {
  const debouncedValue = ref(value.value)
  
  let timeoutId = null
  
  watch(value, (newValue) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = setTimeout(() => {
      debouncedValue.value = newValue
    }, delay)
  }, { immediate: true })
  
  return debouncedValue
}

export function useDebouncedFunction(fn, delay = 300) {
  let timeoutId = null
  
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}