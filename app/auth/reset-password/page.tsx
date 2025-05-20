'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // ⛔ token 前置验证
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        toast.error('Missing reset token.');
        router.replace('/auth/login');
        return;
      }

      try {
        const res = await fetch(`/api/token/validate?token=${token}`);
        if (!res.ok) {
          toast.error('Reset link is invalid or expired.');
          router.replace('/auth/login');
        }
      } catch (err) {
        toast.error('Failed to validate reset token.');
        router.replace('/auth/login');
      } finally {
        setChecking(false);
      }
    };

    validateToken();
  }, [token, router]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      toast.error('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/reset/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || 'Password updated successfully.');
        toast('Redirecting...', { icon: '➡️' });
        setTimeout(() => router.push('/auth/login'), 1500);
      } else {
        toast.error(data.message || 'Reset failed.');
      }
    } catch (err) {
      toast.error('Unexpected error occurred.');
    }

    setLoading(false);
  };

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        <Toaster />
        <p className="text-lg">🔍 Checking reset token...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6">Reset Your Password</h1>
      <form onSubmit={handleReset} className="w-full max-w-sm bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
            required
            minLength={6}
            placeholder="At least 6 characters"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
            required
            placeholder="Must match the above password"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}