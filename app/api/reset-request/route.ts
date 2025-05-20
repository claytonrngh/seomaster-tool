import { NextRequest } from 'next/server';
import { randomBytes } from 'crypto';
import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/email';
import { getPasswordResetEmailHtml } from '@/lib/emailTemplate';
import { errorResponse, successResponse } from '@/lib/error-response';
import { rateLimit } from '@/lib/rateLimit';

const sender = process.env.EMAIL_FROM || 'noreply@example.com';

export async function POST(req: NextRequest) {
  // 限制频率：每个 IP 每分钟最多 3 次
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const limited = rateLimit(ip, {
    interval: 60, // 秒
    uniqueTokenPerInterval: 3,
  });
  if (limited) return limited;

  try {
    const { email } = await req.json();

    if (!email) {
      return errorResponse('Missing email', 400);
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return errorResponse('No user found with that email.', 404);
    }

    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 小时有效

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetTokenExpires: expires,
      },
    });

    const siteName = 'NewSiteCloner';
    const logoUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`;
    const actionUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password?token=${token}`;

    const html = getPasswordResetEmailHtml({ siteName, logoUrl, actionUrl });

    await resend.emails.send({
      from: sender,
      to: email,
      subject: 'Reset Your Password',
      html,
    });

    return successResponse({ message: 'Reset link sent successfully.' });
  } catch (err) {
    console.error('[RESET_REQUEST_ERROR]', err);
    return errorResponse('Something went wrong.', 500);
  }
}