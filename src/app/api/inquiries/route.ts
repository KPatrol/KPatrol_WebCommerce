import { NextRequest, NextResponse } from 'next/server';
import { readJSON, writeJSON, Inquiry } from '@/lib/data-store';

function getInquiries(): Inquiry[] {
  return readJSON<Inquiry[]>('inquiries', []);
}

// Escape HTML to prevent XSS in email templates
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Send email notification to admin (fire-and-forget)
async function notifyAdmin(inquiry: Inquiry) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const ADMIN_EMAIL = process.env.ADMIN_NOTIFY_EMAIL;

  if (!RESEND_API_KEY || !ADMIN_EMAIL) return; // Skip if not configured

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'K-Patrol <noreply@kpatrol.vn>',
        to: [ADMIN_EMAIL],
        subject: `[K-Patrol] Yêu cầu tư vấn mới từ ${inquiry.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0f172a; padding: 24px; border-radius: 12px;">
              <h2 style="color: #60a5fa; margin: 0 0 16px;">🤖 Yêu cầu tư vấn mới</h2>
              <table style="width:100%; border-collapse:collapse;">
                <tr><td style="color:#94a3b8; padding: 6px 0; width:140px;">Họ tên:</td><td style="color:#fff;">${escapeHtml(inquiry.name)}</td></tr>
                <tr><td style="color:#94a3b8; padding: 6px 0;">Email:</td><td style="color:#60a5fa;">${escapeHtml(inquiry.email)}</td></tr>
                ${inquiry.phone ? `<tr><td style="color:#94a3b8; padding: 6px 0;">Điện thoại:</td><td style="color:#fff;">${escapeHtml(inquiry.phone)}</td></tr>` : ''}
                ${inquiry.company ? `<tr><td style="color:#94a3b8; padding: 6px 0;">Công ty:</td><td style="color:#fff;">${escapeHtml(inquiry.company)}</td></tr>` : ''}
                ${inquiry.productName ? `<tr><td style="color:#94a3b8; padding: 6px 0;">Sản phẩm:</td><td style="color:#fff;">${escapeHtml(inquiry.productName)}</td></tr>` : ''}
                ${inquiry.quantity ? `<tr><td style="color:#94a3b8; padding: 6px 0;">Số lượng:</td><td style="color:#fff;">${inquiry.quantity} robot</td></tr>` : ''}
              </table>
              <div style="margin-top: 16px; padding: 16px; background: #1e293b; border-radius: 8px; color: #e2e8f0;">
                <strong style="color:#94a3b8;">Nội dung:</strong><br/><br/>
                ${escapeHtml(inquiry.message).replace(/\n/g, '<br/>')}
              </div>
              <div style="margin-top: 16px; text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001'}/admin" 
                   style="display:inline-block; background: linear-gradient(to right, #2563eb, #0891b2); color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                  Xem trong Admin Panel →
                </a>
              </div>
            </div>
          </div>
        `,
      }),
    });
  } catch (err) {
    console.warn('[Email] Failed to send notification:', err);
  }
}

export async function GET() {
  const inquiries = getInquiries().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(inquiries);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: 'Vui lòng điền đầy đủ họ tên, email và nội dung.' },
      { status: 400 }
    );
  }

  const inquiries = getInquiries();
  const newInquiry: Inquiry = {
    id: `inq-${Date.now()}`,
    name: String(body.name).trim(),
    email: String(body.email).trim(),
    phone: String(body.phone ?? '').trim(),
    company: body.company ? String(body.company).trim() : undefined,
    productId: body.productId ?? undefined,
    productName: body.productName ?? undefined,
    quantity: body.quantity ? Number(body.quantity) : undefined,
    message: String(body.message).trim(),
    status: 'new',
    createdAt: new Date().toISOString(),
    note: undefined,
  };

  inquiries.push(newInquiry);
  writeJSON('inquiries', inquiries);

  // Fire-and-forget email notification
  notifyAdmin(newInquiry);

  return NextResponse.json(newInquiry, { status: 201 });
}
