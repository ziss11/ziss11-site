import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, expectedToken } from '@/lib/auth';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Halaman login bebas akses.
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(SESSION_COOKIE)?.value;
  const valid = cookie && cookie === (await expectedToken());

  if (!valid) {
    const url = req.nextUrl.clone();
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
