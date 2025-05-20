// /lib/protocol/credit.ts

import { deductCreditsByUserId } from '../credit';

export interface CreditProtocol {
  deduct: (params: { userId: string; amount: number }) => Promise<boolean>;
}

export const creditProtocol: CreditProtocol = {
  deduct: async ({ userId, amount }) => {
    return await deductCreditsByUserId(userId, amount);
  },
};