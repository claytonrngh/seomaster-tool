import Stripe from 'stripe';
import { getServerSession } from 'next-auth';
import authConfig from 'lib/auth';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const session = await getServerSession(authConfig);

  if (!session?.user?.id || !session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price: process.env.STRIPE_CREDIT_PRICE_ID!,
          quantity: 1,
        },
      ],
      customer_email: session.user.email,
      success_url: `${process.env.NEXTAUTH_URL}/billing?success=1`,
      cancel_url: `${process.env.NEXTAUTH_URL}/billing?cancel=1`,
      metadata: {
        userId: session.user.id, // Optional: to track who paid
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Stripe error' },
      { status: 500 }
    );
  }
}