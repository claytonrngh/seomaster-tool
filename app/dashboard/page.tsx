'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    const fetchCredits = async () => {
      if (!session?.user?.id) return;

      try {
        const res = await fetch(`/api/user/credits`);
        const data = await res.json();
        setCredits(data.credits);
      } catch (error) {
        console.error('Failed to fetch credits:', error);
      }
    };

    fetchCredits();
  }, [session]);

  if (status === 'loading') {
    return <div className="p-10">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div className="p-10">Please log in to access your dashboard.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-2xl font-bold mb-6">🎉 Welcome to your Dashboard</h1>

      <div className="bg-white p-6 rounded shadow">
        <p className="mb-2">
          <strong>Email:</strong> {session?.user?.email}
        </p>
        <p className="mb-2">
          <strong>User ID:</strong> {session?.user?.id}
        </p>
        <p className="mb-2">
          <strong>Credits:</strong>{' '}
          {credits !== null ? credits : 'Loading...'}
        </p>
      </div>
    </div>
  );
}