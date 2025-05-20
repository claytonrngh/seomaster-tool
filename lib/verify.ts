import { prisma } from './prisma';
import { Resend } from 'resend';
import { getVerificationEmailHtml, getWelcomeEmailHtml } from './emailTemplate';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);
const sender = process.env.RESEND_SENDER_EMAIL as string;

export async function generateVerificationToken(userId: string, email: string) {
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 小时

  await prisma.verificationToken.create({
    data: {
      token,
      userId,
      expires,
    },
  });

  return token;
}

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/verify?token=${token}`;
  const html = getVerificationEmailHtml({
    siteName: 'NewSiteCloner',
    logoUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    actionUrl: verifyUrl,
  });

  await resend.emails.send({
    from: sender,
    to: email,
    subject: 'Verify your email',
    html,
  });
}

export async function sendWelcomeEmail(email: string) {
  const html = getWelcomeEmailHtml({
    siteName: 'NewSiteCloner',
    logoUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    actionUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
  });

  await resend.emails.send({
    from: sender,
    to: email,
    subject: 'Welcome to NewSiteCloner!',
    html,
  });
}