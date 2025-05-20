'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        toast.success('Registration successful! Please check your email.');
        router.push('/auth/verify/notice');
      } else {
        const data = await res.json();
        toast.error(data.message || 'Registration failed.');
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
      <h1 className="text-2xl font-bold mb-6">Create an Account</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow">
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

        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8–16 chars, letters & numbers"
            className="mt-1 block w-full rounded border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 pr-10"
            required
          />
          <span
            className="absolute right-3 top-[38px] text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="8–16 chars, letters & numbers"
            className="mt-1 block w-full rounded border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 pr-10"
            required
          />
          <span
            className="absolute right-3 top-[38px] text-gray-500 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Register'}
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <a href="/auth/login" className="text-indigo-600 hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}