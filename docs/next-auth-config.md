# 🔐 next-auth 配置说明

使用 `next-auth` 实现多种登录方式与数据库会话管理。

---

## ✅ 支持的登录方式

- GitHub OAuth 登录
- Google OAuth 登录
- 邮箱 + 密码（Credentials）登录

---

## 📂 配置文件说明

| 路径 | 内容 |
|------|------|
| `lib/auth.ts` | next-auth 主配置，定义 provider、callback、session 处理方式 |
| `types/next-auth.d.ts` | 类型补充：为 `session.user` 添加 ID 字段 |
| `app/api/auth/[...nextauth]/route.ts` | App Router 环境下的认证入口文件 |

---

## ⚙️ 特殊说明

- 会话策略设置为 `strategy: 'database'`，会持久化 session 到数据库
- `.env` 中需包含如下字段：

```env
NEXTAUTH_SECRET=xxx
NEXTAUTH_URL=http://localhost:3000
GITHUB_ID=xxx
GITHUB_SECRET=xxx
GOOGLE_ID=xxx
GOOGLE_SECRET=xxx
