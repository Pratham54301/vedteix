import { NextRequest } from 'next/server';
import { proxyJsonRequest, readJsonBody } from '@/lib/backend-proxy';

export async function GET(request: NextRequest) {
  return proxyJsonRequest(request, {
    path: '/api/testimonials',
    method: 'GET',
  });
}

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request);
  return proxyJsonRequest(request, {
    path: '/api/testimonials',
    method: 'POST',
    body,
    authRequired: true,
  });
}
