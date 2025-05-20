# 🛠️ 项目下一阶段任务追踪（Next Task）

本文件用于记录当前阶段即将进行的开发任务、优化方向与模块推进计划，确保开发节奏有序，便于后续持续迭代。

---

## ✅ 当前已完成阶段

- 用户注册与登录模块（支持 GitHub / Google / Credentials 三种方式）
- Prisma 数据模型定义与数据库初始化（用户、积分）
- 注册即送默认积分（3 分）
- Session 与数据库连接绑定（strategy: "database"）
- Google 登录按钮 UI 接入并测试通过
- AI 改写功能 CopyPanel 页面（调用 AI 接口并写入历史记录）
- 积分 SWR 显示与实时刷新功能实现
- Stripe Webhook 接收接口与本地 ngrok 验证打通

---

## 🚧 当前进行中任务

- Dashboard 页面结构（显示当前用户邮箱、积分、操作记录预留位）
- Stripe Checkout 支付流程（/api/checkout 路由设计中）
- 积分扣减逻辑与 AI 改写行为绑定完善（部分逻辑在 CopyPanel 内完成）
- toast 提示封装接入（统一反馈 AI、支付、登录状态）
- 合规接口已开发，UI 展示逻辑待接入
- /tool 页面访问权限已接入 Session 校验，正在完善用户页面结构

---

## 📌 下一阶段开发计划

- 改写历史记录分页页（展示用户使用记录）
- 用户设置页面 /dashboard（积分记录 + 登录方式管理）
- Stripe Checkout 页面接入前端按钮 + 成功后积分写入数据库
- Stripe Portal 用户端订阅管理接入
- Stripe 成功支付后 webhook 回调逻辑中增加积分增值操作
- 账号注册表单增加密码确认逻辑与找回密码功能（UI 占位）
- 用户使用日志记录机制（记录 AI 请求、支付行为等）
- 管理员控制台初步设计（用户 / 订单 / 日志视图）

---

## 🧩 结构与开发建议

- 所有页面使用 App Router 架构，路径规范形如 `/app/tool/page.tsx`、`/app/api/checkout/route.ts`
- 所有含 `useSession`、`useState`、`toast` 的组件必须标记 `use client`
- 认证、支付、AI、积分逻辑务必模块化封装至 `/lib/` 目录下
- 与数据库相关的更新操作需写入 `/app/api/` 接口，避免暴露服务端逻辑于组件
- toast 应配合所有操作反馈，包括成功提示、加载状态、失败原因
- 推荐持续维护文档目录结构：docs/next-task.md、docs/architecture/code-map.md 等

---

📅 更新时间：2025年5月15日
