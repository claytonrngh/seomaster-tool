import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { rewordWithStyle } from '@/lib/ai';
import { errorResponse, successResponse } from '@/lib/error-response';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return errorResponse('Unauthorized', 401);
  }

  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const limit = rateLimit(ip, { interval: 60_000, uniqueTokenPerInterval: 3 });
  if (!limit?.success) {
    return errorResponse('Rate limit exceeded', 429);
  }

  const { original, style } = await req.json();
  if (!original) {
    return errorResponse('Missing original text', 400);
  }

  const result = await rewordWithStyle(original, style || 'default');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return errorResponse('User not found', 404);
  }

  await prisma.rewordHistory.create({
    data: {
      original,
      result,
      userId: user.id,
    },
  });

  return successResponse({ result });
}