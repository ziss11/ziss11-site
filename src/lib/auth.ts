export const SESSION_COOKIE = 'admin_session';

const DEFAULT_PASSWORD = 'zizz1181!!';
const DEFAULT_SECRET = 'zis-portofolio-default-secret-change-me';

function getPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || DEFAULT_SECRET;
}

export function verifyPassword(password: string): boolean {
  return password === getPassword();
}

/** Token sesi = HMAC-SHA256(secret, 'admin'). Edge-compatible (Web Crypto). */
export async function expectedToken(): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode('admin'));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
