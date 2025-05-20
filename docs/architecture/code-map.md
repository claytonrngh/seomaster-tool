# 🗺 代码功能映射图

本文列出当前核心业务代码文件及其对应功能，供开发与调试时快速定位。

---

## 🧩 API 接口

| 路径 | 功能说明 |
|------|----------|
| `app/api/auth/[...nextauth]/route.ts` | next-auth 主认证接口 |
| `app/api/register/route.ts` | 用户注册处理逻辑 |
| `app/api/credits/route.ts` | 用户积分消费逻辑接口 |
| `app/api/stripe/route.ts` | Stripe Webhook 回调处理入口 |
| `app/api/checkout/route.ts` | Stripe Checkout 会话创建接口 |

---

## 🧑‍💻 页面组件

| 路径 | 功能说明 |
|------|----------|
| `app/auth/login/page.tsx` | 登录页（支持邮箱+密码） |
| `app/auth/register/page.tsx` | 注册页 |
| `app/tool/page.tsx` | 登录后工具站主页面 |
| `app/dashboard/page.tsx` | 后续可扩展的仪表盘 |
| `app/billing/page.tsx` | Stripe 订阅入口页（待完善） |

---

## ⚙️ 配置与逻辑模块

| 路径 | 内容说明 |
|------|-----------|
| `lib/auth.ts` | next-auth 配置项（包含 callback） |
| `lib/credit.ts` | 积分校验与扣减函数 |
| `types/next-auth.d.ts` | 添加 `session.user.id` 类型扩展 |
| `prisma/schema.prisma` | Prisma 模型定义：User, Session, Account 等 |
