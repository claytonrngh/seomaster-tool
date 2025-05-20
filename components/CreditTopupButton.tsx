'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface Props {
  priceId: string;
  amount: number;
}

export default function CreditTopupButton({ priceId, amount }: Props) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!session?.user?.email) {
      toast.error('You must be logged in to purchase credits.');
      return;
    }

    setLoading(true);
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      body: JSON.stringify({
        priceId,
        userEmail: session.user.email,
      }),
    });

    const data = await res.json();

    if (data?.url) {
      window.location.href = data.url;
    } else {
      toast.error(data?.error || 'Failed to create checkout session.');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
    >
      {loading ? 'Redirecting...' : `Buy ${amount} Credits`}
    </button>
  );
}