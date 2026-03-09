import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Exclude /admin, /api, Next.js internals and static files from i18n routing
    matcher: ['/((?!admin|api|_next|_vercel|.*\\..*).)']
};
