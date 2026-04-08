import { NextRequest } from 'next/server';
import { proxyJsonRequest } from '@/lib/backend-proxy';

export async function GET(request: NextRequest) {
  return proxyJsonRequest(request, {
    path: '/api/dashboard/stats',
    method: 'GET',
    authRequired: true,
  });
}
