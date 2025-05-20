import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logError } from '@/lib/log';

/**
 * 管理员接口：通过 email 查询任意用户的积分
 * ✅ 已验证 session 鉴权，仅允许特定管理员调用
 */

const ADMIN_EMAILS = ['admin@example.com']; // ✅ 可切换为你自己的管理员邮箱数组

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !ADMIN_EMAILS.includes(session.user?.email || '')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ credits: user.credits || 0 });
  } catch (err) {
    logError('[ADMIN_GET_USER_CREDITS_ERROR]', err);
    return NextResponse.json({ error: 'Failed to fetch credits' }, { status: 500 });
  }
}