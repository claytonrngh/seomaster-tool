import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from 'lib/prisma';

export async function POST(
  req: Request,
  { params }: { params: { token: string } }
) {
  try {
    const { password } = await req.json();
    const { token } = params;

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ message: 'Invalid reset token.' }, { status: 400 });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return NextResponse.json({ message: 'Invalid new password.' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gte: new Date(), // ✅ 只接受未过期的 token
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Reset token is invalid or expired.' },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashed,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    return NextResponse.json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('[RESET_ERROR]', error);
    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
  }
}