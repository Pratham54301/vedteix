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
  } catch {
    return { message: text };
  }
}

export async function readJsonBody<T>(request: Request | NextRequest): Promise<T | null> {
  try {
    return await request.json();
  } catch {
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

/** Forward multipart FormData to Express (multer). Do not set Content-Type — boundary is set automatically. */
export async function proxyFormDataRequest(
  request: NextRequest,
  {
    path,
    method = 'POST',
    authRequired = false,
  }: {
    path: string;
    method?: string;
    authRequired?: boolean;
  }
) {
  const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (authRequired && !sessionId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const cookieHeader = request.headers.get('cookie');
  const formData = await request.formData();

  const headers: HeadersInit = {
    Accept: 'application/json',
  };
  if (cookieHeader) {
    headers.Cookie = cookieHeader;
  }

  try {
    const response = await fetch(`${getBackendBaseUrl()}${path}`, {
      method,
      headers,
      body: formData,
      cache: 'no-store',
    });

    const data = await parseBackendResponse(response);
    const nextResponse = NextResponse.json(data, { status: response.status });
    return forwardBackendSetCookie(response, nextResponse);
  } catch (error) {
    console.error(`Backend form proxy error for ${path}:`, error);
    return NextResponse.json(
      { error: 'Failed to connect to backend service' },
      { status: 503 }
    );
  }
}

export async function proxyBinaryRequest(
  request: NextRequest,
  {
    path,
    method = 'GET',
    authRequired = false,
  }: {
    path: string;
    method?: string;
    authRequired?: boolean;
  }
) {
  const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (authRequired && !sessionId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const cookieHeader = request.headers.get('cookie');
  const headers: HeadersInit = { Accept: 'application/pdf' };
  if (cookieHeader) {
    headers.Cookie = cookieHeader;
  }

  try {
    const response = await fetch(`${getBackendBaseUrl()}${path}`, {
      method,
      headers,
      cache: 'no-store',
    });

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const disposition = response.headers.get('content-disposition');

    if (!response.ok) {
      const text = await response.text();
      let data: { error?: string } = {};
      try {
        data = JSON.parse(text);
      } catch {
        data = { error: text || 'Request failed' };
      }
      return NextResponse.json(data, { status: response.status });
    }

    const buffer = await response.arrayBuffer();
    const nextResponse = new NextResponse(buffer, { status: 200 });
    nextResponse.headers.set('Content-Type', contentType);
    if (disposition) {
      nextResponse.headers.set('Content-Disposition', disposition);
    }
    return forwardBackendSetCookie(response, nextResponse);
  } catch (error) {
    console.error(`Backend binary proxy error for ${path}:`, error);
    return NextResponse.json(
      { error: 'Failed to connect to backend service' },
      { status: 503 }
    );
  }
}
