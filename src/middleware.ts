import { type NextRequest, NextResponse } from "next/server";

import { publicPaths, roles } from "./contants";
import { decryptToken } from "./lib/auth";
import { TokenUser } from "./types";

export async function middleware(request: NextRequest) {
  const nextPathname = request.nextUrl.pathname;
  const session = request.cookies.get("Authorization")?.value;

  // redirect to sign-in if there is no session and page was in the dashboard
  if (!session && nextPathname.startsWith("/dashboard")) {
    return Response.redirect(new URL(`/sign-in?redirect=${nextPathname}`, request.url));
  }

  // redirect to dashboard if there is a session and the url belongs to public paths
  if (session && publicPaths.includes(nextPathname)) {
    return Response.redirect(new URL("/dashboard", request.url));
  }

  if (session && nextPathname.startsWith("/dashboard")) {
    const token = await decryptToken<TokenUser>(session!);

    // redirect to sign in page if token is empty
    if (!token) {
      const response = NextResponse.redirect(new URL("/sign-in", request.url));
      response.cookies.set("Authorization", "", { expires: new Date(0) });

      return response;
    }

    const roleBasePath = roles[token.user.role].basePath;
    const unauthorizedPath = "/dashboard/unauthorized";

    // redirect to role redirect path if url is dashboard or base url of the role
    if (nextPathname === "/dashboard") {
      return Response.redirect(new URL(roleBasePath, request.url));
    }

    // proceed any roles to profile page
    if (nextPathname.startsWith("/dashboard/profile") || nextPathname.startsWith("/dashboard/reset-db")) {
      return NextResponse.next();
    }

    // redirect to unauthorized page if url is start with base path that wasnt match to the role
    if (nextPathname !== unauthorizedPath && !nextPathname.startsWith(roleBasePath)) {
      return Response.redirect(new URL(`${unauthorizedPath}?redirect=${roleBasePath}`, request.url));
    }
  }
}
