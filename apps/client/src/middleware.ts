import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';

import { DEFAULT_LANG, LANGS } from '@shared/constants/i18n_server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.endsWith('/share')) {
        request.nextUrl.pathname = '/wishlist';

        return NextResponse.redirect(request.nextUrl);
    }

    if (pathname.endsWith('/profile')) {
        request.nextUrl.pathname = '/profile/orders';

        return NextResponse.redirect(request.nextUrl);
    }

    if (LANGS.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)) return;

    const cookieLang = request.cookies.get('lang');
    const lang = cookieLang?.value;

    if (lang && LANGS.includes(lang)) {
        request.nextUrl.pathname = `/${lang}${pathname}`;
    } else {
        const acceptedLanguage = request.headers.get('accept-language') ?? undefined;
        const languages = new Negotiator({ headers: { 'accept-language': acceptedLanguage } }).languages();
        const matchedLang = LANGS.find(l => languages.includes(l));

        if (matchedLang) {
            request.nextUrl.pathname = `/${matchedLang}${pathname}`;
        } else {
            request.nextUrl.pathname = `/${DEFAULT_LANG}${pathname}`;
        }
    }

    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        '/((?!api|_next/static|static|_next/image|img/|favicon.ico).*)',
    ],
}
