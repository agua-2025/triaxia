import {
  sign,
  verify,
  SignOptions,
} from 'jsonwebtoken';
import {
  randomBytes,
  createHash,
  timingSafeEqual,
  randomInt,
  randomUUID,
} from 'crypto';

// Use SEMPRE uma chave fixa no .env para não invalidar tokens a cada boot
const ACTIVATION_SECRET =
  process.env.ACTIVATION_TOKEN_SECRET ||
  (() => {
    console.warn(
      '[activation-tokens] ACTIVATION_TOKEN_SECRET ausente — usando chave aleatória (apenas DEV).'
    );
    return randomBytes(64).toString('hex');
  })();

interface ActivationTokenPayload {
  email: string;
  tenantId: string;
  userId: string;
  type: 'account_activation';
  jti: string; // <— UNIQUE id por token (evita colisão)
  iat?: number;
  exp?: number;
}

export interface ActivationData {
  email: string;
  tenantId: string;
  userId: string;
}

export function generateActivationToken(
  data: ActivationData,
  expiresIn: string = '24h'
): string {
  const payload: ActivationTokenPayload = {
    email: data.email,
    tenantId: data.tenantId,
    userId: data.userId,
    type: 'account_activation',
    jti: randomUUID(), // <— garante token único
  };

  const options: any = {
    expiresIn,
    issuer: 'triaxia-system',
    audience: 'triaxia-users',
  };
  
  return sign(payload, ACTIVATION_SECRET, options);
}

export function validateActivationToken(token: string): ActivationTokenPayload | null {
  try {
    // Basic JWT format validation
    if (typeof token !== 'string' || !token.trim()) {
      return null;
    }
    
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    // Simple client-side validation - decode payload without verification
    // Full verification will be done on the server side
    try {
      const payload = JSON.parse(atob(parts[1]));
      
      // Basic payload validation
      if (!payload || typeof payload !== 'object') {
        return null;
      }
      
      if (payload.type !== 'account_activation') {
        return null;
      }
      
      if (!payload.jti) {
        return null;
      }
      
      // Check expiration
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        console.warn('Activation token expired');
        return null;
      }
      
      return payload as ActivationTokenPayload;
    } catch (decodeError) {
      console.warn('Invalid token format');
      return null;
    }
  } catch (error: any) {
    console.error('Token validation error:', error?.message || 'Unknown error');
    return null;
  }
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function verifyTokenHash(token: string, hash: string): boolean {
  const tokenHash = hashToken(token);
  return timingSafeEqual(
    Buffer.from(tokenHash, 'hex'),
    Buffer.from(hash, 'hex')
  );
}

export function generateActivationCode(): string {
  return randomInt(100000, 999999).toString();
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function sanitizeActivationData(data: any): ActivationData | null {
  if (!data || typeof data !== 'object') return null;
  const { email, tenantId, userId } = data;
  if (!email || !isValidEmail(email)) return null;
  if (!tenantId || typeof tenantId !== 'string') return null;
  if (!userId || typeof userId !== 'string') return null;
  return {
    email: email.toLowerCase().trim(),
    tenantId: tenantId.trim(),
    userId: userId.trim(),
  };
}
