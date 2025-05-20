// app/api/token/validate/route.ts

import { NextResponse } from 'next/server';
import { prisma } from 'lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ valid: false, message: 'Missing token.' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gte: new Date(), // 有效期未过
        },
      },
    });

    if (!user) {
      return NextResponse.json({ valid: false, message: 'Token is invalid or expired.' }, { status: 400 });
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error('[TOKEN_VALIDATE_ERROR]', error);
    return NextResponse.json({ valid: false, message: 'Internal error.' }, { status: 500 });
  }
}