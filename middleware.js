import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // Se tentar acessar páginas protegidas sem token → retornar pro login
  if (!token && req.nextUrl.pathname.startsWith("/projects")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/projects/:path*", // protege QUALQUER rota dentro de /projects
  ],
};
