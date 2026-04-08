import { cookies } from 'next/headers';
import { getBackendBaseUrlForServer, SESSION_COOKIE_NAME } from '@/lib/backend-proxy';

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
};

export async function getServerSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();

  if (!cookieStore.get(SESSION_COOKIE_NAME)) {
    return null;
  }

  try {
    const response = await fetch(`${getBackendBaseUrlForServer()}/api/auth/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Cookie: cookieStore.toString(),
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json().catch(() => null);
    return data?.user || null;
  } catch (error) {
    console.error('Failed to load server session user:', error);
    return null;
  }
}
