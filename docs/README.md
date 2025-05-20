# 📚 项目文档导航

欢迎访问本项目的开发文档。此处记录了当前 AI 工具站的开发进度、模块结构、配置说明和开发约定，方便团队协作与未来迭代。

---

## 📌 项目说明
- 项目名称：AI 工具站（newsitecloner）
- 项目目标：构建面向终端用户的 AI 工具服务平台，支持注册、登录、订阅付款、积分管理、内容访问等完整功能。

---

## 🗂 文档结构

| 路径 | 内容简介 |
|------|-----------|
| [`docs/architecture/overview.md`](./architecture/overview.md) | 项目整体架构概览：模块、目录结构、状态管理等 |
| [`docs/architecture/code-map.md`](./architecture/code-map.md) | 源码文件映射图：关键代码功能说明 |
| [`docs/stripe-config.md`](./stripe-config.md) | Stripe 支付功能的集成与 Webhook 回调配置 |
| [`docs/next-auth-config.md`](./next-auth-config.md) | 用户认证配置（GitHub / Google / Credentials） |
| [`docs/TODO.md`](./TODO.md) *(可选)* | 开发中的任务列表与计划跟踪（可后续添加） |

---

## ✅ 当前阶段完成模块

- [x] 注册 / 登录（Credentials / GitHub / Google）
- [x] 数据库存储（SQLite + Prisma）
- [x] 用户积分系统（初始化、消费、扣减逻辑）
- [x] Stripe 订阅配置（初步）
- [x] GitHub 项目结构文档初始化

---

## 🧱 后续开发计划（可移入 `TODO.md`）

- [ ] 个人面板 UI 与充值入口完善
- [ ] Stripe webhook 消费同步逻辑
- [ ] 首页与访问流程引导界面
- [ ] 管理员端模块拆分
- [ ] 多站模板化适配

---

## 🧠 使用说明（新开发者快速上手）

1. 克隆项目到本地  
   `git clone https://github.com/claytonrngh/newsitecloner.git`

2. 安装依赖  
   `npm install`

3. 设置环境变量 `.env`（查看 `.env.example`）

4. 生成数据库模型并同步  
   `npx prisma migrate dev --name init && npx prisma generate`

5. 启动开发服务  
   `npm run dev`

---

如需协助或查看阶段进度，请先阅读各子文档详情。
