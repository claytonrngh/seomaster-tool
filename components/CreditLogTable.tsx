'use client';

import useSWR from 'swr';
import { format } from 'date-fns';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface CreditLog {
  id: string;
  type: 'recharge' | 'use' | 'manual';
  amount: number;
  metadata: Record<string, any>;
  createdAt: string;
}

export default function CreditLogTable() {
  const { data, error, isLoading } = useSWR<{ logs: CreditLog[] }>('/api/credit/log', fetcher);

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Failed to load</p>;
  if (!data?.logs || data.logs.length === 0) return <p className="text-gray-600">No records yet.</p>;

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border-b">Type</th>
            <th className="px-4 py-2 border-b">Amount</th>
            <th className="px-4 py-2 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.logs.map((log) => (
            <tr key={log.id} className="border-t">
              <td className="px-4 py-2 capitalize">{log.type}</td>
              <td className="px-4 py-2">{log.amount}</td>
              <td className="px-4 py-2">{format(new Date(log.createdAt), 'yyyy-MM-dd HH:mm')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}