'use client'

import { createContext, FC, PropsWithChildren } from "react";

import { DictionaryModel } from "@shared/models/i18n";

interface Props {
    dictionary: DictionaryModel | null
    lang: string
}

export const I18nContext = createContext<Props>({ dictionary: null, lang: '' });

export const I18nProvider: FC<PropsWithChildren<Props>> = ({ dictionary, lang, children }) => {
    return (
        <I18nContext.Provider value={{ dictionary, lang }}>
            {children}
        </I18nContext.Provider>
    )
}
