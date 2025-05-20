'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/reset-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Reset link sent if email exists.');
      } else {
        toast.error(data.message || 'Reset failed');
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6">Forgot Your Password?</h1>
      <form onSubmit={handleReset} className="w-full max-w-sm bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
}