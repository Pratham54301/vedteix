import { NextRequest } from 'next/server';
import { proxyJsonRequest, readJsonBody } from '@/lib/backend-proxy';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return proxyJsonRequest(request, {
    path: `/api/blogs/${id}`,
    method: 'GET',
  });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const body = await readJsonBody(request);
  return proxyJsonRequest(request, {
    path: `/api/blogs/${id}`,
    method: 'PUT',
    body,
    authRequired: true,
  });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return proxyJsonRequest(request, {
    path: `/api/blogs/${id}`,
    method: 'DELETE',
    authRequired: true,
  });
}
