import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const ADMIN_EMAILS = [
  'olaykenterprise@gmail.com',
  'itskingezekiel@gmail.com'
];

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          supabaseResponse = NextResponse.next({
            request,
          })
          supabaseResponse.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          supabaseResponse = NextResponse.next({
            request,
          })
          supabaseResponse.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // This will refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const { data: { user } } = await supabase.auth.getUser()

  const isAccessingAdmin = request.nextUrl.pathname.startsWith('/adminola')
  const isAccessingLogin = request.nextUrl.pathname === '/adminola/login'

  if (isAccessingAdmin) {
    if (!user) {
      // Not logged in -> redirect to login
      if (!isAccessingLogin) {
        return NextResponse.redirect(new URL('/adminola/login', request.url))
      }
    } else {
      // Logged in
      const isAuthorizedAdmin = user.email && ADMIN_EMAILS.includes(user.email);
      
      if (!isAuthorizedAdmin) {
        // Logged in but not an admin -> redirect to home
        return NextResponse.redirect(new URL('/', request.url))
      }

      if (isAccessingLogin) {
        // Already logged in as admin, visiting login page -> redirect to admin dashboard
        return NextResponse.redirect(new URL('/adminola', request.url))
      }
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
