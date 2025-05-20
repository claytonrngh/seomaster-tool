import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from 'lib/auth';
import { generateVerificationToken, sendVerificationEmail } from 'lib/verify';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const token = await generateVerificationToken(session.user.id, session.user.email);
    await sendVerificationEmail(session.user.email, token);
    return NextResponse.json({ message: 'Verification email sent.' });
  } catch (error) {
    console.error('Error sending verification email:', error);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}