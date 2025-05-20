'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { invokeRewordProtocol, type RewordStyle } from 'lib/protocol/reword';

const fetchCredits = async () => {
  const res = await fetch('/api/credits');
  if (!res.ok) throw new Error('Failed to fetch credits');
  return res.json();
};

export default function EditableItem() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [style, setStyle] = useState<RewordStyle>('standard');
  const [loading, setLoading] = useState(false);

  const { data, mutate } = useSWR('/api/credits', fetchCredits);

  useEffect(() => {
    const refreshCredits = () => mutate();
    window.addEventListener('credits:refresh', refreshCredits);
    return () => window.removeEventListener('credits:refresh', refreshCredits);
  }, [mutate]);

  const handleReword = async () => {
    if (!input.trim()) {
      toast.error('Please enter some text.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/reword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, style }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult(data.result);
        toast.success('Reworded successfully');
        window.dispatchEvent(new Event('credits:refresh'));
      } else if (data.error === 'Not enough credits') {
        toast.error('You do not have enough credits to rewrite text.');
      } else {
        toast.error(data.message || 'Failed to reword');
      }
    } catch (err) {
      toast.error('Unexpected error occurred');
    }

    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow w-full max-w-xl mx-auto mt-6">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded mb-4"
        rows={5}
        placeholder="Enter your text here..."
      />

      <div className="mb-2 text-sm text-gray-600">
        Current Credits: <span className="font-medium">{data?.credits ?? '...'}</span>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Rewriting Style</label>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value as RewordStyle)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="standard">Standard</option>
          <option value="professional">Professional</option>
          <option value="friendly">Friendly</option>
          <option value="short">Short</option>
          <option value="long">Long</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>

      <button
        onClick={handleReword}
        disabled={loading}
        className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Rewrite Text'}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded border border-gray-200">
          <p className="font-semibold mb-2">Reworded Result:</p>
          <p className="whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </div>
  );
}