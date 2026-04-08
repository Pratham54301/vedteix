import { NextRequest, NextResponse } from 'next/server';
import { proxyJsonRequest, readJsonBody } from '@/lib/backend-proxy';

const MAX_FIELD_LENGTH = 1000;
const MAX_MESSAGE_LENGTH = 5000;

function validateContactInput(body: any): { valid: boolean; error?: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  const { name, email, message, subject } = body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { valid: false, error: 'Name is required' };
  }

  if (name.length > MAX_FIELD_LENGTH) {
    return { valid: false, error: 'Name is too long' };
  }

  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email) || email.length > 254) {
    return { valid: false, error: 'Invalid email format' };
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return { valid: false, error: 'Message is required' };
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: 'Message is too long' };
  }

  if (subject && (typeof subject !== 'string' || subject.length > MAX_FIELD_LENGTH)) {
    return { valid: false, error: 'Invalid subject' };
  }

  return { valid: true };
}

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request);
  const validation = validateContactInput(body);
  if (!validation.valid) {
    return NextResponse.json(
      { error: validation.error },
      { status: 400 }
    );
  }

  return proxyJsonRequest(request, {
    path: '/api/contacts',
    method: 'POST',
    body,
  });
}
