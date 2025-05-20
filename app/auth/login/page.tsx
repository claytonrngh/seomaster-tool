'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import SocialLoginButtons from '../../../components/SocialLogin';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (res?.ok) {
      toast.success('Login successful');
      router.push(callbackUrl);
    } else {
      toast.error(res?.error || 'Login failed');
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6">Sign In to Your Account</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded shadow"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1 block w-full rounded border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mt-1 block w-full rounded border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <div className="flex justify-between text-sm mt-4">
          <a href="/auth/register" className="text-indigo-600 hover:underline">
            Sign up
          </a>
          <a href="/auth/reset" className="text-indigo-600 hover:underline">
            Forgot your password?
          </a>
        </div>
      </form>

      <div className="w-full max-w-sm mt-6">
        <SocialLoginButtons />
      </div>
    </div>
  );
}