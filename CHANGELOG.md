# 📦 CHANGELOG

本文件记录项目每个阶段的重要变更。遵循语义化版本控制（SemVer）格式：`MAJOR.MINOR.PATCH`。

---

## [0.1.0] - 2025-05-15
### 🚀 初始版本发布（基础功能完成）
- 初始化项目：Next.js 15 + TypeScript + TailwindCSS
- 集成 SQLite + Prisma ORM
- 实现用户注册、登录（支持密码、GitHub、Google）
- 实现初始积分系统（注册默认赠送积分）
- 实现积分校验与消费 API 接口 `/api/credits`
- 配置 Stripe 支付（Checkout + Webhook）基础环境
- 登录后跳转至 `/tool` 页面并展示用户邮箱信息
- 项目目录结构规范化，新增 `/docs` 文件夹记录架构文档

---

## [0.1.1] - Planned
### 🧩 功能开发中
- Stripe 充值流程全链路打通（前端触发 → webhook 积分入账）
- 登录后展示当前用户积分数量
- Stripe Checkout 成功/取消页面逻辑
- 美化登录、注册界面样式

---

> 📌 说明：更新此文件时，请按照时间倒序记录每一版本发布的要点，便于团队追踪与版本控制。
