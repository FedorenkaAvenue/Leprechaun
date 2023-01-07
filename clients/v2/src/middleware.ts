import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { notFound } from 'next/navigation';

import LocaleService from '@services/Locale';
import LanguageT from '@type/Language';

export function middleware(request: NextRequest) {
    const { nextUrl, headers } = request;
    const url = nextUrl.clone();

    console.log(url);

    // проверить является ли первый path локалей
    if (/^\/\w{2}($|\/)/.test(url.pathname)) {
        const lang = LocaleService.parseLocale(url.pathname);

        // проверить правильные ли части локали
        if (LocaleService.validateLocale(lang as LanguageT)) return;

        notFound();
    } else {
        // если у url вообще нет path с локалей, подставить локаль из языка браузера
        const lang = headers.get('accept-language')?.split(',')?.[0].split('-')?.[0].toLowerCase() || 'en';

        url.pathname = `/${lang}${nextUrl.pathname}`;

        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: ['/((?!api|_next|favicon.ico).*)'],
};
