import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js "proxy" (formerly middleware): sends visitors to /de or /en (German browsers get German) and maps the localized URLs.
export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
