# 🛠️ 开发笔记与项目注意事项（dev-notes.md）

本文档记录 `newsitecloner` 项目开发过程中的关键技术决策、环境约束、注意事项与跨平台协作指南，便于长期维护。

---

## ⚙️ 基本环境要求

- Node.js 版本：建议使用 Node v20+
- 包管理工具：npm（已生成 package-lock.json）
- 本地数据库：SQLite（Prisma）
- 开发平台：支持 macOS / Windows（通过 Git 同步）

---

## ✅ 开发约定与注意事项

### 1. 项目结构与规范

- 所有页面使用 App Router 格式，结构统一在 `app/` 与 `app/api/` 下
- 所有前端组件含 `useSession`、`useState` 等必须声明 `'use client'`
- 所有后端操作、数据库访问封装在 `lib/` 中，API 逻辑集中在 `app/api/`

### 2. Git 使用规范

- 所有推送前建议执行：
  ```bash
  git status
  git pull origin main --rebase
	•	提交说明格式建议：
feat: 新增注册页面验证码验证
fix: 修复积分消费页面 Toast 异常
chore: 更新 Stripe priceId

3. 环境变量约定
	•	本地文件为 .env，GitHub 上应仅存在 .env.example
	•	所有密钥通过 process.env 调用，禁止硬编码

🧩 跨平台开发注意事项
| 项目         | macOS         | Windows                             |
|--------------|----------------|-------------------------------------|
| 换行符       | 默认 LF        | 默认 CRLF，建议统一为 LF            |
| 路径大小写   | 不敏感         | 不敏感，但部署时大小写敏感          |
| ngrok 运行   | 推荐安装 CLI   | 推荐使用官方安装方式或 Docker       |


🧠 其他说明
	•	所有 Stripe、Session、Prisma 相关 Bug，应优先查看 .env 是否生效、prisma generate 是否执行
	•	所有页面加载失败建议从终端报错入手，查看是否为 use client 缺失、@prisma/client 初始化错误

⸻

本文档由开发自动生成，可在每次重要结构或工具变更后补充说明。

