import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Server-side validation for Telegram Mini App initData.
 * Never validate initData only in the browser and never expose the bot token.
 */
export function verifyTelegramInitData(initData: string, botToken: string, maxAgeSeconds = 3600): boolean {
  const params = new URLSearchParams(initData);
  const receivedHash = params.get('hash');
  if (!receivedHash) return false;

  params.delete('hash');
  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  const secretKey = createHmac('sha256', 'WebAppData').update(botToken).digest();
  const calculatedHash = createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
  const a = Buffer.from(calculatedHash, 'hex');
  const b = Buffer.from(receivedHash, 'hex');
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const authDate = Number(params.get('auth_date'));
  if (!Number.isFinite(authDate)) return false;
  return Math.floor(Date.now() / 1000) - authDate <= maxAgeSeconds;
}
