import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function proxy(req: NextRequest) {
  // Passthrough to allow the Layout to handle security and avoid loops
  return NextResponse.next();
}

export const config = {
  matcher: ['/portal/:path*'],
};
