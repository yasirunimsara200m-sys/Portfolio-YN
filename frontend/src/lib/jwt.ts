import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'portfolio_super_secure_jwt_secret_key_2026_yasiru';

export function signJwtToken(payload: { sub: string; email: string; name?: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyJwtToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { sub: string; email: string; name?: string };
  } catch (err) {
    return null;
  }
}

export function getAuthUser(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || '';
  if (!authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.substring(7);
  return verifyJwtToken(token);
}
