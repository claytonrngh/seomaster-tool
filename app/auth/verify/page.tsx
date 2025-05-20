'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const router = useRouter();

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        router.push('/auth/login');
      }, 5000); // 5秒后跳转
      return () => clearTimeout(timer);
    }
  }, [status, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      {status === 'success' ? (
        <div className="bg-white p-6 rounded shadow text-center max-w-md">
          <h1 className="text-2xl font-bold text-green-600 mb-4">Email Verified</h1>
          <p className="text-gray-700 mb-2">
            Your email has been successfully verified.
          </p>
          <p className="text-gray-500">Redirecting to login page...</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Verification Failed</h1>
          <p className="text-gray-700 mb-2">
            The verification link is invalid or has expired.
          </p>
          <a
            href="/auth/login"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Go back to login
          </a>
        </div>
      )}
    </div>
  );
}