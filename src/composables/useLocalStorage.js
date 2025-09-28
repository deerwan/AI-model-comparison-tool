import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue = null) {
  const storedValue = localStorage.getItem(key)
  const initialValue = storedValue ? JSON.parse(storedValue) : defaultValue
  
  const value = ref(initialValue)
  
  // 监听变化并自动保存
  watch(value, (newValue) => {
    if (newValue === null || newValue === undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(newValue))
    }
  }, { deep: true })
  
  return value
}

export function useSessionStorage(key, defaultValue = null) {
  const storedValue = sessionStorage.getItem(key)
  const initialValue = storedValue ? JSON.parse(storedValue) : defaultValue
  
  const value = ref(initialValue)
  
  watch(value, (newValue) => {
    if (newValue === null || newValue === undefined) {
      sessionStorage.removeItem(key)
    } else {
      sessionStorage.setItem(key, JSON.stringify(newValue))
    }
  }, { deep: true })
  
  return value
}