// /lib/credit.ts
import { prisma } from './prisma';

/**
 * ✅ 通用：通过 email 获取用户当前积分
 */
export async function getCreditsByEmail(email: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { credits: true },
  });

  return user?.credits ?? 0;
}

/**
 * ✅ 通用：通过 email 扣除积分（前端模块旧用法，建议逐步过渡）
 */
export async function deductCredits(email: string, amount: number): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { credits: true },
  });

  if (!user || user.credits < amount) return false;

  await prisma.user.update({
    where: { email },
    data: {
      credits: {
        decrement: amount,
      },
    },
  });

  return true;
}

/**
 * ✅ Webhook 専用：通过 email 增加积分（支付成功后使用）
 */
export async function addCreditsByEmail(email: string, credits: number) {
  return await prisma.user.update({
    where: { email },
    data: {
      credits: {
        increment: credits,
      },
    },
  });
}

/**
 * ✅ 后台管理：通过 userId 获取积分
 */
export async function getUserCredits(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true },
  });

  return user?.credits ?? 0;
}

/**
 * ✅ 后台管理：通过 userId 扣除积分（可用于后台操作或补扣）
 */
export async function checkAndDecrementCredit(userId: string, amount = 1) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true },
  });

  if (!user || user.credits < amount) {
    return { success: false, message: 'Insufficient credits' };
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      credits: {
        decrement: amount,
      },
    },
  });

  return { success: true };
}

/**
 * ✅ Reword 模块专用（推荐）：通过 userId 尝试扣减积分
 * - 使用于 /api/reword 调用前；
 * - 返回 boolean，适配 MCP 协议统一判断逻辑；
 */
export async function deductCreditsByUserId(userId: string, amount: number): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true },
  });

  if (!user || user.credits < amount) {
    return false;
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      credits: {
        decrement: amount,
      },
    },
  });

  return true;
}