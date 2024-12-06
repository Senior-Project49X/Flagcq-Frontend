import { NextRequest, NextResponse } from 'next/server'

import { cookies } from 'next/headers'
import { getCookie, isHasCookie } from './app/lib/cookies'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/','/tournament','/leaderboard','/createQuestion','/profile']
const publicRoutes = ['/login', '/cmuOAuthCallback' ]
 
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
  const HasCookie = req.cookies.has('cmu-oauth-token')
  
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !HasCookie) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    HasCookie
  ) {
    
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}