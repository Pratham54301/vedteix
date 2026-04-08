import { NextRequest } from 'next/server';
import { proxyJsonRequest, readJsonBody } from '@/lib/backend-proxy';

export async function GET(request: NextRequest) {
  return proxyJsonRequest(request, {
    path: '/api/site-settings',
    method: 'GET',
  });
}

export async function PUT(request: NextRequest) {
  const body = await readJsonBody(request);
  return proxyJsonRequest(request, {
    path: '/api/site-settings',
    method: 'PUT',
    body,
    authRequired: true,
  });
}
