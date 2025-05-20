# 🔌 API 接口设计说明（Design Overview）

本文件列出本项目中所有核心 API 接口路径、方法、参数结构与返回示例，用于统一接口调用格式，便于前端调用和后端维护。

---

## ✅ 核心接口概览

### 1. 创建 Stripe Checkout 会话

- **路径**：`/api/checkout`
- **方法**：POST
- **请求参数**：

```json
{
  "priceId": "price_12345",
  "userEmail": "test@example.com"
}
	•	返回结果：
{
  "sessionId": "cs_test_1234567890"
}
	•	说明：生成 Stripe 支付链接并返回 sessionId，前端重定向至 Stripe 页面。
2. Stripe Webhook 接收端
	•	路径：/api/stripe
	•	方法：POST
	•	事件类型：checkout.session.completed
	•	功能说明：
	•	验证签名后从 event 中提取 email
	•	根据 email 查找用户
	•	更新用户积分字段（如 credits += 5）

⸻

3. 获取剩余积分 API
	•	路径：/api/credits
	•	方法：GET
	•	返回值：
{
  "email": "test@example.com",
  "credits": 3
}
4. 用户注册 API
	•	路径：/api/register
	•	方法：POST
	•	请求参数：
{
  "email": "test@example.com",
  "password": "12345678"
}
🧱 开发建议
	•	所有 API 建议引入统一错误处理与状态码返回
	•	未来支持 JWT 模式后再开放 /api/user/me 等接口
	•	Stripe 相关操作需写入日志以便审计

更新时间：2025年5月15日
---
