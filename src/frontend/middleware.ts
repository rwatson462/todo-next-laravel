import { NextRequest, NextResponse } from "next/server"
import Cookies from "./server/Cookies"

export function middleware(req: NextRequest) {
  // Check for bearer token
  const cookies = Cookies(req)
  if (!cookies.has('token')) {
    const url = req.nextUrl.clone()
    url.pathname = '/api/unauthenticated'
    NextResponse.rewrite(url)
    return
  }
}

export const config = {
  matcher: [
      '/api/todo/all',
      '/api/todo/create',
      '/api/todo/:id/complete',
      '/api/todo/:id/uncomplete',
    ],
}
