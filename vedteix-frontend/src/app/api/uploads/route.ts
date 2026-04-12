import { NextRequest, NextResponse } from "next/server";
import {
  forwardBackendSetCookie,
  getBackendBaseUrlForServer,
  parseBackendResponse,
  SESSION_COOKIE_NAME,
} from "@/lib/backend-proxy";

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const backend = getBackendBaseUrlForServer();
  const cookieHeader = request.headers.get("cookie");
  const formData = await request.formData();

  try {
    const response = await fetch(`${backend}/api/uploads`, {
      method: "POST",
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
      body: formData,
      cache: "no-store",
    });

    const data = await parseBackendResponse(response);
    const nextResponse = NextResponse.json(data, { status: response.status });
    return forwardBackendSetCookie(response, nextResponse);
  } catch (error) {
    console.error("Upload proxy error:", error);
    return NextResponse.json({ error: "Failed to connect to backend service" }, { status: 503 });
  }
}
