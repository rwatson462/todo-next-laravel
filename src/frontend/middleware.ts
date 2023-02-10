import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  // Check for bearer token
  if (!req.cookies.get('token')?.value) {
    const url = req.nextUrl.clone()
    url.pathname = '/api/unauthenticated'
    return NextResponse.rewrite(url)
  }
}

export const config = {
  matcher: [
    '/api/todo/all',
    '/api/todo/groups',
    '/api/todo/create',
    '/api/todo/:id/complete',
    '/api/todo/:id/uncomplete',
    '/api/authCheck'
    ],
}
