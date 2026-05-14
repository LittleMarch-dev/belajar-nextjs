// middleware.ts (PASTIKAN DI FOLDER ROOT)
import { auth } from "./auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin")

  if (isOnAdmin && !isLoggedIn) {
    // Jika akses admin tapi belum login, lempar ke halaman login bawaan
    return NextResponse.redirect(new URL("/api/auth/signin", req.nextUrl))
  }
})

export const config = {
  // Aturan rute mana saja yang harus dicegat oleh middleware ini
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}