import { onMounted, onUnmounted } from 'vue'

export function useKeyboard(shortcuts = {}) {
  const handleKeydown = (event) => {
    const key = event.key.toLowerCase()
    const ctrl = event.ctrlKey || event.metaKey
    const shift = event.shiftKey
    const alt = event.altKey
    
    // 构建快捷键字符串
    let shortcut = ''
    if (ctrl) shortcut += 'ctrl+'
    if (shift) shortcut += 'shift+'
    if (alt) shortcut += 'alt+'
    shortcut += key
    
    // 执行对应的回调
    if (shortcuts[shortcut]) {
      event.preventDefault()
      shortcuts[shortcut](event)
    }
  }
  
  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
  
  return {
    addShortcut: (key, callback) => {
      shortcuts[key] = callback
    },
    removeShortcut: (key) => {
      delete shortcuts[key]
    }
  }
}