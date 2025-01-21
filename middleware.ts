import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// 1. Specify protected and public routes
const protectedRoutes = ["/*"]; // Protect all routes
const publicRoutes = ["/login", "/cmuOAuthCallback"]; // Except these

const adminRoutes = [ /^\/admin.*/];

const ip = process.env.NEXT_PUBLIC_IP_URL;
export const CheckToken = async (token: string | undefined) => {
  try {
    const resp = await axios.post(`${ip}/api/token`, { token });

    return {
      tokenValid: true,
      role: resp.data.role,
    }; // Return the points
  } catch (e) {
    return { tokenValid: false }; // Return a fallback value in case of error
  }
};
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public

  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route: string | RegExp) => typeof route === 'string' ? route === path : route.test(path)); // Check if path matches any protected route
  const isPublicRoute = publicRoutes.includes(path);
  const isAdminRoute = adminRoutes.some(route => typeof route === 'string' ? route === path : route.test(path)); // Check if path matches any admin route
  const token = req.cookies.get("cmu-oauth-token")?.value;
  const { tokenValid, role } = await CheckToken(token);

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !isPublicRoute && !tokenValid) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Check if the current route is an admin route and the user is not an admin
  if (isAdminRoute && role !== "Admin" && role !== "Ta") {
    return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (isPublicRoute && tokenValid) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (tokenValid && role) {
    let response = NextResponse.next();
    // Set the cookie in the response
    response.cookies.set("user-role", role, { secure: true });

    return response;
  }
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
