'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import CreditLogTable from '../../components/CreditLogTable';

export default function BillingPage() {
  const [success, setSuccess] = useState(false);
  const [cancel, setCancel] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const s = searchParams.get('success');
    const c = searchParams.get('cancel');

    if (s === '1') {
      setSuccess(true);
      toast.success('Credits have been added to your account!');
    } else if (c === '1') {
      setCancel(true);
      toast.error('Checkout was canceled.');
    }
  }, [searchParams]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Credit Records</h1>

      <CreditLogTable />

      {(success || cancel) && (
        <div className="mt-6 text-center text-sm text-gray-500">
          {success ? 'Transaction completed successfully.' : 'Transaction was canceled.'}
        </div>
      )}
    </div>
  );
}