const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 5;
const hits = new Map<string, number[]>();

/**
 * Same window and max for login and signup.
 * In-memory is enough for this demo.
 */
export function rateLimit(key: string): { ok: true } | { ok: false; message: string } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_ATTEMPTS) {
    return { ok: false, message: "Too many attempts. Try again in a minute." };
  }
  recent.push(now);
  hits.set(key, recent);
  return { ok: true };
}
