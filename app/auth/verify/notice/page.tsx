'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function VerifyNoticePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/auth/login');
    }, 10000); // 10秒后自动跳转
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="bg-white p-6 rounded shadow text-center max-w-md">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Verify Your Email</h1>
        <p className="text-gray-700 mb-2">
          We've sent a verification link to your email.
        </p>
        <p className="text-gray-600 mb-4">
          Please check your inbox and click the link to complete your registration.
        </p>
        <p className="text-sm text-gray-400">You will be redirected to login shortly...</p>
      </div>
    </div>
  );
}