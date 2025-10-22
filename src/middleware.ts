import { NextResponse } from "next/server";

export function middleware() {
  // Add your middleware logic here
  // For now, just pass through the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico).*)",
  ],
};
