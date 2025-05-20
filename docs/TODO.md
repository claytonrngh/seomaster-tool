# ✅ AI 工具站项目开发进度追踪（TODO.md）

本文件用于记录当前项目的开发任务、完成情况和下阶段目标，方便阶段性推进与协作开发。

---

## ✅ 已完成

- [x] 初始化 Next.js 15 + TypeScript 项目
- [x] 集成 Prisma ORM 与 SQLite 数据库
- [x] 配置 next-auth（支持 GitHub / Google / 密码登录）
- [x] 编写注册、登录页
- [x] 用户表结构 + 初始积分字段
- [x] 积分校验与消费接口
- [x] Stripe 支付配置（Checkout + Webhook）
- [x] 完成登录后跳转与 session 展示
- [x] 项目文档结构整理（docs 目录 + 架构说明）

---

## 🟡 开发中

- [ ] 登录后首页 `Tool Dashboard` 添加基本操作面板 UI
- [ ] Stripe 充值积分逻辑联通测试（Checkout → Webhook → 更新积分）
- [ ] 登录后获取当前用户积分并显示
- [ ] 用户个人资料页：查看账户信息 / 登出入口
- [ ] 接入 TailwindCSS + 初步美化布局
- [ ] 实现 Stripe Checkout 后跳转页面（success, cancel）

---

## 🔜 待开发阶段

- [ ] Stripe Subscriptions（订阅机制）
- [ ] 用户订单记录页面
- [ ] 管理后台（可选，查看所有用户充值记录）
- [ ] 权限分级设计（如 admin / user）
- [ ] SaaS 模式导出模版功能
- [ ] 国际化支持（中 / 英 / 日）

---

## 🛠️ 技术优化项

- [ ] NextAuth adapter 抽离优化
- [ ] 使用 Zustand / SWR 管理前端状态
- [ ] 数据缓存策略设计
- [ ] 单元测试与集成测试初步搭建

---

> 💡 *请每次开发新功能后更新本文件进度，或创建 `dev-分支` 并关联 task 项进行协同开发。*
