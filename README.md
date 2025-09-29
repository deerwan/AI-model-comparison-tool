# AI模型对比工具

> 基于 [hubhubgogo/AI-model-comparison](https://github.com/hubhubgogo/AI-model-comparison) 重构  

一个优雅、现代化的AI模型对比工具，支持多种AI服务商和模型的并行对比测试。

## ✨ 特性

### 🎯 核心功能
- **多模型并行对比** - 同时测试两个不同的AI模型
- **丰富的API支持** - 支持OpenAI、Claude、Gemini等主流AI服务
- **实时对话** - 流畅的对话体验，支持上下文记忆
- **配置管理** - 灵活的模型配置和参数调整
- **数据导出** - 支持多种格式的对话记录导出

### 🛠️ 技术特性
- **现代化技术栈** - Vue 3 + Vite + Pinia + Tailwind CSS
- **响应式设计** - 完美适配桌面和移动设备
- **暗色模式** - 自动适应系统主题偏好
- **无障碍访问** - 符合WCAG标准的可访问性设计
- **PWA支持** - 可安装为桌面应用

### 🎨 用户体验
- **极简设计** - 清爽的界面，专注于内容
- **智能提示** - 丰富的预设模板和快捷操作
- **键盘快捷键** - 高效的键盘操作支持
- **错误处理** - 友好的错误提示和重试机制

## 🚀 快速开始

### 环境要求
- Node.js 16+ 
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 📖 使用指南

### 1. 配置模型
1. 点击"展开配置"按钮
2. 选择API服务商（OpenAI、Claude、Gemini等）
3. 输入API密钥和选择模型
4. 点击"测试连接"验证配置

### 2. 开始对话
1. 在输入框中输入问题
2. 选择发送给单个模型或同时发送给两个模型
3. 查看两个模型的回答对比

### 3. 高级功能
- **系统提示词** - 设置AI的角色和行为
- **参数调整** - 调整Temperature、Max Tokens等参数
- **对话导出** - 导出为Markdown、JSON、HTML等格式
- **性能分析** - 查看响应时间、Token消耗等指标

## 🔧 支持的AI服务商

### 国际主流
- **OpenAI** - GPT-4o, GPT-4 Turbo, GPT-3.5 Turbo
- **Anthropic** - Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku
- **Google** - Gemini 1.5 Pro, Gemini 1.5 Flash, Gemini Pro
- **OpenRouter** - 统一接口访问多种模型
- **Together AI** - 开源模型托管服务

### 国内服务商
- **百度文心一言** - ERNIE 4.0, ERNIE 3.5
- **阿里通义千问** - Qwen Turbo, Qwen Plus, Qwen Max
- **智谱AI** - GLM-4, GLM-3 Turbo
- **月之暗面** - Moonshot v1 (8K/32K/128K)
- **DeepSeek** - DeepSeek Chat, DeepSeek Coder

### 开源/自部署
- **Ollama** - 本地运行开源模型
- **LocalAI** - 本地API服务
- **vLLM** - 高性能推理引擎
- **自定义API** - 支持任意兼容OpenAI格式的API

## 📁 项目结构

```
src/
├── components/          # Vue组件
│   ├── CleanChat.vue   # 对话界面
│   ├── ModelCard.vue   # 模型配置卡片
│   ├── MinimalInput.vue # 输入组件
│   ├── CustomDialog.vue # 自定义对话框
│   └── ...
├── composables/         # 组合式函数
│   ├── useModelCall.js # 模型调用逻辑
│   ├── useDebounce.js  # 防抖处理
│   └── ...
├── stores/             # Pinia状态管理
│   ├── config.js       # 配置管理
│   ├── conversation.js # 对话管理
│   └── ui.js          # UI状态管理
├── utils/              # 工具函数
│   ├── api.js         # API调用工具
│   └── constants.js   # 常量定义
└── style.css          # 全局样式
```


## 🔒 隐私和安全

- **本地存储** - 所有配置和对话记录仅存储在本地浏览器
- **API密钥安全** - 密钥仅在客户端使用，不会发送到第三方服务器
- **HTTPS支持** - 生产环境建议使用HTTPS部署
- **CORS处理** - 正确配置跨域请求头

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

### 开发规范
- 使用Vue 3 Composition API
- 遵循ESLint配置
- 组件命名使用PascalCase
- 提交信息使用约定式提交格式

### 提交流程
1. Fork项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request


## 🙏 致谢

感谢以下开源项目：
- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架
- [Pinia](https://pinia.vuejs.org/) - Vue状态管理库

## 📞 支持

如有问题或建议，请：
- 提交 [GitHub Issue](https://github.com/deerwan/AI-model-comparison-tool/issues)
- 发送邮件至 deer@lllh.de
- 查看 [文档](https://github.com/deerwan/AI-model-comparison-tool/wiki)

---

**让AI模型对比变得简单而优雅** ✨