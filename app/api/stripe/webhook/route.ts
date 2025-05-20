import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { errorResponse, successResponse } from '@/lib/error-response';
import { logError } from '@/lib/log';
import { rateLimit } from '@/lib/rateLimit';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const limit = rateLimit(ip, { interval: 60_000, uniqueTokenPerInterval: 3 });
  if (!limit?.success) {
    return errorResponse('Rate limit exceeded', 429);
  }

  const body = await req.text();
  const sig = headers().get('stripe-signature');

  if (!sig || !webhookSecret) {
    return errorResponse('Webhook signature or secret missing', 400);
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    logError('WEBHOOK_SIGNATURE_ERROR', err.message);
    return errorResponse('Webhook signature verification failed.', 400);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_email;

    if (customerEmail) {
      const user = await prisma.user.findUnique({ where: { email: customerEmail } });
      if (user) {
        await prisma.creditLog.create({
          data: {
            userId: user.id,
            amount: session.amount_total || 0,
            type: 'INCREASE',
            source: 'stripe',
          },
        });

        await prisma.user.update({
          where: { id: user.id },
          data: {
            credits: { increment: session.amount_total || 0 },
          },
        });
      }
    }
  }

  return successResponse({ received: true });
}