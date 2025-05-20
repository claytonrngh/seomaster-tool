'use client';

import CreditTopupButton from '../../../components/CreditTopupButton';

const CREDIT_PACKAGES = [
  {
    amount: 100,
    priceId: 'price_1ROw5hFqFoxDsq2r8r8t5bjf',
    description: 'Ideal for light use',
  },
  {
    amount: 500,
    priceId: 'price_1RP31SFqFoxDsq2rh3vF4r26',
    description: 'Best value for most users',
  },
  {
    amount: 1000,
    priceId: 'price_1RP32RFqFoxDsq2rBJOaKTMF',
    description: 'For frequent writers',
  },
  {
    amount: 2000,
    priceId: 'price_1RP32pFqFoxDsq2rTI2QxmhQ',
    description: 'Heavy usage plan',
  },
];

export default function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Choose Your Credit Package</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CREDIT_PACKAGES.map((pkg) => (
          <div
            key={pkg.priceId}
            className="border rounded-lg p-6 shadow-sm bg-white flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{pkg.amount} Credits</h2>
              <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
            </div>
            <CreditTopupButton priceId={pkg.priceId} amount={pkg.amount} />
          </div>
        ))}
      </div>
    </div>
  );
}
