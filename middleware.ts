import { NextRequest, NextResponse } from 'next/server';

const ADMIN_COOKIE = 'kpatrol_admin_session';

// API routes that require admin authentication
const PROTECTED_API_PATTERNS = [
  { path: '/api/products', methods: ['POST'] },
  { path: '/api/products/', methods: ['PUT', 'DELETE'] },
  { path: '/api/inquiries', methods: ['GET'] },
  { path: '/api/inquiries/', methods: ['PUT', 'DELETE'] },
];

function isProtectedApiRoute(pathname: string, method: string): boolean {
  return PROTECTED_API_PATTERNS.some(({ path, methods }) => {
    if (pathname === path || pathname.startsWith(path)) {
      return methods.includes(method);
    }
    return false;
  });
}

function verifyAdminSession(req: NextRequest): boolean {
  const session = req.cookies.get(ADMIN_COOKIE);
  const expectedToken = process.env.ADMIN_SESSION_TOKEN;
  if (!session || !expectedToken) return false;
  return session.value === expectedToken;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  // Protect API mutation routes — return 401 JSON
  if (pathname.startsWith('/api/') && pathname !== '/api/admin/auth') {
    if (isProtectedApiRoute(pathname, method)) {
      if (!verifyAdminSession(req)) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }
  }

  // Protect all /admin pages except /admin/login — redirect to login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!verifyAdminSession(req)) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
