import { NextRequest, NextResponse } from 'next/server';
import { proxyJsonRequest, readJsonBody } from '@/lib/backend-proxy';

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request);
  return proxyJsonRequest(request, {
    path: '/api/leads',
    method: 'POST',
    body: body ?? undefined,
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const query = status ? `?status=${encodeURIComponent(status)}` : '';
  return proxyJsonRequest(request, {
    path: `/api/leads${query}`,
    method: 'GET',
    authRequired: true,
  });
}
