import { rewordWithStyle } from '../ai'; // ✅ 正确的相对路径

export type RewordStyle =
  | 'standard'
  | 'professional'
  | 'friendly'
  | 'short'
  | 'long'
  | 'marketing';

export function getRewordPrompt(input: string, style: RewordStyle): string {
  switch (style) {
    case 'professional':
      return `Please rewrite the following content in a professional tone:\n\n${input}`;
    case 'friendly':
      return `Rewrite this in a friendly and conversational way:\n\n${input}`;
    case 'short':
      return `Rewrite this in a shorter version:\n\n${input}`;
    case 'long':
      return `Expand and rewrite this with more details:\n\n${input}`;
    case 'marketing':
      return `Rewrite this with a marketing tone to engage readers:\n\n${input}`;
    case 'standard':
    default:
      return `Please help me rewrite the following text:\n\n${input}`;
  }
}

export async function invokeRewordProtocol(
  input: string,
  style: RewordStyle
): Promise<string> {
  return await rewordWithStyle(input, style);
}