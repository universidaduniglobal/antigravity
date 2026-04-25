import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Only protect /portal routes, excluding /portal/login
  if (req.nextUrl.pathname.startsWith('/portal') && req.nextUrl.pathname !== '/portal/login') {
    const supabase = createMiddlewareClient({ req, res });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.redirect(new URL('/portal/login', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/portal/:path*'],
};
