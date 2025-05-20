import OpenAI from 'openai';
import { getRewordPrompt, type RewordStyle } from './protocol/reword';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type SupportedModel = 'gpt-4o' | 'gpt-4' | 'gpt-3.5-turbo'; // ✅ 预留未来 Claude/Moonshot 类型扩展

export async function rewordWithStyle(
  input: string,
  style: RewordStyle,
  model: SupportedModel = 'gpt-4o' // ✅ 默认使用 gpt-4o
): Promise<string> {
  const prompt = getRewordPrompt(input, style);

  const response = await openai.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: 'You are an AI writing assistant.' },
      { role: 'user', content: prompt },
    ],
  });

  return response.choices[0]?.message?.content?.trim() || '';
}