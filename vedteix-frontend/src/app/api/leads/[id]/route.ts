import { NextRequest } from 'next/server';
import { proxyJsonRequest, readJsonBody } from '@/lib/backend-proxy';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const body = await readJsonBody(request);
  return proxyJsonRequest(request, {
    path: `/api/leads/${id}`,
    method: 'PUT',
    body: body ?? undefined,
    authRequired: true,
  });
}
