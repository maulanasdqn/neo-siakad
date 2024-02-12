import NextAuth from "next-auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  apiTrpcPrefix,
  authRoutes,
  publicRoutes,
} from "@/libs/route";
import { authConfig } from "@/libs/auth/config";

const { auth } = NextAuth(authConfig);

export default auth(({ auth, nextUrl }) => {
  const isLoggedIn = !!auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isTrpcRoute = nextUrl.pathname.startsWith(apiTrpcPrefix);
  const isUserApiRoute = nextUrl.pathname.startsWith("/api/user");

  if (isApiAuthRoute) {
    return;
  }

  if (isTrpcRoute) {
    return;
  }

  if (isUserApiRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
