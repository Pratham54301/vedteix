import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  'http://localhost:5001';
export const SESSION_COOKIE_NAME =
  process.env.SESSION_COOKIE_NAME ||
  process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME ||
  'vedteix.sid';

function getBackendBaseUrl() {
  return DEFAULT_BACKEND_URL.replace(/\/$/, '');
}

export async function parseBackendResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    return { message: text };
  }
}

export async function readJsonBody<T>(request: Request | NextRequest): Promise<T | null> {
  try {
    return await request.json();
  } catch (error) {
    return null;
  }
}

export function forwardBackendSetCookie(response: Response, nextResponse: NextResponse) {
  const setCookieHeader = response.headers.get('set-cookie');
  if (setCookieHeader) {
    nextResponse.headers.set('set-cookie', setCookieHeader);
  }

  return nextResponse;
}

export async function proxyJsonRequest(
  request: NextRequest,
  {
    path,
    method,
    body,
    authRequired = false,
  }: {
    path: string;
    method: string;
    body?: unknown;
    authRequired?: boolean;
  }
) {
  const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (authRequired && !sessionId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const headers: HeadersInit = {
    Accept: 'application/json',
  };
  const cookieHeader = request.headers.get('cookie');

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  if (cookieHeader) {
    headers.Cookie = cookieHeader;
  }

  try {
    const response = await fetch(`${getBackendBaseUrl()}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: 'no-store',
    });

    const data = await parseBackendResponse(response);
    const nextResponse = NextResponse.json(data, { status: response.status });
    return forwardBackendSetCookie(response, nextResponse);
  } catch (error) {
    console.error(`Backend proxy error for ${path}:`, error);
    return NextResponse.json(
      { error: 'Failed to connect to backend service' },
      { status: 503 }
    );
  }
}

export function getBackendBaseUrlForServer() {
  return getBackendBaseUrl();
}
