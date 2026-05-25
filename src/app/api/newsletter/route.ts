import { NextRequest, NextResponse } from 'next/server';
import { readJSON, writeJSON, Subscriber } from '@/lib/data-store';

function getSubscribers(): Subscriber[] {
  return readJSON<Subscriber[]>('subscribers', []);
}

// RFC-5322 lite — good enough to reject obvious typos without false negatives.
const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET() {
  const subs = getSubscribers().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return NextResponse.json(subs);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const source: Subscriber['source'] = body.source === 'inline' ? 'inline' : 'footer';

  if (!email || !EMAIL_RX.test(email)) {
    return NextResponse.json({ error: 'Email không hợp lệ.' }, { status: 400 });
  }

  const subs = getSubscribers();
  // Idempotent — if the email already exists, return the existing row instead of
  // throwing. Newsletter signup re-submits are common (PWA install, refresh) and
  // we don't want to surface an error for what is really a no-op.
  const existing = subs.find((s) => s.email === email);
  if (existing) {
    return NextResponse.json(existing, { status: 200 });
  }

  const newSub: Subscriber = {
    id: `sub-${Date.now()}`,
    email,
    source,
    createdAt: new Date().toISOString(),
  };
  subs.push(newSub);
  writeJSON('subscribers', subs);

  return NextResponse.json(newSub, { status: 201 });
}
