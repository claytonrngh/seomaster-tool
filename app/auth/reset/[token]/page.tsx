'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/reset/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Password reset successful!');
        setTimeout(() => router.push('/auth/login'), 1500);
      } else {
        toast.error(data.message || 'Reset failed');
      }
    } catch (err) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6">Reset Your Password</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
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