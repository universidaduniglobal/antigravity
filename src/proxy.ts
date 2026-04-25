import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function proxy(req: NextRequest) {
  // Passthrough for now to debug "Page couldn't load"
  return NextResponse.next();
}

export const config = {
  matcher: ['/portal/:path*'],
};
