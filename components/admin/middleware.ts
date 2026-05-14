// middleware.ts
export { auth as middleware } from "@/auth"

export const config = {
  // Hanya kunci rute yang mengandung kata 'admin'
  matcher: ["/admin/:path*"],
}