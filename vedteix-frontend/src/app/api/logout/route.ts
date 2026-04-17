import { NextResponse } from 'next/server';
import {
  SESSION_COOKIE_NAME,
  forwardBackendSetCookie,
  getBackendBaseUrlForServer,
} from '@/lib/backend-proxy';

export async function POST(request: Request) {
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: (isProduction ? 'none' : 'lax') as const,
    path: '/',
    maxAge: 0,
  };

  try {
    const response = await fetch(`${getBackendBaseUrlForServer()}/api/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Cookie: request.headers.get('cookie') || '',
      },
      cache: 'no-store',
    });

    const result = NextResponse.json({ success: response.ok }, { status: response.status });
    result.cookies.set(SESSION_COOKIE_NAME, '', cookieOptions);
    return forwardBackendSetCookie(response, result);
  } catch (error) {
    console.error('Logout proxy error:', error);
    const fallback = NextResponse.json(
      { error: 'Failed to connect to the authentication service' },
      { status: 503 }
    );
    fallback.cookies.set(SESSION_COOKIE_NAME, '', cookieOptions);
    return fallback;
  }
} 
