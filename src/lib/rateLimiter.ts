// src/lib/rateLimiter.ts
const attempts = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 5 * 60 * 1000; // 5 minuti
const MAX_ATTEMPTS = 3;

export function rateLimiter(ip: string): boolean {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record || now > record.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true; // ok
  }

  record.count++;
  if (record.count > MAX_ATTEMPTS) return false; // troppi tentativi
  return true;
}
