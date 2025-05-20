'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams, redirect } from 'next/navigation';
import toast from 'react-hot-toast';

export default function RewordHistoryPage() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [history, setHistory] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const page = Number(searchParams.get('page') || 1);
  const limit = 10;

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchHistory = async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/reword/history?page=${page}&limit=${limit}`);
          const json = await res.json();
          setHistory(json.data || []);
          setTotal(json.total || 0);
        } catch (err) {
          toast.error('Failed to load history');
        } finally {
          setLoading(false);
        }
      };
      fetchHistory();
    }
  }, [page, status]);

  if (status === 'loading') return <p className="text-center mt-10">Loading...</p>;
  if (!session?.user?.email) redirect('/auth/login');

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">📝 Reword History</h1>
      <p className="text-gray-600 mb-2">Total Records: {total}</p>
      {loading ? (
        <p>Loading...</p>
      ) : history.length === 0 ? (
        <p className="text-gray-500">No records yet.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((item: any) => (
            <li key={item.id} className="border p-4 rounded bg-white shadow-sm">
              <p className="text-gray-500 text-sm">Original:</p>
              <p className="mb-2">{item.original}</p>
              <p className="text-gray-500 text-sm">Rewritten:</p>
              <p>{item.rewritten}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}