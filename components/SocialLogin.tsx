'use client';

import { signIn } from 'next-auth/react';

export default function SocialLoginButtons() {
  const callbackUrl = '/reword/history'; // 登录成功后的跳转页面

  return (
    <div className="space-y-4 mt-6">
      <button
        onClick={() => signIn('google', { callbackUrl })}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
      >
        Sign in with Google
      </button>

      <button
        onClick={() => signIn('github', { callbackUrl })}
        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}