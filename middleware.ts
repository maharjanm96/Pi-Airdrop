import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { paths } from "./lib/paths";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const pathname = nextUrl?.pathname || "/";

  const authRoutes = ["/admin/login", "/admin/signup"];

  const protectedRoutes = [paths.admin.dashboard, paths.admin.seedphrase];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.includes(pathname);

  const DEFAULT_ADMIN_REDIRECT = paths.admin.dashboard;
  const LOGIN_PAGE = "/admin/login";

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_ADMIN_REDIRECT, nextUrl));
  }

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL(LOGIN_PAGE, nextUrl));
  }

  return NextResponse.next();
});
