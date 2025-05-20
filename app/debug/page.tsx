'use client';

import { useSession } from 'next-auth/react';

export default function DebugPage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-2xl font-bold mb-4">🔍 Debug: Session Info</h1>

      <div className="bg-white p-6 rounded shadow">
        <p className="mb-2">
          <strong>Status:</strong> {status}
        </p>

        <pre className="whitespace-pre-wrap break-words text-sm bg-gray-100 p-4 rounded">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  );
}