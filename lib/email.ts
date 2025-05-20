// lib/email.ts

import { Resend } from 'resend';

// 请确保你在 .env 文件中配置了 RESEND_API_KEY
export const resend = new Resend(process.env.RESEND_API_KEY!);