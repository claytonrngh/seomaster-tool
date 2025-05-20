'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <div className="text-lg font-bold">
        <Link href="/">NewSiteCloner</Link>
      </div>

      <nav className="flex gap-4 items-center text-sm">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/credits" className="hover:underline">Top Up</Link>
        <Link href="/billing" className="hover:underline">Credit Records</Link>
        <Link href="/reword/history" className="hover:underline">Reword History</Link>

        {session?.user ? (
          <div className="flex items-center gap-3">
            <span className="text-gray-700">{session.user.email}</span>
            <button
              onClick={() => signOut()}
              className="text-blue-600 hover:underline"
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="text-blue-600 hover:underline"
          >
            Sign in
          </button>
        )}
      </nav>
    </header>
  );
}