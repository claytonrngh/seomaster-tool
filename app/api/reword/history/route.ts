import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from 'lib/auth';
import { prisma } from 'lib/prisma';
import { invokeRewordProtocol } from 'lib/protocol/reword';
import { invokeCreditProtocol } from 'lib/dispatcher';
import { generateVerificationToken, sendVerificationEmail } from 'lib/verify';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, emailVerified: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // ✅ 检查用户是否已验证邮箱，如果未验证，则发送验证邮件并拒绝操作
  if (!user.emailVerified) {
    const token = await generateVerificationToken(user.id, session.user.email);
    await sendVerificationEmail(session.user.email, token);

    return NextResponse.json({
      error: 'Please verify your email before using this feature. Verification email sent.',
    }, { status: 403 });
  }

  const { text, style } = await req.json();

  // ✅ 积分扣除逻辑
  const success = await invokeCreditProtocol('deduct', {
    userId: user.id,
    amount: 1,
  });

  if (!success) {
    return NextResponse.json({ error: 'Not enough credits' }, { status: 403 });
  }

  // ✅ AI 改写逻辑
  const result = await invokeRewordProtocol(text, style);

  // ✅ 写入历史记录
  await prisma.rewordHistory.create({
    data: {
      userId: user.id,
      original: text,
      result,
      style,
    },
  });

  return NextResponse.json({ result: result || '' });
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const skip = (page - 1) * limit;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const total = await prisma.rewordHistory.count({
    where: { userId: user.id },
  });

  const records = await prisma.rewordHistory.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    skip,
    take: limit,
  });

  return NextResponse.json({ total, records });
}