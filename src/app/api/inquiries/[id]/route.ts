import { NextRequest, NextResponse } from 'next/server';
import { readJSON, writeJSON, Inquiry } from '@/lib/data-store';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return [];
}

function getInquiries() {
  return readJSON<Inquiry[]>('inquiries', []);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const inquiries = getInquiries();
  const idx = inquiries.findIndex((i) => i.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  inquiries[idx] = { ...inquiries[idx], ...body, id: params.id };
  writeJSON('inquiries', inquiries);
  return NextResponse.json(inquiries[idx]);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const inquiries = getInquiries();
  const newList = inquiries.filter((i) => i.id !== params.id);
  writeJSON('inquiries', newList);
  return NextResponse.json({ success: true });
}
