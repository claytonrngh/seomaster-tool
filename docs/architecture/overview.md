# 🧱 项目架构概览

本项目基于 Next.js 15 + App Router，使用 TypeScript、Prisma ORM、Stripe API 和 next-auth 实现完整的 SaaS 工具站用户管理与订阅机制。

---

## 📁 项目目录结构说明

| 目录/文件 | 说明 |
|-----------|------|
| `app/` | 页面路由与逻辑，使用 Next.js App Router |
| `app/api/` | 所有 API 接口，包括注册、登录、Stripe 支付等 |
| `lib/` | 通用函数、认证配置、积分逻辑 |
| `prisma/` | 数据模型定义（`schema.prisma`）与 SQLite 本地数据库 |
| `types/` | 扩展类型定义，如 `next-auth.d.ts` |
| `public/` | 静态资源，如 SVG 图标 |
| `src/generated/prisma/` | 自动生成的 Prisma 客户端代码 |
| `.env` | 本地环境变量配置（未提交到仓库） |

---

## 🔌 技术栈

- **框架**：Next.js 15 (App Router)
- **数据库**：SQLite（后期可切换 PostgreSQL）
- **ORM 工具**：Prisma
- **认证系统**：next-auth（支持 GitHub / Google / Credentials 登录）
- **支付集成**：Stripe + Webhook
- **样式系统**：TailwindCSS（后续集成）

---

## ✅ 当前已完成模块

- 用户注册、登录、会话管理
- 积分初始化与消费记录接口
- Stripe 支付配置与 Webhook 接口架构
