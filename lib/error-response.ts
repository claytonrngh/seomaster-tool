// lib/error-response.ts

import { NextResponse } from 'next/server'

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function errorResponse(message: string, status = 400, code?: string) {
  return NextResponse.json(
    {
      success: false,
      error: message,
      ...(code && { code }), // 可选 error code
    },
    { status }
  )
}