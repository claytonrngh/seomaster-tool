// /lib/dispatcher.ts
import { creditProtocol } from './protocol/credit';

export async function invokeCreditProtocol(
  action: 'deduct',
  params: { userId: string; amount: number }
): Promise<boolean> {
  return creditProtocol[action](params);
}