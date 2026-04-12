import { NextRequest } from 'next/server';
import { proxyBinaryRequest } from '@/lib/backend-proxy';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return proxyBinaryRequest(request, {
    path: `/api/invoices/${id}/pdf`,
    method: 'GET',
    authRequired: true,
  });
}
