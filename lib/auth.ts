import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import { sendWelcomeEmail } from './verify';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({ where: { email: credentials?.email } });
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials!.password, user.password);
        return isValid ? user : null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.email && session.user) {
        session.user.email = token.email as string;
        session.user.id = token.id as string;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google' || account?.provider === 'github') {
        const existing = await prisma.user.findUnique({ where: { email: user.email! } });
        if (existing && !existing.emailVerified) {
          await prisma.user.update({
            where: { email: user.email! },
            data: { emailVerified: new Date() },
          });

          await sendWelcomeEmail(user.email!);
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
  },
};

export default authOptions;