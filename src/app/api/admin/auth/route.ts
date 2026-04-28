import { NextRequest, NextResponse } from 'next/server';
import { createHash, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'kpatrol_admin_session';
const COOKIE_MAXAGE = 60 * 60 * 8; // 8 hours

function safeCompare(a: string, b: string): boolean {
  const bufA = createHash('sha256').update(a).digest();
  const bufB = createHash('sha256').update(b).digest();
  return timingSafeEqual(bufA, bufB);
}

export async function POST(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionToken = process.env.ADMIN_SESSION_TOKEN;

  if (!adminPassword || !sessionToken) {
    console.error('[Auth] ADMIN_PASSWORD or ADMIN_SESSION_TOKEN not set in environment');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const { password } = await req.json();

  if (!password || !safeCompare(password, adminPassword)) {
    return NextResponse.json({ error: 'Sai mật khẩu' }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAXAGE,
    path: '/',
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, '', { maxAge: 0, path: '/' });
  return res;
}
