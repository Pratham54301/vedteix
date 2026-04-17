import { NextRequest, NextResponse } from 'next/server';
import { proxyJsonRequest, readJsonBody } from '@/lib/backend-proxy';

const MAX_FIELD_LENGTH = 1000;
const MAX_MESSAGE_LENGTH = 5000;

type ContactInput = {
  name: string;
  email: string;
  message: string;
  subject?: string;
  phone?: string;
};

type ContactValidationResult =
  | { valid: true; value: ContactInput }
  | { valid: false; error: string };

function validateContactInput(body: unknown): ContactValidationResult {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  const { name, email, message, subject, phone } = body as Record<string, unknown>;

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

  if (phone != null && phone !== '' && (typeof phone !== 'string' || phone.length > 40)) {
    return { valid: false, error: 'Invalid phone' };
  }

  return {
    valid: true,
    value: {
      name,
      email,
      message,
      subject: typeof subject === 'string' ? subject : undefined,
      phone: typeof phone === 'string' ? phone : undefined,
    },
  };
}

export async function POST(request: NextRequest) {
  const body = await readJsonBody(request);
  const validation = validateContactInput(body);
  if (validation.valid === false) {
    return NextResponse.json(
      { error: validation.error },
      { status: 400 }
    );
  }

  const contact = validation.value;
  const leadBody = {
    name: contact.name.trim(),
    email: contact.email.trim(),
    phone: contact.phone ? contact.phone.trim() : '',
    message:
      contact.subject && contact.subject.trim().length > 0
        ? `[${contact.subject.trim()}]\n\n${contact.message.trim()}`
        : contact.message.trim(),
    source: 'contact_form',
  };

  return proxyJsonRequest(request, {
    path: '/api/leads',
    method: 'POST',
    body: leadBody,
  });
}
