import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // No middleware needed - just pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
