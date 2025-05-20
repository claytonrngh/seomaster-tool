import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { generateVerificationToken } from '@/lib/verify';
import { errorResponse, successResponse } from '@/lib/error-response';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const limited = rateLimit(ip, { interval: 60_000, uniqueTokenPerInterval: 3 });

  if (!limited || !limited.success) {
    return errorResponse('Too many registration attempts. Please try again later.', 429);
  }

  const { email, password, name } = await req.json();

  if (!email || !password) {
    return errorResponse('Email and password are required.', 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return errorResponse('Invalid email format.', 400);
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true, emailVerified: true },
  });

  // ✅ 已注册但未验证邮箱：允许重发验证邮件
  if (existingUser && !existingUser.emailVerified) {
    const token = await generateVerificationToken(existingUser.id, email);
    console.log('[模拟] 重新发送验证链接：', `${process.env.NEXT_PUBLIC_SITE_URL}/auth/verify/${token}`);
    return successResponse({
      message:
        'This email is already registered but not verified. A new verification link has been sent.',
    });
  }

  // ✅ 已注册且已验证邮箱：阻止注册
  if (existingUser?.emailVerified) {
    return errorResponse('User already exists.', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email,
      name: name || '',
      password: hashedPassword,
      credits: 3,
    },
  });

  const token = await generateVerificationToken(newUser.id, email);
  console.log('[模拟] 发送新用户验证链接：', `${process.env.NEXT_PUBLIC_SITE_URL}/auth/verify/${token}`);

  return successResponse({
    message: 'Registration successful. Please check your email to verify your account.',
  });
}