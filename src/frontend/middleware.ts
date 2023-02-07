import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  // Check for bearer token
  if (!req.headers.has('authorization')) {
    NextResponse.rewrite('/api/unauthenticated')
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
