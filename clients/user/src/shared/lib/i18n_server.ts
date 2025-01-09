'use server'

import { cookies } from "next/headers";

import { DictionaryModuleModel } from '../models/i18n';
import { LANGS } from '../constants/i18n_server';

const DICTIONARIES = LANGS.reduce<Record<string, DictionaryModuleModel>>((acc, l) => {
    return {
        ...acc,
        [l]: () => import(`../../public/locales/${l}.json`).then((module) => module.default)
    };
}, {});

export async function getDictionary(locale: string): ReturnType<DictionaryModuleModel> {
    return await DICTIONARIES[locale]();
}

export default async function setLocaleCookie(newLang: string) {
    (await cookies()).set('lang', newLang, { httpOnly: true });
}
