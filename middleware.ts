import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// 1. Specify protected and public routes
const protectedRoutes = [
  "/",
  "/tournament",
  "/leaderboard",
  "/createQuestion",
  "/profile",
];
const publicRoutes = ["/login", "/cmuOAuthCallback"];
const ip = process.env.NEXT_PUBLIC_IP_URL;
export const CheckToken = async (token: string | undefined) => {
  try {
    await axios.post(`${ip}/api/token`, { token });
    return true; // Return the points
  } catch (e) {
    return false; // Return a fallback value in case of error
  }
};
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const token = req.cookies.get("cmu-oauth-token")?.value;
  const tokenValid = await CheckToken(token);
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !tokenValid) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (isPublicRoute && tokenValid) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
