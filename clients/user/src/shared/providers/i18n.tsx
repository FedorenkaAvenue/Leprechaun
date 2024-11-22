'use client'

import { createContext, FC, PropsWithChildren, useContext } from "react";

import { DictionaryModel } from "@shared/models/i18n";

interface Props {
    dictionary: DictionaryModel
}

export const DictionaryContext = createContext<DictionaryModel | null>(null);

export const DictionaryProvider: FC<PropsWithChildren<Props>> = ({ dictionary, children }) => {
    return (
        <DictionaryContext.Provider value={dictionary}>
            {children}
        </DictionaryContext.Provider>
    )
}
