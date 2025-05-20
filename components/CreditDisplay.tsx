'use client';

import useSWR from 'swr';
import { useEffect } from 'react';

const fetchCredits = async () => {
  const res = await fetch('/api/credits');
  if (!res.ok) throw new Error('Failed to fetch credits');
  return res.json();
};

interface CreditDisplayProps {
  className?: string;
  showLabel?: boolean;
}

export default function CreditDisplay({ className = '', showLabel = true }: CreditDisplayProps) {
  const { data, mutate } = useSWR('/api/credits', fetchCredits);

  useEffect(() => {
    const refresh = () => mutate();
    window.addEventListener('credits:refresh', refresh);
    return () => window.removeEventListener('credits:refresh', refresh);
  }, [mutate]);

  return (
    <span className={`text-sm text-gray-600 ${className}`}>
      {showLabel && <span className="font-medium">Credits:</span>}{' '}
      <span className="font-semibold text-indigo-600">{data?.credits ?? '...'}</span>
    </span>
  );
}