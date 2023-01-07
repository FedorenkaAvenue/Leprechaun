'use client';

import { createContext } from 'react';
import { usePathname } from 'next/navigation';

import ClientStateI from '@interfaces/ClientState';
import LocaleService from '@services/Locale';

export const ClientContext = createContext<ClientStateI>({ locale: { lang: '' } });

export default function ClientProvider(params: any) {
    const lang = LocaleService.parseLocale(usePathname() as string);

    return <ClientContext.Provider value={{ locale: { lang } }}>{params.children}</ClientContext.Provider>;
}
