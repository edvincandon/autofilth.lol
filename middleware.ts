import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/form")) {
    const rewriteStatus = request.nextUrl.searchParams.get("response_status");
    const status = parseInt(rewriteStatus ?? "200", 10);
    return NextResponse.rewrite(new URL("/form", request.url), { status });
  }
}
