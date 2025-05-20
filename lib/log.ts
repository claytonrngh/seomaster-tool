// lib/log.ts

/**
 * Simple logging utility.
 * Automatically disables logs in production environment.
 */

// ✅ 推荐更新版 lib/log.ts
// lib/log.ts

const isDev = process.env.NODE_ENV !== 'production';

export function logInfo(...args: any[]) {
  if (isDev) {
    console.log('[info]', ...args);
  }
}

export function logWarn(...args: any[]) {
  if (isDev) {
    console.warn('[warn]', ...args);
  }
}

export function logError(...args: any[]) {
  if (isDev) {
    console.error('[error]', ...args);
  }
}