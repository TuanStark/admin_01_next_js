import { withAuth } from "next-auth/middleware";

export default withAuth;

export const config = {
// Bảo vệ tất cả routes trừ:
//     // - /auth/login
//     // - /auth/register
//     // - /auth/verify
//     // - các static files và api routes
  matcher: [
    // '/((?!auth).*)(.+)|/verify',
    // "/((?!api|_next/static|_next/image|favicon.ico|/|/auth).*)",
    '/((?!api|_next/static|_next/image|favicon.ico|auth|verify|$).*)',
    ],
};