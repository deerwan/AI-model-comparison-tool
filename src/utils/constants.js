// API提供商配置
export const API_PROVIDERS = {
  // 国际主流
  openai: {
    name: 'OpenAI',
    url: 'https://api.openai.com/v1/chat/completions',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o', description: '最新多模态模型', maxTokens: 128000 },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', description: '轻量高效版本', maxTokens: 128000 },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', description: '高性能版本', maxTokens: 128000 },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: '经典版本', maxTokens: 16385 }
    ]
  },
  anthropic: {
    name: 'Anthropic',
    url: 'https://api.anthropic.com/v1/messages',
    models: [
      { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet', description: '最新版本', maxTokens: 200000 },
      { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus', description: '最强版本', maxTokens: 200000 },
      { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku', description: '快速版本', maxTokens: 200000 }
    ]
  },
  google: {
    name: 'Google Gemini',
    url: 'https://generativelanguage.googleapis.com/v1beta/models',
    models: [
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', description: '最新专业版', maxTokens: 2000000 },
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', description: '快速版本', maxTokens: 1000000 },
      { id: 'gemini-pro', name: 'Gemini Pro', description: '标准版本', maxTokens: 32000 }
    ]
  },
  // 国内服务商
  baidu: {
    name: '百度文心一言',
    url: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions',
    models: [
      { id: 'ernie-4.0-8k', name: 'ERNIE 4.0', description: '文心大模型4.0', maxTokens: 8192 },
      { id: 'ernie-3.5-8k', name: 'ERNIE 3.5', description: '文心大模型3.5', maxTokens: 8192 }
    ]
  },
  zhipu: {
    name: '智谱AI (GLM)',
    url: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    models: [
      { id: 'glm-4', name: 'GLM-4', description: '智谱最新大模型', maxTokens: 128000 },
      { id: 'glm-3-turbo', name: 'GLM-3 Turbo', description: '高速版本', maxTokens: 128000 }
    ]
  },
  // 开源/自部署
  ollama: {
    name: 'Ollama (本地)',
    url: 'http://localhost:11434/api/chat',
    models: [
      { id: 'llama3.1', name: 'Llama 3.1', description: 'Meta最新开源', maxTokens: 128000 },
      { id: 'qwen2', name: 'Qwen2', description: '阿里开源模型', maxTokens: 32000 }
    ]
  }
}

// 预设模板
export const MESSAGE_TEMPLATES = {
  translate: {
    name: '翻译助手',
    content: '请将以下文本翻译成中文，保持原意和语调：\n\n',
    icon: '🌐'
  },
  code: {
    name: '代码助手', 
    content: '请帮我分析以下代码，并提供优化建议：\n\n```\n\n```',
    icon: '💻'
  },
  creative: {
    name: '创意写作',
    content: '请基于以下主题创作一篇富有创意的短文：\n\n主题：',
    icon: '✍️'
  },
  analysis: {
    name: '数据分析',
    content: '请对以下数据或问题进行深入分析：\n\n数据/问题：',
    icon: '📊'
  },
  summary: {
    name: '内容总结',
    content: '请总结以下内容的要点：\n\n内容：',
    icon: '📝'
  }
}

// 应用配置
export const APP_CONFIG = {
  name: 'AI模型对比工具',
  version: '1.0.0',
  author: 'AI Assistant',
  description: '一个优雅的AI模型对比工具',
  
  // 默认设置
  defaults: {
    temperature: 1,
    maxTokens: 2000,
    timeout: 30000,
    retryAttempts: 3
  },
  
  // 存储键名
  storageKeys: {
    config: 'ai-comparison-config',
    custom: 'ai-comparison-custom',
    history: 'ai-comparison-history'
  }
}