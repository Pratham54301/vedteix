import { NextRequest } from 'next/server';
import { proxyJsonRequest } from '@/lib/backend-proxy';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return proxyJsonRequest(request, {
    path: `/api/contacts/${id}`,
    method: 'DELETE',
    authRequired: true,
  });
}
