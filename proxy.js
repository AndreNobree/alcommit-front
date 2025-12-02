import { NextResponse } from 'next/server';

export function proxy(request) {
  const token = request.cookies.get("token")?.value;

  // Rotas protegidas
  const protectedRoutes = ['/projects'];

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
