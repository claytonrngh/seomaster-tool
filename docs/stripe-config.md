# 💳 Stripe 配置说明

本项目已集成 Stripe 支付服务，包括：

- 基于 Checkout 的一次性付款
- 积分兑换触发付款
- Webhook 回调用于同步订单状态

---

## ✅ 当前支持

- 创建 Checkout Session：调用 `/api/checkout`，传入用户 ID、积分数量，返回付款页面链接。
- Webhook 接收 `checkout.session.completed` 事件：触发后更新用户积分、记录订单。

---

## 📂 开发文件

| 文件 | 说明 |
|------|------|
| `app/api/checkout/route.ts` | 创建 Stripe Checkout 会话 |
| `app/api/stripe/route.ts` | 监听 Webhook 回调，验证签名与事件 |

---

## ⚠️ 注意事项

1. `.env` 中必须存在 `STRIPE_SECRET_KEY` 与 `STRIPE_WEBHOOK_SECRET`
2. Webhook URL 推荐使用 `ngrok` 创建，并绑定到 Stripe Dashboard 中
3. Stripe 中需提前创建产品与价格（price ID）
