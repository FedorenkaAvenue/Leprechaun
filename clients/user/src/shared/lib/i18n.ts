import { useContext } from 'react';

import { DictionaryModuleModel } from '@shared/models/i18n';
import { DictionaryContext } from '@shared/providers/i18n';

const LANGS = process.env.LANGS?.split(',') as [];
const DICTIONARIES = LANGS.reduce<Record<string, DictionaryModuleModel>>((acc, l) => {
    return {
        ...acc,
        [l]: () => import(`../../public/locales/${l}.json`).then((module) => module.default)
    };
}, {});

export async function getDictionary(locale: string): ReturnType<DictionaryModuleModel> {
    return DICTIONARIES[locale]();
}

export const useDictionary = () => useContext(DictionaryContext);
