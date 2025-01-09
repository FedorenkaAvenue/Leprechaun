'use client'

import { createContext, FC, PropsWithChildren, useCallback } from "react";
import { useRouter } from "next/navigation";

import { DictionaryModel } from "../models/i18n";
import { LANGS } from "../constants/i18n_client";
import setLocaleCookie from "../lib/i18n_server";

interface Props {
    dictionary: DictionaryModel | null
    lang: string
    switchLocale: (locale: string) => void
}

export const I18nContext = createContext<Props>({
    dictionary: null,
    lang: LANGS[0],
    switchLocale: () => { },
});

export const I18nProvider: FC<PropsWithChildren<Props>> = ({ dictionary, lang, children }) => {
    const { replace } = useRouter();

    const switchLocale = useCallback((newLocale: string) => {
        // do not use usePathname cause pathName will always trigger changing state
        const pathWithoutLocale = window.location.pathname.split('/').slice(2).join('/');

        setLocaleCookie(newLocale);
        replace(`/${newLocale}/${pathWithoutLocale}`);
    }, []);

    return (
        <I18nContext.Provider value={{ dictionary, lang, switchLocale }}>
            {children}
        </I18nContext.Provider>
    )
}
