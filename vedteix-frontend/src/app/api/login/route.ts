import { NextResponse } from 'next/server';
import {
  forwardBackendSetCookie,
  getBackendBaseUrlForServer,
  parseBackendResponse,
  readJsonBody,
} from '@/lib/backend-proxy';

function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export async function POST(request: Request) {
  const body = await readJsonBody<{ email?: string; password?: string; returnTo?: string }>(request);
  const email = body?.email?.trim() || '';
  const password = body?.password || '';
  const returnTo = body?.returnTo || '/dashboard';

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Invalid email format' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${getBackendBaseUrlForServer()}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, password, returnTo }),
      cache: 'no-store',
    });

    const payload = await parseBackendResponse(response);
    if (!response.ok) {
      return NextResponse.json(
        { error: payload.error || 'Login failed' },
        { status: response.status }
      );
    }

    const result = NextResponse.json(payload, { status: response.status });
    return forwardBackendSetCookie(response, result);
  } catch (error) {
    console.error('Login proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to the authentication service' },
      { status: 503 }
    );
  }
}
