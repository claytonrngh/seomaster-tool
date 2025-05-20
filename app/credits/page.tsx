'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import CreditTopupButton from '../../components/CreditTopupButton';

export default function CreditsPage() {
  const { data: session } = useSession();
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    const email = session?.user?.email;
    if (!email) return;

    const fetchCredits = async () => {
      try {
        const res = await fetch('/api/user/credits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        if (data.credits !== undefined) {
          setCredits(data.credits);
        } else {
          toast.error('Failed to load credits.');
        }
      } catch (err) {
        toast.error('Something went wrong.');
      }
    };

    fetchCredits();
  }, [session]);

  if (!session?.user) {
    return <p className="p-6 text-center">Please log in to view your credits.</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Credits</h1>
      <p className="text-lg">
        Current balance: <span className="font-semibold">{credits ?? '...'}</span>
      </p>

      <div className="grid grid-cols-2 gap-4">
        <CreditTopupButton priceId="price_1ROw5hFqFoxDsq2r8r8t5bjf" amount={100} />
        <CreditTopupButton priceId="price_1RP31SFqFoxDsq2rh3vF4r26" amount={500} />
        <CreditTopupButton priceId="price_1RP32RFqFoxDsq2rBJOaKTMF" amount={1000} />
        <CreditTopupButton priceId="price_1RP32pFqFoxDsq2rTI2QxmhQ" amount={2000} />
      </div>
    </div>
  );
}