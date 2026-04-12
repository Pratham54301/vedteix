import { NextRequest } from 'next/server';
import {
  proxyFormDataRequest,
  proxyJsonRequest,
  readJsonBody,
} from '@/lib/backend-proxy';

export async function GET(request: NextRequest) {
  return proxyJsonRequest(request, {
    path: '/api/blogs',
    method: 'GET',
  });
}

export async function POST(request: NextRequest) {
  const ct = request.headers.get('content-type') || '';
  if (ct.includes('multipart/form-data')) {
    return proxyFormDataRequest(request, {
      path: '/api/blogs',
      method: 'POST',
      authRequired: true,
    });
  }
  const body = await readJsonBody(request);
  return proxyJsonRequest(request, {
    path: '/api/blogs',
    method: 'POST',
    body: body ?? undefined,
    authRequired: true,
  });
}
