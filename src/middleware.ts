/**
 * Edge Middleware — runs BEFORE any page/api route.
 *
 * Security:
 *   - Unauthenticated users hitting /dashboard/* get a 302 to /sign-in
 *   - This runs at the CDN edge on Vercel — the page never even starts rendering
 *   - API routes under /api/auth/* are always allowed (NextAuth needs them)
 *   - All other /api/* routes are protected too
 */

export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/epochs/:path*",
    "/api/audit/:path*",
    "/api/health/:path*",
  ],
};
