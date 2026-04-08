import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookieName =
    process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME ||
    process.env.SESSION_COOKIE_NAME ||
    'vedteix.sid';
  const pathname = request.nextUrl.pathname;
  const isProtectedRoute =
    pathname.startsWith('/admin') || pathname.startsWith('/dashboard');

  if (isProtectedRoute) {
    const sessionId = request.cookies.get(sessionCookieName)?.value;
    if (!sessionId) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set(
        'from',
        `${request.nextUrl.pathname}${request.nextUrl.search}`
      );
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}; 
