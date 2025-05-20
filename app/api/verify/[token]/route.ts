// app/api/verify/[token]/route.ts

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendWelcomeEmail } from '@/lib/verify';
import { errorResponse, successResponse } from '@/lib/error-response';

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const token = params.token;

  if (!token) {
    return errorResponse('Missing verification token', 400);
  }

  const tokenRecord = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!tokenRecord) {
    return errorResponse('Invalid or expired verification token', 400);
  }

  if (tokenRecord.expires < new Date()) {
    return errorResponse('Verification token expired', 400);
  }

  await prisma.user.update({
    where: { id: tokenRecord.userId },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({
    where: { token },
  });

  // ✅ 发送欢迎邮件
  await sendWelcomeEmail(tokenRecord.userId);

  return successResponse({ message: 'Email successfully verified' });
}