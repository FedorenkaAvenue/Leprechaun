'use server'

import { DictionaryModuleModel } from '@shared/models/i18n';
import { LANGS } from '@shared/constants/i18n_server';

const DICTIONARIES = LANGS.reduce<Record<string, DictionaryModuleModel>>((acc, l) => {
    return {
        ...acc,
        [l]: () => import(`../../public/locales/${l}.json`).then((module) => module.default)
    };
}, {});

export async function getDictionary(locale: string): ReturnType<DictionaryModuleModel> {
    return await DICTIONARIES[locale]();
}
