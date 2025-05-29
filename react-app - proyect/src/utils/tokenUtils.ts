const STORAGE_KEY = 'pwdResetTokens';
const EXPIRATION_MS = 10 * 60 * 1000;        // 10 minutos

export type TokenEntry = { email: string; created: number };

function load(): Record<string, TokenEntry> {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
}

function save(tokens: Record<string, TokenEntry>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
}

/** Genera y guarda un token para el correo dado. Devuelve el token. */
export function createToken(email: string): string {
  const tokens = load();
  const token = crypto.randomUUID();
  tokens[token] = { email, created: Date.now() };
  save(tokens);
  return token;
}

/** Valida un token y, si es válido, devuelve el correo. */
export function validateToken(token: string): string | null {
  const tokens = load();
  const entry = tokens[token];
  if (!entry) return null;
  const expired = Date.now() - entry.created > EXPIRATION_MS;
  if (expired) {
    delete tokens[token];
    save(tokens);
    return null;
  }
  return entry.email;
}

/** Invalida (borra) un token */
export function invalidateToken(token: string) {
  const tokens = load();
  if (tokens[token]) {
    delete tokens[token];
    save(tokens);
  }
}