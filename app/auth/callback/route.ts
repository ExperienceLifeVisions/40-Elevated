import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// No longer used for the primary sign-in flow (which now uses Supabase's
// implicit flow and redirects straight to the site root). Kept as a safe
// fallback in case anything old still links here.
export async function GET(request: NextRequest) {
  const { origin } = new URL(request.url)
  return NextResponse.redirect(origin)
}
