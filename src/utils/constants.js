// API提供商配置
export const API_PROVIDERS = {
  // 国际主流
  openai: {
    name: 'OpenAI',
    url: 'https://api.openai.com/v1/chat/completions',
    docsUrl: 'https://platform.openai.com/docs/api-reference/chat',
    apiKeyUrl: 'https://platform.openai.com/api-keys',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o', description: '最新多模态模型 (2024-08-06)', maxTokens: 128000 },
      { id: 'gpt-4o-2024-08-06', name: 'GPT-4o (2024-08-06)', description: '指定版本', maxTokens: 128000 },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', description: '轻量高效版本', maxTokens: 128000 },
      { id: 'gpt-4o-mini-2024-07-18', name: 'GPT-4o Mini (2024-07-18)', description: '指定版本', maxTokens: 128000 },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', description: '高性能版本', maxTokens: 128000 },
      { id: 'gpt-4-turbo-2024-04-09', name: 'GPT-4 Turbo (2024-04-09)', description: '指定版本', maxTokens: 128000 },
      { id: 'gpt-4', name: 'GPT-4', description: '经典GPT-4', maxTokens: 8192 },
      { id: 'gpt-4-0613', name: 'GPT-4 (0613)', description: '稳定版本', maxTokens: 8192 },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: '经典版本', maxTokens: 16385 },
      { id: 'gpt-3.5-turbo-0125', name: 'GPT-3.5 Turbo (0125)', description: '最新3.5版本', maxTokens: 16385 }
    ]
  },
  anthropic: {
    name: 'Anthropic (Claude)',
    url: 'https://api.anthropic.com/v1/messages',
    docsUrl: 'https://docs.anthropic.com/claude/reference/messages_post',
    apiKeyUrl: 'https://console.anthropic.com/settings/keys',
    models: [
      { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet (New)', description: '最新版本 (2024-10-22)', maxTokens: 200000 },
      { id: 'claude-3-5-sonnet-20240620', name: 'Claude 3.5 Sonnet', description: '经典3.5版本 (2024-06-20)', maxTokens: 200000 },
      { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku', description: '快速版本 (2024-10-22)', maxTokens: 200000 },
      { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus', description: '最强版本', maxTokens: 200000 },
      { id: 'claude-3-sonnet-20240229', name: 'Claude 3 Sonnet', description: '平衡版本', maxTokens: 200000 },
      { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku', description: '经济版本', maxTokens: 200000 }
    ]
  },
  google: {
    name: 'Google Gemini',
    url: 'https://generativelanguage.googleapis.com/v1beta/models',
    docsUrl: 'https://ai.google.dev/gemini-api/docs',
    apiKeyUrl: 'https://makersuite.google.com/app/apikey',
    models: [
      { id: 'gemini-1.5-pro-latest', name: 'Gemini 1.5 Pro (Latest)', description: '最新专业版', maxTokens: 2000000 },
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', description: '专业版', maxTokens: 2000000 },
      { id: 'gemini-1.5-pro-exp-0827', name: 'Gemini 1.5 Pro Exp', description: '实验版本', maxTokens: 2000000 },
      { id: 'gemini-1.5-flash-latest', name: 'Gemini 1.5 Flash (Latest)', description: '最新快速版', maxTokens: 1000000 },
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', description: '快速版本', maxTokens: 1000000 },
      { id: 'gemini-1.5-flash-8b-latest', name: 'Gemini 1.5 Flash 8B', description: '轻量快速版', maxTokens: 1000000 },
      { id: 'gemini-pro', name: 'Gemini Pro', description: '标准版本', maxTokens: 32000 },
      { id: 'gemini-pro-vision', name: 'Gemini Pro Vision', description: '视觉版本', maxTokens: 32000 }
    ]
  },
  openrouter: {
    name: 'OpenRouter',
    url: 'https://openrouter.ai/api/v1/chat/completions',
    docsUrl: 'https://openrouter.ai/docs',
    apiKeyUrl: 'https://openrouter.ai/keys',
    models: [
      { id: 'anthropic/claude-3.5-sonnet:beta', name: 'Claude 3.5 Sonnet', description: '通过OpenRouter', maxTokens: 200000 },
      { id: 'openai/gpt-4o', name: 'GPT-4o', description: '通过OpenRouter', maxTokens: 128000 },
      { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini', description: '通过OpenRouter', maxTokens: 128000 },
      { id: 'google/gemini-pro-1.5-exp', name: 'Gemini Pro 1.5', description: '通过OpenRouter', maxTokens: 2000000 },
      { id: 'meta-llama/llama-3.1-405b-instruct', name: 'Llama 3.1 405B', description: '最大开源模型', maxTokens: 128000 },
      { id: 'meta-llama/llama-3.1-70b-instruct', name: 'Llama 3.1 70B', description: '大型开源模型', maxTokens: 128000 },
      { id: 'meta-llama/llama-3.1-8b-instruct', name: 'Llama 3.1 8B', description: '中型开源模型', maxTokens: 128000 },
      { id: 'mistralai/mistral-large', name: 'Mistral Large', description: 'Mistral最大模型', maxTokens: 128000 },
      { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus', description: '通过OpenRouter', maxTokens: 200000 },
      { id: 'cohere/command-r-plus', name: 'Command R+', description: '通过OpenRouter', maxTokens: 128000 }
    ]
  },
  together: {
    name: 'Together AI',
    url: 'https://api.together.xyz/v1/chat/completions',
    docsUrl: 'https://docs.together.ai/intro',
    apiKeyUrl: 'https://api.together.xyz/settings/api-keys',
    models: [
      { id: 'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo', name: 'Llama 3.1 405B Turbo', description: '最大开源模型加速版', maxTokens: 128000 },
      { id: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo', name: 'Llama 3.1 70B Turbo', description: '大型开源模型加速版', maxTokens: 128000 },
      { id: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo', name: 'Llama 3.1 8B Turbo', description: '中型开源模型加速版', maxTokens: 128000 },
      { id: 'mistralai/Mixtral-8x7B-Instruct-v0.1', name: 'Mixtral 8x7B', description: 'Mistral混合专家', maxTokens: 32768 },
      { id: 'mistralai/Mistral-7B-Instruct-v0.3', name: 'Mistral 7B v0.3', description: 'Mistral最新7B', maxTokens: 32768 },
      { id: 'Qwen/Qwen2.5-72B-Instruct-Turbo', name: 'Qwen2.5 72B Turbo', description: '阿里开源大模型加速版', maxTokens: 32768 },
      { id: 'NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO', name: 'Nous Hermes 2', description: '优化对话模型', maxTokens: 32768 },
      { id: 'microsoft/DialoGPT-medium', name: 'DialoGPT Medium', description: '微软对话模型', maxTokens: 1024 }
    ]
  },
  replicate: {
    name: 'Replicate',
    url: 'https://api.replicate.com/v1/predictions',
    docsUrl: 'https://replicate.com/docs/reference/http',
    apiKeyUrl: 'https://replicate.com/account/api-tokens',
    models: [
      { id: 'meta/llama-2-70b-chat', name: 'Llama 2 70B Chat', description: 'Meta开源对话', maxTokens: 4096 },
      { id: 'mistralai/mixtral-8x7b-instruct-v0.1', name: 'Mixtral 8x7B', description: 'Mistral模型', maxTokens: 32768 }
    ]
  },
  huggingface: {
    name: 'Hugging Face',
    url: 'https://api-inference.huggingface.co/models',
    docsUrl: 'https://huggingface.co/docs/api-inference/index',
    apiKeyUrl: 'https://huggingface.co/settings/tokens',
    models: [
      { id: 'microsoft/DialoGPT-large', name: 'DialoGPT Large', description: '微软对话模型', maxTokens: 1024 },
      { id: 'facebook/blenderbot-400M-distill', name: 'BlenderBot 400M', description: 'Facebook对话机器人', maxTokens: 512 }
    ]
  },
  cohere: {
    name: 'Cohere',
    url: 'https://api.cohere.ai/v1/chat',
    docsUrl: 'https://docs.cohere.com/reference/chat',
    apiKeyUrl: 'https://dashboard.cohere.com/api-keys',
    models: [
      { id: 'command-r-plus', name: 'Command R+', description: '最新指令模型', maxTokens: 128000 },
      { id: 'command-r', name: 'Command R', description: '标准指令模型', maxTokens: 128000 },
      { id: 'command', name: 'Command', description: '经典指令模型', maxTokens: 4096 },
      { id: 'command-nightly', name: 'Command Nightly', description: '夜间实验版本', maxTokens: 128000 }
    ]
  },
  groq: {
    name: 'Groq',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    docsUrl: 'https://console.groq.com/docs/api-reference',
    apiKeyUrl: 'https://console.groq.com/keys',
    models: [
      { id: 'llama-3.1-405b-reasoning', name: 'Llama 3.1 405B', description: '超大模型推理优化', maxTokens: 131072 },
      { id: 'llama-3.1-70b-versatile', name: 'Llama 3.1 70B', description: '大型多用途模型', maxTokens: 131072 },
      { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B', description: '快速响应模型', maxTokens: 131072 },
      { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', description: 'Mistral混合专家', maxTokens: 32768 },
      { id: 'gemma2-9b-it', name: 'Gemma 2 9B', description: 'Google开源模型', maxTokens: 8192 },
      { id: 'gemma-7b-it', name: 'Gemma 7B', description: 'Google轻量模型', maxTokens: 8192 }
    ]
  },
  perplexity: {
    name: 'Perplexity',
    url: 'https://api.perplexity.ai/chat/completions',
    docsUrl: 'https://docs.perplexity.ai/reference/chat-completions',
    apiKeyUrl: 'https://www.perplexity.ai/settings/api',
    models: [
      { id: 'llama-3.1-sonar-large-128k-online', name: 'Sonar Large Online', description: '联网大模型', maxTokens: 127072 },
      { id: 'llama-3.1-sonar-small-128k-online', name: 'Sonar Small Online', description: '联网小模型', maxTokens: 127072 },
      { id: 'llama-3.1-sonar-large-128k-chat', name: 'Sonar Large Chat', description: '离线大模型', maxTokens: 131072 },
      { id: 'llama-3.1-sonar-small-128k-chat', name: 'Sonar Small Chat', description: '离线小模型', maxTokens: 131072 },
      { id: 'llama-3.1-8b-instruct', name: 'Llama 3.1 8B', description: '标准指令模型', maxTokens: 131072 },
      { id: 'llama-3.1-70b-instruct', name: 'Llama 3.1 70B', description: '大型指令模型', maxTokens: 131072 }
    ]
  },
  fireworks: {
    name: 'Fireworks AI',
    url: 'https://api.fireworks.ai/inference/v1/chat/completions',
    docsUrl: 'https://readme.fireworks.ai/reference/createchatcompletion',
    apiKeyUrl: 'https://fireworks.ai/api-keys',
    models: [
      { id: 'accounts/fireworks/models/llama-v3p1-405b-instruct', name: 'Llama 3.1 405B', description: '超大模型', maxTokens: 131072 },
      { id: 'accounts/fireworks/models/llama-v3p1-70b-instruct', name: 'Llama 3.1 70B', description: '大型模型', maxTokens: 131072 },
      { id: 'accounts/fireworks/models/llama-v3p1-8b-instruct', name: 'Llama 3.1 8B', description: '中型模型', maxTokens: 131072 },
      { id: 'accounts/fireworks/models/mixtral-8x7b-instruct', name: 'Mixtral 8x7B', description: 'Mistral混合专家', maxTokens: 32768 },
      { id: 'accounts/fireworks/models/qwen2p5-72b-instruct', name: 'Qwen2.5 72B', description: '阿里开源大模型', maxTokens: 32768 }
    ]
  },

  // 国内服务商
  baidu: {
    name: '百度文心一言',
    url: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions',
    docsUrl: 'https://cloud.baidu.com/doc/WENXINWORKSHOP/s/clntwmv7t',
    apiKeyUrl: 'https://console.bce.baidu.com/qianfan/ais/console/applicationConsole/application',
    models: [
      { id: 'ernie-4.0-8k', name: 'ERNIE 4.0 8K', description: '文心大模型4.0', maxTokens: 8192 },
      { id: 'ernie-4.0-turbo-8k', name: 'ERNIE 4.0 Turbo', description: '文心4.0加速版', maxTokens: 8192 },
      { id: 'ernie-3.5-8k', name: 'ERNIE 3.5 8K', description: '文心大模型3.5', maxTokens: 8192 },
      { id: 'ernie-3.5-4k', name: 'ERNIE 3.5 4K', description: '文心3.5标准版', maxTokens: 4096 },
      { id: 'ernie-speed-128k', name: 'ERNIE Speed 128K', description: '文心极速版', maxTokens: 131072 },
      { id: 'ernie-speed-8k', name: 'ERNIE Speed 8K', description: '文心极速标准版', maxTokens: 8192 },
      { id: 'ernie-lite-8k', name: 'ERNIE Lite 8K', description: '文心轻量版', maxTokens: 8192 },
      { id: 'ernie-tiny-8k', name: 'ERNIE Tiny 8K', description: '文心超轻量版', maxTokens: 8192 }
    ]
  },
  alibaba: {
    name: '阿里通义千问',
    url: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
    docsUrl: 'https://help.aliyun.com/zh/dashscope/developer-reference/api-details',
    apiKeyUrl: 'https://dashscope.console.aliyun.com/apiKey',
    models: [
      { id: 'qwen-max', name: 'Qwen Max', description: '通义千问旗舰版', maxTokens: 8192 },
      { id: 'qwen-max-0428', name: 'Qwen Max (0428)', description: '指定版本', maxTokens: 8192 },
      { id: 'qwen-max-longcontext', name: 'Qwen Max Long', description: '长文本版本', maxTokens: 30000 },
      { id: 'qwen-plus', name: 'Qwen Plus', description: '通义千问增强版', maxTokens: 32768 },
      { id: 'qwen-plus-0828', name: 'Qwen Plus (0828)', description: '最新增强版', maxTokens: 32768 },
      { id: 'qwen-turbo', name: 'Qwen Turbo', description: '通义千问超快版', maxTokens: 8192 },
      { id: 'qwen-turbo-0828', name: 'Qwen Turbo (0828)', description: '最新超快版', maxTokens: 8192 },
      { id: 'qwen2.5-72b-instruct', name: 'Qwen2.5 72B', description: '开源大模型', maxTokens: 32768 },
      { id: 'qwen2.5-32b-instruct', name: 'Qwen2.5 32B', description: '开源中大模型', maxTokens: 32768 },
      { id: 'qwen2.5-14b-instruct', name: 'Qwen2.5 14B', description: '开源中型模型', maxTokens: 32768 },
      { id: 'qwen2.5-7b-instruct', name: 'Qwen2.5 7B', description: '开源小型模型', maxTokens: 32768 }
    ]
  },
  tencent: {
    name: '腾讯混元',
    url: 'https://hunyuan.tencentcloudapi.com/',
    docsUrl: 'https://cloud.tencent.com/document/product/1729/97732',
    apiKeyUrl: 'https://console.cloud.tencent.com/cam/capi',
    models: [
      { id: 'hunyuan-pro', name: '混元 Pro', description: '腾讯混元专业版', maxTokens: 32768 },
      { id: 'hunyuan-standard', name: '混元标准版', description: '腾讯混元标准版', maxTokens: 4096 },
      { id: 'hunyuan-lite', name: '混元轻量版', description: '腾讯混元轻量版', maxTokens: 4096 },
      { id: 'hunyuan-turbo', name: '混元 Turbo', description: '腾讯混元加速版', maxTokens: 32768 }
    ]
  },
  zhipu: {
    name: '智谱AI (GLM)',
    url: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    docsUrl: 'https://open.bigmodel.cn/dev/api',
    apiKeyUrl: 'https://open.bigmodel.cn/usercenter/apikeys',
    models: [
      { id: 'glm-4-plus', name: 'GLM-4 Plus', description: '智谱GLM-4增强版', maxTokens: 128000 },
      { id: 'glm-4-0520', name: 'GLM-4 (0520)', description: '智谱GLM-4标准版', maxTokens: 128000 },
      { id: 'glm-4', name: 'GLM-4', description: '智谱GLM-4最新版', maxTokens: 128000 },
      { id: 'glm-4-air', name: 'GLM-4 Air', description: '智谱GLM-4轻量版', maxTokens: 128000 },
      { id: 'glm-4-airx', name: 'GLM-4 AirX', description: '智谱GLM-4极速版', maxTokens: 8192 },
      { id: 'glm-4-flash', name: 'GLM-4 Flash', description: '智谱GLM-4闪电版', maxTokens: 128000 },
      { id: 'glm-4-long', name: 'GLM-4 Long', description: '智谱GLM-4长文本版', maxTokens: 1000000 },
      { id: 'glm-4v', name: 'GLM-4V', description: '智谱GLM-4视觉版', maxTokens: 2000 },
      { id: 'glm-3-turbo', name: 'GLM-3 Turbo', description: '智谱GLM-3加速版', maxTokens: 128000 }
    ]
  },
  moonshot: {
    name: '月之暗面 (Kimi)',
    url: 'https://api.moonshot.cn/v1/chat/completions',
    docsUrl: 'https://platform.moonshot.cn/docs/api-reference',
    apiKeyUrl: 'https://platform.moonshot.cn/console/api-keys',
    models: [
      { id: 'moonshot-v1-8k', name: 'Moonshot v1 8K', description: '8K上下文版本', maxTokens: 8192 },
      { id: 'moonshot-v1-32k', name: 'Moonshot v1 32K', description: '32K上下文版本', maxTokens: 32768 },
      { id: 'moonshot-v1-128k', name: 'Moonshot v1 128K', description: '128K上下文版本', maxTokens: 131072 }
    ]
  },
  deepseek: {
    name: 'DeepSeek',
    url: 'https://api.deepseek.com/v1/chat/completions',
    docsUrl: 'https://platform.deepseek.com/api-docs/zh-cn/chat-api',
    apiKeyUrl: 'https://platform.deepseek.com/api_keys',
    models: [
      { id: 'deepseek-chat', name: 'DeepSeek Chat', description: '深度求索对话模型', maxTokens: 32768 },
      { id: 'deepseek-coder', name: 'DeepSeek Coder', description: '深度求索代码模型', maxTokens: 32768 }
    ]
  },
  minimax: {
    name: 'MiniMax',
    url: 'https://api.minimax.chat/v1/text/chatcompletion_pro',
    docsUrl: 'https://platform.minimaxi.com/document/text_api_intro',
    apiKeyUrl: 'https://platform.minimaxi.com/api-keys',
    models: [
      { id: 'abab6.5s-chat', name: 'ABAB 6.5s', description: 'MiniMax对话模型', maxTokens: 245760 },
      { id: 'abab6.5-chat', name: 'ABAB 6.5', description: 'MiniMax标准版', maxTokens: 8192 },
      { id: 'abab5.5-chat', name: 'ABAB 5.5', description: 'MiniMax经济版', maxTokens: 8192 }
    ]
  },
  xunfei: {
    name: '科大讯飞星火',
    url: 'https://spark-api-open.xf-yun.com/v1/chat/completions',
    docsUrl: 'https://www.xfyun.cn/doc/spark/Web.html',
    apiKeyUrl: 'https://console.xfyun.cn/services/iat',
    models: [
      { id: 'spark-max-32k', name: 'Spark Max 32K', description: '星火Max长文本', maxTokens: 32768 },
      { id: 'spark-max', name: 'Spark Max', description: '星火Max标准版', maxTokens: 8192 },
      { id: 'spark-pro-128k', name: 'Spark Pro 128K', description: '星火Pro长文本', maxTokens: 131072 },
      { id: 'spark-pro', name: 'Spark Pro', description: '星火Pro标准版', maxTokens: 8192 },
      { id: 'spark-lite', name: 'Spark Lite', description: '星火轻量版', maxTokens: 4096 },
      { id: 'spark-4.0-ultra', name: 'Spark 4.0 Ultra', description: '星火4.0旗舰版', maxTokens: 8192 }
    ]
  },
  sensetime: {
    name: '商汤日日新',
    url: 'https://api.sensenova.cn/v1/llm/chat-completions',
    docsUrl: 'https://platform.sensenova.cn/product/APIService/document/',
    apiKeyUrl: 'https://platform.sensenova.cn/console/llm/key',
    models: [
      { id: 'nova-ptc-xl-v1', name: 'Nova PTC XL', description: '商汤超大模型', maxTokens: 16384 },
      { id: 'nova-ptc-xs-v1', name: 'Nova PTC XS', description: '商汤轻量模型', maxTokens: 16384 }
    ]
  },
  bytedance: {
    name: '字节豆包',
    url: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
    docsUrl: 'https://www.volcengine.com/docs/82379/1099475',
    apiKeyUrl: 'https://console.volcengine.com/ark/key',
    models: [
      { id: 'doubao-pro-32k', name: '豆包 Pro 32K', description: '豆包专业长文本版', maxTokens: 32768 },
      { id: 'doubao-pro-4k', name: '豆包 Pro 4K', description: '豆包专业标准版', maxTokens: 4096 },
      { id: 'doubao-pro-128k', name: '豆包 Pro 128K', description: '豆包专业超长文本版', maxTokens: 131072 },
      { id: 'doubao-lite-32k', name: '豆包轻量 32K', description: '豆包轻量长文本版', maxTokens: 32768 },
      { id: 'doubao-lite-4k', name: '豆包轻量 4K', description: '豆包轻量标准版', maxTokens: 4096 },
      { id: 'doubao-lite-128k', name: '豆包轻量 128K', description: '豆包轻量超长文本版', maxTokens: 131072 }
    ]
  },

  // 开源/自部署
  ollama: {
    name: 'Ollama (本地)',
    url: 'http://localhost:11434/api/chat',
    docsUrl: 'https://ollama.com/',
    apiKeyUrl: '',
    models: [
      { id: 'llama3.1:405b', name: 'Llama 3.1 405B', description: 'Meta最大开源模型', maxTokens: 128000 },
      { id: 'llama3.1:70b', name: 'Llama 3.1 70B', description: 'Meta大型开源模型', maxTokens: 128000 },
      { id: 'llama3.1:8b', name: 'Llama 3.1 8B', description: 'Meta中型开源模型', maxTokens: 128000 },
      { id: 'qwen2.5:72b', name: 'Qwen2.5 72B', description: '阿里最新开源大模型', maxTokens: 32768 },
      { id: 'qwen2.5:32b', name: 'Qwen2.5 32B', description: '阿里开源中大模型', maxTokens: 32768 },
      { id: 'qwen2.5:14b', name: 'Qwen2.5 14B', description: '阿里开源中型模型', maxTokens: 32768 },
      { id: 'qwen2.5:7b', name: 'Qwen2.5 7B', description: '阿里开源小型模型', maxTokens: 32768 },
      { id: 'mistral-nemo:12b', name: 'Mistral Nemo 12B', description: 'Mistral中型模型', maxTokens: 128000 },
      { id: 'gemma2:27b', name: 'Gemma 2 27B', description: 'Google开源大模型', maxTokens: 8192 },
      { id: 'gemma2:9b', name: 'Gemma 2 9B', description: 'Google开源中型模型', maxTokens: 8192 },
      { id: 'phi3.5:3.8b', name: 'Phi 3.5 3.8B', description: '微软小型高效模型', maxTokens: 128000 },
      { id: 'codellama:34b', name: 'Code Llama 34B', description: 'Meta代码专用模型', maxTokens: 16384 },
      { id: 'deepseek-coder-v2:16b', name: 'DeepSeek Coder V2', description: '深度求索代码模型', maxTokens: 128000 }
    ]
  },
  localai: {
    name: 'LocalAI',
    url: 'http://localhost:8080/v1/chat/completions',
    docsUrl: 'https://localai.io/',
    apiKeyUrl: '',
    models: [
      { id: 'gpt-3.5-turbo', name: 'LocalAI GPT-3.5', description: '本地GPT-3.5兼容', maxTokens: 4096 },
      { id: 'gpt-4', name: 'LocalAI GPT-4', description: '本地GPT-4兼容', maxTokens: 8192 }
    ]
  },
  vllm: {
    name: 'vLLM',
    url: 'http://localhost:8000/v1/chat/completions',
    docsUrl: 'https://vllm.ai/',
    apiKeyUrl: '',
    models: [
      { id: 'meta-llama/Llama-2-7b-chat-hf', name: 'Llama 2 7B Chat', description: 'vLLM部署', maxTokens: 4096 },
      { id: 'meta-llama/Llama-2-13b-chat-hf', name: 'Llama 2 13B Chat', description: 'vLLM部署', maxTokens: 4096 }
    ]
  },
  textgen: {
    name: 'Text Generation WebUI',
    url: 'http://localhost:5000/v1/chat/completions',
    docsUrl: 'https://github.com/oobabooga/text-generation-webui',
    apiKeyUrl: '',
    models: [
      { id: 'current-model', name: '当前加载模型', description: 'WebUI当前模型', maxTokens: 2048 }
    ]
  },
  llamacpp: {
    name: 'llama.cpp',
    url: 'http://localhost:8080/v1/chat/completions',
    docsUrl: 'https://github.com/ggerganov/llama.cpp',
    apiKeyUrl: '',
    models: [
      { id: 'llama-model', name: 'Llama模型', description: 'llama.cpp服务', maxTokens: 2048 }
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
  },
  qa: {
    name: '问答助手',
    content: '请详细回答以下问题：\n\n问题：',
    icon: '❓'
  },
  brainstorm: {
    name: '头脑风暴',
    content: '请围绕以下主题进行头脑风暴，提供多个创新想法：\n\n主题：',
    icon: '💡'
  },
  review: {
    name: '文本审查',
    content: '请审查以下文本的语法、逻辑和表达，并提供改进建议：\n\n文本：',
    icon: '🔍'
  },
  explain: {
    name: '概念解释',
    content: '请用简单易懂的语言解释以下概念：\n\n概念：',
    icon: '📚'
  },
  compare: {
    name: '对比分析',
    content: '请对比分析以下两个事物的异同点：\n\nA：\nB：',
    icon: '⚖️'
  },
  plan: {
    name: '制定计划',
    content: '请为以下目标制定详细的执行计划：\n\n目标：',
    icon: '📋'
  },
  debug: {
    name: '代码调试',
    content: '以下代码出现了问题，请帮我找出错误并修复：\n\n```\n\n```\n\n错误信息：',
    icon: '🐛'
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