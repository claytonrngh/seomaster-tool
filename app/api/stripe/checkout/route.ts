// app/api/stripe/checkout/route.ts

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { priceId, userEmail } = await req.json();

  if (!priceId || !userEmail) {
    return NextResponse.json({ error: 'Missing priceId or userEmail' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        userEmail,
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/stripe/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('[STRIPE_CHECKOUT_ERROR]', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}